import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.id = user.id;
        // Fetch the latest user data from the database
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { stripeCustomerId: true, isSubscribed: true },
        });
        if (dbUser) {
          token.stripeCustomerId = dbUser.stripeCustomerId ?? undefined;
          token.isSubscribed = dbUser.isSubscribed;
        } else {
          token.isSubscribed = false;
        }
      }
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        // For testing: Set token expiration to 30 seconds
        token.accessTokenExpires = Date.now() + 30 * 1000;
        // token.accessTokenExpires = account.expires_at
        //   ? account.expires_at * 1000
        //   : undefined;
        console.log("Initial token set:", token);
      }

      // If the token has expired, try to refresh it
      if (token.accessTokenExpires && Date.now() > token.accessTokenExpires) {
        console.log("Token expired, attempting refresh");
        const refreshedToken = await refreshAccessToken(token);
        console.log("Refreshed token:", refreshedToken);
        return refreshedToken;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.stripeCustomerId = token.stripeCustomerId as
        | string
        | undefined;
      session.user.isSubscribed = token.isSubscribed as boolean | undefined;
      session.accessToken = token.accessToken as string | undefined;
      session.error = token.error as "RefreshAccessTokenError" | undefined;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to /pro after sign in
      return baseUrl + "/pro";
    },
  },

  events: {
    createUser: async ({ user }) => {
      await stripe.customers
        .create({
          email: user.email!,
          name: user.name!,
        })
        .then(async (customer) => {
          return prisma.user.update({
            where: { id: user.id },
            data: {
              stripeCustomerId: customer.id,
            },
          });
        });
    },
  },
  // debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

async function refreshAccessToken(token: any) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      console.error("Token refresh failed:", refreshedTokens);
      throw refreshedTokens;
    }

    console.log("Token refreshed successfully:", refreshedTokens);

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

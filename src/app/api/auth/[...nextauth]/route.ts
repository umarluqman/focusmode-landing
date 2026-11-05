import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? `__Secure-next-auth.session-token`
          : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain:
          process.env.NODE_ENV === "production" ? ".focusmode.app" : undefined,
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      // For lifetime subscription: only check DB if not yet subscribed
      // Once true, it stays true forever - no need to re-check
      if (token.id && !token.isSubscribed) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { stripeCustomerId: true, isSubscribed: true },
        });
        if (dbUser) {
          token.stripeCustomerId = dbUser.stripeCustomerId ?? undefined;
          token.isSubscribed = dbUser.isSubscribed;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.stripeCustomerId = token.stripeCustomerId as
        | string
        | undefined;
      session.user.isSubscribed = token.isSubscribed as boolean | undefined;
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

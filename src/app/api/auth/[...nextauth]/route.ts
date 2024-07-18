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
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 7 * 365 * 24 * 60 * 60, // 7 years in seconds
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
          token.stripeCustomerId = dbUser.stripeCustomerId;
          token.isSubscribed = dbUser.isSubscribed;
        } else {
          token.isSubscribed = false;
        }
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.stripeCustomerId = token.stripeCustomerId as
        | string
        | undefined;
      session.user.isSubscribed = token.isSubscribed as boolean | undefined;
      if (token.accessToken) {
        session.accessToken = token.accessToken as string | undefined;
      }
      return session;
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

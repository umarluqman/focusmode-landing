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
  callbacks: {
    async jwt({ token, user }) {
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

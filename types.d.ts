import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      stripeCustomerId?: string;
      isSubscribed?: boolean;
    } & DefaultSession["user"];
    accessToken?: string;
    error?: "RefreshAccessTokenError";
  }
  interface User extends DefaultUser {
    stripeCustomerId?: string;
    isSubscribed?: boolean;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    stripeCustomerId?: string;
    isSubscribed?: boolean;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: "RefreshAccessTokenError";
  }
}

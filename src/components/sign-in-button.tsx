"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { GoogleIcon } from "./google-icon";
import { Button } from "./ui/button";

export function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    );
  }

  return (
    <Button onClick={() => signIn("google")} className="space-x-3">
      <GoogleIcon />
      <div>Sign in with Google</div>
    </Button>
  );
}

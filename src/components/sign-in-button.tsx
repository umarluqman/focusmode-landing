"use client";

import router from "next/router";
import { useEffect } from "react";
import { GoogleIcon } from "./google-icon";
import { Button } from "./ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import { TestRefresh } from "./test-refresh";
// import secureLocalStorage from "react-secure-storage";

export function SignInButton() {
  const handleSignIn = () => {
    signIn("google");
  };
  const { data: session, status } = useSession();

  console.log("Session data:", session);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <>
        {/* <TestRefresh /> */}
        Signed in as {session.user.email} <br />
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    );
  }
  return (
    <>
      <Button
        onClick={handleSignIn}
        className="space-x-3"
        // variant={"secondary"}
      >
        <GoogleIcon />
        <div>Sign in with Google</div>
      </Button>
    </>
  );
}

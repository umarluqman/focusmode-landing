"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { GoogleIcon } from "./google-icon";
import { Button } from "./ui/button";
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
      <div className="flex flex-col space-y-8">
        {/* <TestRefresh /> */}
        <div className="text-sm text-gray-500">
          Signed in as {session.user.email}{" "}
        </div>
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
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

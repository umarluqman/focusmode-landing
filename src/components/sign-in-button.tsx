"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { GoogleIcon } from "./google-icon";
import { Button } from "./ui/button";
import { useState } from "react";

export function SignInButton() {
  const [email, setEmail] = useState("");
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  const handleMagicLinkSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn("email", { email, callbackUrl: "/" });
      setIsMagicLinkSent(true);
    } catch (error) {
      console.error("Error sending magic link:", error);
    }
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
        onClick={handleGoogleSignIn}
        className="space-x-3"
        // variant={"secondary"}
      >
        <GoogleIcon />
        <div>Sign in with Google</div>
      </Button>
      <form onSubmit={handleMagicLinkSignIn}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <Button type="submit">Send Magic Link</Button>
      </form>
      {isMagicLinkSent && <p>Magic link sent! Check your email.</p>}
    </>
  );
}

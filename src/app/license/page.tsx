import type { Metadata } from "next/types";
import { Footer } from "@/components/footer";
import { ResendForm } from "@/components/resend-form";

export const metadata: Metadata = {
  title: "Find my license key",
  description:
    "Get your FocusMode Pro license key emailed to you again, including free lifetime keys for v2 Pro customers.",
};

export default function LicensePage() {
  return (
    <>
      <main id="main" className="container max-w-2xl py-16 sm:py-24">
        <h1 className="text-[clamp(2rem,5vw,3rem)] leading-[1.05]">
          Find my license key
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Enter the email you paid with and we&apos;ll send every FocusMode key
          on it. Paid for Pro in FocusMode 2? Your free Unlimited key is there
          too.
        </p>
        <ResendForm className="mt-8" />
        <p className="mt-6 text-sm text-muted-foreground">
          Paid with a different email, or still stuck? Write to{" "}
          <a href="mailto:focusmode.app@gmail.com" className="font-semibold text-foreground underline underline-offset-4">
            focusmode.app@gmail.com
          </a>
          .
        </p>
      </main>
      <Footer />
    </>
  );
}

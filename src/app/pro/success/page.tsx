import { Suspense } from "react";
import { Footer } from "@/components/footer";
import { CheckoutResult } from "@/components/license/checkout-result";

export const metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default function ProSuccessPage() {
  return (
    <>
      <main id="main" className="container max-w-2xl py-16 sm:py-24">
        <Suspense>
          <CheckoutResult />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

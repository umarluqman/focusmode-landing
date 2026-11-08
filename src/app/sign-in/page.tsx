import { Footer } from "@/components/footer";
import { Wordmark } from "@/components/logo";
import Providers from "@/components/providers";
import { SignInButton } from "@/components/sign-in-button";

export const metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <>
      <main id="main" className="container grid min-h-[60vh] place-items-center py-16">
        <div className="w-full max-w-sm rounded-[20px] border border-border bg-card p-8 text-center">
          <h1 className="mb-6 flex justify-center">
            <Wordmark />
          </h1>
          <Providers>
            <SignInButton />
          </Providers>
        </div>
      </main>
      <Footer />
    </>
  );
}

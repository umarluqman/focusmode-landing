import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SignInButton } from "@/components/sign-in-button";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-950">
      {/* <Header showCta={false} /> */}
      <div className="flex mt-24 flex-col items-center justify-start bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <div className="flex w-full items-center justify-center space-x-2 mb-8">
            <Image
              src="/focusmode-logo.png"
              alt="focusmode"
              width={40}
              height={40}
            />
            <h1 className="text-2xl font-bold text-center">focusmode</h1>
          </div>
          <SignInButton />
        </div>
      </div>
      <Footer />
    </div>
  );
}

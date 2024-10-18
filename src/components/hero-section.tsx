import { Button } from "@/components/ui/button";
import { LandingSocialProof } from "./social-proof/landing-social-proof";
import Link from "next/link";
import Image from "next/image";
import PreviewSection from "./preview-section";
export const avatarItems = [
  {
    imageSrc: "/users/6.png",
    name: "Khang Nguyen Duy",
  },
  {
    imageSrc: "/users/3.png",
    name: "Stan Olery",
  },
  {
    imageSrc: "/users/4.jpeg",
    name: "Julio Santirachi",
  },
  {
    imageSrc: "/users/8.jpeg",
    name: "Cristian Andrei Grigore",
  },
];

export let HeroSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center gap-6 lg:grid-cols-[500px_1fr] lg:gap-12 xl:grid-cols-[550px_1fr]">
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-8">
            <h1
              className="text-4xl font-bold tracking-wide sm:text-5xl xl:text-6xl/none"
              style={{ fontFamily: "var(--font-cal-sans)" }}
            >
              Reduce Mindless Browsing By 10x
            </h1>
            <p className="max-w-[600px] m:text-xl text-zinc-500 dark:text-zinc-400 mb-8 leading-8">
              Get out of the loop and stay mindful when accessing distracting
              websites. No more wasting time for hours unconsciously.
              {/* Stop mindless browsing and take control of your time online */}
            </p>
            <LandingSocialProof showRating avatarItems={avatarItems} />

            <Button>
              <Link
                href="https://chromewebstore.google.com/detail/focus-mode-stay-focused-b/ollmdedpknmlcdmpehclmgbogpifahdc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Image
                  src="/chrome.png"
                  alt="chrome logo"
                  width={24}
                  height={24}
                />
                Install Now
              </Link>
            </Button>
          </div>
        </div>
        <PreviewSection />
      </div>
    </section>
  );
};

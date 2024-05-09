import { FeaturesBento } from "./features-bento";
import {
  PopiconsHomeLine,
  PopiconsUserCheckDuotone,
  PopiconsCirclePauseDuotone,
  PopiconsCalendarTimeDuotone,
} from "@popicons/react";
import Image from "next/image";

const items = [
  {
    title: "Structured Breaks",
    description:
      "When you visit a distracting site, focusmode presents a calming intervention. Breathe, stretch, and decide mindfully how long you want to spend there.",
    header: <PopiconsCirclePauseDuotone />,
    className: "md:col-span-2",
    // icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Personalized Prompts",
    description:
      "Create your own intervention messages that resonate with you. Choose break durations that fit your workflow. focusmode adapts to you.",
    header: <PopiconsUserCheckDuotone />,
    className: "md:col-span-1",
    // icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Automatic Scheduling",
    description:
      "Set focusmode to activate during your most productive hours, and turn off when it's time to unwind. Strike the perfect balance effortlessly.",
    header: <PopiconsCalendarTimeDuotone />,
    className: "md:col-span-1",
    // icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
];

export let Objections = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-900">
      <div className="container space-y-12 px-4 md:px-6">
        <div className="flex items-center justify-center space-y-4 text-center">
          {/* <Image
            src="/home.png"
            alt="focusmode-home-screen"
            width={300}
            height={500}
          /> */}
          <div className="space-y-8 text-left">
            <h2
              className="text-lg tracking-wide sm:text-5xl text-zinc-50 max-w-[700px]"
              style={{ fontFamily: "var(--font-cal-sans)" }}
            >
              We know what you&#39;re thinking
            </h2>
            <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Another productivity tool that promises the world but doesn&#39;t
              deliver. focusmode is different.
            </p>
            <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              It&#39;s not about blocking sites entirely, but helping you be
              more intentional with your browsing. With customizable
              interventions and breaks, focusmode puts you back in the
              driver&#39;s seat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

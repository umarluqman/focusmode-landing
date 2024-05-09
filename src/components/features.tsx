import { FeaturesBento } from "./features-bento";
import {
  PopiconsHomeLine,
  PopiconsUserCheckDuotone,
  PopiconsCirclePauseDuotone,
  PopiconsCalendarTimeDuotone,
} from "@popicons/react";

const items = [
  {
    title: "Structured Breaks",
    description:
      "When you visit a distracting site, focusmode presents a calming intervention. Breathe, stretch, and decide mindfully how long you want to spend there.",
    header: <PopiconsCirclePauseDuotone />,
  },
  {
    title: "Personalized Prompts",
    description:
      "Create your own intervention messages that resonate with you. Choose break durations that fit your workflow. focusmode adapts to you.",
    header: <PopiconsUserCheckDuotone />,
  },
  {
    title: "Automatic Scheduling",
    description:
      "Set focusmode to activate during your most productive hours, and turn off when it's time to unwind. Strike the perfect balance effortlessly.",
    header: <PopiconsCalendarTimeDuotone />,
  },
];

export let Features = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container space-y-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-4 text-center">
            <div className="inline-block rounded-lg bg-zinc-300 px-3 py-1 text-sm dark:bg-zinc-800">
              Features
            </div>
            <h2
              className="text-3xl font-bold tracking-wide sm:text-5xl"
              style={{ fontFamily: "var(--font-cal-sans)" }}
            >
              Take Control of Your Time
            </h2>
            <p className="inline-block w-full max-w-[500px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-base/relaxed dark:text-zinc-400">
              Stop mindless browsing and stay mindful. Access distracting
              websites with well-informed intention.
            </p>
          </div>
        </div>
        {/* <FeaturesBento /> */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
          {items.map(({ title, description, header }) => {
            return (
              <div key={title} className="flex items-start gap-4">
                <div className="space-y-2">
                  <div className="flex flex-row items-center">
                    <div className="flex h-10 w-10 items-center rounded-md bg-zinc-100 dark:bg-zinc-800">
                      {header}
                    </div>
                    <h3 className="text-lg font-bold">{title}</h3>
                  </div>
                  <p className="leading-7 text-zinc-500 dark:text-zinc-400">
                    {description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { PopiconsHomeLine } from "@popicons/react";
// import {
//   IconClipboardCopy,
//   IconFileBroken,
//   IconSignature,
//   IconTableColumn,
// } from "@tabler/icons-react";

export let FeaturesBento = () => {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          // icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
};
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);
const items = [
  {
    title: "Structured Breaks",
    description:
      "When you visit a distracting site, focusmode presents a calming intervention. Breathe, stretch, and decide mindfully how long you want to spend there.",
    header: <PopiconsHomeLine />,
    className: "md:col-span-2",
    // icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Personalized Prompts",
    description:
      "Create your own intervention messages that resonate with you. Choose break durations that fit your workflow. FocusMode adapts to you.",
    header: <PopiconsHomeLine />,
    className: "md:col-span-1",
    // icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Automatic Scheduling",
    description:
      "Set focusmode to activate during your most productive hours, and turn off when it's time to unwind. Strike the perfect balance effortlessly.",
    header: <PopiconsHomeLine />,
    className: "md:col-span-1",
    // icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <PopiconsHomeLine />,
    className: "md:col-span-2",
    // icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];

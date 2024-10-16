"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import Video from "next-video";
import slideInOut from "/videos/1 Clip 2.mp4";
import holdToComplete from "/videos/0 Clip 1.mp4";
import pixel from "/videos/2 Clip 3.mp4";

const tabs = ["Slide In Out", "Hold to Complete", "Pixel"];

interface TabProps {
  text: string;
  selected: boolean;
  setSelected: (text: string) => void;
}

const Tab = ({ text, selected, setSelected }: TabProps) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`${
        selected
          ? "text-white"
          : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
      } relative rounded-md px-2 py-1 text-sm font-medium transition-colors`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <span className="absolute inset-0 z-0 rounded-md bg-zinc-950"></span>
      )}
    </button>
  );
};

const ButtonShapeTabs = () => {
  const [selected, setSelected] = useState<string>(tabs[0]);

  const renderVideo = useMemo(() => {
    const videoProps = {
      autoplay: true,
      controls: false,
      muted: true,
      loop: true,
      width: 529,
      height: 298,
      quality: "auto",
      preload: "none" as const,
    };

    let src = "";
    let id = "";

    if (selected === "Slide In Out") {
      src = "slide";
      id = "slide-video";
    } else if (selected === "Hold to Complete") {
      src = "hold";
      id = "hold-video";
    } else if (selected === "Pixel") {
      src = "pixel";
      id = "pixel-video";
    }

    return (
      <div className="aspect-video overflow-hidden rounded-lg" key={selected}>
        <span className="h-full w-full object-cover rounded-md bg-muted shadow-2xl">
          <Video
            autoPlay={true}
            muted={true}
            loop={true}
            controls={false}
            src={
              selected === "Slide In Out"
                ? slideInOut
                : selected === "Hold to Complete"
                ? holdToComplete
                : pixel
            }
          />
          ;
        </span>
      </div>
    );
  }, [selected]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((tab) => (
          <Tab
            text={tab}
            selected={selected === tab}
            setSelected={setSelected}
            key={tab}
          />
        ))}
      </div>
      {renderVideo}
    </div>
  );
};

export default ButtonShapeTabs;

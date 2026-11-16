"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { poster, type Scene } from "./scenes";

const ShaderCanvas = dynamic(() => import("./shader-canvas"), { ssr: false });

export function LiveShader({
  scene,
  reveal = 1,
  className,
}: {
  scene: Scene;
  reveal?: number;
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [still, setStill] = useState(false);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(motion.matches);
    sync();
    motion.addEventListener("change", sync);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        io.disconnect();
      },
      { rootMargin: "300px" }
    );
    io.observe(host.current!);
    return () => {
      motion.removeEventListener("change", sync);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={host}
      aria-hidden="true"
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-out"
        style={{
          background: poster(scene.colors),
          opacity: ready ? 0 : 0.2 + reveal * 0.8,
        }}
      />
      {near && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-out",
            ready ? "opacity-100" : "opacity-0"
          )}
        >
          <ShaderCanvas
            scene={scene}
            reveal={reveal}
            still={still}
            onReady={onReady}
          />
        </div>
      )}
    </div>
  );
}

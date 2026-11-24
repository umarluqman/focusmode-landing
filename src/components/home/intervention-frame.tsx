"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type DemoAction = { action: "break"; minutes: number } | { action: "close" };

// The extension's own intervention screens, built by `pnpm build:demo` in focusmode-wxt.
// Rendered at a desktop-sized viewport and scaled down so the layout matches the real thing.
export function InterventionFrame({
  params,
  interactive = true,
  onAction,
  className,
}: {
  params: Record<string, string | number>;
  interactive?: boolean;
  onAction?: (action: DemoAction) => void;
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = host.current!;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    // Unmount offscreen frames so their WebGL contexts are released.
    const io = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), {
      rootMargin: "300px",
    });
    ro.observe(el);
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.source !== frame.current?.contentWindow || e.data?.source !== "focusmode-demo") return;
      if (e.data.action !== "interact") onAction?.(e.data);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onAction]);

  const src = `/demo/index.html?${new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  )}`;
  // Phones get a narrower viewport so the text stays readable.
  const viewport = size && Math.min(1280, Math.max(720, size.width * 2));
  const scale = size && viewport ? size.width / viewport : 1;

  return (
    <div ref={host} className={cn("absolute inset-0 overflow-hidden", className)}>
      {near && size && viewport && (
        <iframe
          ref={frame}
          key={src}
          src={src}
          title="focusmode intervention preview"
          tabIndex={interactive ? undefined : -1}
          aria-hidden={interactive ? undefined : true}
          className={cn("absolute left-0 top-0 origin-top-left border-0", !interactive && "pointer-events-none")}
          style={{ width: viewport, height: size.height / scale, transform: `scale(${scale})` }}
        />
      )}
    </div>
  );
}

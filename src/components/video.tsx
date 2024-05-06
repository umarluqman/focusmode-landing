import { Suspense } from "react";
import { list } from "@vercel/blob";

export function Video() {
  const { blobs } = await list({
    prefix: "fileName",
    limit: 1,
  });
  const { url } = blobs[0];
  return (
    <video autoPlay loop width="320" height="240" controls preload="none">
      <source src="/public/focusmode-intro.mov" type="video/mov" />
      Your browser does not support the video tag.
    </video>
  );
}

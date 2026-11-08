"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CHROME_STORE_URL, TIERS } from "@/lib/pricing";
import { LicenseKey } from "./license-key";

type Result = {
  email: string;
  tier: string;
  licenseKey: string;
  maxActivations: number | null;
};

const POLL_MS = 2000;
const GIVE_UP_MS = 60_000;

export function CheckoutResult() {
  const sessionId = useSearchParams().get("session_id");
  const [result, setResult] = useState<Result | null>(null);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    let stop = false;
    let id: ReturnType<typeof setTimeout>;
    const started = Date.now();
    const poll = async () => {
      const data = await fetch(
        `/api/checkout/session/?session_id=${encodeURIComponent(sessionId)}`
      )
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null);
      if (stop) return;
      if (data?.licenseKey) return setResult(data);
      if (Date.now() - started > GIVE_UP_MS) return setSlow(true);
      id = setTimeout(poll, POLL_MS);
    };
    poll();
    return () => {
      stop = true;
      clearTimeout(id);
    };
  }, [sessionId]);

  if (!sessionId || slow) {
    return (
      <div className="space-y-4">
        <h1 className="text-[clamp(2rem,5vw,3rem)] leading-[1.05]">
          Your key is on its way.
        </h1>
        <p className="text-lg text-muted-foreground">
          Payment can take a minute to confirm. We&apos;ll email your key as
          soon as it does. Nothing yet after ten minutes?{" "}
          <Link href="/license/" className="font-semibold text-foreground underline underline-offset-4">
            Resend it
          </Link>{" "}
          or email focusmode.app@gmail.com.
        </p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="space-y-4" role="status">
        <h1 className="text-[clamp(2rem,5vw,3rem)] leading-[1.05]">
          Confirming your payment…
        </h1>
        <p className="text-lg text-muted-foreground">
          This usually takes a few seconds. Keep this tab open.
        </p>
        <div className="h-[72px] animate-pulse rounded-2xl bg-muted" />
      </div>
    );
  }

  const tier = TIERS.find((t) => t.id === result.tier);
  const seats =
    result.maxActivations === null
      ? "unlimited browsers"
      : `${result.maxActivations} browser${result.maxActivations > 1 ? "s" : ""}`;

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <p className="text-sm font-semibold text-orange-ink">
          FocusMode Pro{tier && ` ${tier.name}`} · {seats}
        </p>
        <h1 className="text-[clamp(2rem,5vw,3rem)] leading-[1.05]">
          You&apos;re Pro for life.
        </h1>
        <p className="text-lg text-muted-foreground">
          Here&apos;s your license key. We also sent it to{" "}
          <span className="font-semibold text-foreground">{result.email}</span>.
        </p>
        <LicenseKey value={result.licenseKey} />
      </div>

      <ol className="space-y-5">
        {[
          [
            "Open FocusMode",
            <>
              Click the puzzle piece in Chrome&apos;s toolbar, then FocusMode.
              Pin it so it&apos;s one click away. Not installed yet?{" "}
              <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground underline underline-offset-4">
                Add it to Chrome
              </a>
              .
            </>,
          ],
          ["Go to Settings, then License", "Paste the key into the license field."],
          [
            "Press Activate PRO",
            `This browser uses one of your ${seats}. Repeat on your other browsers.`,
          ],
        ].map(([title, body], i) => (
          <li key={i} className="grid grid-cols-[2rem_1fr] gap-x-3">
            <span className="tnum pt-0.5 text-sm font-semibold text-muted-foreground">0{i + 1}</span>
            <div>
              <h2 className="text-lg">{title}</h2>
              <p className="mt-1 text-muted-foreground">{body}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="border-t border-border pt-6 text-sm text-muted-foreground">
        Lost this key later? You can{" "}
        <Link href="/license/" className="font-semibold text-foreground underline underline-offset-4">
          resend it to your email
        </Link>{" "}
        any time.
      </p>
    </div>
  );
}

import type { Metadata } from "next/types";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { StoreLink } from "@/components/store-link";
import { getBlockPage } from "@/lib/block-pages";

const TITLE = "How to Stop Doomscrolling: A Practical Guide for Phone and Desktop";
const DESCRIPTION =
  "Practical ways to stop doomscrolling: notice the trigger, add friction, swap the habit, put news on a schedule, and set up your phone and browser.";
const PAGE_URL = "https://focusmode.app/blog/how-to-stop-doomscrolling/";
const PUBLISHED = "2026-11-16";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "./",
    type: "article",
    siteName: "FocusMode",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

const ARTICLE = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  mainEntityOfPage: PAGE_URL,
  image: "https://focusmode.app/og-image.jpg",
  author: { "@type": "Organization", name: "FocusMode", url: "https://focusmode.app" },
  publisher: {
    "@type": "Organization",
    name: "FocusMode",
    logo: { "@type": "ImageObject", url: "https://focusmode.app/focusmode-logo.png" },
  },
};

const SHORT_ANSWER = [
  "Notice the moments you reach for the feed.",
  "Make the feed a little harder to open.",
  "Decide in advance what you'll do instead.",
  "Read the news at set times, not all day.",
];

const PHONE_TIPS = [
  {
    title: "Move the apps off your home screen",
    body: "Put feed apps in a folder on the last page, or remove them from the home screen and open them from search. You can still get there, it just takes a few seconds of intent.",
  },
  {
    title: "Turn off news and social notifications",
    body: "Breaking-news alerts and \"you might like\" pings are the most common way a feed starts. Keep messages from people, turn off the rest.",
  },
  {
    title: "Set app limits",
    body: "On iPhone, Settings > Screen Time > App Limits. On Android, Settings > Digital Wellbeing & parental controls > Dashboard, then set an app timer. Both are easy to override or switch off, so treat the limit as a nudge, not a lock.",
  },
  {
    title: "Try grayscale",
    body: "On iPhone, Settings > Accessibility > Display & Text Size > Color Filters. On many Android phones, Bedtime mode can turn the screen grey. A grey feed is less fun to keep swiping.",
  },
  {
    title: "Charge it outside the bedroom",
    body: "Bed is where a lot of doomscrolling happens, first thing in the morning and last thing at night. A cheap alarm clock and a charger in another room remove the trigger entirely.",
  },
];

const DESKTOP_TIPS = [
  {
    title: "Bookmark the page, not the feed",
    body: "If you need one subreddit or one person's posts, bookmark that address directly. Opening the home page is what starts the scroll.",
  },
  {
    title: "Use the Following tab",
    body: "On X, switch from For You to the Following tab. It shows only accounts you chose, so it runs out much sooner than the algorithmic feed.",
  },
  {
    title: "Log out",
    body: "Logged out, most feeds are generic and less sticky, and signing back in is a small speed bump. Clear the saved password if autofill makes it too easy.",
  },
  {
    title: "Close the tab when you're done",
    body: "A feed left open in a pinned tab is an invitation every time you switch windows. Close it, and let opening it again be a choice.",
  },
];

const RULES: [rule: string, what: string, slug: string, name: string][] = [
  ["youtube.com/shorts/*", "Every Short, the rest of YouTube stays open", "youtube-shorts", "YouTube Shorts"],
  ["*.reddit.com", "All of Reddit, including old and new", "reddit", "Reddit"],
  ["instagram.com/reels/*", "The Reels feed", "instagram", "Instagram"],
  ["x.com", "X, including the For You feed", "x-twitter", "X (Twitter)"],
  ["*.tiktok.com", "TikTok on the web", "tiktok", "TikTok"],
  ["*.facebook.com", "Facebook, including the mobile site", "facebook", "Facebook"],
];

const FAQS = [
  {
    q: "What does doomscrolling mean?",
    a: "Scrolling through bad news or an endless feed for longer than you meant to, usually without enjoying it. The word took off in 2020, but the habit is older than the name.",
  },
  {
    q: "Should I delete social media completely?",
    a: "You can, and some people do well with it. Most people still need some of it for friends, work or groups. Cutting the feed while keeping messages and specific pages is often easier to stick with.",
  },
  {
    q: "Why not just block the sites?",
    a: "A hard block works until you need the site once, then it gets switched off for good. A short pause keeps the site reachable but stops the automatic open, which is the part that turns into an hour.",
  },
];

const h2 = "mt-14 text-[clamp(1.6rem,3.5vw,2.2rem)] leading-tight";
const p = "mt-4 text-lg leading-relaxed text-muted-foreground";
const link = "underline underline-offset-4 hover:text-foreground";

export default function DoomscrollingPost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE) }}
      />
      <main id="main" className="container max-w-3xl py-12 lg:py-20">
        <p className="text-sm text-muted-foreground">
          <time dateTime={PUBLISHED}>16 November 2026</time>
        </p>

        <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.02em]">
          How to stop doomscrolling
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          You open the phone to check the time and 40 minutes later you&apos;re deep in a feed that
          made you feel worse. Willpower alone rarely fixes this, because the scroll starts before
          you&apos;ve decided anything. What works is changing the setup: spotting when it starts,
          making the feed slightly harder to reach, and having something else ready.
        </p>

        <div className="mt-8 rounded-[20px] border border-border bg-card p-6">
          <p className="text-sm font-semibold text-orange-ink">The short answer</p>
          <ol className="mt-3 list-decimal space-y-1 pl-5">
            {SHORT_ANSWER.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>

        <h2 className={h2}>1. Notice when it starts</h2>
        <p className={p}>
          Doomscrolling has triggers, and they are usually boring ones: waiting for a kettle, a
          hard task you don&apos;t want to start, lying in bed, a notification. For a few days,
          each time you catch yourself in a feed, note what you were doing just before. You&apos;ll
          likely find two or three moments that account for most of it. Those are the ones to fix.
        </p>

        <h2 className={h2}>2. Add a little friction</h2>
        <p className={p}>
          Feeds are built to open in one tap and never end. You don&apos;t need to make them
          impossible to reach, just slow enough that you notice you&apos;re reaching. A few seconds
          is often enough to ask &quot;do I actually want this?&quot; Log out, move the app, close
          the tab, or put a pause in front of it. The tips below are all versions of this.
        </p>

        <h2 className={h2}>3. Decide what you&apos;ll do instead</h2>
        <p className={p}>
          Removing a habit leaves a gap, and the feed fills gaps well. Pick a replacement for each
          trigger you found, and phrase it as a plan: &quot;When I get into bed, I read the book on
          the nightstand.&quot; &quot;When I&apos;m stuck on a task, I stand up and get water.&quot;
          Psychologists call these if-then plans, or implementation intentions, and they are one of
          the better-studied ways to follow through on a goal (
          <a
            href="https://doi.org/10.1037/0003-066X.54.7.493"
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            Gollwitzer, 1999
          </a>
          ). Keep the replacement small and within reach.
        </p>

        <h2 className={h2}>4. Put the news on a schedule</h2>
        <p className={p}>
          Staying informed doesn&apos;t mean checking every hour. Most stories look the same at 6pm
          as they did at 11am, often with the early errors corrected. Choose one or two set times a day,
          read from one or two sources you trust, and stop when you&apos;ve read them. A daily
          newsletter or an RSS reader helps, because both have an end. Turn off breaking-news
          alerts; anything truly urgent will reach you anyway.
        </p>

        <h2 className={h2}>On your phone</h2>
        <div className="mt-6 space-y-6">
          {PHONE_TIPS.map((t) => (
            <div key={t.title}>
              <h3 className="text-lg">{t.title}</h3>
              <p className="mt-1 text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </div>

        <h2 className={h2}>On your computer</h2>
        <div className="mt-6 space-y-6">
          {DESKTOP_TIPS.map((t) => (
            <div key={t.title}>
              <h3 className="text-lg">{t.title}</h3>
              <p className="mt-1 text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </div>

        <h2 className={h2}>Where FocusMode fits</h2>
        <p className={p}>
          FocusMode is a browser extension we make for Chrome, Edge, Brave and Arc. It puts a short
          pause in front of the sites you choose instead of a hard block. When you open a feed, the
          page is covered for a few seconds and you choose: take a counted break, or close the tab.
          You can pause only the feed part of a site, have the pause on during work hours, or let a
          site open freely until you&apos;ve used it for a set time each day.
        </p>
        <p className={p}>Rules for the feeds people get stuck in most:</p>
        <div className="mt-6 overflow-x-auto rounded-[20px] border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-card text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Rule</th>
                <th className="px-4 py-3 font-semibold">What it pauses</th>
                <th className="px-4 py-3 font-semibold">Guide</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {RULES.map(([rule, what, slug, name]) => (
                <tr key={rule}>
                  <td className="whitespace-nowrap px-4 py-3">
                    <code>{rule}</code>
                  </td>
                  <td className="px-4 py-3">{what}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {getBlockPage(slug) ? (
                      <Link href={`/block/${slug}/`} className="underline underline-offset-4">
                        {name}
                      </Link>
                    ) : (
                      name
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Free covers one group of rules, which is enough for your worst feeds. No account needed.
        </p>

        <h2 className={h2}>When it&apos;s more than a habit</h2>
        <p className={p}>
          If the scrolling goes with worry or low mood that doesn&apos;t lift when you put the phone
          down, settings won&apos;t fix that on their own. Talking to someone you trust, or a doctor,
          is a reasonable next step.
        </p>

        <h2 className={h2}>Questions</h2>
        <div className="mt-4 divide-y divide-border border-y border-border">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="py-5">
              <h3 className="text-[17px] font-semibold">{q}</h3>
              <p className="mt-1 text-muted-foreground">{a}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-[20px] bg-primary p-8 text-center text-primary-foreground">
          <p className="text-2xl font-semibold">Put a pause before the feed.</p>
          <p className="mt-2 opacity-80">Free forever for one group. Lifetime Pro if you want more.</p>
          <StoreLink
            placement="blog_doomscrolling"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-orange px-7 text-[15px] font-semibold text-orange-foreground transition-colors hover:bg-orange/90"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

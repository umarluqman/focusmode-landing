export type BlockPage = {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  rules: [pattern: string, effect: string][];
  setup: string;
  native: { title: string; body: string }[];
  why: string;
  faqs: { q: string; a: string }[];
  related: string[];
};

export const BLOCK_PAGES: BlockPage[] = [
  {
    slug: "youtube-shorts",
    name: "YouTube Shorts",
    title: "How to Block YouTube Shorts on Desktop (Keep the Rest of YouTube)",
    description:
      "Block YouTube Shorts in Chrome without losing YouTube. One rule, youtube.com/shorts/*, adds a calm pause before Shorts while tutorials and subscriptions stay open.",
    h1: "How to block YouTube Shorts and keep the rest of YouTube",
    intro:
      "YouTube has no switch to turn Shorts off. On desktop you can hide the Shorts shelf for a while, but the Shorts tab, links from search and the endless swipe are still one click away. The fix is a path rule: block youtube.com/shorts/* and leave everything else on YouTube alone, so a tutorial or a channel you follow still opens instantly.",
    rules: [
      ["youtube.com/shorts/*", "Every Short, wherever the link came from"],
      ["*.youtube.com/shorts/*", "Also covers m.youtube.com if you browse the mobile site on desktop"],
      ["youtube.com/feed/*", "Optional: the Subscriptions and History feeds, if those pull you in too"],
    ],
    setup:
      "Open a Short, right-click the page and choose Add to FocusMode Group, then change the rule to youtube.com/shorts/* so it covers every Short, not only this one.",
    native: [
      {
        title: "Hide the Shorts shelf",
        body: "On the YouTube home page, click the X or Not interested on the Shorts shelf. YouTube hides the shelf for about 30 days. The Shorts tab in the sidebar stays, and the shelf comes back.",
      },
      {
        title: "Pause watch history",
        body: "With watch history off, YouTube stops filling the home page with recommendations, which removes most Shorts from it. It also empties the home feed of everything else, and Shorts still play from search and links.",
      },
      {
        title: "Block the path with a Chrome policy",
        body: "Chrome's URLBlocklist policy accepts paths such as youtube.com/shorts. It is meant for managed computers: you set it in the registry on Windows or a configuration profile on macOS, and Chrome shows a hard error page you can't get past without undoing the policy.",
      },
    ],
    why: "Shorts are built for the next swipe, so a hard block mostly teaches you to look for a way around it. A three-second pause before the first Short breaks the autoplay loop at the moment it starts. If you really meant to watch one, take a counted break; if not, close the tab and keep your streak.",
    faqs: [
      {
        q: "Will this block normal YouTube videos?",
        a: "No. The rule youtube.com/shorts/* only matches addresses that start with /shorts/. Regular videos live at /watch, so they open as usual.",
      },
      {
        q: "Does it work in Firefox, Edge, Brave or Arc?",
        a: "Yes. FocusMode installs from the Chrome Web Store, so it works in Chrome and in Chromium browsers that use the store, including Edge, Brave and Arc. Firefox has its own version on Firefox Add-ons.",
      },
      {
        q: "Can I allow Shorts for an hour a day?",
        a: "Yes. Set the group's trigger to a daily time limit. Shorts stay open until you've used them for that long, then the pause comes in.",
      },
    ],
    related: ["youtube", "instagram", "reddit"],
  },
  {
    slug: "youtube",
    name: "YouTube",
    title: "How to Block YouTube on Chrome (Without Locking Yourself Out)",
    description:
      "Block YouTube on Chrome during work hours, after a daily limit, or with a pause before every visit. Free extension, schedules, path rules and strict mode.",
    h1: "How to block YouTube on Chrome",
    intro:
      "YouTube is hard to block cleanly because you need some of it: a tutorial for work, a lecture for class, music while you write. Blocking the whole domain works for a day, then gets switched off. A better setup decides when YouTube is open, how long for, and which parts of it pull you in.",
    rules: [
      ["youtube.com", "All of YouTube, including www.youtube.com"],
      ["*.youtube.com", "Also m.youtube.com and music.youtube.com"],
      ["youtube.com/shorts/*", "Only Shorts, if the rest of YouTube is fine"],
      ["!youtube.com/playlist*", "Lets your playlists through while the rest is paused"],
    ],
    setup:
      "Open the FocusMode popup, create a group called YouTube and add youtube.com. Or right-click any YouTube page and choose Add to FocusMode Group.",
    native: [
      {
        title: "Edit your hosts file",
        body: "Add 0.0.0.0 youtube.com and 0.0.0.0 www.youtube.com to the hosts file (/etc/hosts on macOS, C:\\Windows\\System32\\drivers\\etc\\hosts on Windows). It blocks YouTube in every browser, needs admin rights, and is all or nothing: no schedules, no exceptions.",
      },
      {
        title: "Use a Chrome policy",
        body: "Chrome's URLBlocklist policy can block youtube.com for a profile. It's built for managed computers and shows a hard error page, so you'll be undoing it in the registry or a configuration profile when you do need a video.",
      },
      {
        title: "Turn on break reminders",
        body: "YouTube's own Remind me to take a break setting nudges you after a set time. It's a notification you can dismiss, not a block.",
      },
    ],
    why: "Most people don't need YouTube gone; they need it to stop being the default tab. Put it on a schedule (say, blocked Monday to Friday from 9:00 to 17:30), or give it a daily time limit, and let FocusMode pause the page instead of hiding it. When you need a video for work, take a counted break and the pause steps aside.",
    faqs: [
      {
        q: "Can I block YouTube only during work hours?",
        a: "Yes. Give the group a schedule, for example weekdays 9:00 to 17:30. Outside those hours YouTube opens normally.",
      },
      {
        q: "Can I still watch one video I need?",
        a: "Yes. Take a break from the pause screen. Breaks are counted per day, and you can set how many each group allows. Strict mode turns breaks off when you really mean it.",
      },
      {
        q: "Does it block the YouTube app on my phone?",
        a: "No. FocusMode is a desktop browser extension for Chrome, Edge, Brave and Arc.",
      },
    ],
    related: ["youtube-shorts", "reddit", "instagram"],
  },
  {
    slug: "reddit",
    name: "Reddit",
    title: "How to Block Reddit (or Just r/all) on Chrome",
    description:
      "Block Reddit on Chrome, or only the feeds that eat your time. Keep the one subreddit you need, pause the rest, add a daily limit. Free extension.",
    h1: "How to block Reddit on Chrome",
    intro:
      "Reddit is a rabbit hole with useful answers at the bottom. Search sends you there for a fix, and twenty minutes later you're in a thread about something else. You can block Reddit completely, but it often works better to pause the feeds and keep the pages you actually need.",
    rules: [
      ["*.reddit.com", "All of Reddit, including www, old and new"],
      ["!*reddit.com/r/*/comments/*", "Lets single threads through, so answers from Google still open"],
      ["*.reddit.com/r/all*", "Only r/all, if that's where the scrolling starts"],
      ["*.reddit.com/r/popular*", "Only r/popular"],
    ],
    setup:
      "Create a group called Reddit and add *.reddit.com. To keep answers from search, add !*reddit.com/r/*/comments/* below it: lines starting with ! are let through.",
    native: [
      {
        title: "Turn off home feed recommendations",
        body: "Reddit's settings let you turn off recommended posts in your home feed and mute communities you keep falling into. It shrinks the feed but doesn't stop you from opening it.",
      },
      {
        title: "Edit your hosts file",
        body: "Adding 0.0.0.0 www.reddit.com (and old.reddit.com) to the hosts file blocks Reddit in every browser. It also blocks the thread you needed from a Google result, and there's no schedule.",
      },
    ],
    why: "Reddit pulls you in through the feed, not the single thread. Pausing the feed while letting threads through keeps Reddit useful as a search result and takes away the scroll. Add a daily time limit if you want some browsing, and let the pause handle the rest.",
    faqs: [
      {
        q: "Will this block old.reddit.com?",
        a: "Yes, if you use *.reddit.com. The *. covers every subdomain, including old, new and www.",
      },
      {
        q: "Can I block Reddit but allow one subreddit?",
        a: "Yes. Add an exception line such as !*.reddit.com/r/learnprogramming* below *.reddit.com. Exceptions always win.",
      },
      {
        q: "Does this need a Reddit account?",
        a: "No. FocusMode works on the address of the page, in your browser. It doesn't touch your Reddit account.",
      },
    ],
    related: ["youtube", "instagram", "youtube-shorts"],
  },
  {
    slug: "instagram",
    name: "Instagram",
    title: "How to Block Instagram and Reels on Desktop (Chrome)",
    description:
      "Block Instagram on your computer, or only Reels and Explore. Keep DMs open, pause the feed, set a daily limit. Free Chrome extension.",
    h1: "How to block Instagram on your computer",
    intro:
      "On a computer, Instagram has no daily limit and no way to hide Reels. If you mostly open it for messages, blocking the whole site is overkill. Pause the parts built for scrolling (Reels, Explore, the feed) and leave your inbox alone.",
    rules: [
      ["instagram.com", "All of Instagram on the web"],
      ["instagram.com/reels/*", "The Reels feed"],
      ["instagram.com/reel/*", "Single Reels opened from links or DMs"],
      ["instagram.com/explore/*", "Explore"],
      ["!instagram.com/direct/*", "Keeps DMs open when you block the whole site"],
    ],
    setup:
      "Create a group called Instagram and add instagram.com/reels/*, instagram.com/reel/* and instagram.com/explore/*. To pause the whole site but keep messages, use instagram.com with !instagram.com/direct/* below it.",
    native: [
      {
        title: "Use the app's time limits",
        body: "The Instagram mobile app has daily time reminders and Quiet mode. They don't apply to instagram.com in a desktop browser.",
      },
      {
        title: "Edit your hosts file",
        body: "Adding 0.0.0.0 www.instagram.com to the hosts file blocks Instagram in every browser, DMs included. There's no way to block only Reels this way.",
      },
    ],
    why: "Reels on desktop are the same infinite feed as on your phone, without the phone's time limits. A pause before Reels and Explore catches the reflex, while DMs stay one click away. If you check in once a day on purpose, a daily limit covers that without a fight.",
    faqs: [
      {
        q: "Can I block Reels but keep my DMs?",
        a: "Yes. Block instagram.com/reels/*, instagram.com/reel/* and instagram.com/explore/*. Your inbox at instagram.com/direct stays open.",
      },
      {
        q: "Does this block Instagram on my phone?",
        a: "No. FocusMode is a desktop browser extension. On your phone, use Instagram's own time reminders or your phone's screen time settings.",
      },
      {
        q: "What happens when I open a blocked page?",
        a: "FocusMode puts a pause over the page: a short animation, a hold-to-continue button or a breathing exercise, depending on what you choose. Then you decide to go on or close the tab.",
      },
    ],
    related: ["youtube-shorts", "reddit", "youtube"],
  },
];

export const getBlockPage = (slug: string) => BLOCK_PAGES.find((p) => p.slug === slug);

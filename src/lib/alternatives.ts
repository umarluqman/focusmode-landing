export type Blocker = {
  name: string;
  url: string;
  runsOn: string;
  blocks: string;
  style: string;
  pricing: string;
  bestFor: string;
  slug?: string;
};

export const BLOCKERS: Blocker[] = [
  {
    name: "focusmode",
    url: "https://focusmode.app/",
    runsOn: "Chrome, Edge, Brave, Arc (desktop)",
    blocks: "Websites and paths",
    style: "A short pause you choose from 7 types; strict mode for a hard stop",
    pricing: "Free for 1 group; Pro is a one-time payment",
    bestFor:
      "People who want fewer reflex visits without locking themselves out. Groups with their own schedule or daily limit, path rules like youtube.com/shorts/*, counted breaks, and everything stored in your browser.",
  },
  {
    name: "BlockSite",
    slug: "blocksite",
    url: "https://blocksite.co/",
    runsOn: "Chrome, Edge, Safari, iOS, Android",
    blocks: "Websites, and apps on phone",
    style: "Block page or redirect, password protection",
    pricing: "Free version; paid Premium",
    bestFor:
      "Blocking the same list on your computer and your phone. It also has keyword blocking, an adult-content filter, a Pomodoro-style focus mode and uninstall prevention.",
  },
  {
    name: "StayFocusd",
    slug: "stayfocusd",
    url: "https://chromewebstore.google.com/detail/laankejkbhbdhmipfmgcngdelahlfoji",
    runsOn: "Chrome",
    blocks: "Websites, paths and page elements",
    style: "Daily time allowance, then blocked; Nuclear Option",
    pricing: "Free to install",
    bestFor:
      "A daily time budget for time-wasting sites, plus the Nuclear Option: a block for a set number of hours that can't be cancelled. It can also hide parts of pages, such as Shorts or comments on YouTube.",
  },
  {
    name: "LeechBlock NG",
    url: "https://www.proginosko.com/leechblock/",
    runsOn: "Firefox, Chrome, Edge and other Chromium browsers",
    blocks: "Websites, paths and keywords",
    style: "Block sets with time periods and limits; optional countdown delay",
    pricing: "Free",
    bestFor:
      "Fine control at no cost. Up to 30 block sets, each with its own hours and limits, plus lockdown, keyword rules and a password or random access code on the options page. Also the obvious pick if you live in Firefox.",
  },
  {
    name: "Cold Turkey Blocker",
    url: "https://getcoldturkey.com/",
    runsOn: "Windows, macOS",
    blocks: "Websites and desktop apps",
    style: "Hard blocks you can lock",
    pricing: "Free version; Pro is a one-time payment",
    bestFor:
      "A block you really can't undo. It runs as a desktop app, so it can block programs and games as well as sites in every supported browser, with locks and uninstall prevention.",
  },
  {
    name: "Freedom",
    url: "https://freedom.to/",
    runsOn: "macOS, Windows, iOS, Android, ChromeOS, Linux",
    blocks: "Websites and apps",
    style: "Blocking sessions synced across devices",
    pricing: "Free plan (sessions under 2 hours); Premium is a subscription or a one-time Forever plan",
    bestFor:
      "One session that blocks the same things on your laptop and phone at once. Scheduled and recurring sessions and Locked Mode are part of Premium.",
  },
  {
    name: "one sec",
    url: "https://one-sec.app/",
    runsOn: "iOS, Android, browser extension",
    blocks: "Apps and websites",
    style: "A breath or small task before an app opens",
    pricing: "Free essentials; paid Premium",
    bestFor:
      "The same idea as focusmode, a pause instead of a wall, but built phone first. If your scrolling happens mostly on your phone, start here.",
  },
  {
    name: "Opal",
    url: "https://opalapp.com/",
    runsOn: "iPhone, Mac, Android",
    blocks: "Apps",
    style: "Focus timer and rules; Hard Mode",
    pricing: "Free trial; Opal Pro is paid",
    bestFor:
      "Screen time on your phone, with a focus timer, app rules and a daily score. It's an app blocker more than a browser tool.",
  },
  {
    name: "Mindful Browsing",
    url: "https://www.mindfulbrowsing.org/",
    runsOn: "Chrome",
    blocks: "Websites",
    style: "A calm photo that asks if you want to go on",
    pricing: "Free, open source",
    bestFor:
      "A light, gentle nudge on a short list of sites, with no settings to learn. It says it doesn't track any of your activity.",
  },
];

export type AlternativePage = {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  theyDoWell: { title: string; body: string }[];
  rows: [feature: string, them: string, focusmode: string][];
  differs: { title: string; body: string }[];
  stayIf: string;
  move: string[];
  faqs: { q: string; a: string }[];
};

export const ALTERNATIVE_PAGES: AlternativePage[] = [
  {
    slug: "blocksite",
    name: "BlockSite",
    title: "BlockSite Alternative for Chrome: Pause Sites, Pay Once",
    description:
      "A BlockSite alternative for Chrome: focusmode pauses distracting sites instead of walling them off. No account, data stays local, Pro is paid once.",
    h1: "A BlockSite alternative that pauses instead of walls",
    intro:
      "BlockSite is one of the best known blockers on the Chrome Web Store, and it does a lot: phone apps, sync, redirects, keyword and adult-content blocking. focusmode is narrower. It lives in your desktop browser, keeps everything on your device, and puts a short pause in front of a site instead of a block page. Here's how they compare, including where BlockSite is the better pick.",
    theyDoWell: [
      {
        title: "Your phone too",
        body: "BlockSite has iOS and Android apps and can sync blocked sites, keywords and password protection between them and the extension. focusmode only runs in desktop browsers.",
      },
      {
        title: "Keyword and adult-content blocking",
        body: "BlockSite can block pages by keyword and has a built-in adult-content filter. focusmode has no content filter; it works on the addresses you list.",
      },
      {
        title: "Password and uninstall prevention",
        body: "BlockSite can protect its settings with a password and try to stop the extension being removed. focusmode 3 has strict mode but no password lock yet.",
      },
      {
        title: "Redirects and Pomodoro",
        body: "BlockSite can send you to another site, such as your email, when you open a blocked one, and has a Pomodoro-style focus mode.",
      },
    ],
    rows: [
      ["Runs on", "Chrome, Edge, Safari, iOS, Android", "Chrome, Edge, Brave, Arc on desktop"],
      ["What you see on a blocked site", "Block page (customisable) or a redirect", "One of 7 pauses: shader, hold, slide, breathing and more"],
      ["Block part of a site", "Yes", "Yes, with path rules and ! exceptions"],
      ["Schedules and daily limits", "Yes", "Yes, per group"],
      ["Keyword / adult filter", "Yes", "No"],
      ["Lock settings", "Password, uninstall prevention", "Strict mode, 1 to 15 minutes"],
      ["Your browsing data", "Handles web history (CWS disclosure)", "Stays in your browser"],
      ["Paid plan", "Premium", "Pro, one-time payment"],
    ],
    differs: [
      {
        title: "A pause, not a punishment",
        body: "A block page tells you no. A pause asks if you meant it. focusmode covers the site with a live animation, a hold-to-continue button or a breathing exercise, then lets you go on or close the tab. Most visits to a time-sink are a reflex, and a few seconds is enough to catch it.",
      },
      {
        title: "Groups with their own rules",
        body: "Put work-hour sites in one group with a schedule, news in another with a 15-minute daily limit, and Shorts in a third that's always paused. Each group has its own trigger, pause and number of breaks. The free version has one group; Pro unlocks more.",
      },
      {
        title: "Local-first, no account",
        body: "Your sites, groups and stats live in your browser's storage. Nothing about your browsing is sent to us. If you buy Pro, the extension sends your license key, a random install ID and your browser's name to check the key, and nothing else.",
      },
      {
        title: "Pay once",
        body: "The free version covers one group with schedules, limits and strict mode. Pro is a one-time payment for more groups, the breathing pause and the full shader gallery. Nothing renews.",
      },
    ],
    stayIf:
      "you want the same blocks on your phone, keyword or adult-content filtering, or a password on your settings. focusmode is a desktop browser extension and has none of those.",
    move: [
      "Open BlockSite's settings and copy the sites in your block list.",
      "Install focusmode, open its popup and create a group.",
      "Paste the sites into the group, one per line, without https://. Add *. in front of a domain to cover its subdomains, or a path such as youtube.com/shorts/* to block only part of a site.",
      "Pick when the group is on: always, on a schedule, or after a daily limit. Then pick the pause.",
      "Once focusmode is set up, turn BlockSite off or remove it, so the two don't both react to the same page.",
    ],
    faqs: [
      {
        q: "Is focusmode free like BlockSite?",
        a: "Yes, the free version has one focus group with schedules, daily limits, strict mode and 6 of the 7 pauses. Pro adds unlimited groups and is a one-time payment, not a subscription.",
      },
      {
        q: "Can focusmode block apps on my phone?",
        a: "No. focusmode is a desktop browser extension. If you need the same blocks on your phone, BlockSite, Freedom or one sec cover that.",
      },
      {
        q: "Can I redirect a blocked site to another page?",
        a: "Not in focusmode. When you open a paused site you see the pause, then choose to go on or close the tab.",
      },
      {
        q: "Can I import my BlockSite list?",
        a: "There's no direct import. Copy the sites from BlockSite and paste them into a focusmode group, one per line. It takes a minute for most lists.",
      },
    ],
  },
  {
    slug: "stayfocusd",
    name: "StayFocusd",
    title: "StayFocusd Alternative: Schedules, Limits and a Pause in Chrome",
    description:
      "A StayFocusd alternative for Chrome: groups with their own schedule or daily limit, a short pause instead of a block page, data kept on your device.",
    h1: "A StayFocusd alternative with groups and a gentler stop",
    intro:
      "StayFocusd made the daily time allowance famous: a budget for time-wasting sites, then they're gone until tomorrow. focusmode has daily limits too, but splits your sites into groups that each get their own rule, and when a limit runs out it shows a short pause instead of a block page. If what you want is a budget and a block you can't cancel, StayFocusd still does that well.",
    theyDoWell: [
      {
        title: "The Nuclear Option",
        body: "StayFocusd can block sites for a number of hours you choose, and once it's on it can't be cancelled. focusmode's strict mode goes up to 15 minutes at a time.",
      },
      {
        title: "Require Challenge",
        body: "To change settings in StayFocusd you first complete a tedious task, which takes the edge off the urge to switch it off.",
      },
      {
        title: "Hiding parts of a page",
        body: "StayFocusd can block in-page content and hide things like Shorts, comments and recommended videos on YouTube. focusmode works on addresses: it can pause youtube.com/shorts/*, but it doesn't hide elements on a page you've let through.",
      },
      {
        title: "Android and AI chat usage",
        body: "StayFocusd can connect Android devices to show app and website usage in one place, and track time on AI chat sites.",
      },
    ],
    rows: [
      ["Runs on", "Chrome", "Chrome, Edge, Brave, Arc on desktop"],
      ["Daily time limit", "Daily allowance for blocked sites", "A limit per group"],
      ["Schedules", "Active days and hours", "Per group schedules"],
      ["What happens at the limit", "Site is blocked", "One of 7 pauses, with counted breaks"],
      ["Can't-cancel block", "Nuclear Option, hours", "Strict mode, 1 to 15 minutes"],
      ["Lock settings", "Require Challenge", "Strict mode locks groups while it runs"],
      ["Hide page elements", "Yes (Shorts, comments, more)", "No, rules work on addresses"],
      ["Your browsing data", "Handles web history, user activity, website content (CWS disclosure)", "Stays in your browser"],
      ["Price", "Free to install", "Free for 1 group; Pro one-time"],
    ],
    differs: [
      {
        title: "A limit per group",
        body: "Give news 15 minutes a day, keep YouTube closed during work hours, and let Reddit through only in the evening. Each group in focusmode has its own trigger: always on, a schedule, or a daily limit. More than one group needs Pro.",
      },
      {
        title: "A pause at the limit",
        body: "When a limit runs out, focusmode covers the page with a short pause: a live shader, an animated texture, hold to continue, slide, pixels, an instant stop or a breathing exercise (Pro). If you really need the page, take a break. Breaks are counted per day, and the pause can get longer once you go over.",
      },
      {
        title: "Strict mode when you need a wall",
        body: "Turn on strict mode for 1, 5, 10 or 15 minutes and every active group blocks straight away, with no breaks and no editing until the time is up.",
      },
      {
        title: "Your browsing stays in your browser",
        body: "Time per site is counted on your device and stays there. focusmode has no analytics SDK and no trackers, and you don't need an account.",
      },
    ],
    stayIf:
      "you want a lock that lasts hours, or you want to hide Shorts and comments on pages you still use. focusmode's strict mode tops out at 15 minutes, and its rules work on whole addresses.",
    move: [
      "Open StayFocusd's settings and copy your blocked sites.",
      "Install focusmode and create a group. With Pro you can make one for each kind of site you treat differently, for example Social and News.",
      "Paste the sites into a group, one per line, without https://. Put ! in front of an address you want let through, such as one subreddit or a docs page.",
      "Set the group's trigger to a daily limit and pick the number of minutes. Add a schedule to another group if some sites should only close during work hours.",
      "Turn StayFocusd off once focusmode is running, so only one extension reacts to each page.",
    ],
    faqs: [
      {
        q: "Does focusmode have something like the Nuclear Option?",
        a: "Strict mode is the closest: up to 15 minutes where every active group blocks, breaks are off and nothing can be edited. There's no multi-hour lock.",
      },
      {
        q: "Can I set a daily time limit like StayFocusd?",
        a: "Yes. Set a group's trigger to a daily limit. Sites in that group open freely until you've used them for that long, then the pause comes in.",
      },
      {
        q: "Can I block just YouTube Shorts?",
        a: "Yes. Add youtube.com/shorts/* to a group. Regular videos at /watch stay open.",
      },
      {
        q: "Is focusmode free?",
        a: "The free version has one group with schedules, daily limits and strict mode. Pro, for unlimited groups, the breathing pause and every shader, is a one-time payment.",
      },
    ],
  },
];

export const getAlternativePage = (slug: string) =>
  ALTERNATIVE_PAGES.find((p) => p.slug === slug);

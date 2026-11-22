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
    slug: "leechblock",
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
    slug: "cold-turkey",
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
    slug: "freedom",
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
    slug: "one-sec",
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
  {
    slug: "freedom",
    name: "Freedom",
    title: "Freedom Alternative for Chrome: No Subscription, No Account",
    description:
      "A Freedom alternative for Chrome: focusmode pauses distracting sites in your browser. No account, schedules in the free version, Pro is paid once.",
    h1: "A Freedom alternative that lives in your browser",
    intro:
      "Freedom is built around one idea: start a session and the same sites and apps are blocked on your laptop and your phone at once. focusmode is much smaller. It's a browser extension for your computer, with no account and nothing to install outside the browser, and it shows a short pause instead of a block screen. If your distractions follow you from device to device, Freedom is the better pick. If they mostly happen in Chrome, read on.",
    theyDoWell: [
      {
        title: "Every device at once",
        body: "Freedom runs on macOS, Windows, iOS, Android and ChromeOS, and a session you start on one device applies to the others. Syncing is part of the free plan. focusmode only runs in desktop browsers.",
      },
      {
        title: "Apps and the whole internet",
        body: "Freedom can block desktop and phone apps as well as websites, or cut off the internet entirely for a session. focusmode works on website addresses only.",
      },
      {
        title: "Locked Mode",
        body: "With Premium, Locked Mode stops you ending a session early. focusmode's strict mode does something similar, but only for up to 15 minutes at a time.",
      },
      {
        title: "Scheduled and recurring sessions",
        body: "Premium lets you plan sessions ahead and repeat them through the week, across all your devices. Freedom also includes focus music and ambient sound.",
      },
    ],
    rows: [
      ["Runs on", "macOS, Windows, iOS, Android, ChromeOS; Linux through the browser extension", "Chrome, Edge, Brave, Arc on desktop"],
      ["In Chrome", "Extension pairs with the desktop app on Mac and Windows", "Extension only, nothing else to install"],
      ["Blocks apps", "Yes, on Mac, Windows, iOS and Android", "No, websites and paths only"],
      ["What you see on a blocked site", "Freedom's green screen", "One of 7 pauses: shader, hold, slide, breathing and more"],
      ["Schedules", "Premium", "Free, per group"],
      ["Can't-cancel block", "Locked Mode (Premium)", "Strict mode, 1 to 15 minutes"],
      ["Sync across devices", "Yes", "No"],
      ["Account", "Needed", "None"],
      ["Your browsing data", "Handles authentication information (CWS disclosure)", "Stays in your browser"],
      ["Free version", "Sessions under 2 hours", "1 group with schedules, limits and strict mode"],
      ["Paid plan", "Monthly or yearly subscription, or a one-time Forever plan", "Pro, one-time payment"],
    ],
    differs: [
      {
        title: "A pause, not a session",
        body: "Freedom works in sessions: while one runs, the site is gone. focusmode is on in the background and steps in when you open a site in one of your groups. It covers the page with a live animation, a hold-to-continue button or a breathing exercise, then lets you go on or close the tab.",
      },
      {
        title: "Nothing outside the browser",
        body: "focusmode is a single extension. There's no desktop app, no sign-up and no login. Install it, add a group and it works.",
      },
      {
        title: "Groups with their own rules",
        body: "Put work-hour sites in one group with a schedule, news in another with a 15-minute daily limit, and youtube.com/shorts/* in a third that's always paused. Schedules and daily limits are in the free version, which has one group; Pro unlocks more.",
      },
      {
        title: "Pay once, keep your data",
        body: "Pro is a one-time payment and nothing renews. Your sites, groups and stats live in your browser's storage. If you buy Pro, the extension sends your license key, a random install ID and your browser's name to check the key, and nothing else.",
      },
    ],
    stayIf:
      "you want one session to cover your phone and your computer, you need to block apps or the whole internet, or you want a lock that lasts for hours. focusmode is a desktop browser extension and does none of those.",
    move: [
      "Open your blocklists in Freedom and copy the sites you added yourself.",
      "Install focusmode, open its popup and create a group.",
      "Paste the sites into the group, one per line, without https://. Add *. in front of a domain to cover its subdomains, or a path such as youtube.com/shorts/* to pause only part of a site.",
      "If you used scheduled sessions, set the group's trigger to a schedule with the same days and hours. Then pick the pause.",
      "Keep Freedom for your phone if you like. On your computer, leave those sites out of your Freedom sessions so the two don't both react to the same page.",
    ],
    faqs: [
      {
        q: "Is focusmode a subscription like Freedom Premium?",
        a: "No. The free version has one group with schedules, daily limits and strict mode. Pro, for unlimited groups, the breathing pause and every shader, is a one-time payment.",
      },
      {
        q: "Does focusmode sync with my phone?",
        a: "No. focusmode runs in desktop browsers and keeps its data in each browser. If you need the same block on your phone, Freedom does that well.",
      },
      {
        q: "Can focusmode block apps or the whole internet?",
        a: "It can't block apps. For the web, an allow-only group pauses every site except the ones you list, which is close to blocking the internet with exceptions.",
      },
      {
        q: "Does focusmode have a Locked Mode?",
        a: "Strict mode is the closest: for 1, 5, 10 or 15 minutes every active group blocks, breaks are off and nothing can be edited. There's no multi-hour lock.",
      },
    ],
  },
  {
    slug: "cold-turkey",
    name: "Cold Turkey",
    title: "Cold Turkey Alternative for Chrome: A Pause, Not a Lock",
    description:
      "A Cold Turkey alternative for Chrome: focusmode is a browser extension that pauses distracting sites instead of locking them. Free schedules and limits.",
    h1: "A Cold Turkey alternative for when a lock is too much",
    intro:
      "Cold Turkey Blocker is the strict one. It's a desktop app for Windows and macOS that blocks sites, apps and even the whole computer, and once you lock a block it's built to be almost impossible to undo. focusmode sits at the other end: a browser extension that puts a short pause in front of a site and leaves the decision with you. If you need a block you truly can't get around, Cold Turkey is the better tool. If a lock that hard gets in your way, here's the gentler option.",
    theyDoWell: [
      {
        title: "Locks that hold",
        body: "A Cold Turkey block can be locked with a timer, a string of random text to type, a time range, a restart or, in Pro, a password. While a block is locked the app can't be uninstalled. focusmode's strict mode lasts up to 15 minutes, and like any extension it can be removed from the browser.",
      },
      {
        title: "Apps, games and every browser",
        body: "Because it runs on the computer, Cold Turkey Pro can block applications as well as sites, and one block covers every supported browser. focusmode works inside the browser you install it in.",
      },
      {
        title: "Breaks and allowances",
        body: "Pro blocks can follow a Pomodoro rhythm or give you an allowance of minutes on blocked sites. It can also schedule blocks through the week.",
      },
      {
        title: "Local and paid once",
        body: "Settings and statistics are stored on your computer and not collected, and Pro is a one-time purchase. focusmode works the same way on both counts.",
      },
    ],
    rows: [
      ["Runs on", "Windows, macOS (desktop app plus browser extensions)", "Chrome, Edge, Brave, Arc on desktop"],
      ["Install", "Desktop app, needs admin rights", "Browser extension"],
      ["Blocks apps", "Yes (Pro)", "No, websites and paths only"],
      ["What you see on a blocked site", "Block page", "One of 7 pauses: shader, hold, slide, breathing and more"],
      ["Block part of a site", "Yes, with wildcards", "Yes, with path rules and ! exceptions"],
      ["Schedules", "Pro", "Free, per group"],
      ["Time allowance", "Pro", "Free, a daily limit per group"],
      ["Lock", "Timer, random text, time range, restart, password", "Strict mode, 1 to 15 minutes"],
      ["Uninstall prevention", "Yes, while a block is locked", "No"],
      ["Your browsing data", "Stored on your computer", "Stays in your browser"],
      ["Price", "Free version; Pro one-time", "Free for 1 group; Pro one-time"],
    ],
    differs: [
      {
        title: "A pause you can walk through",
        body: "Cold Turkey takes the choice away, which is the point of it. focusmode keeps the choice and slows it down. It covers the site with a live animation, a hold-to-continue button or a breathing exercise, then lets you go on or close the tab. Most visits to a time-sink are a reflex, and a few seconds is enough to catch it.",
      },
      {
        title: "Breaks that are counted",
        body: "If you really need the page, take a break. Breaks are counted per day, and the pause can get longer once you go over. You're never locked out of something you need for work.",
      },
      {
        title: "Schedules and limits in the free version",
        body: "focusmode's free version has one group with a schedule or a daily limit, plus strict mode. Pro adds more groups, the breathing pause and the full shader gallery.",
      },
      {
        title: "Just an extension",
        body: "There's no desktop app and no admin password to enter. focusmode installs from the Chrome Web Store and keeps everything in your browser's storage.",
      },
    ],
    stayIf:
      "you know you'll talk yourself past anything softer than a lock, or you need to block apps, games or every browser on the computer at once. focusmode can be removed like any extension, and its strict mode tops out at 15 minutes.",
    move: [
      "Open the block you use in Cold Turkey Blocker and copy the sites from its list.",
      "Install focusmode, open its popup and create a group.",
      "Paste the sites into the group, one per line, without https://. Add *. in front of a domain to cover its subdomains, and put ! in front of an address you want let through.",
      "Pick when the group is on: always, on a schedule, or after a daily limit. Then pick the pause.",
      "Take those sites out of your Cold Turkey block once it's unlocked, or keep Cold Turkey for apps and games only, so the two don't both react to the same page.",
    ],
    faqs: [
      {
        q: "Is focusmode as strict as Cold Turkey?",
        a: "No, and it isn't trying to be. focusmode shows a pause and lets you choose. Strict mode gives you a hard stop for up to 15 minutes, but there's no multi-hour lock and no uninstall prevention.",
      },
      {
        q: "Can focusmode block apps or games?",
        a: "No. focusmode is a browser extension and works on website addresses. For desktop apps, Cold Turkey or Freedom cover that.",
      },
      {
        q: "Can I use focusmode and Cold Turkey together?",
        a: "Yes. Some people keep Cold Turkey for apps and a few sites they want fully locked, and use focusmode for the sites they only want to slow down. Don't put the same site in both.",
      },
      {
        q: "Is focusmode a one-time purchase too?",
        a: "Yes. The free version has one group with schedules, daily limits and strict mode. Pro is a one-time payment, not a subscription.",
      },
    ],
  },
  {
    slug: "leechblock",
    name: "LeechBlock NG",
    title: "LeechBlock Alternative for Chrome: Simple Groups and a Pause",
    description:
      "A LeechBlock alternative for Chrome: focusmode has fewer settings, groups with a schedule or daily limit, and a short pause instead of a block page.",
    h1: "A LeechBlock alternative with less to set up",
    intro:
      "LeechBlock NG is free, open source and one of the most configurable blockers there is: up to 30 block sets, each with its own hours, limits and options. It asks you to spend some time in its settings to get there. focusmode does less and tries to make it quick: a group, a trigger and a pause you pick from seven. If you enjoy fine control, or you use Firefox, LeechBlock is hard to beat. If you want something set up in a minute, here's how focusmode compares.",
    theyDoWell: [
      {
        title: "Free, with 30 block sets",
        body: "LeechBlock NG costs nothing and gives you up to 30 sets of sites, each with its own days and times. focusmode's free version has one group; more need Pro.",
      },
      {
        title: "Fine-grained rules",
        body: "Each set can block during fixed hours, after a time limit such as 10 minutes in every hour, or both together. It supports wildcards, exceptions and blocking or allowing pages by keyword. focusmode has no keyword rules.",
      },
      {
        title: "Firefox",
        body: "LeechBlock NG runs on Firefox as well as Chrome, Edge, Brave, Opera and Vivaldi. focusmode is on Chromium browsers only for now.",
      },
      {
        title: "Lockdown and access control",
        body: "Lockdown blocks your sites straight away for a length of time you choose. The options page can be protected with a password or a random access code, and a set can show a countdown before a page loads instead of blocking it.",
      },
    ],
    rows: [
      ["Runs on", "Firefox, Chrome, Edge, Brave, Opera, Vivaldi", "Chrome, Edge, Brave, Arc on desktop"],
      ["Groups of sites", "Up to 30 block sets, free", "1 group free; unlimited with Pro"],
      ["Schedules", "Time periods per set", "Per group schedules"],
      ["Time limits", "Per set, combinable with time periods", "A daily limit per group"],
      ["What you see on a blocked site", "Block page, or a countdown delay", "One of 7 pauses: shader, hold, slide, breathing and more"],
      ["Block part of a site", "Yes, with wildcards and exceptions", "Yes, with path rules and ! exceptions"],
      ["Keyword rules", "Yes", "No"],
      ["Block right now", "Lockdown, for as long as you choose", "Strict mode, 1 to 15 minutes"],
      ["Lock settings", "Password or random access code", "Strict mode locks groups while it runs"],
      ["Your browsing data", "Developer declares no data collected (CWS disclosure)", "Stays in your browser"],
      ["Price", "Free, open source", "Free for 1 group; Pro one-time"],
    ],
    differs: [
      {
        title: "Set up in a minute",
        body: "LeechBlock's options are thorough, and there are a lot of them. In focusmode you name a group, paste your sites, choose always, a schedule or a daily limit, and pick a pause. That's the whole setup.",
      },
      {
        title: "A pause made to be felt",
        body: "LeechBlock can delay a page with a countdown. focusmode builds on the same idea with seven kinds of pause: a live shader, an animated texture, hold to continue, slide, pixels, an instant stop or a breathing exercise (Pro). Then you go on or close the tab.",
      },
      {
        title: "Breaks that are counted",
        body: "If you need a paused site, take a break. Breaks are counted per day, and the pause can get longer once you go over, so the nudge grows with the habit.",
      },
      {
        title: "Same privacy, different price",
        body: "Both extensions keep your data on your device. LeechBlock is free and open source. focusmode is free for one group, and Pro is a one-time payment for more groups, the breathing pause and the full shader gallery.",
      },
    ],
    stayIf:
      "you use Firefox, you want many block sets without paying, or you rely on keyword rules, hours-long lockdowns or a password on the options page. focusmode has none of those.",
    move: [
      "Open LeechBlock's options and copy the sites from the block set you use most.",
      "Install focusmode, open its popup and create a group.",
      "Paste the sites into the group, one per line, without https://. LeechBlock exceptions start with +; in focusmode put ! in front of the address instead. Wildcards such as *.example.com work the same way.",
      "Match the set's rule: a schedule for its time periods, or a daily limit for its time limit. Then pick the pause.",
      "Turn that block set off in LeechBlock, or disable the extension, so only one of them reacts to each page.",
    ],
    faqs: [
      {
        q: "Is focusmode free like LeechBlock?",
        a: "Partly. The free version has one focus group with schedules, daily limits, strict mode and 6 of the 7 pauses. LeechBlock gives you up to 30 sets for free. focusmode Pro adds unlimited groups and is a one-time payment.",
      },
      {
        q: "Does focusmode work in Firefox?",
        a: "Not yet. focusmode runs on Chrome, Edge, Brave and Arc. If you use Firefox, stay with LeechBlock NG.",
      },
      {
        q: "Does focusmode have a countdown delay like LeechBlock?",
        a: "The pause is focusmode's version of it. Instead of a plain countdown you get an animation, a hold-to-continue button, a slider or a breathing exercise before you choose to go on.",
      },
      {
        q: "Can I import my LeechBlock block sets?",
        a: "There's no direct import. Copy the sites from a block set and paste them into a focusmode group, one per line, changing + exceptions to !.",
      },
    ],
  },
  {
    slug: "one-sec",
    name: "one sec",
    title: "one sec Alternative for Chrome: A Pause Built for Desktop",
    description:
      "A one sec alternative for Chrome: the same pause-first idea, built for the desktop browser. Groups, schedules, daily limits, no account, Pro paid once.",
    h1: "A one sec alternative built for the desktop browser",
    intro:
      "one sec and focusmode share an idea: don't block the thing, put a moment in front of it. one sec asks you to take a deep breath before a distracting app opens, and it was built for the phone first, with a browser extension alongside. focusmode starts from the other side. It only runs in your desktop browser, and everything in it is about websites: groups, schedules, daily limits and path rules. If your scrolling happens on your phone, one sec is the one to get. If it happens in Chrome, here's the comparison.",
    theyDoWell: [
      {
        title: "Your phone, where the habit is",
        body: "one sec has iOS and Android apps that step in before an app opens. That's something a browser extension can't do. focusmode only runs in desktop browsers.",
      },
      {
        title: "More browsers",
        body: "one sec's extension is available for Chrome, Firefox, Edge and Safari. focusmode is on Chromium browsers only for now.",
      },
      {
        title: "Reflection tools",
        body: "Besides breathing, one sec offers interventions such as 4-7-8 breathing, a mirror, rotating your phone and typing random text, plus journaling and intention tracking.",
      },
      {
        title: "Privacy",
        body: "one sec says its interventions run on your device, that usage data is stored offline, and that it has no ads or data selling. On this the two tools agree.",
      },
    ],
    rows: [
      ["Runs on", "iOS, Android, Mac; extension for Chrome, Firefox, Edge, Safari", "Chrome, Edge, Brave, Arc on desktop"],
      ["Blocks apps", "Yes, on phone", "No, websites and paths only"],
      ["What you see first", "A deep breath or another intervention", "One of 7 pauses: shader, hold, slide, breathing and more"],
      ["Hard block", "Block mode", "Strict mode, 1 to 15 minutes"],
      ["Journaling and intentions", "Yes", "No"],
      ["Your browsing data", "Developer declares no data collected (CWS disclosure)", "Stays in your browser"],
      ["Price", "Essentials free; paid Premium", "Free for 1 group; Pro one-time"],
    ],
    differs: [
      {
        title: "Made for the browser",
        body: "focusmode has no phone app to pair with and nothing to sign in to. It's one extension, and every setting is about websites on your computer.",
      },
      {
        title: "Groups with their own triggers",
        body: "Put work-hour sites in one group with a schedule, news in another with a 15-minute daily limit, and Shorts in a third that's always paused. Each group has its own pause and number of breaks. The free version has one group; Pro unlocks more.",
      },
      {
        title: "Path rules",
        body: "A rule can cover part of a site. Add youtube.com/shorts/* and regular videos stay open. Put ! in front of an address to let it through, such as one subreddit or a docs page.",
      },
      {
        title: "Seven pauses, paid once",
        body: "Six pauses are free: a live shader, an animated texture, hold to continue, slide, pixels and an instant stop. The breathing exercise is part of Pro, which is a one-time payment. Nothing renews.",
      },
    ],
    stayIf:
      "most of your scrolling happens on your phone, you use Firefox or Safari, or you like the journaling and intention prompts. focusmode is a desktop extension for Chromium browsers and has none of those.",
    move: [
      "Open the one sec extension and note the websites you added to it.",
      "Install focusmode, open its popup and create a group.",
      "Add the sites to the group, one per line, without https://. Use a path such as youtube.com/shorts/* if you only want to pause part of a site.",
      "Pick when the group is on: always, on a schedule, or after a daily limit. Then pick the pause. Hold to continue is the closest free one to a deep breath; the breathing exercise is in Pro.",
      "Keep one sec on your phone. In your desktop browser, turn its extension off so the two don't both react to the same page.",
    ],
    faqs: [
      {
        q: "Does focusmode have a breathing pause like one sec?",
        a: "Yes, the breathing exercise is one of the 7 pauses and is part of Pro. The free version has the other 6, including hold to continue and slide.",
      },
      {
        q: "Does focusmode work on my phone?",
        a: "No. focusmode is a desktop browser extension. For phone apps, one sec is a good choice, and the two work fine side by side.",
      },
      {
        q: "Do I need an account for focusmode?",
        a: "No. There's no sign-up. Your sites, groups and stats stay in your browser's storage.",
      },
      {
        q: "Is focusmode free?",
        a: "The free version has one group with schedules, daily limits and strict mode. Pro, for unlimited groups, the breathing pause and every shader, is a one-time payment, not a subscription.",
      },
    ],
  },
];

export const getAlternativePage = (slug: string) =>
  ALTERNATIVE_PAGES.find((p) => p.slug === slug);

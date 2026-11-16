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
      "Block YouTube Shorts in Chrome without losing YouTube. One rule, youtube.com/shorts/*, pauses Shorts while tutorials and subscriptions stay open.",
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
    related: ["youtube", "tiktok", "instagram"],
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
    related: ["youtube-shorts", "netflix", "reddit"],
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
    related: ["x-twitter", "youtube", "instagram"],
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
    related: ["tiktok", "facebook", "youtube-shorts"],
  },
  {
    slug: "facebook",
    name: "Facebook",
    title: "How to Block Facebook on Chrome (or Just Reels and Watch)",
    description:
      "Block Facebook on Chrome, or only Reels and Watch. Keep Messages and the groups you need, add a schedule or daily limit. Free extension.",
    h1: "How to block Facebook on Chrome",
    intro:
      "Facebook is where the school group, the event invite and the family chat live, which is why blocking it outright rarely lasts. What eats the time is the feed, Reels and Watch. You can pause all of Facebook and let Messages through, or pause only the video parts and keep the rest.",
    rules: [
      ["*.facebook.com", "All of Facebook, including www, m and web.facebook.com"],
      ["*.facebook.com/reel/*", "Single Reels opened from the feed or a link"],
      ["*.facebook.com/reels/*", "The Reels tab"],
      ["*.facebook.com/watch/*", "Watch (now the Video tab), Facebook's video feed"],
      ["*.facebook.com/marketplace/*", "Marketplace, if browsing listings is the habit"],
      ["!*.facebook.com/messages/*", "Keeps Messages open when you block the whole site"],
    ],
    setup:
      "Create a group called Facebook and add *.facebook.com. If you still need to reply to people, add !*.facebook.com/messages/* below it so your inbox stays open.",
    native: [
      {
        title: "Edit your hosts file",
        body: "Add 0.0.0.0 facebook.com, 0.0.0.0 www.facebook.com and 0.0.0.0 m.facebook.com to the hosts file. It blocks Facebook in every browser, Messages and groups included, and needs admin rights to undo.",
      },
      {
        title: "Use the Feeds tab instead of Home",
        body: "Facebook's Feeds tab shows recent posts from friends, groups and Pages you follow, with fewer suggested posts than Home. It makes the scroll shorter. It doesn't stop you from opening Home, Reels or Watch.",
      },
      {
        title: "Use a Chrome policy",
        body: "Chrome's URLBlocklist policy can block facebook.com on a computer you manage. You set it in the registry on Windows or a configuration profile on macOS, and Chrome shows an error page with no way through.",
      },
    ],
    why: "Most Facebook visits start with a real reason: a message, an event, a group post. The feed takes over after that. A pause on Facebook, with Messages let through, keeps the reason and drops the drift. If you use Facebook for work, put the group on a schedule so it only pauses in your focus hours.",
    faqs: [
      {
        q: "Can I block Facebook but keep Messages?",
        a: "Yes. Add *.facebook.com, then !*.facebook.com/messages/* below it. Lines starting with ! are let through, so facebook.com/messages opens and the rest of Facebook pauses.",
      },
      {
        q: "Can I block only Reels and Watch?",
        a: "Yes. Add *.facebook.com/reel/*, *.facebook.com/reels/* and *.facebook.com/watch/* without the *.facebook.com line. The feed, groups and Messages stay open.",
      },
      {
        q: "Does it work on m.facebook.com?",
        a: "Yes. The *. at the start of *.facebook.com covers every subdomain, including www, m and web.",
      },
    ],
    related: ["instagram", "x-twitter", "reddit"],
  },
  {
    slug: "x-twitter",
    name: "X (Twitter)",
    title: "X (Twitter) Blocker: How to Block X on Chrome",
    description:
      "Block X (Twitter) on Chrome with a calm pause. Pause all of x.com or only the home timeline, and let single posts open. Free extension.",
    h1: "How to block X (Twitter) on Chrome",
    intro:
      "X is quick to open and hard to close: one notification, then the For you timeline. Old twitter.com links now redirect to x.com, so one rule covers both. Then decide whether single posts shared in articles and chats should still open.",
    rules: [
      ["x.com", "All of X, including the timeline, profiles and posts"],
      ["x.com/home", "Only the home timeline (For you and Following)"],
      ["!*x.com/*/status/*", "Lets single posts through, so links from articles still open"],
    ],
    setup:
      "Create a group called X and add x.com. To keep shared posts readable, add !*x.com/*/status/* below it.",
    native: [
      {
        title: "Edit your hosts file",
        body: "Add 0.0.0.0 x.com, 0.0.0.0 twitter.com and their www versions to the hosts file. X stops loading in every browser, including posts you were sent on purpose.",
      },
      {
        title: "Stay on the Following tab",
        body: "The home timeline has two tabs. For you is ranked and full of accounts you don't follow. Following shows only accounts you follow. Picking Following makes the timeline end sooner, but X still opens whenever you type it.",
      },
      {
        title: "Mute words and turn off notifications",
        body: "In X's settings you can mute words and topics and turn off push and email notifications. Fewer notifications means fewer reasons to open X. It doesn't limit how long you stay.",
      },
    ],
    why: "X rewards checking: there is always something new since the last refresh. A hard block often gets turned off the first time a post is shared with you. A pause before the timeline, with single posts let through, keeps X useful as a link and takes away the refresh habit.",
    faqs: [
      {
        q: "Do I need to block twitter.com too?",
        a: "No. twitter.com links redirect to x.com before the page loads, so the x.com rule catches them.",
      },
      {
        q: "Can I block the timeline but still read posts people send me?",
        a: "Yes. Add x.com, then !*x.com/*/status/* below it. A post link such as x.com/name/status/123 opens, and the timeline, Explore and profiles pause.",
      },
      {
        q: "Will this block X in the mobile app?",
        a: "No. FocusMode is a desktop browser extension for Chrome, Edge, Brave and Arc. It works on x.com in your browser.",
      },
    ],
    related: ["reddit", "linkedin", "facebook"],
  },
  {
    slug: "netflix",
    name: "Netflix",
    title: "How to Block Netflix on Chrome (or Set a Daily Limit)",
    description:
      "Block Netflix on Chrome during work or study hours, or after a daily limit. Turn off autoplay, keep account settings open. Free extension.",
    h1: "How to block Netflix on Chrome",
    intro:
      "Netflix isn't a scroll, it's a next episode. Autoplay starts the following one before you've decided to watch it, and there's no daily limit in the app. On a computer you can pause Netflix during the hours you work or study, or let it open freely until you've watched for a set time.",
    rules: [
      ["netflix.com", "All of Netflix, including www.netflix.com/browse"],
      ["netflix.com/watch/*", "Only playback: browsing and My List stay open"],
      ["!netflix.com/account*", "Keeps the Account page open"],
    ],
    setup:
      "Create a group called Netflix and add netflix.com. Then set the group's trigger to a schedule, such as weekdays 9:00 to 17:00, or a daily limit, such as 45 minutes.",
    native: [
      {
        title: "Turn off autoplay",
        body: "On netflix.com, open Account, choose Profiles, pick your profile and open Playback settings. Turn off Autoplay next episode in a series and Autoplay previews while browsing. Each episode then ends with a choice instead of a countdown.",
      },
      {
        title: "Lock your profile",
        body: "Profile Lock, under the same profile settings, asks for a 4-digit PIN before the profile opens. If someone else sets the PIN, it works as a real lock. If you set it, it's a speed bump.",
      },
      {
        title: "Edit your hosts file",
        body: "Add 0.0.0.0 netflix.com and 0.0.0.0 www.netflix.com to the hosts file. Netflix stops loading in every browser on that computer. It doesn't affect your TV or phone, and there's no schedule.",
      },
    ],
    why: "Nobody needs Netflix gone. The problem is the episode that starts at 23:40. A schedule pauses Netflix in the hours you've kept for something else, and a daily limit lets you watch on purpose and then stops the slide. When you really want one more, take a counted break and the pause steps aside.",
    faqs: [
      {
        q: "Can I allow one episode a night?",
        a: "Yes. Set the group's trigger to a daily time limit, for example 45 minutes. Netflix opens freely until then, and the pause comes in after.",
      },
      {
        q: "Does this block Netflix on my TV or phone?",
        a: "No. FocusMode works in your desktop browser: Chrome, Edge, Brave and Arc. For the TV, use Netflix's Profile Lock or autoplay settings.",
      },
      {
        q: "Will I still be able to change my Netflix settings?",
        a: "Yes, if you add !netflix.com/account* below netflix.com. The Account page opens, and browsing and watching pause. Other settings pages show the pause, and you can continue past it.",
      },
    ],
    related: ["youtube", "tiktok", "amazon"],
  },
  {
    slug: "linkedin",
    name: "LinkedIn",
    title: "How to Block the LinkedIn Feed (Keep Jobs and Messages)",
    description:
      "Block the LinkedIn feed on Chrome and keep jobs, messages and profiles open. One rule, linkedin.com/feed*, plus a pause for the rest if you want it.",
    h1: "How to block the LinkedIn feed and keep the rest",
    intro:
      "You open LinkedIn to answer a recruiter or look up a person, and land on the feed. Blocking LinkedIn completely gets in the way of work, so pause only the feed: linkedin.com/feed*. Jobs, messages, profiles and company pages keep opening as usual.",
    rules: [
      ["linkedin.com/feed*", "The home feed only"],
      ["!linkedin.com/feed/update/*", "Lets single posts through, so shared links still open"],
      ["linkedin.com/notifications*", "The notifications page"],
      ["*.linkedin.com", "All of LinkedIn, if you'd rather pause the whole site"],
    ],
    setup:
      "Create a group called LinkedIn and add linkedin.com/feed*. Add !linkedin.com/feed/update/* below it if colleagues send you posts to read.",
    native: [
      {
        title: "Skip the feed with bookmarks",
        body: "LinkedIn has no setting to hide the feed. Bookmark linkedin.com/messaging/ and linkedin.com/jobs/ and use those instead of the home page, so you go straight to the task.",
      },
      {
        title: "Turn off notifications",
        body: "Under Settings, then Notifications, you can turn off most push and email notifications by type. Fewer pings means fewer trips to the feed. The feed itself is still there when you open LinkedIn.",
      },
      {
        title: "Edit your hosts file",
        body: "Adding 0.0.0.0 www.linkedin.com to the hosts file blocks all of LinkedIn, messages and job search included. There's no way to block only the feed this way.",
      },
    ],
    why: "The feed is the one part of LinkedIn you rarely open on purpose. Pausing it alone costs you nothing: messages, jobs and profiles stay open, and the pause only shows when you land on the feed. If notifications pull you back too, add the notifications page to the same group.",
    faqs: [
      {
        q: "Will this block LinkedIn messages or job search?",
        a: "No. The rule linkedin.com/feed* only matches addresses that start with /feed. Messages live at /messaging and jobs at /jobs, so they open as usual.",
      },
      {
        q: "Can I still read a post someone sends me?",
        a: "Yes, if you add !linkedin.com/feed/update/* below the feed rule. Single post links open, and the main feed still pauses.",
      },
      {
        q: "Can I only block LinkedIn during work hours?",
        a: "Yes. Give the group a schedule, such as weekdays 9:00 to 17:00. Outside those hours the feed opens normally.",
      },
    ],
    related: ["x-twitter", "facebook", "reddit"],
  },
  {
    slug: "amazon",
    name: "Amazon",
    title: "Amazon Blocker: How to Block Amazon Shopping on Chrome",
    description:
      "Block Amazon on Chrome to stop impulse shopping. Pause the store, keep your orders page and AWS open, add your local Amazon site. Free extension.",
    h1: "How to block Amazon on Chrome",
    intro:
      "Amazon has no off switch, no time limit and no cooling-off setting. It does have saved cards and Buy Now. If you open it out of boredom or late at night, a pause before the store gives you a few seconds to ask whether you need the thing at all, while your orders page stays open for tracking.",
    rules: [
      ["amazon.com", "Amazon.com, including www.amazon.com"],
      ["amazon.co.uk", "Your local store too: swap in .co.uk, .de, .ca and so on"],
      ["!amazon.com/your-orders/*", "Keeps your order list open"],
      ["!amazon.com/gp/your-account/*", "Keeps order details open"],
    ],
    setup:
      "Create a group called Amazon and add amazon.com, plus your local store if you use one. Add the two ! lines below them to keep order tracking open.",
    native: [
      {
        title: "Remove saved cards and 1-Click",
        body: "Amazon can't be turned off, but buying can be made slower. In Your Account, remove saved payment methods and turn off 1-Click buying, so every order means typing card details again.",
      },
      {
        title: "Sign out",
        body: "Sign out and leave Keep me signed in unticked. You can still browse, but your cart, wish lists and recommendations aren't one click away.",
      },
      {
        title: "Edit your hosts file",
        body: "Add 0.0.0.0 amazon.com and 0.0.0.0 www.amazon.com to the hosts file. It blocks the store in every browser, including the page you need to track or return an order.",
      },
    ],
    why: "Impulse buys happen in seconds, which is why a short pause works so well here. You land on Amazon, the page waits for a breath or a hold, and the urge is often gone. If you really need something, continue or take a break and buy it. A schedule for late evenings covers the riskiest hours.",
    faqs: [
      {
        q: "Will this block AWS?",
        a: "No. AWS lives on aws.amazon.com and console.aws.amazon.com, which the rule amazon.com doesn't match. Don't use *.amazon.com if you work in AWS, since that covers every subdomain.",
      },
      {
        q: "Does it block Prime Video?",
        a: "Prime Video on amazon.com is part of the store, so it pauses with amazon.com. If you watch on primevideo.com, add that to the group too.",
      },
      {
        q: "Can I still track an order?",
        a: "Yes. With !amazon.com/your-orders/* and !amazon.com/gp/your-account/* below amazon.com, your orders and order details open while the store pauses.",
      },
    ],
    related: ["netflix", "facebook", "youtube"],
  },
  {
    slug: "tiktok",
    name: "TikTok",
    title: "TikTok Blocker for Chrome: How to Block TikTok on Desktop",
    description:
      "Block TikTok on your computer with a calm pause before the For You feed. Pause Explore and LIVE, keep messages, set a daily limit. Free extension.",
    h1: "How to block TikTok on your computer",
    intro:
      "TikTok on a computer is the same For You feed as on your phone, on a bigger screen and next to your work. Unlike YouTube or LinkedIn, there isn't a useful part to keep and a feed to drop: the feed is TikTok. So the simplest setup is to pause tiktok.com and decide how much of it you want each day.",
    rules: [
      ["tiktok.com", "All of TikTok on the web, including the For You feed and shared videos"],
      ["tiktok.com/explore*", "Explore"],
      ["tiktok.com/live*", "LIVE"],
      ["!tiktok.com/messages*", "Keeps messages open when you block the whole site"],
    ],
    setup:
      "Create a group called TikTok and add tiktok.com. If friends message you there, add !tiktok.com/messages* below it.",
    native: [
      {
        title: "Set a daily screen time limit in the app",
        body: "In the TikTok app, the screen time settings under Settings and privacy include a daily limit. When you reach it, TikTok asks for a passcode to keep watching, which is a prompt you can get past.",
      },
      {
        title: "Edit your hosts file",
        body: "Add 0.0.0.0 tiktok.com and 0.0.0.0 www.tiktok.com to the hosts file. TikTok stops loading in every browser on that computer, including videos friends send you.",
      },
      {
        title: "Block it on your router or DNS",
        body: "Most routers and DNS filters can block tiktok.com for every device on your network. That includes phones and other people's devices, so it suits a family more than one person.",
      },
    ],
    why: "TikTok is the purest version of the endless feed, and a block page just invites the phone instead. A pause on the desktop site catches the reflex when you open it between tasks. If you enjoy TikTok, a daily limit keeps that, and when the time is up the pause comes in.",
    faqs: [
      {
        q: "Will this block TikTok on my phone?",
        a: "No. FocusMode is a desktop browser extension for Chrome, Edge, Brave and Arc. On your phone, use TikTok's screen time settings or your phone's own screen time limits.",
      },
      {
        q: "Does it block TikTok Ads Manager or Seller Center?",
        a: "No. Those live on subdomains such as ads.tiktok.com, which the rule tiktok.com doesn't match. Don't use *.tiktok.com if you work in them.",
      },
      {
        q: "Can I watch TikTok for 20 minutes a day?",
        a: "Yes. Set the group's trigger to a daily time limit of 20 minutes. TikTok opens freely until then, then the pause comes in.",
      },
    ],
    related: ["youtube-shorts", "instagram", "netflix"],
  },
];

export const getBlockPage = (slug: string) => BLOCK_PAGES.find((p) => p.slug === slug);

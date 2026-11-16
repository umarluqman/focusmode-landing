import type { Metadata } from "next/types";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { StoreLink } from "@/components/store-link";
import { BLOCK_PAGES } from "@/lib/block-pages";

const title = "How to Block Websites on Chrome: 6 Ways That Work";
const description =
  "Block websites on Chrome with Family Link, a Chrome policy, the hosts file, DNS or an extension. What each blocks, and how to block only part of a site.";
const PUBLISHED = "2026-11-16";
const CTA = "guide_block_websites_chrome";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: { title, description, url: "./", type: "article", images: ["/og-image.jpg"] },
  twitter: { title, description },
};

const h2 = "mt-14 text-[clamp(1.6rem,3.5vw,2.2rem)] leading-tight";
const code = "rounded bg-secondary px-1.5 py-0.5 text-[15px]";

const METHODS: [method: string, scope: string, paths: string, schedule: string][] = [
  ["Family Link", "A child's supervised account", "Sites or domains", "No"],
  ["Chrome policy", "Every profile on the computer", "Yes", "No"],
  ["Hosts file", "Every browser on the computer", "No", "No"],
  ["Router or DNS", "Every device on the network", "No", "Depends on the service"],
  ["Extension", "One Chrome profile", "Usually", "Usually"],
];

const RULES: [pattern: string, effect: string][] = [
  ["reddit.com", "reddit.com and www.reddit.com"],
  ["*.reddit.com", "Every subdomain too, such as old.reddit.com"],
  ["youtube.com/shorts/*", "Only addresses under that path"],
  ["!reddit.com/r/learnprogramming*", "An exception: let this through even when another rule in the group matches"],
  ["*casino*", "Any address with that word in it"],
];

const STEPS = [
  "Add focusmode to Chrome. It's free and also installs in Edge, Brave and Arc.",
  "Open the popup and create a group, for example Social. Add one rule per line. You can also right-click any page and choose Add to focusmode Group.",
  "Pick when the group is on: always, on a schedule such as weekdays 9:00 to 17:30, or after a daily time limit.",
  "Pick the pause: a living shader, a texture field, hold to continue, slide, pixels, an instant stop, or a breathing exercise (Pro). Mix several and they rotate.",
  "Set how many breaks you get per day. When you need a site, take a break; it counts toward the limit.",
  "For a hard stop, turn on strict mode for 1, 5, 10 or 15 minutes. No breaks, and groups can't be switched off or edited until it ends.",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to block websites on Chrome",
  description,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  mainEntityOfPage: "https://focusmode.app/guides/how-to-block-websites-on-chrome/",
  author: { "@type": "Organization", name: "focusmode", url: "https://focusmode.app/" },
  publisher: { "@type": "Organization", name: "focusmode", url: "https://focusmode.app/" },
};

export default function BlockWebsitesOnChromeGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main" className="container max-w-3xl py-12 lg:py-20">
        <p className="text-sm text-muted-foreground">Guide</p>
        <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.02em]">
          How to block websites on Chrome
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Chrome has no setting that blocks a website on your own profile. Site settings can turn off
          a site&apos;s notifications, pop-ups or sound, but the site still opens. To block certain
          websites you need one of the tools below. They differ in who they cover, whether they can
          block part of a site, and how easy they are to undo.
        </p>

        <div className="mt-8 rounded-[20px] border border-border bg-card p-6">
          <p className="text-sm font-semibold text-orange-ink">The short answer</p>
          <p className="mt-2">
            For a child&apos;s account, use Family Link. To lock down a whole computer, use a Chrome
            policy. To block distractions for yourself, use an extension: it can block a page or a
            path, follow a schedule and give you a daily allowance.
          </p>
        </div>

        <div className="mt-8 overflow-x-auto rounded-[20px] border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-card text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Method</th>
                <th className="px-4 py-3 font-semibold">Covers</th>
                <th className="px-4 py-3 font-semibold">Block part of a site</th>
                <th className="px-4 py-3 font-semibold">Schedules</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {METHODS.map(([method, scope, paths, schedule]) => (
                <tr key={method}>
                  <td className="whitespace-nowrap px-4 py-3 font-semibold">{method}</td>
                  <td className="px-4 py-3">{scope}</td>
                  <td className="px-4 py-3">{paths}</td>
                  <td className="px-4 py-3">{schedule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className={h2}>1. Family Link, for a child&apos;s account</h2>
        <p className="mt-4 text-muted-foreground">
          If your child signs in to Chrome with a supervised Google Account, open the Family Link app,
          pick the child, then go to Controls, Google Chrome and Web. You can try to block explicit
          sites, allow only sites you approve, or add websites and domains to a blocked list. It
          works wherever the child is signed in to Chrome with that account. It is built for parents,
          not for blocking distractions on your own account.
        </p>

        <h2 className={h2}>2. A Chrome policy, for the whole computer</h2>
        <p className="mt-4 text-muted-foreground">
          Chrome reads a list called <code className={code}>URLBlocklist</code> that IT teams use on
          managed computers. You can set it on your own machine too. Entries can be a domain such as{" "}
          <code className={code}>reddit.com</code>, which also covers its subdomains, or a path such
          as <code className={code}>youtube.com/shorts</code>. A matching page shows a hard error, and
          Chrome says it is managed by your organization.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            <b className="text-foreground">Windows:</b> in the Registry Editor, create the key{" "}
            <code className={code}>HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Google\Chrome\URLBlocklist</code>{" "}
            and add string values named 1, 2, 3 and so on, one site per value.
          </li>
          <li>
            <b className="text-foreground">macOS:</b> install a configuration profile that sets{" "}
            <code className={code}>URLBlocklist</code> for <code className={code}>com.google.Chrome</code>.
          </li>
          <li>
            <b className="text-foreground">Check it:</b> open{" "}
            <code className={code}>chrome://policy</code> and click Reload policies.
          </li>
        </ul>
        <p className="mt-4 text-muted-foreground">
          It is strong because it applies to every profile and is a chore to undo. It has no schedule
          and no way through when you need a site for five minutes.
        </p>

        <h2 className={h2}>3. The hosts file, for every browser</h2>
        <p className="mt-4 text-muted-foreground">
          The hosts file maps names to addresses before any DNS lookup. Point a site at nowhere and it
          won&apos;t load in any browser. Open it as an administrator (
          <code className={code}>C:\Windows\System32\drivers\etc\hosts</code> on Windows,{" "}
          <code className={code}>/etc/hosts</code> on macOS) and add lines like these:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-[20px] border border-border bg-card p-5 text-sm">
          {"0.0.0.0 reddit.com\n0.0.0.0 www.reddit.com"}
        </pre>
        <p className="mt-4 text-muted-foreground">
          There are no wildcards, so you list every subdomain yourself, and it can&apos;t block a path.
          Restart Chrome if the site still opens from cache.
        </p>

        <h2 className={h2}>4. Your router or a DNS service, for every device</h2>
        <p className="mt-4 text-muted-foreground">
          Many routers have a site block list, and DNS services such as NextDNS let you add domains to
          a denylist. Set it on the router and it covers phones and laptops on that network. DNS only
          sees the domain, so it blocks all of YouTube or none of it, and it stops working the moment
          you join another Wi-Fi network unless the device itself is set up to use it.
        </p>

        <h2 className={h2}>5. An extension, for your own browsing</h2>
        <p className="mt-4 text-muted-foreground">
          A blocking extension runs inside Chrome, so it sees the full address and can block a single
          path, run on a schedule and track time. It covers the Chrome profile it&apos;s installed in.
          Chrome turns extensions off in Incognito until you switch on Allow in Incognito on the
          extension&apos;s details page, so do that if you want no gap.
        </p>

        <h2 className={h2}>6. The focusmode way: a pause instead of a wall</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          focusmode is a website blocker extension that doesn&apos;t slam the door. When you open a
          blocked site, a calm pause covers the page for a few seconds and you choose: take a counted
          break or close the tab. Hard blocks tend to get switched off by Thursday. A pause catches the
          habit and leaves the decision with you.
        </p>

        <h3 className="mt-8 text-lg">Rules you can copy</h3>
        <div className="mt-4 overflow-x-auto rounded-[20px] border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-card text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Rule</th>
                <th className="px-4 py-3 font-semibold">What it pauses</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {RULES.map(([pattern, effect]) => (
                <tr key={pattern}>
                  <td className="whitespace-nowrap px-4 py-3">
                    <code>{pattern}</code>
                  </td>
                  <td className="px-4 py-3">{effect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          A group can also work the other way round: list the sites you need and everything else is
          paused while the group is on.
        </p>

        <h3 className="mt-8 text-lg">Set it up</h3>
        <ol className="mt-4 list-decimal space-y-4 pl-5 marker:font-semibold marker:text-muted-foreground">
          {STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="mt-6 text-muted-foreground">
          Free includes one group with schedules, time limits and strict mode. Pro is a one-time
          payment for unlimited groups. Your sites and stats stay in your browser.
        </p>

        <div className="mt-14 rounded-[20px] bg-primary p-8 text-center text-primary-foreground">
          <p className="text-2xl font-semibold">Block the sites that eat your day.</p>
          <p className="mt-2 opacity-80">Free forever for one group. Lifetime Pro if you want more.</p>
          <StoreLink
            placement={CTA}
            suffix=", it's free"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-orange px-7 text-[15px] font-semibold text-orange-foreground transition-colors hover:bg-orange/90"
          />
        </div>

        <h2 className="mt-14 text-lg">Guides for specific sites</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {BLOCK_PAGES.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/block/${p.slug}/`}
                className="inline-flex h-9 items-center rounded-full border border-border px-4 text-sm hover:bg-secondary"
              >
                {p.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/block/"
              className="inline-flex h-9 items-center rounded-full border border-border px-4 text-sm hover:bg-secondary"
            >
              All sites
            </Link>
          </li>
        </ul>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next/types";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What FocusMode keeps in your browser, what the license server stores, and who processes payments and email.",
};

export default function PrivacyPolicy() {
  return (
    <div className="flex min-h-screen flex-col">
      <main id="main" className="container max-w-screen-md flex-1 py-12">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. The Short Version</h2>
            <p>
              FocusMode is a browser extension that blocks or delays the
              websites you choose. It works without an account. Your groups,
              settings and browsing statistics stay in your browser and are
              never sent to us. The only thing the extension sends to
              focusmode.app is a license check, and only if you have entered a
              Pro license key.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              2. Data the Extension Keeps in Your Browser
            </h2>
            <p>
              To decide when to block a site, enforce daily limits and show
              your statistics, the extension runs on the http and https pages
              you visit and reads the address of the page. It stores the
              following on your device, in the browser&apos;s local extension
              storage:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>
                Time spent per day on each site and page (domain and path),
                counted while the tab is visible
              </li>
              <li>How many times a site was blocked, and your streak history</li>
              <li>Breaks taken today and any break in progress</li>
              <li>
                The result of the last license check and a random install ID
                (only relevant if you use a license key)
              </li>
              <li>
                If you upgraded from version 2, a backup copy of your version 2
                data
              </li>
            </ul>
            <p className="mt-3">
              Your groups (including the sites you list), schedules and
              settings (including your license key, if any) are saved in the
              browser&apos;s own extension sync storage. If you have sync
              turned on in your browser, the browser vendor (for example
              Google) copies them between your browsers under its own privacy
              policy. We do not receive them.
            </p>
            <p className="mt-3">
              None of this browsing or usage data is transmitted to us or to
              anyone else. The Export button in Settings creates a backup file
              on your device only when you click it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              3. What the Extension Sends to focusmode.app
            </h2>
            <p>
              The free version sends nothing during normal use. If you enter a
              Pro license key, the extension contacts focusmode.app over HTTPS
              in these cases:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>
                License check: when you activate a key, and then at most once a
                day. It sends your license key, the random install ID and the
                name of your browser (for example &ldquo;Chrome&rdquo;). We
                store the install ID, the browser name, and the time of the
                first and most recent check, so we can count how many browsers
                use a key.
              </li>
              <li>
                Deactivation: when you deactivate a browser, it sends the
                license key and install ID, and we delete that activation
                record.
              </li>
            </ul>
            <p className="mt-3">
              Links you click inside the extension (such as the
              upgrade link) open our website like any other link. As with any
              web request, our server sees your IP address; we use it briefly
              to limit abusive requests and do not save it in our database.
            </p>
            <p className="mt-3">
              No website addresses, page content, browsing history, group or
              usage data are included in any of these requests.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              4. How We Use Data, and What We Do Not Do
            </h2>
            <ul className="list-disc list-inside ml-4">
              <li>
                The extension contains no analytics, advertising or tracking
                SDK, and loads no remote code
              </li>
              <li>We do not sell your data or share it with data brokers</li>
              <li>
                We do not use your data for advertising, for determining
                creditworthiness or for lending purposes
              </li>
              <li>
                Data is used only to provide the extension&apos;s single
                purpose: blocking or delaying sites you choose and showing you
                your own statistics
              </li>
            </ul>
            <p className="mt-3">
              The use of information received from the extension adheres to the
              Chrome Web Store User Data Policy, including the Limited Use
              requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              5. Buying Pro on This Website
            </h2>
            <p>
              Payment is handled by Stripe on its own checkout page. We never
              see or store your card details. When a purchase completes we
              store:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>The email address you gave at checkout</li>
              <li>Stripe customer and checkout references</li>
              <li>
                Your license key, its plan, its status and when it was created
                and emailed
              </li>
            </ul>
            <p className="mt-3">
              We use this to issue your key, email it to you, send it again
              when you ask through the license page, and revoke it after a
              refund or dispute. Emails are sent through Resend. Stripe and
              Resend process your data on our behalf under their own privacy
              policies.
            </p>
            <p className="mt-3">
              This website uses Cloudflare Web Analytics to count page views.
              It sets no cookies, does not track you across sites and does not
              collect personal data. We see only aggregate numbers such as
              visits, referring sites and countries. We use no advertising
              trackers.
            </p>
            <p className="mt-3">
              Version 2 offered sign-in with Google. If you signed in, we hold
              the name, email address, profile picture and account identifier
              Google provided, sign-in tokens, and your subscription status.
              Version 3 does not use sign-in.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              6. Retention and Deletion
            </h2>
            <ul className="list-disc list-inside ml-4">
              <li>
                The extension deletes daily usage and block history older than
                90 days automatically
              </li>
              <li>
                Removing the extension from a browser removes the data it
                stored in that browser
              </li>
              <li>
                Purchase and license records are kept for as long as the
                license exists, so that you can recover your key. Stripe keeps
                payment records according to its own legal obligations
              </li>
              <li>
                You can ask us to access, correct or delete the data we hold
                about you by emailing focusmode.app@gmail.com. Deleting your
                license record ends Pro access for that key
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              7. Changes to This Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the &ldquo;last updated&rdquo; date at the bottom of
              this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at focusmode.app@gmail.com
            </p>
          </section>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Last updated: 16 November 2026
        </p>
      </main>
      <Footer />
    </div>
  );
}

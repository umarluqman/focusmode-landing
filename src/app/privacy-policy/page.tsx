import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function PrivacyPolicy() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-950">
      <Header showCta={false} />
      <main className="flex-1 container max-w-screen-md px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              1. Information We Collect
            </h2>
            <p>
              Our Chrome extension collects and uses the following information:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>
                Your Google account profile information, including your name and
                email address
              </li>
              <li>Subscription status</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              2. How We Use Your Information
            </h2>
            <p>We use the collected information for the following purposes:</p>
            <ul className="list-disc list-inside ml-4">
              <li>To identify you as a user of our extension</li>
              <li>
                To determine your subscription status and provide appropriate
                features
              </li>
              <li>
                To communicate with you about your account and subscription
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              3. Data Storage and Security
            </h2>
            <p>
              We take the security of your data seriously. Your information is
              stored securely and is only accessed for the purposes stated in
              this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Data Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally
              identifiable information to outside parties. This does not include
              trusted third parties who assist us in operating our extension,
              conducting our business, or servicing you, as long as those
              parties agree to keep this information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal
              information at any time. You can do this by contacting us at
              focusmode.app@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              6. Changes to This Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the &ldquo;last updated&rdquo; date at the bottom of
              this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at focusmode.app@gmail.com.
            </p>
          </section>
        </div>
        <p className="mt-8 text-sm text-gray-600">Last updated: 24 Jul 2024</p>
      </main>
      <Footer />
    </div>
  );
}

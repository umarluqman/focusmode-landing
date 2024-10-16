import type { Metadata } from "next/types";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Providers from "@/components/providers";
import SEOHead from "@/components/SEOhead";
// import { eudoxusSans } from "@/lib/font";

const CalSans = localFont({
  src: "../../public/fonts/CalSans-SemiBold.otf",
  variable: "--font-cal-sans",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://focusmode.app"),
  title: {
    default: "focusmode - Stay focused, be present",
    template: "%s | focusmode",
  },
  description:
    "Reclaim 2-3 hours daily with focusmode. Our app helps you reduce mindless browsing and make informed decisions about distracting websites. Try it now!",
  openGraph: {
    title: "focusmode",
    description:
      "Reclaim 2-3 hours daily with focusmode. Our app helps you reduce mindless browsing and make informed decisions about distracting websites. Try it now!",
    url: "https://focusmode.app",
    siteName: "focusmode",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/public/focusmode-og-img.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "focusmode",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="canonical" href="https://focusmode.app" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff"></meta>
      <body className={`${inter.className} ${CalSans.variable}`}>
        <Providers>{children}</Providers>
      </body>
      <script async src="https://cdn.splitbee.io/sb.js"></script>
    </html>
  );
}

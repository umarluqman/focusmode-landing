import type { Metadata } from "next/types";
import { Nunito, Fraunces } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import { Header } from "@/components/header";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://focusmode.app"),
  title: {
    default: "FocusMode - Website Blocker & Focus Mode Chrome Extension",
    template: "%s | FocusMode",
  },
  description:
    "Block distracting websites mindfully with FocusMode. 4 intervention types, break management, streak tracking & analytics. Free Chrome extension used by 15k+ people.",
  openGraph: {
    title: "FocusMode — Mindful Website Blocker for Chrome",
    description:
      "Gentle interventions that help you stay focused. Not a blunt blocker — a mindful browsing companion. Free with optional $20.99 PRO.",
    url: "https://focusmode.app",
    siteName: "FocusMode",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/focusmode-og-img.png",
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
    title: "FocusMode — Mindful Website Blocker for Chrome",
    description:
      "Block distracting websites mindfully with FocusMode. 4 intervention types, break management, streak tracking & analytics. Free Chrome extension.",
    card: "summary_large_image",
    images: ["/focusmode-og-img.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#4A9075" />
        <meta name="msapplication-TileColor" content="#4A9075" />
        <meta name="theme-color" content="#FAF9F6" />
      </head>
      <body className={`${nunito.variable} ${fraunces.variable} font-sans`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}

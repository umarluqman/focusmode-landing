import type { Metadata, Viewport } from "next/types";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { SaleBanner } from "@/components/sale";
import { isSaleActive, lowestPrice } from "@/lib/pricing";

export const revalidate = 300;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const description = `Block distracting websites with a calm pause instead of a wall. Live shader overlays, 7 interventions, per-group schedules and limits. Local-first, no server tracking. Free Chrome extension, lifetime Pro from $${lowestPrice()}.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://focusmode.app"),
  title: {
    default: "FocusMode: Mindful Website Blocker for Chrome",
    template: "%s | FocusMode",
  },
  description,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "FocusMode: a pause before the scroll",
    description,
    url: "https://focusmode.app",
    siteName: "FocusMode",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    title: "FocusMode: a pause before the scroll",
    description,
    card: "summary_large_image",
    images: ["/og-image.jpg"],
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
};

export const viewport: Viewport = {
  themeColor: "#f4f4f1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-card focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <SaleBanner initial={isSaleActive()} />
        <Header />
        {children}
      </body>
    </html>
  );
}

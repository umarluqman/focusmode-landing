import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import "next-cloudinary/dist/cld-video-player.css";

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
  description: "Reduce Mindless Browsing by 10x.",
  openGraph: {
    title: "focusmode",
    description: "Reduce Mindless Browsing by 10x.",
    url: "https://focusmode.app/og-image.png",
    siteName: "focusmode",
    locale: "en_US",
    type: "website",
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
        {children}
      </body>
      <script async src="https://cdn.splitbee.io/sb.js"></script>
    </html>
  );
}

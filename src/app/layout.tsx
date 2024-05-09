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
  title: "focusmode - stay focused, be present",
  description: "Reduce Mindless Browsing by 10x",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${CalSans.variable}`}>
        {children}
      </body>
    </html>
  );
}

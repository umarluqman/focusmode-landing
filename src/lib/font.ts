import localFont from "next/font/local";

export const eudoxusSans = localFont({
  src: [
    {
      path: "../../public/fonts/EudoxusSans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/EudoxusSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/EudoxusSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    // Add more variations as needed
  ],
  variable: "--font-eudoxus-sans",
});

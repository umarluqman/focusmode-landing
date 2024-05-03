import { MountainIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export let Header = () => {
  return (
    <header className="grid grid-cols-[auto,1fr,auto] items-center gap-4 px-4 py-3 md:px-6 bg-white dark:bg-gray-900">
      <Link className="flex items-center" href="#">
        <MountainIcon className="h-6 w-6 text-gray-900 dark:text-gray-50" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="hidden justify-center gap-4 sm:flex md:gap-6">
        <Link
          className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 hover:underline underline-offset-4"
          href="#"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 hover:underline underline-offset-4"
          href="#"
        >
          Pricing
        </Link>
        <Link
          className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 hover:underline underline-offset-4"
          href="#"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 hover:underline underline-offset-4"
          href="#"
        >
          Contact
        </Link>
      </nav>
      <div className="ml-auto">
        <Link
          className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="#"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
};

import { LinkedinIcon } from "lucide-react";
import Link from "next/link";

export let Footer = () => {
  return (
    <footer className="grid grid-cols-[auto,1fr,auto] items-center gap-4 border-t bg-white px-4 py-3 md:px-6 dark:bg-gray-900">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2024 Acme Inc. All rights reserved.
      </p>
      <nav className="hidden justify-center gap-4 sm:flex md:gap-6">
        <Link
          className="text-xs text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 hover:underline underline-offset-4"
          href="#"
        >
          Terms of Service
        </Link>
        <Link
          className="text-xs text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 hover:underline underline-offset-4"
          href="#"
        >
          Privacy
        </Link>
      </nav>
      <div className="ml-auto flex gap-4">
        <Link
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          href="#"
        >
          <LinkedinIcon className="h-5 w-5" />
          <span className="sr-only">LinkedIn</span>
        </Link>
      </div>
    </footer>
  );
};

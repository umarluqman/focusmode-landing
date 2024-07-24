import Link from "next/link";

export let Footer = () => {
  return (
    <footer className="flex flex-row space-between w-full border-t bg-white px-4 py-3 md:px-6 dark:bg-gray-900 space-x-3">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2024 focusmode. All rights reserved.
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        <Link href="/privacy-policy">Privacy Policy</Link>
      </p>
    </footer>
  );
};

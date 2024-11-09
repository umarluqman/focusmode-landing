"use client";

import { useState } from "react";
import { LucideArrowBigRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-transparent p-4 md:px-20">
      <div className="container px-2">
        {/* Desktop View */}
        <div className="hidden items-center justify-between md:flex">
          <div className="flex items-center space-x-12">
            <Link className="flex items-center" href="/">
              <div className="flex space-x-1 items-center">
                <Image
                  className="scale-[3]"
                  src="/logo.svg"
                  alt="focusmode logo"
                  width={32}
                  height={32}
                />
                <span className="sr-only">FocusMode</span>
                <div
                  className="tracking-wide text-sm leading-none text-zinc-800"
                  style={{ fontFamily: "var(--font-cal-sans)" }}
                >
                  <div>FocusMode</div>
                  {/* <div>Mode</div> */}
                </div>
              </div>
            </Link>
            <Link className="flex items-center" href="/pro">
              {" "}
              <span className="text-sm font-medium">PRO version</span>
            </Link>
          </div>
          <Link
            href="https://chromewebstore.google.com/detail/focus-mode-stay-focused-b/ollmdedpknmlcdmpehclmgbogpifahdc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="flex items-center gap-2">
              <Image
                src="/chrome.png"
                alt="chrome logo"
                width={24}
                height={24}
              />
              Add to Chrome
            </Button>
          </Link>
        </div>

        {/* Mobile View */}
        <div className="flex items-center justify-between md:hidden">
          <div className="flex items-center space-x-4">
            <div className="text-xl font-bold">LOGO</div>
            <span className="text-sm font-medium">PRO version</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-white p-4 md:hidden">
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <div className="flex flex-col items-start space-y-6">
              <div className="text-xl font-bold">LOGO</div>
              <span className="text-sm font-medium">PRO version</span>
              <div className="w-full pt-4">
                <Button className="w-full" variant="outline">
                  Add to Chrome
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

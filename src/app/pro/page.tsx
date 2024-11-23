"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LandingSocialProof } from "@/components/social-proof/landing-social-proof";
import { avatarItems } from "@/components/hero-section";

export default function ProVersionPage() {
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    "3 PRO interventions",
    "Customizable interventions",
    "Ad-free experience",
    "Browsing analytics",
    "Muti-device Sync",
    "Lifetime updates",
    "Priority support",
    "Support Indie Developer",
  ];
  const { data: session } = useSession();
  const [promoCode, setPromoCode] = useState("LAUNCH30");
  const [value, setValue] = useState("LAUNCH30");
  const onSubmit = () => {
    setPromoCode(value);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  if (session?.user?.isSubscribed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-950">
        <p className="text-center text-xl">
          You have already subscribed the PRO version. Please click on the
          FocusMode extension and you can use the PRO version now, thank you for
          your trust.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-950">
      {/* <Header showCta={false} /> */}
      {/* <div className="py-4 px-6">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-center">
            <div className="text-center mb-4 md:mb-0">
              <h2 className="text-6xl font-bold max-w-2xl leading-normal">
                Stay Mindful With Browsing Analytics
              </h2>
              <p className="text-sm mt-1"></p>
            </div>
          </div>
        </div> */}

      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {/* <h1 className="text-4xl font-bold mb-4">Upgrade Now</h1> */}
          {/* <p className="text-xl text-gray-600">Unlimited Interventions</p> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center justify-center gap-20 w-full"
        >
          <LandingSocialProof showRating avatarItems={avatarItems} />
          <Card
            className="max-w-md mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CardHeader className="relative">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold py-1 px-2 rounded-bl-lg rounded-tr-lg transform rotate-12 shadow-md">
                LIFETIME
              </div>
              <CardTitle className="text-3xl font-bold">Pro</CardTitle>
              <CardDescription>
                Reclaim your focus and 10x your productivity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-6 flex items-center space-x-4">
                <div>{promoCode ? "$20.99" : "$29.99"}</div>
                {promoCode && (
                  <div className="flex flex-col">
                    <span className="text-base font-normal line-through text-zinc-400">
                      <s>$29.99</s>
                    </span>
                    <span className="text-xs font-semibold text-green-500">
                      Save ${(29.99 - 20.99).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <Check className="mr-2 h-5 w-5 text-green-500" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full"
              >
                {session?.user ? (
                  <Link
                    href={`${
                      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
                    }?client_reference_id=${
                      session.user.id
                    }&prefilled_email=${encodeURIComponent(
                      session.user.email || ""
                    )}&prefilled_promo_code=${promoCode}`}
                  >
                    <Button className="w-full" size="lg">
                      Upgrade Now
                    </Button>
                  </Link>
                ) : (
                  <Link href="/sign-in">
                    <Button className="w-full" size="lg">
                      Upgrade Now
                    </Button>
                  </Link>
                )}
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 w-full max-w-md mx-auto space-y-2"
        >
          {promoCode && (
            <Badge className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold">
              Promo code applied
            </Badge>
          )}
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter promo code"
              className="flex-grow"
              onChange={onChange}
              value={value}
            />
            <Button variant="outline" onClick={onSubmit}>
              Apply
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8 text-gray-600"
        >
          <p>
            Have questions?{" "}
            <a
              href="mailto:hey@focusmode.app"
              className="text-blue-500 hover:underline"
            >
              Contact our sales team
            </a>
          </p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

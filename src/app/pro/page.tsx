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
import { ProtectedRoute } from "@/components/protected-route";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ProVersionPage() {
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    "Unlimited interventions",
    "Customizable interventions",
    "Ad-free experience",
    "Browsing analytics",
  ];
  const { data: session } = useSession();
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-950">
        <Header showCta={false} />

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
          >
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
                <div className="text-4xl font-bold mb-6">
                  $15.70
                  <span className="text-xl font-normal"></span>
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
                  <Link
                    href={`${
                      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
                    }?client_reference_id=${
                      session?.user?.id
                    }&prefilled_email=${encodeURIComponent(
                      session?.user?.email || ""
                    )}`}
                  >
                    <Button className="w-full" size="lg">
                      Upgrade Now
                    </Button>
                  </Link>
                </motion.div>
              </CardFooter>
            </Card>
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
                href="mailto:focusmode.app@gmail.com"
                className="text-blue-500 hover:underline"
              >
                Contact our sales team
              </a>
            </p>
          </motion.div>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}

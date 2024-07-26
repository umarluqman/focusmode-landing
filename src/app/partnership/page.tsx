// import "./styles.css";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PopiconsPaperPlaneLine,
  PopiconsRocketDuotone,
  PopiconsRocketLine,
} from "@popicons/react";
import Image from "next/image";
import Link from "next/link";
// import focusmodeModeIcon from "data-base64:@/tabs/focusmode-logo.png";
// import merlinLogo from "data-base64:@/tabs/merlin-ai.png";
// import strictSessionImage from "data-base64:@/tabs/strict-session.png"
import React from "react";
// import Arrow, { DIRECTION } from "react-arrows";

const PartnershipPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen  text-black p-4">
      <Card className="w-full max-w-6xl bg-transparent shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center space-x-2 mb-4">
            <Image
              src={"/focusmode-logo.png"}
              alt="focusmode logo"
              width={40}
              height={40}
            />
            <div>focusmode</div>
            <div>Partners With</div>
            <a
              href="https://app.getmerlin.in/landing?tap_a=128549-ed8cc9&ref=yjlloth"
              target="_BLANK"
              rel="nofollow"
            >
              <Image
                src="https://static.tapfiliate.com/641c5243b8e98408719326.png?a=128549-ed8cc9"
                // border="0"
                alt="merlin logo"
                width={40}
                height={40}
              />
            </a>
            {/* <img src={merlinLogo} alt="merlin logo" width={40} height={40} /> */}
            <a
              href="https://coda.io/@foyer/merlin-marketing-kit?tap_a=128832-a2ce08&ref=yjlloth"
              target="_BLANK"
              rel="nofollow"
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            >
              Merlin AI
            </a>{" "}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row space-x-8 w-full">
          <div className="flex-1 space-y-6 text-base text-zinc-700">
            <p>
              <a
                href="https://coda.io/@foyer/merlin-marketing-kit?tap_a=128832-a2ce08&ref=yjlloth"
                target="_BLANK"
                rel="nofollow"
                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              >
                Merlin AI
              </a>{" "}
              complements focusmode perfectly by enhancing your productivity
              when you are in or out of a focus session. It&apos;s an AI-powered
              Chrome extension that helps you work smarter and faster.
            </p>
            <div
              className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4"
              role="alert"
            >
              <p className="font-bold">Special Offer</p>
              <p>
                Get 20% off on{" "}
                <a
                  href="https://coda.io/@foyer/merlin-marketing-kit?tap_a=128832-a2ce08&ref=yjlloth"
                  target="_BLANK"
                  rel="nofollow"
                  className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                >
                  Merlin AI
                </a>{" "}
                by using the code: <span className="font-bold">MERLIN20</span>
              </p>
            </div>

            <div className="pt-4">
              <p className="mb-2">
                Here&apos;s the{" "}
                <a
                  href="https://coda.io/@foyer/merlin-marketing-kit?tap_a=128832-a2ce08&ref=yjlloth"
                  target="_BLANK"
                  rel="nofollow"
                  className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                >
                  Merlin AI
                </a>{" "}
                features:
              </p>
              <ul className="list-disc list-inside space-y-1 mb-4">
                <li>Chat with AI on every website</li>
                <li>Chat with 20+ top AI models (GPT-4, Claude-3, etc)</li>
                <li>Get AI response on every google search</li>
                <li>Chat with Websites and Documents</li>
                <li>Gmail Email Writer</li>
                <li>Youtube and Blog Summarizer</li>
                <li>Linkedin DM Response Assistant</li>
                {/* <li>Code Explainer and Interpreter</li> */}
                <li>Generate AI images & art (&apos;Bonkers&apos;)</li>
                {/* <li>Chat with custom Chatbots made by community</li>
                <li>Chat with 20+ top AI models (GPT-4, Claude-3, etc)</li>
                <li>Get AI response on every google search</li> */}
                {/* <li>Chat with Websites</li> */}
                {/* <li>Chat with Documents</li> */}
                {/* <li>Chat with latest web search data</li> */}
                {/* <li>Gmail Email Writer</li> */}
                {/* <li>Chat with Code Interpreter</li> */}
                {/* <li>Youtube Summarizer</li> */}
                {/* <li>Blog Summarizer</li> */}
                {/* <li>Linkedin DM Response Assistant</li> */}
                {/* <li>Linkedin Pro Connect</li> */}
                {/* <li>Google link content Summarizer (Link Preview)</li> */}
                {/* <li>Code Explainer</li> */}
                {/* <li>Youtube Transcription tool</li> */}
                {/* <li>
                  Doppel - Create a chatbot out of any person's public tweets
                </li> */}
                {/* <li>Generate AI images & art ('Bonkers')</li> */}
                {/* <li>Tweetify - make tweets out of youtube videos</li> */}
                {/* <li>Chat with custom Chatbots made by community</li> */}
                {/* <li>Prompt library to save frequently used prompts</li> */}
                {/* <li>Twitter commenter</li> */}
              </ul>
            </div>
          </div>
          <div className="flex-1">
            <div className="video-container" id="to">
              <iframe
                width="400"
                height="225"
                src="https://www.youtube.com/embed/GsB_1yq0WR4?start=51"
                title="Merlin AI Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="inline-block"
              ></iframe>
            </div>

            <div id="from" className="mt-12 text-base">
              Watch it less than 1 minute
            </div>
            {/* <p>
              As a focusmode user, you can benefit greatly from Merlin AI's
              features when you're not in a focus session. It's the perfect tool
              to complement your productivity toolkit.
            </p> */}
          </div>
        </CardContent>
        <Link href="https://fas.st/t/vq83aR9Z" passHref>
          <Button className="w-80 mt-8">
            <PopiconsRocketLine className="mr-2 h-4 w-4" />
            Boost Productivity Now
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default PartnershipPage;

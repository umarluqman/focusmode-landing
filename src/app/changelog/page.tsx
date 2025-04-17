import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Changelog | FocusMode",
  description: "Latest updates and improvements to FocusMode",
};

export default function Changelog() {
  const changes = [
    {
      date: "April 2025",
      updates: [
        {
          version: "2.7.3",
          title: "Bug Fixed for Dark Mode",
          imageSrc: [],
          description: ["Dark mode theme in certain websites is now fixed"],
        },
        {
          version: "2.7.2",
          title: "Bug Fixed and Improvements",
          imageSrc: [],
          description: [
            "Confirmation prompt before toggle FocusMode OFF is now working fine",
            "Other minor improvements",
          ],
        },
      ],
    },
    {
      date: "March 2025",
      updates: [
        {
          version: "2.7.1",
          title:
            "Dark Mode for PRO users, Confirmation Prompt Toggle & Bug Fixed and Improvements",
          imageSrc: [
            "/changelog/dark.webp",
            "/changelog/confirmation-prompt.webp",
            "/changelog/chart-dark.webp",
            "/changelog/theme.webp",
          ],
          description: [
            "Dark mode theme is now available exclusively for PRO users",
            "Added option to toggle confirmation dialog when disabling FocusMode",
            "Theme colors for charts. More charts are coming to PRO users.",
            "Resolved an issue with Advanced List website blocking functionality",
            "Fixed a bug preventing websites from being unblocked when FocusMode is disabled",
            "Restored missing website usage statistics",
            "Save the charts setting",
          ],
        },
        {
          version: "2.7.0",
          title:
            "FREE PRO Interventions, PIN Protection, Confirmation Before Turning OFF and Schedule limit",
          imageSrc: [
            "/changelog/pro.webp",
            "/changelog/confirmation.webp",
            "/changelog/pin.webp",
            "/changelog/alert.webp",
          ],
          description: [
            "PRO interventions are now FREE for all users! Enjoy advanced interventions like Slide In Out, Hold to Complete and Pixelated.",
            "PIN Protection is now available for all users. Try it in the Settings.",
            "Confirmation dialog added when turning off FocusMode. When confirmed, FocusMode will stay off eventhough the scheduled is ON.",
            "Schedule feature is now limited to 3 days (Sun, Mon, Tue) per week for free users. Upgrade to PRO for unlimited scheduling.",
            // "More features are coming! Promo code 'LAUNCH30' for 30% OFF will expired soon",
          ],
        },
      ],
    },
    {
      date: "February 2025",
      updates: [
        {
          version: "2.6.7",
          title: "Advanced List (BETA) for Power Users ",
          description: [
            "Introducing the advanced list for power users. User can now filter website with advanced rules to block websites with pattern matching",
          ],
          imageSrc: ["/changelog/advanced-list.webp"],
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          <span className="block">🎉 What&apos;s New</span>
          <span className="block mt-2 text-3xl sm:text-4xl text-zinc-600">
            FocusMode Changelog
          </span>
        </h1>
        <p className="mt-4 text-gray-500">
          Keep track of updates and improvements to FocusMode
        </p>

        <div
          className="mt-6 p-5 bg-gradient-to-r from-[#f2ffdc] via-[#f8ffed] to-[#f2ffdc] border rounded-xl relative overflow-hidden"
          style={{
            borderColor: "#c8e680",
            boxShadow:
              "0 4px 14px rgba(173, 250, 27, 0.15), 0 1px 3px rgba(173, 250, 27, 0.1)",
          }}
        >
          <div className="flex items-start">
            <span
              className="flex-shrink-0 inline-flex mr-4 items-center justify-center h-12 w-12 rounded-full bg-[#f2ffdc] border"
              style={{
                borderColor: "#c8e680",
                color: "#4a5500",
                boxShadow: "inset 0 2px 4px rgba(173, 250, 27, 0.2)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Dark Mode is here for PRO users!
              </h3>
              <div className="mt-3 rounded-lg relative">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <p className="text-gray-800">
                      More features are coming! Promo code{" "}
                      <span
                        className="inline-block px-3 py-1 mx-1 font-bold text-gray-800 rounded"
                        style={{
                          backgroundColor: "#adfa1b",
                          boxShadow:
                            "0 0 0 1px #95d800, 0 2px 4px rgba(173, 250, 27, 0.3)",
                        }}
                      >
                        LAUNCH30
                      </span>{" "}
                      for <span className="font-semibold">30% OFF</span> will
                      expire soon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 space-y-16">
        {changes.map((period, idx) => (
          <div key={period.date}>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-600">
                {period.date}
              </h2>
            </div>
            <div className="mt-6 space-y-2">
              {period.updates.map((update, index) => (
                <div key={index} className="relative">
                  <div className="relative flex gap-6 items-start">
                    <span>
                      <h3 className="text-lg font-semibold text-gray-500">
                        {update.version}
                      </h3>
                      {index === 0 && idx === 0 && (
                        <span
                          className="px-2 py-0.5 text-xs font-medium rounded"
                          style={{ backgroundColor: "#adfa1b" }}
                        >
                          NEW
                        </span>
                      )}
                    </span>
                    <div className="flex-auto leading-8">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {update.title}
                      </h3>

                      <ul className="mt-1 text-gray-600 list-disc">
                        {update.description.map((desc, i) => {
                          return (
                            <li key={i} className={"ml-4"}>
                              {desc}
                            </li>
                          );
                        })}
                      </ul>
                      {update.imageSrc && update.imageSrc.length > 0 && (
                        <div className="relative mt-8 -mx-4 sm:-mx-12 md:-mx-16 lg:-mx-32 xl:-mx-48 2xl:-mx-64 overflow-x-hidden mb-6">
                          {Array.isArray(update.imageSrc) ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-[1400px] mx-auto px-4 sm:px-12">
                              {update.imageSrc.map((src, i) => (
                                <div key={i} className="flex justify-center">
                                  <Image
                                    className="rounded-lg shadow-md object-contain bg-black"
                                    src={src}
                                    alt={`${update.title} ${i + 1}`}
                                    width={500}
                                    height={600}
                                    style={{ maxWidth: "100%", height: "auto" }}
                                    priority
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex justify-center w-full px-4 sm:px-12">
                              <Image
                                className="rounded-lg shadow-md"
                                src={update.imageSrc}
                                alt={update.title}
                                width={500}
                                height={1000}
                                style={{ maxWidth: "100%", height: "auto" }}
                                priority
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

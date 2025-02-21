import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog | FocusMode",
  description: "Latest updates and improvements to FocusMode",
};

export default function Changelog() {
  const changes = [
    {
      date: "February 2024",
      updates: [
        {
          title: "Pro Plan Launch",
          description: "Introduced Pro plan with advanced features for power users.",
        },
        {
          title: "Performance Improvements",
          description: "Enhanced app performance and reduced loading times.",
        },
      ],
    },
    {
      date: "January 2024",
      updates: [
        {
          title: "Initial Release",
          description: "Launched FocusMode with core features to help users stay focused and productive.",
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Changelog
        </h1>
        <p className="mt-4 text-gray-500">
          Keep track of updates and improvements to FocusMode
        </p>
      </div>

      <div className="mt-16 space-y-16">
        {changes.map((period) => (
          <div key={period.date}>
            <h2 className="text-2xl font-bold text-gray-900">{period.date}</h2>
            <div className="mt-6 space-y-8">
              {period.updates.map((update, index) => (
                <div key={index} className="relative">
                  <div className="relative flex gap-6">
                    <div className="flex-none w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div className="flex-auto">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {update.title}
                      </h3>
                      <p className="mt-1 text-gray-600">{update.description}</p>
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

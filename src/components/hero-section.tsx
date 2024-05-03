export let HeroSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-wide sm:text-5xl xl:text-6xl/none">
              Get Distracted When Distracted
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Get out of the loop and stay mindful when accessing distracting
              websites.
            </p>
          </div>
        </div>
        <div className="aspect-video overflow-hidden rounded-lg">
          <span className="h-full w-full object-cover rounded-md bg-muted" />
        </div>
      </div>
    </section>
  );
};

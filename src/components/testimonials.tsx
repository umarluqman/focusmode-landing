import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

export let Testimonials = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 md:px-6">
        <div className="flex flex-col items-start rounded-lg bg-white p-6 shadow-sm transition-all hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-900">
          <div className="mb-4 flex items-center space-x-4">
            <Avatar>
              <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-lg font-semibold">Olivia Davis</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                CEO, Acme Inc
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            "The customer service I received was exceptional. The support team
            went above and beyond to address my concerns."
          </p>
        </div>
        <div className="flex flex-col items-start rounded-lg bg-white p-6 shadow-sm transition-all hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-900">
          <div className="mb-4 flex items-center space-x-4">
            <Avatar>
              <AvatarImage alt="@jaredpalmer" src="/placeholder-avatar.jpg" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-lg font-semibold">Jared Palmer</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                CTO, Vercel
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            "The platform has been a game-changer for our team. The seamless
            deployment and scalability have allowed us to focus on building
            great products."
          </p>
        </div>
        <div className="flex flex-col items-start rounded-lg bg-white p-6 shadow-sm transition-all hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-900">
          <div className="mb-4 flex items-center space-x-4">
            <Avatar>
              <AvatarImage alt="@maxleiter" src="/placeholder-avatar.jpg" />
              <AvatarFallback>ML</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-lg font-semibold">Max Leiter</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Developer, Acme Inc
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            "The developer tools and documentation have been invaluable. I was
            able to get up and running in no time and build complex applications
            with ease."
          </p>
        </div>
      </div>
    </section>
  );
};

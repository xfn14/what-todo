import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Banner } from "./_components/banner";

const LandingPage = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center overflow-x-hidden">
      <div className="transition-all duration-300 ease-in-out hover:scale-110">
        <Banner />
      </div>

      <div className="flex items-center justify-center gap-10 pb-24">
        <Link href="/sign-up">
          <Button
            size="lg"
            className="mt-6 text-lg transition-all duration-300 ease-in-out hover:scale-110 dark:text-white"
          >
            Get Started
          </Button>
        </Link>

        <Link href="/about">
          <Button
            variant={"secondary"}
            size="lg"
            className="mt-6 text-lg transition-all duration-300 ease-in-out hover:scale-110"
          >
            Learn More
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default LandingPage;

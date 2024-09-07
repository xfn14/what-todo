import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Logo } from "~/components/logo";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "~/components/ui/theme-button";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b bg-transparent p-4">
      <div className="flex items-center">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <div className="flex gap-4">
        <ModeToggle />

        <SignedIn>
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        </SignedIn>

        <SignedOut>
          <Link href="/sign-in">
            <Button className="dark:text-white">Login</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant={"secondary"}>Register</Button>
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
}

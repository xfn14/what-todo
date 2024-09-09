import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Logo } from "~/components/logo";
import { ModeToggle } from "~/components/ui/theme-button";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b bg-transparent p-4">
      <div className="flex items-center">
        <Link href="/dashboard">
          <Logo />
        </Link>
      </div>

      <div className="flex gap-4">
        <ModeToggle />
        <UserButton />
      </div>
    </nav>
  );
}

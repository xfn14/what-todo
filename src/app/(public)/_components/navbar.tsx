import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b bg-transparent p-4 text-white">
      <div className="flex items-center">
        <Link href="/">
          <h1 className="font-bogart text-xl font-bold">What-Todo</h1>
        </Link>
      </div>
      <div>
        <SignedIn>
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        </SignedIn>

        <SignedOut>
          <div className="flex gap-4">
            <Link href="/sign-in">
              <Button>Sign-in</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Sign-up</Button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </nav>
  );
}

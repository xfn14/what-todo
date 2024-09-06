import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b bg-transparent p-4 text-white">
      <div className="flex items-center">
        <Link href="/dashboard">
          <h1 className="font-bogart text-xl font-bold">What-Todo</h1>
        </Link>
      </div>
      <div>
        <UserButton />
      </div>
    </nav>
  );
}

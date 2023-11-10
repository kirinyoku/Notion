"use client";

import Logo from "./Logo";
import Link from "next/link";
import useScrollTop from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";

export default function Navbar() {
  const scroll = useScrollTop();
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <nav
      className={cn(
        "z-50 bg-background fixed top-0 flex items-center w-full p-6 dark:bg-[#1f1f1f]",
        scroll && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">Sign up</Button>
            </SignUpButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter Notion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}

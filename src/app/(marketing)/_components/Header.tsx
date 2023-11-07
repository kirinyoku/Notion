"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Header() {
  return (
    <header className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plants. Unified. Welcome to{" "}
        <span className="underline">Notion Clone</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Notion Clone is the connected workspace where <br />
        better, faster work happens.
      </h3>
      <Button>
        Enter Notion <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </header>
  );
}

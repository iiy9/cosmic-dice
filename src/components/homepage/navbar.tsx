"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Info, Twitter } from "lucide-react";
import { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export function Navbar() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInfoMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsInfoOpen(true);
  };

  const handleInfoMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsInfoOpen(false);
    }, 200); // 200ms delay, adjust as needed
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-black">
      <div className="container mx-auto flex h-14 items-center px-4 sm:px-6 lg:px-8">
        <div className="mr-auto flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-lg sm:text-xl font-bold text-gradient bg-gradient-to-r from-blue-400 to-indigo-500">🎲 Cosmic Dice</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-1 sm:space-x-2">
          <Link href="https://docs.spacecomputer.io" target="_blank" passHref>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 sm:gap-2 text-zinc-300 hover:text-white hover:bg-zinc-800 px-2 sm:px-3">
              <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">SpaceComputer Docs</span>
              <span className="sm:hidden">Docs</span>
              <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </Button>
          </Link>
          <Link href="https://twitter.com/yixitco" target="_blank" passHref>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 sm:gap-2 text-zinc-300 hover:text-white hover:bg-zinc-800 px-2 sm:px-3">
              <Twitter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">@yixitco</span>
              <span className="sm:hidden">Twitter</span>
            </Button>
          </Link>
          <div
            className="relative"
            onMouseEnter={handleInfoMouseEnter}
            onMouseLeave={handleInfoMouseLeave}
          >
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 h-8 w-8 sm:h-9 sm:w-9"
            >
              <Info className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">About</span>
            </Button>
            {isInfoOpen && (
              <div className="absolute right-0 mt-2 w-64 sm:w-72 rounded-md bg-zinc-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20 border border-zinc-700">
                <Card className="border-none bg-transparent">
                  <CardHeader className="pb-2 pt-3 px-3 sm:px-4">
                    <CardTitle className="text-white text-sm sm:text-base">About This Project</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs sm:text-sm text-zinc-300 pb-3 px-3 sm:px-4 space-y-1">
                    <p>This is a fun project using SpaceComputer&apos;s Orbitport to roll dice with true cosmic randomness!</p>
                    <p>The entropy is harvested from satellites in orbit.</p>
                    <div className="mt-2 pt-2 border-t border-zinc-700">
                      <Link href="https://docs.spacecomputer.io" target="_blank" className="flex items-center text-xs sm:text-sm text-blue-400 hover:text-blue-300">
                        <ExternalLink className="h-3 w-3 mr-1" /> Learn more about SpaceComputer
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

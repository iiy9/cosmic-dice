"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Info, Twitter } from "lucide-react";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export function Navbar() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-black">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex ml-4 items-center space-x-2">
            <span className="text-xl font-bold text-gradient bg-gradient-to-r from-blue-400 to-indigo-500">🎲 Cosmic Dice</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link href="https://docs.spacecomputer.io" target="_blank" passHref>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-zinc-300 hover:text-white hover:bg-zinc-800">
                <FileText className="h-4 w-4" />
                <span>SpaceComputer Docs</span>
                <ExternalLink className="h-3 w-3" />
              </Button>
            </Link>
            <Link href="https://twitter.com/yixitco" target="_blank" passHref>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-zinc-300 hover:text-white hover:bg-zinc-800">
                <Twitter className="h-4 w-4" />
                <span>@yixitco</span>
              </Button>
            </Link>
            <div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800"
                onMouseEnter={() => setIsInfoOpen(true)}
                onMouseLeave={() => setIsInfoOpen(false)}
              >
                <Info className="h-5 w-5" />
                <span className="sr-only">About</span>
              </Button>
              {isInfoOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Card className="border-white/20 border">
                    <CardHeader>
                      <CardTitle className="text-white">About This Project</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-white mb-2">This is a fun project using SpaceComputer&apos;s Orbitport to roll dice with true cosmic randomness!</p>
                      <p className="text-sm text-white">The entropy is harvested from satellites in orbit, providing truly random numbers for your dice rolls.</p>
                      <div className="mt-3 pt-2 border-t border-white/10">
                        <Link href="https://docs.spacecomputer.io" target="_blank" className="flex items-center text-xs text-blue-400 hover:text-blue-300">
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
      </div>
    </header>
  );
}

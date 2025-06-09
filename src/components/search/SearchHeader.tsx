"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  LogOut,
  Sparkles,
  Dog as DogIcon,
} from "lucide-react";

interface SearchHeaderProps {
  userName?: string;
  favoriteCount: number;
  onGenerateMatch: () => void;
  onLogout: () => void;
  isGeneratingMatch: boolean;
}

export default function SearchHeader({
  userName,
  favoriteCount,
  onGenerateMatch,
  onLogout,
  isGeneratingMatch,
}: SearchHeaderProps) {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <div>
            <h1 className="text-md font-bold text-primary capitalize">
              Welcome, {userName}!
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {favoriteCount > 0 && (
            <Button
              onClick={onGenerateMatch}
              disabled={isGeneratingMatch}
              size="sm"
              className="bg-primary hover:bg-primary/90"
            >
              <Sparkles className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">
                {isGeneratingMatch ? "Finding..." : "Match"}
              </span>
              <span className="ml-1">({favoriteCount})</span>
            </Button>
          )}

          <ThemeToggle />

          <Button variant="outline" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
          
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <DogIcon className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
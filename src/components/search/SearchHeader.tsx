"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
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
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between h-15 px-4">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <div>
            <h1 className="text-md font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome back, {userName}!
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {favoriteCount > 0 && (
            <Button
              onClick={onGenerateMatch}
              disabled={isGeneratingMatch}
              size="sm"
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
            >
              <Sparkles className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">
                {isGeneratingMatch ? "Finding..." : "Match"}
              </span>
              <span className="ml-1">({favoriteCount})</span>
            </Button>
          )}

          <Button variant="outline" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
          
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <DogIcon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
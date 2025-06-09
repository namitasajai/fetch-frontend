"use client";

import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Trash2 } from "lucide-react";

interface FavoritesSectionProps {
  favoriteCount: number;
  isGeneratingMatch: boolean;
  onGenerateMatch: () => void;
  onClearFavorites: () => void;
}

export default function FavoritesSection({
  favoriteCount,
  isGeneratingMatch,
  onGenerateMatch,
  onClearFavorites,
}: FavoritesSectionProps) {
  if (favoriteCount === 0) {
    return (
      <div className="text-center" data-onboarding="favorites">
        <Heart className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-xs text-muted-foreground">
          Like some dogs to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3" data-onboarding="favorites">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-primary fill-current" />
          <span className="text-sm font-medium">
            Favorites ({favoriteCount})
          </span>
        </div>
        {favoriteCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFavorites}
            className="h-6 px-2 text-xs text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Ready to find your perfect match?
      </p>

      <Button
        onClick={onGenerateMatch}
        disabled={isGeneratingMatch}
        size="sm"
        className="w-full bg-primary hover:bg-primary/90"
        data-onboarding="match-button"
      >
        <Sparkles className="w-4 h-4 mr-2" />
        {isGeneratingMatch ? "Finding Match..." : "Generate Match"}
      </Button>
    </div>
  );
}
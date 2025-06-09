"use client";

import { Button } from "@/components/ui/button";
import { MapPin, Loader2 } from "lucide-react";

interface LocationFilterProps {
  showNearby: boolean;
  locationLoading: boolean;
  nearbyZipCodes: string[];
  loading: boolean;
  onToggleNearby: () => void;
}

export default function LocationFilter({
  showNearby,
  locationLoading,
  nearbyZipCodes,
  loading,
  onToggleNearby,
}: LocationFilterProps) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-medium mb-3">Location</h3>
        
        <Button
          variant={showNearby ? "default" : "outline"}
          onClick={onToggleNearby}
          disabled={loading || locationLoading}
          className="w-full"
          size="sm"
        >
          {locationLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <MapPin className="w-4 h-4" />
          )}
          {locationLoading ? "Finding nearby..." : "Dogs Near Me"}
        </Button>
        
        {showNearby && nearbyZipCodes.length > 0 && (
          <div className="mt-2 text-xs text-muted-foreground">
            Searching in {nearbyZipCodes.length} nearby areas
          </div>
        )}
      </div>
    </div>
  );
}
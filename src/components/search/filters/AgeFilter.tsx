"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AgeFilterProps {
  ageMin: string;
  ageMax: string;
  loading: boolean;
  onAgeMinChange: (age: string) => void;
  onAgeMaxChange: (age: string) => void;
}

export default function AgeFilter({
  ageMin,
  ageMax,
  loading,
  onAgeMinChange,
  onAgeMaxChange,
}: AgeFilterProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-foreground">Age Range</Label>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Min Age</Label>
          <Input
            type="number"
            placeholder="0"
            value={ageMin}
            onChange={(e) => onAgeMinChange(e.target.value)}
            disabled={loading}
            min="0"
            max="20"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Max Age</Label>
          <Input
            type="number"
            placeholder="20"
            value={ageMax}
            onChange={(e) => onAgeMaxChange(e.target.value)}
            disabled={loading}
            min="0"
            max="20"
          />
        </div>
      </div>
    </div>
  );
}
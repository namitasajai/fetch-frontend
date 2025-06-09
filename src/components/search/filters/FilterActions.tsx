"use client";

import { Button } from "@/components/ui/button";
import { Search, RotateCcw } from "lucide-react";

interface FilterActionsProps {
  loading: boolean;
  onSearch: () => void;
  onReset: () => void;
}

export default function FilterActions({
  loading,
  onSearch,
  onReset,
}: FilterActionsProps) {
  return (
    <div className="space-y-2">
      <Button onClick={onSearch} disabled={loading} className="w-full">
        <Search className="w-4 h-4" />
        Search Dogs
      </Button>
      <Button
        variant="outline"
        onClick={onReset}
        disabled={loading}
        className="w-full"
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </Button>
    </div>
  );
}
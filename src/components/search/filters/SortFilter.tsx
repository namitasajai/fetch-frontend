"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortFilterProps {
  sortBy: string;
  loading: boolean;
  onSortChange: (sort: string) => void;
}

export default function SortFilter({
  sortBy,
  loading,
  onSortChange,
}: SortFilterProps) {
  return (
    <div className="flex flex-row justify-between content-center">
      <Label className="text-sm font-medium text-foreground">Sort By</Label>
      <Select value={sortBy} onValueChange={onSortChange} disabled={loading}>
        <SelectTrigger>
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="breed:asc">Breed A-Z</SelectItem>
          <SelectItem value="breed:desc">Breed Z-A</SelectItem>
          <SelectItem value="name:asc">Name A-Z</SelectItem>
          <SelectItem value="name:desc">Name Z-A</SelectItem>
          <SelectItem value="age:asc">Youngest</SelectItem>
          <SelectItem value="age:desc">Oldest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
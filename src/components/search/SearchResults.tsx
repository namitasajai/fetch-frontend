import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, Heart } from "lucide-react";
import { Dog } from "@/types";
import DogCard from "../dog/DogCard";
import Pagination from "./PaginationComponent";

interface SearchResultsProps {
  dogs: Dog[];
  loading: boolean;
  error: string;
  hasSearched: boolean;
  
  totalResults: number;
  currentPage: number;
  totalPages: number;
  favoriteCount: number;
  
  onFavoriteChange: (dogId: string, isFavorite: boolean) => void;
  isFavorite: (dogId: string) => boolean;
  onPageChange: (page: number) => void;
  
  scrollContainerRef: React.RefObject<HTMLElement>;
}

export default function SearchResults({
  dogs,
  loading,
  error,
  hasSearched,
  totalResults,
  currentPage,
  totalPages,
  favoriteCount,
  onFavoriteChange,
  isFavorite,
  onPageChange,
  scrollContainerRef,
}: SearchResultsProps) {
  
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <Card key={i} className="rounded-none py-0 overflow-hidden shadow-none">
          <Skeleton className="aspect-square w-full" />
          <CardContent className="p-4 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-16 space-y-4">
      <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
        <Search className="w-12 h-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground">No dogs found</h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        Try adjusting your search filters to discover more adorable companions
        waiting for their forever home!
      </p>
    </div>
  );

  return (
    <main 
      ref={scrollContainerRef}
      className="flex-1 p-6 overflow-auto bg-gradient-to-br from-primary/5 via-background to-accent/5"
    >
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {hasSearched && !loading && (
        <div className="flex items-center justify-between mb-6" id="results-top">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-foreground">
              {totalResults > 0 ? (
                <>Found {totalResults.toLocaleString()} adorable dogs</>
              ) : (
                <>No dogs found</>
              )}
            </h2>
            {favoriteCount > 0 && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1"
              >
                <Heart className="w-3 h-3 fill-current" />
                {favoriteCount} favorite{favoriteCount !== 1 ? "s" : ""}
              </Badge>
            )}
          </div>

          {totalPages > 1 && (
            <p className="text-sm text-muted-foreground hidden sm:block">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>
      )}

      {/* Content Area */}
      {loading ? (
        <LoadingSkeleton />
      ) : dogs.length > 0 ? (
        <div className="space-y-8">
          <div 
            id="dog-grid"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6"
          >
            {dogs.map((dog) => (
              <DogCard
                key={dog.id}
                dog={dog}
                isFavorite={isFavorite(dog.id)}
                onFavoriteChange={onFavoriteChange}
              />
            ))}
          </div>
          
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            loading={loading}
          />
        </div>
      ) : hasSearched ? (
        <EmptyState />
      ) : null}
    </main>
  );
}
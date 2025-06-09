'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart, MapPin } from 'lucide-react';
import { Dog } from '@/types';

interface DogCardProps {
  dog: Dog;
  isFavorite: boolean;
  onFavoriteChange: (dogId: string, isFavorite: boolean) => void;
}

export default function DogCard({ dog, isFavorite, onFavoriteChange }: DogCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleFavoriteToggle = () => {
    onFavoriteChange(dog.id, !isFavorite);
  };

  return (
    <Card className="group rounded-none py-0 shadow-none overflow-hidden border-0 transition-all duration-300 hover:-translate-y-1 bg-card relative">
      <div className="relative aspect-square overflow-hidden">
        {imageLoading && (
          <Skeleton className="absolute inset-0 w-full h-full" />
        )}
        
        <Image
          src={imageError ? 'https://via.placeholder.com/400x400/e5e7eb/9ca3af?text=Dog+Photo' : dog.img}
          alt={`${dog.name}, a ${dog.age} year old ${dog.breed}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          quality={80}
          placeholder="empty"
          style={{ objectFit: 'cover' }}
          className={`transition-all duration-300 group-hover:scale-105 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageLoading(false);
            setImageError(true);
          }}
          priority={false}
          loading="lazy"
        />
        
        <button
          onClick={handleFavoriteToggle}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 z-10 ${
            isFavorite 
              ? 'bg-destructive shadow-lg' 
              : 'bg-card/90 backdrop-blur-sm hover:bg-card border border-border shadow-md'
          }`}
          aria-label={isFavorite ? `Remove ${dog.name} from favorites` : `Add ${dog.name} to favorites`}
        >
          <Heart 
            className={`w-5 h-5 transition-all duration-200 ${
              isFavorite 
                ? 'text-white fill-white' 
                : 'text-muted-foreground hover:text-destructive'
            }`}
          />
        </button>
      </div>

      <CardContent className="p-4 space-y-3">
        <h3 className="font-semibold text-lg text-foreground truncate">
          {dog.name}
        </h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default" className="bg-primary/10 text-primary-foreground border-primary/20">
            {dog.breed}
          </Badge>
          <Badge variant="outline" className="text-muted-foreground">
            {dog.age} {dog.age === 1 ? 'year' : 'years'} old
          </Badge>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>ZIP {dog.zip_code}</span>
        </div>
      </CardContent>
    </Card>
  );
}
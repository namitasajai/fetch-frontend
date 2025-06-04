'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart, MapPin } from 'lucide-react';
import { Dog } from '@/types';
import { toast } from 'sonner';

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
    if (!isFavorite) {
      toast.success(`Added ${dog.name} to favorites! 💖`);
    } else {
      toast(`Removed ${dog.name} from favorites`);
    }
  };

  return (
    <Card className="group rounded-none py-0 shadow-none overflow-hidden border-0 transition-all duration-300 hover:-translate-y-1 bg-white relative">
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
        
        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteToggle}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 z-10 ${
            isFavorite 
              ? 'bg-red-500 shadow-lg' 
              : 'bg-white/90 backdrop-blur-sm hover:bg-white shadow-md'
          }`}
        >
          <Heart 
            className={`w-5 h-5 transition-all duration-200 ${
              isFavorite 
                ? 'text-white fill-white' 
                : 'text-gray-600 hover:text-red-500'
            }`}
          />
        </button>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Dog Name */}
        <h3 className="font-semibold text-lg text-gray-900 truncate">
          {dog.name}
        </h3>

        {/* Breed and Age */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            {dog.breed}
          </Badge>
          <Badge variant="outline" className="text-gray-600">
            {dog.age} {dog.age === 1 ? 'year' : 'years'} old
          </Badge>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <MapPin className="w-4 h-4" />
          <span>ZIP {dog.zip_code}</span>
        </div>
      </CardContent>
    </Card>
  );
}
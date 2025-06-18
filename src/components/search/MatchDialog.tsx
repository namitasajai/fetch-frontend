import React from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, MapPin, Calendar } from 'lucide-react';
import { Dog } from '@/types';

interface MatchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  matchedDog: Dog | null;
}

export default function MatchDialog({
  isOpen,
  onClose,
  matchedDog
}: MatchDialogProps) {
  if (!matchedDog) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-auto min-w-80 sm:min-w-90 max-w-sm p-0 overflow-hidden bg-background border-none rounded-2xl shadow-xl">
        <DialogTitle className="sr-only">Match Found - {matchedDog.name}</DialogTitle>
        
        {/* Header */}
        <div className="relative p-6 inline-flex justify-center items-center center gap-2 bg-gradient-to-b from-primary/10 to-background">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <h2 className="text-xl font-bold text-foreground">It&apos;s a Match!</h2>
        </div>

        {/* Dog profile */}
        <div className="px-6 pb-6 space-y-4">
          <div className="relative h-60 mx-auto rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={matchedDog.img}
              alt={matchedDog.name}
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-foreground">
              {matchedDog.name}
            </h3>
            <p className="text-base text-muted-foreground font-medium">
              {matchedDog.breed}
            </p>
            
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{matchedDog.age} {matchedDog.age === 1 ? 'year' : 'years'} old</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{matchedDog.zip_code}</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <Button
              onClick={onClose}
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              Keep Searching
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
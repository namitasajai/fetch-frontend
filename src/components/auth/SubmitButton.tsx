import { Button } from "@/components/ui/button";
import { Loader2, Heart } from 'lucide-react';

interface SubmitButtonProps {
  loading: boolean;
  loadingText?: string;
  defaultText?: string;
}

export default function SubmitButton({ 
  loading,
  loadingText = "Signing you in...",
  defaultText = "Start Searching"
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      className="w-full h-11 text-base font-medium"
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          <Heart className="h-6 w-6 stroke-[2.5px]" />
          {defaultText}
        </>
      )}
    </Button>
  );
}
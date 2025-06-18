import { Alert, AlertDescription } from '@/components/ui/alert';

interface ErrorAlertProps {
  error: string;
}

export default function ErrorAlert({ error }: ErrorAlertProps) {
  if (!error) return null;

  return (
    <Alert className="border-none p-0" variant="destructive">
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}

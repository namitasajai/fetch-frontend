'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoginFormFields from './LoginFormFields';

interface LoginFormCardProps {
  title?: string;
  description?: string;
}

export default function LoginFormCard({ 
  title = "Welcome, let's log you in!",
  description = "Discover new companions waiting for their forever home"
}: LoginFormCardProps) {
  return (
    <Card className="border shadow-xl bg-card/90 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold text-center text-card-foreground">
          {title}
        </CardTitle>
        <CardDescription className="text-center">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <LoginFormFields />
      </CardContent>
    </Card>
  );
}
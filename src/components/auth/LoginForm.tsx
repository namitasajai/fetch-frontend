'use client';

import LoginHeader from './LoginHeader';
import LoginFormCard from './LoginFormCard';
import LoginFooter from './LoginFooter';

export default function LoginForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/10 p-4">
      <div className="w-full max-w-md space-y-8">
        <LoginHeader />
        <LoginFormCard />
        <LoginFooter />
      </div>
    </div>
  );
}
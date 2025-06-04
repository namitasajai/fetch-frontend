'use client';

import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import SearchPage from '@/components/search/SearchPage';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <SearchPage /> : <LoginForm />;
}
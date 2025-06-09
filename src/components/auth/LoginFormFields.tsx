'use client';

import { useState } from 'react';
import FormField from './FormField';
import SubmitButton from './SubmitButton';
import ErrorAlert from './ErrorAlert';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function LoginFormFields() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const success = await login(name.trim(), email.trim());
      
      if (success) {
        toast.success('Welcome! Let\'s find your perfect dog!');
      } else {
        setError('Login failed. Please try again.');
        toast.error('Login failed');
      }
    } catch {
      setError('Something went wrong. Please try again.');
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        id="name"
        label="Your Name"
        type="text"
        placeholder="Enter your full name"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        disabled={loading}
      />
      
      <FormField
        id="email"
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        disabled={loading}
      />

      <ErrorAlert error={error} />

      <SubmitButton loading={loading} />
    </form>
  );
}
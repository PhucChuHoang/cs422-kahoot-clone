'use client';
import { SignInForm } from '@/components/sign_in_form';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { isTokenExpired } from '@/lib/utils';

export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token && !isTokenExpired(token)) {
      router.replace('/home');
    }
    Cookies.remove('token');
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignInForm />
    </div>
  );
}

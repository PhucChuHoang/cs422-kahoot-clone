'use client';

import { SignInForm } from '@/components/sign_in_form';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    if (Cookies.get('token')) {
      router.replace('/home');
    }
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignInForm />
    </div>
  );
}

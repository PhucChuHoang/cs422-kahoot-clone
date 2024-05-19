'use client';
import { SignInForm } from '@/components/sign_in_form';
import { useRouter } from 'next/navigation';
import { isTokenExpired } from '@/lib/utils';
import { useAppSelector } from '@/lib';

export default function SignInPage() {
  const router = useRouter();
  const token = useAppSelector((state) => state.user.token);

  if (token) {
    if (!isTokenExpired(token)) {
      router.replace('/home');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignInForm />
    </div>
  );
}

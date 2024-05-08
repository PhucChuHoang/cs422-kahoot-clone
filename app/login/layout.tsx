import { ReactNode } from 'react';
import GraduateHat from '@/public/graduate_hat';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className=" flex">
      <div className="flex-1">{children}</div>
      <div className="flex min-h-screen w-1/2 items-center justify-center bg-gray-100 bg-cover bg-center">
        <GraduateHat />
      </div>
    </main>
  );
}

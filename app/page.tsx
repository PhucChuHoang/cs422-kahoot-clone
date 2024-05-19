'use client';
import { LandingForm } from '@/components/landing_form';
import { useInitToken } from '@/lib';

export default function LandingPage() {
  useInitToken();

  return (
    <div>
      <div className="">
        <LandingForm />
      </div>
    </div>
  );
}

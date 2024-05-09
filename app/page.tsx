import { LandingHeaderForm } from '@/components/landing_header_form';
import { LandingForm } from '@/components/landing_form';

export default function LandingPage() {
  return (
    <div>
      <div className="flex bg-background">
        <LandingHeaderForm />
      </div>

      <div className="">
        <LandingForm />
      </div>
    </div>
  );
}

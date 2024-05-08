import { GameHeaderForm } from '@/components/game_header_form';
import { GameMainForm } from '@/components/game_main_form';

export default function GamePage() {
  return (
    <div>
      <div className="flex bg-background">
        <GameHeaderForm />
      </div>

      <div className="flex h-screen w-screen justify-between">
        <GameMainForm />
      </div>
    </div>
  );
}

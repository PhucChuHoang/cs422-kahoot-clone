'use client';

import { GameHeaderForm } from '@/components/game_header_form';
import { GameMainForm } from '@/components/game_main_form';
import { useState } from 'react';
import { WatingRoomForm } from '@/components/wating_room_form';

export default function GamePage() {
  const [gameStart, setGameStart] = useState(false);

  if (gameStart) {
    setGameStart(false);
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
  } else {
    return (
      <div>
        <div className="flex bg-background">
          <WatingRoomForm />
        </div>
      </div>
    );
  }
}

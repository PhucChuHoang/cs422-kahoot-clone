'use client';

import { GameMainForm } from '@/components/game_main_form';
import { useState } from 'react';
import { useEffect } from 'react';
import { WatingRoomForm } from '@/components/wating_room_form';
import { Button } from '@/components/ui/button';
import { io, Socket } from 'socket.io-client';

export default function GamePage() {
  const [gameStart, setGameStart] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      socket?.disconnect();
      setSocket(null);
      console.log('User is leaving the page');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [socket]);

  if (gameStart) {
    return (
      <div>
        <div className="flex h-screen w-screen justify-between">
          <GameMainForm />
        </div>
      </div>
    );
  } else {
    if (!socket) {
      const newSocket = io('http://127.0.0.1:5000');
      setSocket(newSocket);
    }

    return (
      <div className="flex flex-col gap-y-10">
        <div>
          <WatingRoomForm />
        </div>

        <div className="flex h-full w-full justify-center">
          <Button
            onClick={() => setGameStart(true)}
            className="border-2 border-primary bg-transparent font-bold text-primary hover:bg-yellow-500 "
          >
            Start Game
          </Button>
        </div>
      </div>
    );
  }
}

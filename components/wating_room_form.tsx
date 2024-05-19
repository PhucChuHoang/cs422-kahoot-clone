'use client';

import React from 'react';
import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/lib';

function ShowPlayers({ players }: { players: string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ref]);

  return (
    <div className="grid grid-cols-10 gap-4">
      {players.map((player, index) => (
        <Card
          key={index}
          className="flex flex-col justify-between bg-purple-500"
        >
          <CardContent>
            <h1 className="bg-purple flex text-2xl font-bold text-white">
              {player}
            </h1>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export const WatingRoomForm = () => {
  const players = useAppSelector((state) => state.data.currentPlayerList);
  const pathName = usePathname();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-10">
      <Card className="flex w-1/2 flex-col justify-center">
        <CardHeader>
          <h1 className="flex justify-center text-xl font-bold">GAME ID:</h1>
        </CardHeader>
        <CardContent>
          <h1 className="flex justify-center text-5xl font-bold">
            {pathName.split('/').pop()}
          </h1>
        </CardContent>
      </Card>

      <div className="flex flex-col justify-center text-xl">
        <h1>Wating for player...</h1>
        <h1>Total player: {players?.length}</h1>
      </div>

      <ShowPlayers players={players ?? []} />
    </div>
  );
};

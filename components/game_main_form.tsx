'use client';

import React, { useState } from 'react';

import { Card, CardContent, CardHeader } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';

const total = 10;

export const GameMainForm = () => {
  const [num, setNum] = useState(0);
  const [answered, setAnswered] = useState(false);

  async function onSubmit() {
    if (answered) {
      return;
    }
    setNum((num) => num + 1);
    if (num === total) {
      setAnswered(true);
    }
  }

  return (
    <div className="h-full w-full space-y-10">
      <Progress value={(num / total) * 100} />

      <div className="w-full justify-center">
        <Card className="bg-yellow-400">
          <CardHeader className="items-center text-white">
            <h1 className="text-xl font-bold">Question</h1>
          </CardHeader>
          <CardContent className="flex justify-center text-xl text-white">
            <div className="items-center">
              <h1>
                This is KSante, a champion with 4,700 HP, 329 Armor, and 201 MR,
                has Unstoppable, a Shield, and goes over walls. Has Airborne,
                and the cooldown is only 1 second too. It costs 15 Mana. The W
                CD is even refreshed when he transforms. He has true damage on
                his passive. Then, when he stacks Armor and MR, he gets Ability
                Haste too, Ability Haste to his Q, and his spell casting speeds
                up. Then, he has an AD ratio, so his W…AAAAAAAAAAAAAAA
              </h1>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mx-20 flex justify-between gap-10">
        <Button
          onClick={onSubmit}
          className="h-20 flex-grow rounded bg-red-400 px-4 py-2 text-xl font-bold text-white hover:bg-red-500"
        >
          Answer1
        </Button>

        <Button
          onClick={onSubmit}
          className="h-20 flex-grow rounded bg-blue-400 px-4 py-2 text-xl font-bold text-white hover:bg-blue-500"
        >
          Answer2
        </Button>
      </div>

      <div className="mx-20 flex justify-between gap-10">
        <Button
          onClick={onSubmit}
          className="h-20 flex-grow rounded bg-yellow-400 px-4 py-2 text-xl font-bold text-white hover:bg-yellow-500"
        >
          Answer3
        </Button>

        <Button
          onClick={onSubmit}
          className="h-20 flex-grow rounded bg-green-400 px-4 py-2 text-xl font-bold text-white hover:bg-green-500"
        >
          Answer4
        </Button>
      </div>
    </div>
  );
};

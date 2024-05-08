'use client';

import React from 'react';

import { Card, CardContent, CardHeader } from './ui/card';
import { Progress } from './ui/progress';

export const GameMainForm = () => {
  return (
    <div className="w-full space-y-10">
      <Progress value={50} />

      <div className="h-full w-full justify-between">
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
    </div>
  );
};

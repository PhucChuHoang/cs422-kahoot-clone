'use client';

import React, { useState } from 'react';

import { Card, CardContent, CardHeader } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { useAppSelector } from '@/lib';

const total = 10;

export const GameMainForm = () => {
  const [num, setNum] = useState(0);
  const [answered, setAnswered] = useState(false);

  const currentQuestion = useAppSelector((state) => state.game.currentQuestion);
  const answers = useAppSelector(
    (state) => state.game.currentQuestion?.options,
  );

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
              <h1>{currentQuestion ? currentQuestion.text : 'No question'}</h1>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mx-20 flex justify-between gap-10">
        <Button
          onClick={onSubmit}
          className="h-20 flex-grow rounded bg-red-400 px-4 py-2 text-xl font-bold text-white hover:bg-red-500"
        >
          {answers?.[0]?.text ?? ''}
        </Button>

        <Button
          onClick={onSubmit}
          className="h-20 flex-grow rounded bg-blue-400 px-4 py-2 text-xl font-bold text-white hover:bg-blue-500"
        >
          {answers?.[1]?.text ?? ''}
        </Button>
      </div>

      {(answers?.length ?? 0) > 2 && (
        <div className="mx-20 flex justify-between gap-10">
          {(answers?.length ?? 0) > 2 && (
            <Button
              onClick={onSubmit}
              className="h-20 flex-grow rounded bg-yellow-400 px-4 py-2 text-xl font-bold text-white hover:bg-yellow-500"
            >
              {answers?.[2]?.text ?? ''}
            </Button>
          )}

          {(answers?.length ?? 0 > 3) && (
            <Button
              onClick={onSubmit}
              className="h-20 flex-grow rounded bg-green-400 px-4 py-2 text-xl font-bold text-white hover:bg-green-500"
            >
              {answers?.[3]?.text ?? ''}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

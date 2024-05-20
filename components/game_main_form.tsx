'use client';

import React, { useState } from 'react';

import { Card, CardContent, CardHeader } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { setHasAnswer, useAppDispatch, useAppSelector } from '@/lib';
import { Socket } from 'socket.io-client';
import { usePathname } from 'next/navigation';

export const GameMainForm = (socket: { socket: Socket }) => {
  const [num, setNum] = useState(0);
  const [currentPoint, setCurrentPoint] = useState(0);
  const dispatch = useAppDispatch();

  const pathName = usePathname().split('/').pop();
  const username = useAppSelector((state) => state.user.username);
  const host = useAppSelector((state) => state.game.currentHost);
  const total = useAppSelector((state) => state.game.totalQuestions);
  const currentQuestion = useAppSelector((state) => state.game.currentQuestion);
  const hasAnswer = useAppSelector((state) => state.game.hasAnswer);
  const answers = useAppSelector(
    (state) => state.game.currentQuestion?.options,
  );

  async function onSubmit(option: number) {
    if (!hasAnswer) {
      if (answers?.[option]?.is_correct) {
        setCurrentPoint(currentPoint + 1);
      }

      setNum(num + 1);
      dispatch(setHasAnswer(true));
      socket.socket.emit('submit_answer', {
        session_code: pathName,
        question_id: currentQuestion?.id,
        option_id: answers?.[option]?.id,
      });
    }
  }

  return (
    <div className="h-full w-full space-y-10">
      <Progress value={(num / total) * 100} />

      <div className="flex w-auto items-center justify-center">
        <Card>
          <CardHeader className="items-center">
            <h1 className="font-bold">Score: {currentPoint} </h1>
          </CardHeader>
        </Card>
      </div>

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
          onClick={() => onSubmit(0)}
          className="h-20 flex-grow rounded bg-red-400 px-4 py-2 text-xl font-bold text-white hover:bg-red-500 disabled:bg-red-200"
          disabled={hasAnswer && !answers?.[0]?.is_correct}
        >
          {answers?.[0]?.text ?? ''}
        </Button>

        <Button
          onClick={() => onSubmit(1)}
          className="h-20 flex-grow rounded bg-blue-400 px-4 py-2 text-xl font-bold text-white hover:bg-blue-500 disabled:bg-blue-200"
          disabled={hasAnswer && !answers?.[1]?.is_correct}
        >
          {answers?.[1]?.text ?? ''}
        </Button>
      </div>

      {(answers?.length ?? 0) > 2 && (
        <div className="mx-20 flex justify-between gap-10">
          {(answers?.length ?? 0) > 2 && (
            <Button
              onClick={() => onSubmit(2)}
              className="h-20 flex-grow rounded bg-yellow-400 px-4 py-2 text-xl font-bold text-white hover:bg-yellow-500
              disabled:bg-yellow-200"
              disabled={hasAnswer && !answers?.[2]?.is_correct}
            >
              {answers?.[2]?.text ?? ''}
            </Button>
          )}

          {(answers?.length ?? 0 > 3) && (
            <Button
              onClick={() => onSubmit(3)}
              className="h-20 flex-grow rounded bg-green-400 px-4 py-2 text-xl font-bold text-white hover:bg-green-500
              disabled:bg-green-200"
              disabled={hasAnswer && !answers?.[3]?.is_correct}
            >
              {answers?.[3]?.text ?? ''}
            </Button>
          )}
        </div>
      )}

      {username == host && (
        <div className="flex w-full items-end justify-end">
          <Button>Next Question</Button>
        </div>
      )}
    </div>
  );
};

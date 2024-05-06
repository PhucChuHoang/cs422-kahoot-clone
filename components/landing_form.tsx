'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import Image from 'next/image';
import { Button } from './ui/button';
import { AlertDialog, AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import { ScorePopup } from './score_popup';

export const LandingForm = () => {
  return (
    <div className="margin mx-10 flex flex-row items-center justify-between">
      <div className="w-50 relative left-10 flex h-full flex-col items-start">
        <Card className="flex border border-white shadow-white">
          <CardContent>
            <CardHeader className="items-start">
              <h1 className="text-4xl font-semibold">Learn</h1>
              <h1 className="text-4xl font-semibold">new concepts</h1>
              <h1 className="text-4xl font-semibold">for each question</h1>
              <h3 className="text-base text-gray-400">
                | Get a detailed explanation for each question
              </h3>
            </CardHeader>
          </CardContent>
        </Card>
        <div className="relative left-12">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-yellow-400 shadow-sm shadow-yellow-100 hover:bg-yellow-500">
                Start game
              </Button>
            </AlertDialogTrigger>
            <ScorePopup score={10} />
          </AlertDialog>
          <Button className="bg-transparent text-yellow-200 hover:bg-transparent hover:text-yellow-300">
            know more
          </Button>
        </div>
      </div>
      <Image
        src="/image/Landing.png"
        alt="Landing"
        width="600"
        height="600"
        className="relative"
      />
    </div>
  );
};

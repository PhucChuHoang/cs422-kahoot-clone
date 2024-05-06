'use client';

import React, { useState } from 'react';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader } from './ui/card';
import Image from 'next/image';
import { Button } from './ui/button';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import { ScorePopup } from './score_popup';

export const LandingForm = () => {
    const [width, setWidth] = useState(0);

    return (
        <div className="flex flex-row items-center justify-between margin mx-10">
            <div className="flex flex-col relative left-10 items-start w-50 h-full">
                <Card className="flex border border-white shadow-white">
                    <CardContent>
                        <CardHeader className="items-start">
                            <h1 className="text-4xl font-semibold">Learn</h1>
                            <h1 className="text-4xl font-semibold">new concepts</h1>
                            <h1 className="text-4xl font-semibold">for each question</h1> 
                            <h3 className="text-base text-gray-400">| Get a detailed explanation for each question</h3>
                        </CardHeader>
                    </CardContent>
                </Card>
                <div className="relative left-12">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="bg-yellow-400 hover:bg-yellow-500 shadow-sm shadow-yellow-100">
                                Start game
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <ScorePopup score={10} />
                        </AlertDialogContent>
                    </AlertDialog>
                    <Button className="bg-transparent text-yellow-200 hover:bg-transparent hover:text-yellow-300">know more</Button>
                </div>
            </div>
            <Image
                src="/image/Landing.png"
                alt="Landing"
                width= "600"
                height="600"
                className="relative"
            />
        </div>
    );
}
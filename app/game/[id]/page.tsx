'use client';

import { GameMainForm } from '@/components/game_main_form';
import { useState } from 'react';
import { useEffect } from 'react';
import { WatingRoomForm } from '@/components/wating_room_form';
import { Button } from '@/components/ui/button';
import { io, Socket } from 'socket.io-client';
import {
  setCurrentPlayerList,
  setGameQuestion,
  setHost,
  setTotalQuestions,
  useAppDispatch,
  useAppSelector,
} from '@/lib';
import { usePathname } from 'next/navigation';

export default function GamePage() {
  const [gameStart, setGameStart] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const dispatch = useAppDispatch();

  const username = useAppSelector((state) => state.user.username);
  const host = useAppSelector((state) => state.game.currentHost);
  const token = useAppSelector((state) => state.user.token);
  const pathName = usePathname().split('/').pop();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      socket?.emit('leave_session', { session_code: pathName });
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
          {socket && <GameMainForm socket={socket} />}
        </div>
      </div>
    );
  } else {
    if (!socket) {
      const newSocket = io('http://127.0.0.1:5000', {
        extraHeaders: {
          Authorization: `Bearer ` + token,
        },
      });
      setSocket(newSocket);
    }

    socket?.on('connect', () => {
      socket.emit('join_session', { session_code: pathName });
    });

    socket?.on(
      'session_update',
      (data: { message: string; host: string; participants: string[] }) => {
        const new_players = data.participants;
        dispatch(setHost(data.host));
        dispatch(setCurrentPlayerList(new_players));
      },
    );

    socket?.on(
      'next_question',
      (data: {
        question_id: number;
        question_text: string;
        total: number;
        options: { id: number; text: string; is_correct: boolean }[];
      }) => {
        if (!gameStart) {
          setGameStart(true);
        }
        dispatch(setTotalQuestions(data.total));
        const questionOptions = data.options.map((option) => {
          return {
            id: option.id.toString(),
            question_id: data.question_id.toString(),
            text: option.text,
            is_correct: option.is_correct,
          };
        });

        dispatch(
          setGameQuestion({
            id: data.question_id.toString(),
            quiz_id: data.question_id.toString(),
            text: data.question_text,
            options: questionOptions,
          }),
        );
      },
    );

    return (
      <div className="flex flex-col gap-y-10">
        <div>
          <WatingRoomForm />
        </div>

        <div className="flex h-full w-full justify-center">
          {username == host && (
            <Button
              onClick={() => {
                socket?.emit('start_quiz', { session_code: pathName });
              }}
              className="border-2 border-primary bg-transparent font-bold text-primary hover:bg-yellow-500 "
            >
              Start Game
            </Button>
          )}
        </div>
      </div>
    );
  }
}

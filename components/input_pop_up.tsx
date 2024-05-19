'use-client';

import * as popup from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { QuizGameService } from '@/services/QuizGameServices';
import { useAppSelector } from '@/lib';

export const InputPopup = (placeholder: { name: string; roomID: string }) => {
  const router = useRouter();
  const [currentRoomID, setCurrentRoomID] = useState<string>('');
  const token = useAppSelector((state) => state.user.token);

  const quizGameService = QuizGameService.getInstance();

  return (
    <popup.AlertDialogContent>
      <popup.AlertDialogHeader className="bg-yellow-300">
        <popup.AlertDialogTitle className="flex justify-center text-4xl font-semibold text-white">
          Enter Game
        </popup.AlertDialogTitle>
      </popup.AlertDialogHeader>
      <popup.AlertDialogDescription className="flex flex-col justify-center gap-y-5">
        <input
          className="border border-black text-center"
          type="text"
          placeholder={placeholder.roomID}
          onChange={(e) => setCurrentRoomID(e.target.value)}
        />
      </popup.AlertDialogDescription>
      <popup.AlertDialogFooter>
        <popup.AlertDialogAction
          className="bg-yellow-300 hover:bg-yellow-400"
          onClick={async () => {
            try {
              const response = await quizGameService.connect({
                session_code: currentRoomID,
                access_token: token ?? '',
              });

              if (response == 'Joined session successfully') {
                router.replace(`/game/${currentRoomID}`);
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Enter
        </popup.AlertDialogAction>
      </popup.AlertDialogFooter>
    </popup.AlertDialogContent>
  );
};

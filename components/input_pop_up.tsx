'use-client';

import * as popup from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const InputPopup = () => {
  const router = useRouter();
  const [currentInput, setCurrentInput] = useState<string>('');

  return (
    <popup.AlertDialogContent>
      <popup.AlertDialogHeader className="bg-yellow-300">
        <popup.AlertDialogTitle className="flex justify-center text-4xl font-semibold text-white">
          Enter room ID
        </popup.AlertDialogTitle>
      </popup.AlertDialogHeader>
      <popup.AlertDialogDescription className="flex justify-center">
        <input
          className="border border-black"
          type="text"
          placeholder="Room ID"
          onChange={(e) => setCurrentInput(e.target.value)}
        />
      </popup.AlertDialogDescription>
      <popup.AlertDialogFooter>
        <popup.AlertDialogAction
          className="bg-yellow-300 hover:bg-yellow-400"
          onClick={() => router.replace(`/game/${currentInput}`)}
        >
          Enter
        </popup.AlertDialogAction>
      </popup.AlertDialogFooter>
    </popup.AlertDialogContent>
  );
};

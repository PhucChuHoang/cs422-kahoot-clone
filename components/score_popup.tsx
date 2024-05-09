'use-client';

import * as popup from '@/components/ui/alert-dialog';

export const ScorePopup = ({ score }: { score: number }) => {
  return (
    <popup.AlertDialogContent>
      <popup.AlertDialogHeader className="bg-yellow-300">
        <popup.AlertDialogTitle className="flex justify-center text-4xl font-semibold text-white">
          Your score
        </popup.AlertDialogTitle>
      </popup.AlertDialogHeader>
      <popup.AlertDialogDescription className="flex justify-center">
        You got {score} points
      </popup.AlertDialogDescription>
      <popup.AlertDialogFooter>
        <popup.AlertDialogAction className="bg-yellow-300 hover:bg-yellow-400">
          Complete
        </popup.AlertDialogAction>
      </popup.AlertDialogFooter>
    </popup.AlertDialogContent>
  );
};

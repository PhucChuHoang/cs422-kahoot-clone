"use-client"

import * as popup from "@/components/ui/alert-dialog"

export const ScorePopup = ({ score }) => {
    return (
        <popup.AlertDialogContent>
            <popup.AlertDialogHeader>
                <h1 className="text-4xl font-semibold">Your score is {score}</h1>
            </popup.AlertDialogHeader>
        </popup.AlertDialogContent>
    );
}

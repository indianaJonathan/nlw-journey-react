import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestsProps {
    emailsToInvite: string[];
    openGuestsModal: () => void;
    openConfirmTripModal: () => void;
}

export function InviteGuests({
    emailsToInvite,
    openGuestsModal,
    openConfirmTripModal,
}: InviteGuestsProps) {
    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <button
              type="button"
              className="flex items-center gap-2 flex-1"
              onClick={openGuestsModal}
            >
              <UserRoundPlus className="size-5 text-zinc-400" />
              {emailsToInvite.length > 0 ? (
                <span className="bg-transparent text-lg outline-none flex-1 text-left text-zinc-400">
                  {emailsToInvite.length} pessoa{emailsToInvite.length > 1 ? "s" : ""} convidada{emailsToInvite.length > 1 ? "s" : ""}
                </span>
                ) : (
                <span className="bg-transparent text-lg text-zinc-100 outline-none flex-1 text-left">
                  Quem estará na viagem?
                </span>
                )
              }
            </button>
            <Button
              type="button"
              variant="primary"
              onClick={openConfirmTripModal}
            >
              Confirmar viagem
              <ArrowRight className="size-5" />
            </Button>
        </div>
    );
}

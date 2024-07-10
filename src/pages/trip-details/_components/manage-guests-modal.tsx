import { AtSign, CircleCheck, CircleDashed, Crown, Plus, Trash } from "lucide-react";
import { Modal } from "../../../components/modal";
import { Participant } from "./guests";
import { Button } from "../../../components/button";
import { FormEvent } from "react";
import { api } from "../../../lib/axios";
import { useParams } from "react-router-dom";

interface ManagerGuestsModalProps {
    guests: Participant[];
    closeModal: () => void;
}

export function ManagerGuestsModal({ guests,closeModal }: ManagerGuestsModalProps) {
    const { tripId } = useParams();
    async function handleAddGuest(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const email = data.get("email")?.toString();
        if (!email) return;
        await api.post(`/trips/${tripId}/invites`, {
            email
        });
        closeModal();
    }

    async function handleRemoveGuest(guestId: string) {
        await api.delete(`/trips/${tripId}/participants/${guestId}`);
        closeModal();
    }

    return (
        <Modal
            title="Gerenciar convidados"
            onClose={closeModal}
        >
            { guests.map((guest) => (
                <div key={`guest-${guest.id}`} className="flex items-center gap-3 px-2.5 py-1.5 rounded-md hover:bg-zinc-800 group">
                  <div className="flex items-center justify-between flex-1">
                    <div className="space-y-1">
                        <span className="block font-medium text-zinc-100">{ guest.name }</span>
                        <span className="block text-sm text-zinc-400">{ guest.email }</span>
                    </div>
                    { guest.is_confirmed ? <CircleCheck className="text-lime-300 size-5 shrink-0" /> : <CircleDashed className="text-zinc-400 size-5 shrink-0" /> }
                  </div>
                  { !guest.is_owner ? (
                    <Button
                        variant="secondary"
                        onClick={() => handleRemoveGuest(guest.id)}
                        title="Remover convidado"
                    >
                      <Trash className="text-zinc-400 size-4 shrink-0" />
                    </Button>
                  ) : (
                    <div className="bg-zinc-700 group-hover:bg-zinc-900 rounded-lg px-5 py-2 font-medium flex items-center justify-center gap-2" title="Organizador">
                        <Crown className="text-zinc-400 size-4 shrink-0" />
                    </div>
                  )}
                </div>
            )) }
            <div className="h-px bg-zinc-700"/>
            <form onSubmit={handleAddGuest} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <div className="px-2 flex items-center gap-2 flex-1">
                <AtSign className="size-4 text-zinc-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Digite o e-mail do convidado"
                  className="bg-transparent text-lg placehoder-zinc-400 outline-none flex-1"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
              >
                Convidar
                <Plus className="size-5" />
              </Button>
            </form>
        </Modal>
    );
}

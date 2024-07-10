import { AtSign, CircleCheck, CircleDashed, Plus } from "lucide-react";
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

    return (
        <Modal
            title="Gerenciar convidados"
            onClose={closeModal}
        >
            { guests.map((guest) => (
                <div key={`guest-${guest.id}`} className="flex items-center justify-between px-2.5 py-1.5 rounded-md hover:bg-zinc-800">
                    <div className="space-y-1">
                        <span className="block font-medium text-zinc-100">{ guest.name }</span>
                        <span className="block text-sm text-zinc-400">{ guest.email }</span>
                    </div>
                    { guest.is_confirmed ? <CircleCheck className="text-lime-300 size-5 shrink-0" /> : <CircleDashed className="text-zinc-400 size-5 shrink-0" /> }
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

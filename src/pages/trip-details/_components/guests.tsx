import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../../components/button";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import { ManagerGuestsModal } from "./manage-guests-modal";

export interface Participant {
    id: string;
    name: string | null;
    email: string;
    is_confirmed: boolean;
    is_owner: boolean;
}

export function Guests() {
    const { tripId } = useParams();

    const [participants, setParticipants] = useState<Participant[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadParticipants = useCallback(async () => {
        const response = await api.get(`/trips/${tripId}/participants`);
        setParticipants(response.data.participants);
    }, [tripId]);

    useEffect(() => {
        loadParticipants();
    }, [loadParticipants]);

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>
            <div className="space-y-5">
                {participants.map(participant => (
                    <div key={participant.id} className="flex items-center justify-between gap-4 p-1 group rounded-md cursor-pointer select-none hover:bg-zinc-800">
                        <div className="space-y-1.5">
                            <span className="block font-medium text-zinc-100">{participant.name}</span>
                            <span className="block text-sm text-zinc-400 truncate group-hover:text-zinc-200">{participant.email}</span>
                        </div>
                        { participant.is_confirmed ? <CircleCheck className="text-lime-300 size-5 shrink-0" /> : <CircleDashed className="text-zinc-400 size-5 shrink-0" /> }
                    </div>
                ))}
            </div>
            <Button
                type="button"
                variant="secondary"
                size="full"
                onClick={() => setIsModalOpen(true)}
            >
                <UserCog className="size-5" />
                Gerenciar convidados
            </Button>
            {isModalOpen && (
                <ManagerGuestsModal
                    guests={participants}
                    closeModal={() => {
                        loadParticipants();
                        setIsModalOpen(false);
                    }}
                />
            )}
        </div>
    );
}

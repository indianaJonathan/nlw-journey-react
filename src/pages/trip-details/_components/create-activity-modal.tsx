import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../../components/button";
import { FormEvent } from "react";
import { api } from "../../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateActivityModalProps {
    tripStart: Date;
    tripEnd: Date;
    closeModal: () => void;
}

export function CreateActivityModal ({
    tripStart,
    tripEnd,
    closeModal
}: CreateActivityModalProps) {
    const { tripId } = useParams();

    async function createActivity(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const title = data.get("title")?.toString();
        const occurs_at_value = data.get("occurs_at")?.toString();
        if (!occurs_at_value) return;
        const occurs_at = new Date(occurs_at_value);

        await api.post(`/trips/${tripId}/activities`, {
            title,
            occurs_at
        });

        closeModal();
    }

    return (
        <div className="fixed inset-0 w-full h-screen bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
                    <button type="button" onClick={closeModal}>
                        <X className="size-5 text-zinc-400" />
                    </button>
                </div>
                <p className="text-sm text-zinc-400">
                    Todos os convidados podem visualizar as atividades.
                </p>
                </div>
                <form onSubmit={createActivity} className="space-y-3">
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 flex-1">
                        <Tag className="size-4 text-zinc-400" />
                        <input
                            type="text"
                            name="title"
                            placeholder="Qual a atividade?"
                            className="bg-transparent text-lg placehoder-zinc-400 outline-none flex-1"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 flex-1">
                            <Calendar className="size-4 text-zinc-400" />
                            <input
                                type="datetime-local"
                                name="occurs_at"
                                placeholder="Data e horário da atividade"
                                className="bg-transparent text-lg placehoder-zinc-400 outline-none flex-1"
                                min={tripStart.toISOString().substring(0, 11).concat("00:00:00")}
                                max={tripEnd.toISOString().substring(0, 11).concat("23:59:59")}
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        size="full"
                    >
                        Salvar atividade
                    </Button>
                </form>
            </div>
        </div>
    );
}

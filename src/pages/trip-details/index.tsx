import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {  Plus } from "lucide-react";

import { Guests } from "./_components/guests";
import { Button } from "../../components/button";
import { Activities } from "./_components/activities";
import { ImportantLinks } from "./_components/important-links";
import { CreateActivityModal } from "./_components/create-activity-modal";
import { DestinationAndDateHeader, Trip } from "./_components/destination-and-date-header";

import { api } from "../../lib/axios";

export interface Activity {
    date: string;
    activities: {
        id: string;
        title: string;
        occurs_at: string;
    }[]
}

export function TripDetailsPage() {
    const { tripId } = useParams();

    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [trip, setTrip] = useState<Trip>();

    const loadData = useCallback(async () => {
        const response = await api.get(`/trips/${tripId}/activities`);
        setActivities(response.data.activities);
        const responseTrip = await api.get(`/trips/${tripId}`);
        setTrip(responseTrip.data.trip);
    }, [tripId]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    function closeModal() {
        setIsCreateActivityModalOpen(false);
        loadData();
    }

    if (!trip) return (
        <div className="w-full h-screen flex flex-col gap-4 items-center justify-center">
            <img src="/Logo.svg" />
            <div className="p-4 flex flex-col gap-3 items-center justify-center rounded-md bg-zinc-800">
                <span className="text-zinc-400 font-semibold text-3xl">Viagem não encontrada</span>
                <p className="text-zinc-500">Pode ser que a viagem tenha sido cancelada ou o link tenha expirado.</p>
                <a href="/">
                    <div className="rounded-md ring-1 ring-lime-300 px-2.5 py-1.5 hover:bg-lime-300 group">
                        <span className="text-lime-300 font-semibold group-hover:text-zinc-950">
                            Clique aqui para voltar
                        </span>
                    </div>
                </a>
            </div>
        </div>
    )

    return (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
            <DestinationAndDateHeader />
            <main className="flex gap-16 px-6">
                <div className="flex-1 space-y-16">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold">
                            Atividades
                        </h2>
                        <Button
                            type="button"
                            variant="primary"
                            onClick={() => setIsCreateActivityModalOpen(true)}
                        >
                            <Plus className="size-5" />
                            Cadastrar atividade
                        </Button>
                    </div>
                    <Activities activities={activities} />
                </div>
                <div className="w-80 space-y-6">
                    <ImportantLinks />
                    <div className="w-full h-px bg-zinc-800" />
                    <Guests />
                </div>
            </main>
            {isCreateActivityModalOpen && (
                <CreateActivityModal
                    tripStart={new Date(trip!.starts_at)}
                    tripEnd={new Date(trip!.ends_at)}
                    closeModal={closeModal} />
            )}
        </div>
    )
}

import { useCallback, useEffect, useState } from "react";

import {  Plus } from "lucide-react";

import { Guests } from "./_components/guests";
import { Button } from "../../components/button";
import { Activities } from "./_components/activities";
import { ImportantLinks } from "./_components/important-links";
import { CreateActivityModal } from "./_components/create-activity-modal";
import { DestinationAndDateHeader } from "./_components/destination-and-date-header";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

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

    const loadActivities = useCallback(async () => {
        const response = await api.get(`/trips/${tripId}/activities`);
        setActivities(response.data.activities);
    }, [tripId]);

    useEffect(() => {
        loadActivities();
    }, [loadActivities]);

    function closeModal() {
        setIsCreateActivityModalOpen(false);
        loadActivities();
    }

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
            {isCreateActivityModalOpen && <CreateActivityModal closeModal={closeModal} />}
        </div>
    )
}

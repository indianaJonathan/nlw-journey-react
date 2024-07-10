import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";
import { useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import { useParams } from "react-router-dom";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

interface Trip {
    id: string;
    destination: string;
    starts_at: string;
    ends_at: string;
    is_confirmed: boolean;
}

export function DestinationAndDateHeader () {
    const { tripId } = useParams();

    const [trip, setTrip] = useState<Trip | undefined>();

    useEffect(() => {
        api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip));
    }, [tripId]);

    const displayedDate = trip
        ? format(new Date(trip.starts_at), "dd 'de' LLL", { locale: ptBR }).concat(" até ").concat(format(new Date(trip.ends_at), "dd 'de' LLL", { locale: ptBR }))
        : null;

    return (
        <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MapPin className="size-5 text-zinc-400"/>
                <span className="text-zinc-100">{trip?.destination}</span>
            </div>
            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                    <Calendar className="size-5 text-zinc-400"/>
                    <span className="text-zinc-100">{displayedDate}</span>
                </div>
                <div className="min-w-px min-h-6 bg-zinc-800" />
                <Button variant="secondary">
                    Alterar local e data
                    <Settings2 className="size-5" />
                </Button>
            </div>
        </div>
    );
}

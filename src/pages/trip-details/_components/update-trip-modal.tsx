import { Calendar, MapPin, RefreshCcw } from "lucide-react";
import { Modal } from "../../../components/modal";
import { Button } from "../../../components/button";
import { Trip } from "./destination-and-date-header";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { api } from "../../../lib/axios";

interface UpdateTripModalProps {
    trip: Trip;
    closeModal: () => void;
}

export function UpdateTripModal({ trip, closeModal }: UpdateTripModalProps) {
    const [destination, setDestination] = useState<string | undefined>(trip.destination);
    const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>({ from: new Date(trip.starts_at), to: new Date(trip.ends_at) });
    const [isDatepickerOpen, setIsDatepickerOpen] = useState(false);

    function openDatepicker () {
        return setIsDatepickerOpen(true);
    }

    function closeDatepicker () {
        return setIsDatepickerOpen(false);
    }

    async function updateTrip () {
        await api.put(`/trips/${trip.id}`, {
            destination: destination || trip.destination,
            starts_at: eventStartAndEndDates?.from || trip.starts_at,
            ends_at: eventStartAndEndDates?.to || trip.ends_at,
        });
        closeModal();
    }

    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
        ? format(eventStartAndEndDates.from, "dd 'de' LLL", { locale: ptBR }).concat(" até ").concat(format(eventStartAndEndDates.to, "dd 'de' LLL", { locale: ptBR }))
        : null;

    return (
        <Modal
            title="Atualizar viagem"
            onClose={closeModal}
        >
            <div className="space-y-3">
                <div className="p-2.5 bg-zinc-950 shadow-shape rounded-md flex items-center gap-2">
                    <MapPin className="size-5 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Para onde você vai?"
                        className="bg-transparent text-lg placehoder-zinc-400 outline-none flex-1"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    className="w-full p-2.5 bg-zinc-950 shadow-shape rounded-md flex items-center gap-2 outline-none text-left"
                    onClick={openDatepicker}
                >
                    <Calendar className="size-5 text-zinc-400" />
                    <span
                        className="text-lg text-zinc-400 flex-1"
                    >
                        {displayedDate || "Quando?"}
                    </span>
                </button>

                <Button
                    type="button"
                    variant="primary"
                    size="full"
                    onClick={updateTrip}
                >
                    <RefreshCcw className="size-5" />
                    Atualizar
                </Button>
            </div>
            {isDatepickerOpen && (
                <Modal
                    title="Selecionar datas"
                    onClose={closeDatepicker}
                >
                    <DayPicker
                        mode="range"
                        selected={eventStartAndEndDates}
                        onSelect={setEventStartAndEndDates}
                        locale={ptBR}
                    />
                </Modal>
            )}
        </Modal>
    )
}

import { useState } from "react";

import { format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";

import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";

import { Button } from "../../../components/button";

import "react-day-picker/dist/style.css";
import { ptBR } from "date-fns/locale";

interface DestinationAndDateProps {
    isGuestsInputOpen: boolean;
    openGuestsInput: () => void;
    closeGuestsInput: () => void;
    setDestination: (destination: string) => void;
    eventStartAndEndDates: DateRange | undefined;
    setEventStartAndEndDates: (eventStartAndEndDates: DateRange | undefined) => void;
}

export function DestinationAndDate({
    isGuestsInputOpen,
    closeGuestsInput,
    openGuestsInput,
    setDestination,
    eventStartAndEndDates,
    setEventStartAndEndDates,
}: DestinationAndDateProps) {
    const [isDatepickerOpen, setIsDatepickerOpen] = useState(false);

    function openDatepicker () {
        return setIsDatepickerOpen(true);
    }

    function closeDatepicker () {
        return setIsDatepickerOpen(false);
    }

    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
        ? format(eventStartAndEndDates.from, "dd 'de' LLL", { locale: ptBR }).concat(" até ").concat(format(eventStartAndEndDates.to, "dd 'de' LLL", { locale: ptBR }))
        : null;

    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
                <MapPin className="size-5 text-zinc-400" />
                <input
                    type="text"
                    placeholder="Para onde você vai?"
                    className="bg-transparent text-lg placehoder-zinc-400 outline-none flex-1"
                    onChange={(e) => setDestination(e.target.value)}
                    disabled={isGuestsInputOpen}
                />
            </div>
            <button
                className="flex items-center gap-2 outline-none text-left"
                onClick={openDatepicker}
                disabled={isGuestsInputOpen}
            >
                <Calendar className="size-5 text-zinc-400" />
                <span
                    className="text-lg text-zinc-400 flex-1"
                >
                    {displayedDate || "Quando?"}
                </span>
            </button>

            {isDatepickerOpen && (
                <div className="fixed inset-0 w-full h-screen bg-black/60 flex items-center justify-center">
                    <div className="w-fit rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">
                                    Selecionar datas
                                </h2>
                                <button type="button" onClick={closeDatepicker}>
                                    <X className="size-5 text-zinc-400" />
                                </button>
                            </div>
                        </div>
                        <DayPicker
                            mode="range"
                            selected={eventStartAndEndDates}
                            onSelect={setEventStartAndEndDates}
                            locale={ptBR}
                        />
                    </div>
                </div>
            )}

            <div className="min-w-px min-h-6 bg-zinc-800" />
            {!isGuestsInputOpen ? (
                <Button
                    type="button"
                    variant="primary"
                    onClick={openGuestsInput}
                >
                    Continuar
                    <ArrowRight className="size-5" />
                </Button>
            ) : (
                <Button
                    type="button"
                    variant="secondary"
                    onClick={closeGuestsInput}
                >
                    Alterar local e data
                    <Settings2 className="size-5" />
                </Button>
            )}
        </div>
    );
}

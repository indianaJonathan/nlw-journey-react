import { Link2, Plus } from "lucide-react";
import { Button } from "../../../components/button";

export function ImportantLinks() {
    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links importantes</h2>
            <div className="space-y-5">
                <div className="flex items-center justify-between gap-4 p-1 group rounded-md cursor-pointer select-none hover:bg-zinc-800">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
                        <span className="block text-xs text-zinc-400 truncate group-hover:text-zinc-200">https://www.airbnb.com.br/rooms/19023810923890182309182390</span>
                    </div>
                    <Link2 className="text-zinc-400 size-5 shrink-0" />
                </div>
                <div className="flex items-center justify-between gap-4 p-1 group rounded-md cursor-pointer select-none hover:bg-zinc-800">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">Reserva da academia</span>
                        <span className="block text-xs text-zinc-400 truncate group-hover:text-zinc-200">https://www.cariani.com.br/po/20kg</span>
                    </div>
                    <Link2 className="text-zinc-400 size-5 shrink-0" />
                </div>
            </div>
            <Button
                type="button"
                variant="secondary"
                size="full"
            >
                <Plus className="size-5" />
                Cadastrar novo link
            </Button>
        </div>
    );
}

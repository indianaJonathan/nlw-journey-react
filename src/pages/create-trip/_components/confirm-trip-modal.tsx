import { AtSign, User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../../components/button";

interface ConfirmTripModalProps {
    closeConfirmTripModal: () => void;
    confirmTrip: (e: FormEvent<HTMLFormElement>) => void;
    setOwnerName: (name: string) => void;
    setOwnerEmail: (email: string) => void;
}
export function ConfirmTripModal ({
    closeConfirmTripModal,
    confirmTrip,
    setOwnerName,
    setOwnerEmail
}: ConfirmTripModalProps) {
    return (
      <div className="fixed inset-0 w-full h-screen bg-black/60 flex items-center justify-center">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Confirmar criação de viagem</h2>
              <button type="button" onClick={closeConfirmTripModal}>
                <X className="size-5 text-zinc-400" />
              </button>
            </div>
            <p className="text-sm text-zinc-400">
              Para concluir a criação da viagem para <span className="font-semibold text-zinc-100">{}</span> nas datas <span className="font-semibold text-zinc-100">{}</span> preencha seus dados abaixo.
            </p>
          </div>
          <form onSubmit={confirmTrip} className="space-y-3">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 flex-1">
              <User className="size-4 text-zinc-400" />
              <input
                type="text"
                name="name"
                placeholder="Seu nome completo"
                className="bg-transparent text-lg placehoder-zinc-400 outline-none flex-1"
                onChange={(e) => setOwnerName(e.target.value)}
              />
            </div>
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 flex-1">
              <AtSign className="size-4 text-zinc-400" />
              <input
                type="email"
                name="email"
                placeholder="Seu e-mail pessoal"
                className="bg-transparent text-lg placehoder-zinc-400 outline-none flex-1"
                onChange={(e) => setOwnerEmail(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="full"
            >
              Confirmar criação da viagem
            </Button>
          </form>
        </div>
      </div>
    );
}
import { Link, Text } from "lucide-react";
import { Button } from "../../../components/button";
import { Modal } from "../../../components/modal";
import { FormEvent } from "react";
import { api } from "../../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateLinkModalProps {
    closeModal: () => void;
}

export function CreateLinkModal({
    closeModal
}: CreateLinkModalProps) {
    const { tripId } = useParams();

    async function handleSubmit (e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const title = data.get("title")?.toString();
        const url = data.get("url")?.toString();
        if (!title || !url) return;
        await api.post(`/trips/${tripId}/links`, {
            title,
            url
        });
        closeModal();
    }

    return (
        <Modal
            title="Cadastrar novo link"
            subtitle="Todos os convidados podem visualizar os links."
            onClose={closeModal}
        >
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 flex-1">
                    <Text className="size-4 text-zinc-400" />
                    <input
                        type="text"
                        name="title"
                        placeholder="Qual o título do link?"
                        className="bg-transparent text-lg placehoder-zinc-400 outline-none flex-1"
                    />
                </div>
                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 flex-1">
                    <Link className="size-4 text-zinc-400" />
                    <input
                        type="text"
                        name="url"
                        placeholder="Qual a URL do link?"
                        className="bg-transparent text-lg placehoder-zinc-400 outline-none flex-1"
                    />
                </div>
                <Button
                    type="submit"
                    variant="primary"
                    size="full"
                >
                    Cadastrar
                </Button>
            </form>
        </Modal>
    );
}

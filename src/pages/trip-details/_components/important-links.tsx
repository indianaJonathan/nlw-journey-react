import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Link2, Plus } from "lucide-react";

import { Button } from "../../../components/button";

import { api } from "../../../lib/axios";
import { CreateLinkModal } from "./create-link-modal";

interface Link {
    id: string;
    title: string;
    url: string;
    trip_id: string;
}

export function ImportantLinks() {
    const { tripId } = useParams();

    const [links, setLinks] = useState<Link[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        api.get(`/trips/${tripId}/links`).then(result => setLinks(result.data.links));
    }, [tripId]);

    const loadLinks = useCallback(async () => {
        const response = await api.get(`/trips/${tripId}/links`);
        setLinks(response.data.links);
    }, [tripId]);

    useEffect(() => {
        loadLinks();
    }, [loadLinks]);

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links importantes</h2>
            <div className="space-y-5">
                {links.length > 0 && (
                    links.map(link => (
                        <a
                            key={`link-${link.id}`}
                            href={link.url}
                            target="_blank"
                            className="flex items-center justify-between gap-4 p-1 group rounded-md cursor-pointer select-none hover:bg-zinc-800"
                        >
                            <div className="space-y-1.5">
                                <span className="block font-medium text-zinc-100">{link.title}</span>
                                <span className="block text-xs text-zinc-400 truncate group-hover:text-zinc-200">{link.url}</span>
                            </div>
                            <Link2 className="text-zinc-400 size-5 shrink-0" />
                        </a>
                    ))
                )}
            </div>
            <Button
                type="button"
                variant="secondary"
                size="full"
                onClick={() => setIsModalOpen(true)}
            >
                <Plus className="size-5" />
                Cadastrar novo link
            </Button>
            {isModalOpen && (
                <CreateLinkModal closeModal={() => {
                    loadLinks();
                    setIsModalOpen(false);
                }} />
            )}
        </div>
    );
}

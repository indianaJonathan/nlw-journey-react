import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
    children: ReactNode | ReactNode[];
    title: string;
    subtitle?: string;
    onClose: () => void;
}

export function Modal({ children, title, subtitle, onClose }: ModalProps) {
    return (
        <div className="fixed inset-0 w-full h-screen bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button type="button" onClick={onClose}>
                        <X className="size-5 text-zinc-400" />
                    </button>
                </div>
                {subtitle && (
                    <p className="text-sm text-zinc-400">
                        {subtitle}
                    </p>
                )}
                </div>
                {children}
            </div>
        </div>
    );
}

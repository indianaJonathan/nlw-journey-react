import { CircleCheck, CircleDashed } from "lucide-react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Activity } from "..";

interface ActivitiesProps {
    activities: Activity[];
}

export function Activities({ activities }: ActivitiesProps) {
    const { tripId } = useParams();

    return (
        <div className="space-y-8">
            {activities.map((activity) => {
                return (
                    <div key={`trip-${tripId}-activities-${activity.date}`} className="space-y-2.5">
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl text-zinc-300 font-semibold">Dia {format(activity.date, 'dd')}</span>
                            <span className="text-xs text-zinc-500">{format(activity.date, 'EEEE', { locale: ptBR })}</span>
                        </div>
                        {activity.activities.length === 0 ? (
                            <p className="text-zinc-500 text-sm italic">Nenhuma atividade cadastrada</p>
                        ) : (
                            activity.activities.map((category) => {
                                const isDone = new Date(category.occurs_at).getTime() <= new Date().getTime();

                                return (
                                    <div key={category.id} className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                                        { isDone ? <CircleCheck className="size-5 text-lime-300" /> : <CircleDashed className="size-5 text-zinc-400" /> }
                                        <span className="text-zinc-100">{category.title}</span>
                                        <span className="text-zinc-400 text-sm ml-auto">{format(new Date(category.occurs_at), 'HH:mm')}</span>
                                    </div>
                                );
                            }))
                        }
                    </div>
                );
            })}
        </div>
    );
}

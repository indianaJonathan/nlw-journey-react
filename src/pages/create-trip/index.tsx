import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./_components/invite-guests-modal";
import { ConfirmTripModal } from "./_components/confirm-trip-modal";
import { DestinationAndDate } from "./_components/destination-and-date";
import { InviteGuests } from "./_components/invite-guests";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);

  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();

  function addNewEmailToInvite (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    if (!email) return;
    const existingEmail = emailsToInvite.includes(email.toString());
    if (email && existingEmail) return;
    setEmailsToInvite([...emailsToInvite, email.toString()]);
    e.currentTarget.reset();
  }

  function removeEmailToInvite (email: string) {
    setEmailsToInvite(emailsToInvite.filter((emailToInvite) => emailToInvite !== email));
  }

  async function confirmTrip (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsConfirmTripModalOpen(false);

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to || !destination || !ownerName || !ownerEmail || emailsToInvite.length === 0) return;

    const response = await api.post("/trips", {
      destination,
      starts_at: new Date(eventStartAndEndDates.from),
      ends_at: new Date(eventStartAndEndDates.to),
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    });

    const { tripId } = response.data;

    navigate(`/trips/${tripId}`);
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/Logo.svg" alt="plann.er"/>
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>
        <div className="space-y-4">
          <DestinationAndDate
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={() => setIsGuestsInputOpen(true)}
            closeGuestsInput={() => setIsGuestsInputOpen(false)}
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
          />
          {isGuestsInputOpen && <InviteGuests emailsToInvite={emailsToInvite} openGuestsModal={() => setIsGuestsModalOpen(true)} openConfirmTripModal={() => setIsConfirmTripModalOpen(true)}/>}
        </div>
        <p className="text-sm text-zinc-500">
          Ao planear sua viagem pela plann.er você automaticamente concorda <br/>
          com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.
        </p>
      </div>
      { isGuestsModalOpen && (
        <InviteGuestsModal
            closeGuestsModal={() => setIsGuestsModalOpen(false)}
            addNewEmailToInvite={addNewEmailToInvite}
            emailsToInvite={emailsToInvite}
            removeEmailToInvite={removeEmailToInvite}
            confirmTrip={confirmTrip}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={() => setIsConfirmTripModalOpen(false)}
          confirmTrip={confirmTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
        />
      )}
    </div>
  )
}

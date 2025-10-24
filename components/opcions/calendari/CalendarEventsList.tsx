'use client'

import CalendarCard from "@/components/opcions/calendari/CalendarCard"
import type { Publicacio } from "@/utils/schemas"


export default function CalendarEventsList({ events }: { events: Publicacio[] }) {
  return (
    <div className="mt-10">
      {events && events.length > 0 ? ( // Comprova si hi ha esdeveniments
        <>
          <p className="text-center font-semibold text-lg text-stone-700">
            {events[0].eventDate ? new Date(events[0].eventDate).toLocaleDateString("ca-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : ""}
          </p>
          {events.map((event, index) => ( 
            <CalendarCard key={event.id} event={event} />
          ))}
        </>
      ) : (
        <p className="text-center text-stone-600">No hi ha esdeveniments per a aquesta data.</p>
      )}
    </div>
  );
}

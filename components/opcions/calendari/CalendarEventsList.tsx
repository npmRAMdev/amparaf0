'use client'

import PublicacioCard from "../actualitat/PublicacioCard"
import type { Publicacio } from "@/utils/schemas"


export default function CalendarEventsList({ events }: { events: Publicacio[] }) {
  return (
    <div className="mt-6 sm:mt-10">
      <div className='flex-1'>
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
            {events.map((item, index) => (
              <PublicacioCard key={index} item={item} />
            ))}
          </>
        ) : (
          <p className="text-xs sm:text-base text-center text-stone-3 italic">No hi ha esdeveniments per a aquesta data, selecciona una altra.</p>
        )}
      </div>
    </div>
  );
}

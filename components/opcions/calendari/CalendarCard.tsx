'use client'
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/utils/helpers/formatDate"
import type { Publicacio } from "@/utils/schemas"
import SocialButtons from "@/components/SocialButtons"



export default function CalendarCard({ event }: { event: Publicacio }) {

  return (
    <div className="mx-auto bg-stone-8 rounded-xl shadow-md overflow-hidden m-5">
    <div className="flex h-full">  
  <div className="flex-shrink-0">
    <Image
      className="object-cover h-full w-20 min-[500px]:w-48"
      width={192}
      height={192}
      src={`${event.image}`}
      alt={`Imatge de l'esdeveniment ${event.title}`}
    />
  </div>
  <div className="px-2 sm:px-6 md:px-10 pt-3 pb-3 flex flex-col flex-1">
    <div className="flex-1 space-y-3">  
      <p className="uppercase tracking-wide text-sm text-stone-3 font-semibold mb-2">
        {event.grupId}
      </p>
      <p className="blocktext-lg leading-tight font-medium text-emerald-3 mb-6">
        {event.title}
      </p>
      <p className="block font-sans text-sm antialiased font-normal leading-relaxed text-stone-700 text-justify">
        {event.description}
        <span>
          <Link href="#" className="inline-block items-center text-stone-3 font-bold">
            Saber més &gt;&gt;
          </Link>
        </span>
      </p>
    </div>
    <div className="mt-auto">  
      <div className="mt-2 mb-3">
        {event.eventDate && (
          <p className="block font-sans text-sm font-medium leading-relaxed text-stone-500">
            Data i hora: <span className='font-semibold'>{formatDate(typeof event.eventDate === "string" ? event.eventDate : event.eventDate.toISOString())}</span>
          </p>
        )}
        <p className="block font-sans text-sm antialiased font-medium leading-relaxed text-stone-3">
          Lloc: <span className='font-semibold'>{event.eventLocation}</span>
        </p>
      </div>
      <SocialButtons />
    </div>
  </div>
</div>
    </div>
  );
}
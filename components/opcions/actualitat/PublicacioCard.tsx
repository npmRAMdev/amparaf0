import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { formatDate } from "@/utils/helpers/formatDate"
import { ca } from "date-fns/locale"
import { recurtaParagraf } from "@/utils/helpers/recurtaParagraf"
import type { Publicacio } from "@/utils/schemas"



export default function PublicacioCard({ item }: { item: Publicacio }) {
    
    const {createdAt, title, description, image, botigaName, eventLocation, eventDate, grupName, botigaId, grupId, id} = item
    const timeAgo = formatDistanceToNow(new Date(createdAt), {addSuffix: true, includeSeconds: true, locale: ca})
    //console.log('publicacio', publicacio)
    //console.log('entity', entity) 7/20
    //console.log('grups', eventDate)
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl">
        <p className="text-2xs sm:text-sm text-stone-4 text-right">{timeAgo}</p>
        
        <div className="flex bg-stone-8 rounded-xl shadow-md w-full overflow-hidden">
          <Link href={`/${botigaId}/grups/${grupId}/${id}`} className="w-1/4 min-w-[20%] relative cursor-pointer">
            <Image 
              src={image ?? "/default-image-rectang.webp"} 
              alt={`image of ${title}`} 
              width={200}
              height={200}
              className="object-cover w-full h-full"
              style={{ aspectRatio: '1/1' }}
            />
          </Link>
          <div className="flex-1 p-2 md:p-6 flex flex-col">
            <div>
              <h6 className="text-2xs sm:text-base font-semibold text-stone-3 uppercase">
                {botigaName}
                <span className="text-stone-4 capitalize italic"> {grupName}</span>
              </h6>
              <h4 className="text-base sm:text-lg font-semibold text-emerald-3 mt-1 mb-3">
                {title}
              </h4>
              <p className="text-xs sm:text-sm text-stone-3 text-justify mb-4">
                {recurtaParagraf(description, 50, 12)}
              </p>
            </div>
            <div className="mt-auto">
              {eventDate && (
                <div className=" text-stone-500">
                  <span className="hidden sm:inline sm:text-sm text-stone-500">Data i hora: {' '}</span>
                  <span className="text-xs sm:text-sm font-semibold">
                    {(() => {
                      const ed = typeof eventDate === "string" ? new Date(eventDate) : new Date(eventDate);
                      return isNaN(ed.getTime())
                        ? "Data invàlida"
                        : formatDate(ed.toISOString());
                    })()}
                  </span>
                </div>
              )}
              
              {eventLocation && (
                <div className="text-stone-500">
                  <span className="hidden sm:inline sm:text-sm text-stone-500">Lloc: {' '}</span>
                  <span className="text-xs sm:text-sm font-semibold">{eventLocation}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div> 
  )
}

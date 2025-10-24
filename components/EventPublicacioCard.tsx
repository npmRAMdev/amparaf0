import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { formatDate } from "@/utils/helpers/formatDate"
import { ca } from "date-fns/locale"
import SocialButtons from "@/components/SocialButtons"
import type { Publicacio } from "@/utils/schemas"



export default function EventPublicacioCard({ item }: { item: Publicacio }) {
    
    const {createdAt, title, description, image, botigaName, eventLocation, eventDate, grupName, moreInfo} = item
    const timeAgo = formatDistanceToNow(new Date(createdAt), {addSuffix: true, includeSeconds: true, locale: ca})
    //console.log('post', post)
    //console.log('entity', entity) 7/20
    //console.log('grups', eventDate)
  return (

    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl">
        <p className="text-xs text-stone-4 text-right">{timeAgo}</p>
        
        <div className="flex bg-stone-8 rounded-xl shadow-md w-full overflow-hidden">
          {/* Secció de la imatge */}
          <div className="w-2/5 min-w-[40%] relative">
            <Image 
              src={image ?? "/default-image-rectang.webp"} 
              alt={`image of ${title}`} 
              width={400}
              height={400}
              className="object-cover w-full h-full"
              style={{ aspectRatio: '1/1' }}
            />
          </div>
          
          {/* Secció de contingut */}
          <div className="flex-1 p-2 md:p-6 flex flex-col">
            {/* Capçalera */}
            <div>
              <h6 className="text-sm font-semibold text-stone-3 uppercase">
                {botigaName}
                <span className="text-stone-4 capitalize"> - {grupName}</span>
              </h6>
              <h4 className="text-lg font-semibold text-emerald-3 mt-1 mb-3">
                {title}
              </h4>
              <p className="text-sm text-stone-3 text-justify mb-4">
                {description}
                <Link href={`${moreInfo}`} className="ml-1 text-stone-700 font-bold italic hover:underline">
                  Saber més &gt;&gt;
                </Link>
              </p>
            </div>
            
            {/* Peu de pàgina */}
            <div className="mt-auto space-y-2">
              {eventDate && (
                <p className="text-sm text-stone-500">
                  Data i hora: {' '}
                  <span className="font-semibold">
                    {(() => {
                      const ed = typeof eventDate === "string" ? new Date(eventDate) : new Date(eventDate);
                      return isNaN(ed.getTime())
                        ? "Data invàlida"
                        : formatDate(ed.toISOString());
                    })()}
                  </span>
                </p>
              )}
              
              {eventLocation && (
                <p className="text-sm text-stone-500">
                  Lloc: {' '}
                  <span className="font-semibold">{eventLocation}</span>
                </p>
              )}
              
              <SocialButtons />
            </div>
          </div>
        </div>
      </div>
    </div> 
  )
}

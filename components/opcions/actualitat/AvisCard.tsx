import type { Avis } from "@/utils/schemas"
import { formatDistanceToNow } from "date-fns"
import { ca } from "date-fns/locale"
import Image from "next/image"



export default function AvisCard({ item }: { item: Avis }) {

    const {createdAt, content, botigaName, grupName, grupLogo} = item
    const timeAgo = formatDistanceToNow(new Date(createdAt), {addSuffix: true, includeSeconds: true, locale: ca})
    //console.log('avis', avis)

  return (

    <div className="flex justify-center w-full max-w-5xl">
      <div className="w-full mx-auto">
        <p className="text-2xs sm:text-sm text-stone-4 text-right">{timeAgo}</p>
        <div className="relative sm:flex rounded-xl bg-stone-8 shadow-md w-full">
          <div className="flex-col sm:flex gap-3 p-2 sm:p-4 w-full">
            <div className='flex items-center mb-2 sm:mb-0 gap-3'>
                <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border border-stone-6">
                  <Image 
                    src={grupLogo} 
                    alt={`imatge ${grupName}`} 
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className='flex flex-col'>                  
                  <p className="text-2xs sm:text-base font-semibold text-stone-3 uppercase">{botigaName}</p>
                  <p className="text-2xs sm:text-base text-stone-4 capitalize italic">{grupName}</p>
                </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-stone-3 text-justify">
                {content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

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
    <p className="text-xs text-stone-4 text-right">{timeAgo}</p>
    <div className="relative flex rounded-xl bg-stone-8 shadow-md w-full">
      <div className="flex gap-3 p-4 w-full">
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
        <div className="flex-1 min-w-0">
          <p className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-stone-3 uppercase">
            {botigaName}
            <span className="text-stone-4 capitalize"> - {grupName}</span>
          </p>
          <p className="block mt-2 font-sans text-sm antialiased font-normal leading-relaxed text-stone-2 text-justify">
            {content}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

import Link from "next/link"
import { getGrupPublicacionsAction } from "@/actions/publicacions/get-grup-publicaions-action"
import { getGrupAvisosAction } from "@/actions/avisos/get-grup-avisos-action"
import EventPostCard from "@/components/EventPublicacioCard"
import EventAvisCard from "@/components/EventAvisCard"
import { IoClose } from 'react-icons/io5'
import type { Publicacio, Avis } from "@/utils/schemas"


type UnifiedItem = (Publicacio | Avis) & {
  tipus: 'publicacio' | 'avis'
};

export default async function GrupIdPage({params}: { params: Promise<{ botigaid: string, grupid: string }> }) {
    const resolvedParams = await params
    const botigaid = resolvedParams.botigaid
    const grupid = resolvedParams.grupid

  const [postsResult, avisosResult] = await Promise.all([
    getGrupPublicacionsAction(grupid),
    getGrupAvisosAction(grupid)
  ])

  const publicacions: Publicacio[] = (postsResult.publicacions ?? []).map(publicacio => ({
    ...publicacio,
    createdAt: new Date(publicacio.createdAt),
    eventDate: publicacio.eventDate ? new Date(publicacio.eventDate) : null
  }))

  const avisos: Avis[] = (avisosResult.avisos ?? []).map(avis => ({
    ...avis,
    createdAt: new Date(avis.createdAt)
  }));

  const itemsUnificats: UnifiedItem[] = [
    ...publicacions.map(publicacio => ({
      ...publicacio, 
      tipus: 'publicacio' as const 
    })),
    ...avisos.map(avis => ({ 
      ...avis, 
      tipus: 'avis' as const 
    }))
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  return (
    <div className="pt-1 px-2 mb-36 w-full">
      <h1 className="text-lg font-semibold text-center text-stone-2">Publicacions i Avisos</h1>
      <p className="text-sm text-stone-500 mb-4 text-center text-stone-2">consulta les últimes publicacions i avisos del grup:</p>
      {itemsUnificats.map(item => {
        if (item.tipus === 'publicacio') {
          // Type assertion to PostItem for type safety
          const postItem = item as Publicacio
          return (
            <div key={`post-${item.id}`} className="mb-3">
              <EventPostCard item={postItem} />
            </div>
          )
        } else {
          // Type assertion to AvisItem for type safety
          const avisItem = item as Avis
          return (
            <div key={`avis-${item.id}`} className="mb-3">
              <EventAvisCard item={avisItem} />
            </div>
          )
        }
      })}
      <div className="absolute top-4 right-4 z-1 bg-stone-700/60 rounded-full ">
        <Link href={`/${botigaid}/grups`} className="text-stone-8">
          <IoClose size={24} />
        </Link>
      </div>
    </div>
  );
}


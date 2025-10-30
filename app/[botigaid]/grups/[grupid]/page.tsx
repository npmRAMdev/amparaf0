import Link from "next/link"
import { getGrupPublicacionsAction } from "@/actions/publicacions/get-grup-publicaions-action"
import { getGrupAvisosAction } from "@/actions/avisos/get-grup-avisos-action"
import PublicacioCard from "@/components/opcions/actualitat/PublicacioCard"
import EventAvisCard from "@/components/EventAvisCard"
import XTancar from '@/components/XTancar'
import type { Publicacio, Avis } from "@/utils/schemas"


type UnifiedItem = (Publicacio | Avis) & {
  tipus: 'publicacio' | 'avis'
};

export default async function GrupIdPage({params}: { params: Promise<{ botigaid: string, grupid: string }> }) {
    const resolvedParams = await params
    const botigaid = resolvedParams.botigaid
    const grupid = resolvedParams.grupid

  const [pubsResult, avisosResult] = await Promise.all([
    getGrupPublicacionsAction(grupid),
    getGrupAvisosAction(grupid)
  ])

  const publicacions: Publicacio[] = (pubsResult.publicacions ?? []).map(publicacio => ({
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
      <h1 className="text-xl font-semibold text-center text-stone-2 mt-5">publicacions i avisos</h1>
      <p className="text-xs italic sm:text-sm text-stone-500 mb-4 text-center text-stone-2">consulta les últimes publicacions i avisos del grup:</p>
      {itemsUnificats.map(item => {
        if (item.tipus === 'publicacio') {
          // Type assertion to PubItem for type safety
          const pubItem = item as Publicacio
          return (
            <div key={`pub-${item.id}`} className="mb-3">
              <PublicacioCard item={pubItem} />
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
      <XTancar />
    </div>
  );
}


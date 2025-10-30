
import { getAllPublicacionsAction } from "@/actions/publicacions/get-all-publicacions-action"
import { getAllAvisosAction } from "@/actions/avisos/get-all-avisos-action"
import PublicacioCard from "@/components/opcions/actualitat/PublicacioCard"
import AvisCard from "@/components/opcions/actualitat/AvisCard"
import type { Publicacio, Avis } from "@/utils/schemas"


type UnifiedItem = (Publicacio | Avis) & {
  tipus: 'publicacio' | 'avis'
};

export default async function ActualitatPage() {
  const [publicacionsResult, avisosResult] = await Promise.all([
    getAllPublicacionsAction(),
    getAllAvisosAction()
  ]);

  const publicacions: Publicacio[] = (publicacionsResult.publicacions ?? []).map(publicacio => ({
    ...publicacio,
    createdAt: new Date(publicacio.createdAt),
    eventDate: publicacio.eventDate ? new Date(publicacio.eventDate) : null
  }))

  const avisos: Avis[] = (avisosResult.avisos ?? []).map(avis => ({
    ...avis,
    createdAt: new Date(avis.createdAt)
  }))

  //console.log('Publicacions fetched:', publicacions.length);
  //console.log('Avisos fetched:', avisos.length);

  const itemsUnificats: UnifiedItem[] = [
    ...publicacions.map(publicacio => ({ 
      ...publicacio, 
      tipus: 'publicacio' as const 
    })),
    ...avisos.map(avis => ({ 
      ...avis, 
      tipus: 'avis' as const 
    }))
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <div className="pt-1 px-2 mb-36 w-full">
      {itemsUnificats.map(item => {
        if (item.tipus === 'publicacio') {
          // Type assertion to PubItem for type safety
          const pubItem = item as Publicacio
          return (
            <div key={`post-${item.id}`} className="mb-3">
              <PublicacioCard item={pubItem} />
            </div>
          );
        } else {
          // Type assertion to AvisItem for type safety
          const avisItem = item as Avis
          return (
            <div key={`avis-${item.id}`} className="mb-3">
              <AvisCard item={avisItem} />
            </div>
          );
        }
      })}
    </div>
  );
}
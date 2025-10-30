import Link from 'next/link'
import { getBotigaPublicacionsAction } from '@/actions/publicacions/get-botiga-publicacions-action'
import PublicacioCard from '@/components/opcions/actualitat/PublicacioCard'
import GoBackButton from '@/components/GoBackButton'
import XTancar from '@/components/XTancar'
import type { Metadata } from "next"
import type { Publicacio } from '@/utils/schemas'

export const metadata: Metadata = {
  title: "Ampara App",
  description: "l'App del comerç local",
}

export default async function PublicacionsPage  ({
  params,
}: {
  params: Promise<{ botigaid: string }>
}) {
  const resolvedParams = await params
  const botigaid = resolvedParams.botigaid

  console.log('botigaid', botigaid)
  let p = ''
  if (!botigaid) {
    p = 'No hi ha botigaId'
    return <div className="text-center text-red-500"><GoBackButton />{p}</div>
  }
  const { publicacions } = await getBotigaPublicacionsAction(botigaid)

  if (!publicacions || publicacions.length === 0) {
    return <div className="text-center flex items-center justify-center text-stone-2">No hi ha encara cap publicació<GoBackButton /></div>
  }

  return (
    <section className="relative bg-stone-7 mb-10 p-2">
       <p className='text-xl text-center text-stone-2 font-bold bg-stone-7  mt-5'>publicacions</p>
      {publicacions.length > 0 && publicacions.map((item: Publicacio) => (
        <PublicacioCard key={item.id} item={item} />
       ))}
      <XTancar />
    </section>
  )
}

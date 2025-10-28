import Link from 'next/link'
import { getBotigaPublicacionsAction } from '@/actions/publicacions/get-botiga-publicacions-action'
import PublicacioCard from '@/components/opcions/actualitat/PublicacioCard'
import GoBackButton from '@/components/GoBackButton'
import { IoClose } from 'react-icons/io5'
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
       <div className="absolute top-4 right-4 bg-opacity-60 z-10 bg-stone-2 rounded-full">
        <Link href={`/${botigaid}/web`} className="text-stone-8">
          <IoClose size={24} />
        </Link>
      </div>
    </section>
  )
}

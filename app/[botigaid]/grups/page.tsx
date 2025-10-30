import Link from 'next/link'
import Image from 'next/image'
import { getGrupsAction } from '@/actions/grups/get-grups-action'
import XTancar from '@/components/XTancar'

export default async function GrupsPage ({
  params,
}: {
  params: Promise<{ botigaid: string }>
}) {
  const resolvedParams = await params
  const botigaid = resolvedParams.botigaid

      const { errorsG = [], grups } = await getGrupsAction(botigaid)
      //console.log('grups', grups)
      if (!grups) {
        if (errorsG && errorsG.length > 0) {
          console.error('Error sol.licitud Grups:', errorsG[0])
          return <div className="text-center text-red-500">{errorsG[0]}</div>
        }}

  return (
    <div className='space-y-1 p-2 max-w-2xl mx-auto' >
        <h2 className='text-2xl font-bold text-stone-2 text-center mb-2 text-stone-2'>grups</h2>
        <p className='text-xs italic sm:text-sm text-stone-500 text-center mb-4'>consulta les publicacions dels diferents grups:</p>
        {grups && grups.map(grup => 
        <Link href={`/${botigaid}/grups/${grup.id}`} key={grup.id} className='bg-stone-8 flex w-full flex-1 justify-between items-center p-2'>
            <div className='flex gap-2 items-center'>
            <Image 
                src={grup.logo} 
                alt={grup.name} 
                width={100} 
                height={100} 
                className='rounded-full w-14 h-14 sm:w-24 sm:h-24  shadow object-cover' 
                priority 
            /> 
            <p className='text-base sm:text-lg text-stone-2'>{grup.name}</p>
            </div>
        </Link>
        )}
      <XTancar />
    </div>
  )
}

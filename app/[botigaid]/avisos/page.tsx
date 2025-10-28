
import Link from "next/link"
import { getAvisosAction } from "@/actions/avisos/get-avisos-action"
import { formatDate } from "@/utils/helpers/formatDate"
import GoBackButton from "@/components/GoBackButton"
import { IoClose } from 'react-icons/io5'
import type {Avis} from "@/utils/schemas"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ampara App",
  description: "l'App del comerç local",
}

export default async function AvisosPage ({
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

  const { errors, avisos } = await getAvisosAction(botigaid)
  console.log ('-- errors Avisos--', errors)
  console.log('--avisos--', avisos)
  if (errors.length > 0 || !avisos || avisos.length === 0) {
    return <div className="text-center flex items-center justify-center text-stone-2">No hi ha encara cap avís<GoBackButton /></div>
  }

 /*  let botigaName: Avis['botigaName']
  if (avisos && avisos.length > 0) {
    botigaName = netejaString(avisos[0].botigaName)
  } */

  return (
    <section className="relative bg-stone-7 mb-10 p-2">
    <p className='text-xl text-center text-stone-2 font-bold bg-stone-7 py-4  mt-5'>avisos</p>
    <div className="w-full max-w-5xl mx-auto px-2 md:px-6">
        <div className="flex flex-col justify-center divide-y divide-stone-200 h-screen overflow-hidden ">
        {/* Contingut amb scroll */}
        <div className="w-full max-w-3xl mx-auto h-full overflow-y-auto">
            <div className="space-y-5 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:ml-[8.75rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-stone-400 before:to-transparent">
            {avisos && avisos.map((avis: Avis) => (
                <div className="relative mb-4" key={avis.id}>
                    <div className="md:flex items-center md:space-x-2 mb-1">
                        <div className="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
                            <div className="flex items-center justify-center w-2 h-2 md:w-4 md:h-4 rounded-full bg-stone-8 shadow md:order-1">
                                <div className='bg-stone-3 w-2 h-2 md:w-2 md:h-2 rounded-full'></div>
                            </div>
                            <time className="text-xs text-stone-3 md:w-28">
                                {formatDate(avis.createdAt.toString())}
                            </time> 
                        </div>
                        <div className="text-stone-4 ml-9 md:ml-5">
                            <span className="text-stone-2 font-bold capitalize">
                                {avis.grupName}
                            </span>
                        </div>
                    </div>
                    <div className="bg-stone-8 p-3 text-sm rounded text-stone-3 shadow ml-9 md:ml-44 mb-4">
                        {avis.content}
                    </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    </div>
    <div className="absolute top-4 right-4 bg-opacity-60 z-10 bg-stone-2 rounded-full">
        <Link href={`/${botigaid}/web`} className="text-stone-8">
        <IoClose size={24} />
        </Link>
    </div>
    </section>
  )
}

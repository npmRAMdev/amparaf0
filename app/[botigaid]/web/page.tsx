import Link from 'next/link'
import { getBotigaCached } from '@/components/website/getbotigaChached'
import Info from '@/components/website/Info'
import { XarxesSocialsBar } from '@/components/website/XarxesSocialsBar'
import CarruselBar from '@/components/website/CarruselBar'
import DonarDialog from '@/components/website/DonarDialog'
import { HeadElement } from '@/components/website/HeadElement'
import FormulariConsulta from '@/components/website/FormulariConsulta'
import { BiSolidMessageAltDetail, BiSolidMessageAltDots } from "react-icons/bi"
import { PiPhoneFill, PiPlanetFill } from "react-icons/pi"
import { HiSpeakerphone } from "react-icons/hi"
import { PiCrossFill } from "react-icons/pi"
import { MdGroups2 } from "react-icons/md"
import { IoClose } from 'react-icons/io5'
import { MdTimer } from "react-icons/md"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ampara App",
  description: "l'App del comerç local",
}

export default async function WebPage ({
  params
}: {
  params: Promise<{ botigaid: string }>
}) {
  const resolvedParams = await params
  const botigaid = resolvedParams.botigaid

  const { errors, botiga } = await getBotigaCached(botigaid)

   if (errors.length > 0 || !botiga) {
    return <div className="text-center text-red-500">Botiga no trobada</div>
  }

  //console.log ('--web botiga --', botiga)

  // Optimización con Promise.all
 /* const [botigaResult, donacioResult, imatgesResult] = await Promise.all([
    getBotigaAction({ id: botigaid }),
    getDonacioAction(botigaid),
    getImatgesAction(botigaid)
  ])

  const { errors, botiga } = botigaResult
  const { errorsD, donacio } = donacioResult
  const { errorsImatge = [], imatges } = imatgesResult */

  console.log('---Webpage grups:---', botiga)

  const donacio = botiga.donacions && botiga.donacions.length > 0 ? botiga.donacions[0] : null

  if (!botiga.imatges) {
    console.log('No hi ha imatges disponibles')
    return <div className="text-center text-red-500">Encara no hi ha imatges o imatges no trobades</div>
  }
  

  return (
      <div className="flex flex-col items-center justify-center min-h-screen mt-3 px-2 sm:px-6">
        <div className="w-full">
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full">
              <div className="max-w-5xl w-full mx-auto flex gap-3 flex-col">
                <HeadElement name={botiga.name} address={botiga.address} logo={botiga.logo} /> 
                <div className="grid grid-cols-12 p-2 gap-6">
                  <Link href={`tel:+${botiga.phone}`} className="col-span-4 hover:bg-stone-5 w-full p-4 bg-stone-6 shadow-md rounded-xl flex justify-center items-center gap-2">
                    <PiPhoneFill className='text-emerald-4 text-6xl'/><p className='text-2xl text-emerald-4 font-bold tracking-wide cursor-pointer hidden sm:block'>crida'ns</p>
                  </Link>
                  <Link  href={`https://${botiga.website}`} className="col-span-4 hover:bg-stone-5 w-full p-4 bg-stone-6 shadow-md rounded-xl flex justify-center items-center gap-2">
                    <PiPlanetFill  className='text-emerald-4 text-6xl' /><p className='text-2xl text-emerald-4 font-bold tracking-wide cursor-pointer hidden sm:block'>visita'ns</p>
                  </Link>
                  <Info info={botiga.info} />
                </div>
                { botiga.business === 'parroquia' && (
                  <div className="grid grid-cols-12 gap-3">
                    <Link href={`/${botigaid}/avisos`} className="col-span-12 sm:col-span-6 lg:col-span-4 hover:bg-stone-5 w-full p-4 bg-stone-6 shadow-md rounded-xl flex justify-center items-center gap-2"><HiSpeakerphone className="text-stone-500 text-4xl"/><p className="text-2xl text-stone-500 font-bold flex items-center gap-2">avisos<span className='animate-bounce-scale bg-emerald-400 rounded-full w-1 h-1'></span></p></Link>
                    <Link href={`/${botigaid}/blogs`} className="col-span-12 sm:col-span-6 lg:col-span-4 hover:bg-stone-5 w-full p-4 bg-stone-6 shadow-md rounded-xl flex justify-center items-center gap-2"><PiCrossFill className="text-stone-500 text-4xl"/><p className="text-2xl text-stone-500 font-bold flex items-center gap-2">missatge</p></Link>
                    <Link href={`/${botigaid}/horaris`} className="col-span-12 sm:col-span-6 lg:col-span-4 hover:bg-stone-5 w-full p-4 bg-stone-6 shadow-md rounded-xl flex justify-center items-center gap-2"><MdTimer className="text-stone-500 text-4xl"/><p className="text-2xl text-stone-500 font-bold flex items-center gap-2">horaris</p></Link>
                </div>)}
                  {botiga.donacions && botiga.donacions.length > 0 && <DonarDialog donacio={donacio}/>}
                  {botiga.grups.length > 1 && <Link href={`/${botigaid}/grups`} className="flex flex-col p-2 items-center bg-stone-6 shadow-md rounded-xl "><MdGroups2 className='text-stone-3 text-5xl'/><p className="text-2xl text-stone-3 font-bold">grups</p>
                  </Link>}
                <div className='space-y-3 mb-4'>
                  { botiga.business !== 'parroquia' && (
                    <div className="grid grid-cols-12 gap-3">
                      <Link href={`/${botigaid}/publicacions`} className="col-span-12 md:col-span-6 hover:bg-stone-5 w-full p-4 bg-stone-6 shadow-md rounded-xl flex justify-center items-center gap-2"><BiSolidMessageAltDetail className="text-stone-500 text-4xl"/><p className="text-2xl text-stone-500 font-bold flex items-center gap-2">publicacions</p></Link>
                      <Link href={`/${botigaid}/avisos`} className="col-span-12 md:col-span-6 hover:bg-stone-5 w-full p-4 bg-stone-6 shadow-md rounded-xl flex justify-center items-center gap-2"><BiSolidMessageAltDots className="text-stone-500 text-4xl"/><p className="text-2xl text-stone-500 font-bold flex items-center gap-2">avisos</p></Link>
                    </div>)}
                  {botiga.imatges && <CarruselBar imatges={botiga.imatges} /> }
                  <div className="">
                    <FormulariConsulta emailRecipient='rasputinmoore@gmail.com' botigaid={botiga.id} />
                  </div>
                  <XarxesSocialsBar whatsapp={botiga.whatsapp} youtube={botiga.youtube} instagram={botiga.instagram} facebook={botiga.facebook} tiktok={botiga.tiktok} />
                </div>
              </div>
            </div>
          </div>
        </div>
      <div className="absolute top-4 right-4 bg-opacity-60 z-10 bg-stone-2 rounded-full">
        <Link href='/favorits' className="text-stone-8">
          <IoClose size={24} />
        </Link>
      </div>
      </div>
  );
}
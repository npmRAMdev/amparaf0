import Link from "next/link"
import { LiaHandshake } from "react-icons/lia"
import TextDisplay from "@/components/website/TextDisplay"
import type { Donacio } from "@/utils/schemas"

export default function DonarDialog ({donacio} : {donacio: Donacio}) {
console.log('---Donacio en DonarDialog:---', donacio)

  return (
    <div className="col-span-12 sm:col-span-6 flex flex-col p-2 sm:p-4 relative items-center justify-center bg-stone-6 shadow-md rounded-xl">
        <div className="text-center p-4 flex flex-col h-full"> 
            <div className="flex flex-col mb-5 sm:mb-3">
                <h2 className="text-2xl font-bold py-4 text-stone-500">{donacio.title}</h2>
                 <TextDisplay message={donacio.message} className="sm:p-2 rounded mb-4 text-stone-2" />
                <div className="flex justify-center mt-auto"> 
                    <Link href={donacio.url} className="flex justify-between items-center gap-2 bg-emerald-400 hover:bg-emerald-300 px-5 py-2 text-md shadow-sm hover:shadow-md font-medium tracking-wider text-stone-50 rounded-full transition ease-in duration-300 animate-pulse">
                        <span className="font-bold text-2xl"><LiaHandshake /></span>donar
                    </Link>
                </div>
            </div>
        </div>
    </div>
)
}

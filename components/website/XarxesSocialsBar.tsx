import { FaWhatsapp } from "react-icons/fa"
import { AiOutlineYoutube } from "react-icons/ai"
import { FaInstagram } from "react-icons/fa"
import { AiOutlineFacebook } from "react-icons/ai"
import { TbBrandTiktok } from "react-icons/tb"
import Link from "next/link"


export function XarxesSocialsBar ({whatsapp, youtube, instagram, facebook, tiktok}: {whatsapp?: string, youtube?: string, instagram?: string, facebook?: string, tiktok?: string}) {
  
  return (
    <div className="p-4 bg-stone-6 shadow rounded-xl w-full flex flex-col gap-3 items-center justify-center">
          <div className="flex justify-center space-x-5 max-w-xl lg:max-w-5xl">
              { whatsapp && <Link href={`${whatsapp}`}><p className="text-lg md:text-3xl text-stone-3 flex items-center"><FaWhatsapp /></p> </Link>}
              { youtube && <Link href={`${youtube}`}><p className="text-lg md:text-3xl text-stone-3 flex items-center"><AiOutlineYoutube /></p></Link>}
              { instagram && <Link href={`${instagram}`} ><p className="text-lg md:text-3xl text-stone-3 flex items-center"><FaInstagram /></p></Link>}
              { facebook && <Link href={`${facebook}`}><p className="text-lg md:text-3xl text-stone-3 flex items-center"><AiOutlineFacebook /></p></Link>}
              { tiktok && <Link href={`${tiktok}`}><p className="text-lg md:text-3xl text-stone-3 flex items-center"><TbBrandTiktok /></p></Link>}
          </div>
          <p className="text-xs text-stone-4 flex items-center gap-2">&#169; tots el drets reservats {new Date().getFullYear()} </p>
    </div>
  )
}

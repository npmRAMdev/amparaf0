import { SeguintContact } from "@/components/opcions/favorits/SeguintContact"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ampara App",
  description: "l'App del comerç local",
}
export default function SeguintPage () {

  return (
    <div className='px-2 md:px-0 '>
        <SeguintContact />
    </div>
  )
}
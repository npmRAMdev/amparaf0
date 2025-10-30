import Calendar from "@/components/opcions/calendari/Calendar"
import Politiques from "@/components/opcions/calendari/Politiques"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ampara App",
  description: "l'App del comerç local",
}

export default function CalendariPage () {
  return (
    <div className="w-full max-w-5xl mx-auto mb-40 min-h-screen flex flex-col" >
      <div className="flex-1">
        <Calendar />
      </div>
      <div className="mt-auto">
        <Politiques />
      </div>
    </div>
  )
}
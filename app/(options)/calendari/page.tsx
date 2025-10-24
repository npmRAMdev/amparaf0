import Calendar from "@/components/opcions/calendari/Calendar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ampara App",
  description: "l'App del comerç local",
}

export default function CalendariPage () {
  return (
    <div className="w-full max-w-5xl mx-auto mb-40 min-h-screen" >
      <Calendar />
    </div>
  )
}

import OptionButtons from "@/components/opcions/OptionButtons"
import Header from "@/components/Header"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ampara App",
  description: "l'App del comerç local",
}

export default async function BotigaIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="bg-stone-7">

          {children}

      </div>
  );
}
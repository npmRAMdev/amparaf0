import OptionButtons from "@/components/opcions/OptionButtons"
import Header from "@/components/Header"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ampara App",
  description: "l'App del comerç local",
}

export default async function OptionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="relative w-full">
        <Header />
        <main className="relative z-0"> {/* Assegura't que el z-index és inferior */}
          {children}
        </main>
        <div className="fixed bottom-0 left-0 w-full z-90">
          <OptionButtons />
        </div>
      </div>
  );
}
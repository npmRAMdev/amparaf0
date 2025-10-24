import "./globals.css"
import { Geist } from "next/font/google"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ampara App",
  description: "l'App del comerç local",
}
const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca" className={geistSans.className} >
      <body className="bg-stone-7">
        <div className='max-w-5xl mx-auto'>
                {children}
        </div>
      </body>
    </html>
  )
}

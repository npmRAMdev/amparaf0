import Link from "next/link"
export default function Politiques () {
  return (
    <div className='text-2xs sm:text-sm text-stone-4 space-x-2 sm:space-x-4 text-center'>
      <Link href="/politiques/avis-legal">Avís Legal</Link>
      <Link href="/politiques/p-privacitat">Politica de privacitat</Link>
      <Link href="/politiques/p-galetes">Politica de cookies</Link>
    </div>
  )
}

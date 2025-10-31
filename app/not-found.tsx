// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Pàgina no trobada</h1>
      <p className="text-lg mb-8">La pàgina que busques no existeix.</p>
      <Link 
        href="/actualitat"
        className="bg-emerald-3 hover:bg-emerald-1 text-stone-8 font-bold py-2 px-4 rounded"
      >
        Tornar a l'inici
      </Link>
    </div>
  );
}
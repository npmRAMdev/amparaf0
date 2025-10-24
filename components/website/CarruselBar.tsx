'use client'

import Image from 'next/image'
import type { Imatge } from '@/utils/schemas'

export default function CarruselBar({ imatges }: { imatges: Imatge[] }) {
  if (!imatges || imatges.length === 0) {
    return <div className="text-center text-red-500">No hi ha imatges disponibles</div>
  }

  // Dupliquem les imatges per a l’efecte infinit
  const duplicatedImatges = [...imatges, ...imatges]

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-stone-100 shadow">
      <div className="flex h-64 animate-carrusel-suau">
        {duplicatedImatges.map((imatge, index) => (
          <div 
            key={`${imatge.id || imatge.url}-${index}`} 
            className="flex-shrink-0 w-1/3 relative"
          >
            <Image
              src={imatge.url}
              alt={`Imatge ${imatge.name}`}
              className="object-cover w-full h-full rounded-lg"
              width={400}
              height={256}
              priority={index < 3}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

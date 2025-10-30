'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getPubAction } from '@/actions/publicacions/get-pub-action'
import SocialButtons from '@/components/SocialButtons'
import { FaArrowCircleRight } from "react-icons/fa"
import GoBackButton from '@/components/GoBackButton'

export default function PublicacioIdPage({ params }: { params: Promise<{ botigaid: string, grupid: string, pubid: string }> }) {
  const [pub, setPub] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState<string[]>([])
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const resolvedParams = await params
        const result = await getPubAction({ id: resolvedParams.pubid })
        
        if (result.errors.length > 0) {
          setErrors(result.errors)
        } else {
          setPub(result.pub)
        }
      } catch (error) {
        setErrors(['Error carregant les dades'])
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [params])

  const handleFrontClick = () => {
    setIsFlipped(true) // Sols gira de frontal a posterior
  }

  const handleBackClick = () => {
    setIsFlipped(false) // Sols gira de posterior a frontal
  }

  if (loading) {
    return (
      <div className="w-full h-screen bg-stone-1 flex items-center justify-center">
        <div className="text-stone-8 text-xl">carregant..</div>
      </div>
    )
  }

  if (errors.length > 0 || !pub) {
    return (
      <div className="w-full h-screen bg-stone-1 flex items-center justify-center">
        <div className="text-stone-8 text-center">
          <p className="text-2xl mb-4">Error</p>
          <p>{errors.join(', ') || "No s'ha trobat la publicació"}</p>
        </div>
      </div>
    )
  }

  //console.log('PublicacioIdPage pub:', pub)

  return (
    <div className="w-full h-screen bg-stone-1 relative overflow-hidden perspective-1000">
      {/* Contenidor 3D */}
      <div className={`relative w-full h-full transition-transform duration-1000 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>

        {/* Part frontal - Imatge (click a tota la pàgina) */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden cursor-pointer"
          onClick={handleFrontClick}
        >
          <div className="relative w-full h-full">
            <Image
              src={pub?.image ?? "/default-image-rectang.webp"}
              alt={`image of ${pub?.title}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Part posterior - Informació (sense click a tota la pàgina) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-stone-5 text-stone-8 overflow-y-auto p-2 opacity-95">
          <GoBackButton />
          
          {/* Icona per tornar - Sols aquesta fa flip */}
          <div 
            className="absolute top-4 right-4 z-20 cursor-pointer text-stone-2"
            onClick={handleBackClick}
          >
            <FaArrowCircleRight size={24} className='bg-stone-8 rounded-full hover:bg-stone-6' />
          </div>

          {/* Contenidor principal amb flex column i justify-end */}
          <div className="h-full flex flex-col justify-end pb-20 sm:pb-26">
            <div className="max-w-2xl mx-auto w-full flex flex-col items-center">
              <h2 className="text-sm sm:text-xl font-bold text-stone-2 uppercase">{pub?.botigaName || 'Sense subtítol'}</h2>
              <h2 className="text-sm sm:text-xl font-bold mb-3 text-stone-2 uppercase">
                <span className='capitalize italic'>{pub?.grupName || 'Sense grup'}</span>
              </h2>
              <h1 className="text-lg sm:text-4xl font-bold mb-2 text-emerald-2 text-center">
                {pub?.title || 'Sense títol'}
              </h1>
              
              <div className="space-y-4 text-stone-3 w-full">
                {pub?.description && (
                  <p className="text-sm sm:text-lg leading-relaxed text-stone-2 text-justify">
                    {pub.description}
                  </p>
                )}
                
                <div className="mt-4 flex flex-col items-center w-full">
                  <div className="gap-2 w-full flex flex-col items-center">
                    {pub?.eventDate && (
                      <div className='flex gap-1 justify-center'>
                        <span className="text-stone-3 text-sm sm:text-xl">Data i hora:</span>
                        <p className="font-bold text-sm sm:text-xl">
                          {new Date(pub.eventDate).toLocaleDateString('ca-ES')}
                        </p>
                      </div>
                    )}
                    
                    {pub?.eventLocation && (
                      <div className='flex text-stone-3 gap-1 justify-center'>
                        <span className="text-stone-3 text-sm sm:text-xl">Lloc:</span>
                        <p className="font-bold text-sm sm:text-xl">{pub.eventLocation}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 p-5 z-10">
                <SocialButtons />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS inline per assegurar funcionament */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}
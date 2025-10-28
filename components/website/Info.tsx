// components/Info.tsx
'use client'

import { useState } from 'react';
import InfoModal from './InfoModal'
import { FaInfo } from 'react-icons/fa'
import type { Botiga } from '@/utils/schemas/index'

export default function Info({ info }: { info: Botiga['info'] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  //<TextDisplay message={info} className='text-center text-stone-2' />

  return (
    <>
      <div 
        className="col-span-4 w-full p-4 bg-stone-6 shadow-md rounded-xl flex justify-center items-center gap-2 cursor-pointer"
        onClick={handleOpenModal}
      >
        <FaInfo className='text-emerald-4 text-6xl' />
        <p className='text-2xl text-emerald-4 font-bold tracking-wide cursor-pointer hidden sm:block'>
          info
        </p>
      </div>

      <InfoModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="prose">
          {info && (
            <p className={`whitespace-pre-wrap leading-relaxed text-justify text-stone-2`}
              style={{ wordWrap: 'break-word', overflowWrap: 'break-word'}} >
                {info}
            </p>)}
        </div>
      </InfoModal>
    </>
  );
}
'use client'
import { useRouter } from 'next/navigation'
import { IoClose } from 'react-icons/io5'

export default function GoBackButton ({p} : {p?: string}) {
    const router = useRouter()
  return (
    <>
    <p className='italic text-stone-2'>{p}</p>
      <button 
        onClick={() => router.back()}
        className=" flex justify-center items-center text-stone-8 gap-3 mt-3 ml-3"
      >
        <IoClose size={24} className='bg-stone-700/60 rounded-full hover:bg-stone-700/90' />
      </button>
    </>
  )
}

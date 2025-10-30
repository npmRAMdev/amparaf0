'use client'
import { useRouter } from 'next/navigation'
import { FaArrowCircleLeft } from "react-icons/fa"

export default function GoBackButton () {
    const router = useRouter()
  return (
    <>
      <button 
        onClick={() => router.back()}
        className=" absolute top-4 left-4 bg-opacity-60 z-10 text-stone-2 rounded-full active:scale-90 active:text-stone-300 transition-transform duration-150 ease-in-out"
      >
        <FaArrowCircleLeft size={24} className='bg-stone-8 rounded-full hover:bg-stone-6 transition-colors' />
      </button>
    </>
  )
}


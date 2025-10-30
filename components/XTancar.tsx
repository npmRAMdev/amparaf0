'use client'
import { useRouter } from 'next/navigation'
import { IoClose } from 'react-icons/io5'

export default function XTancar () {
  const router = useRouter()
  return (
    <button onClick={() => router.back()} className="absolute top-4 right-4 z-10 rounded-full active:scale-90 active:text-stone-300 transition-transform duration-150 ease-in-out">
          <IoClose size={24} className='bg-opacity-80 bg-stone-700 rounded-full hover:bg-stone-800 transition-colors text-stone-7' />
    </button>
  )
}

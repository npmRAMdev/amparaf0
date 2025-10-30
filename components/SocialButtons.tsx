'use client'
import { useState, useRef } from 'react'
import Link from "next/link"
import { FaRegHandPeace, FaRegHandPointUp, FaRegHandSpock, FaRegHandPointRight } from "react-icons/fa6"
import SharePopup from './SharePopup' 

export default function SocialButtons() {
  const [activeMessage, setActiveMessage] = useState<string | null>(null)
  const [showSharePopup, setShowSharePopup] = useState(false)
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const shareButtonRef = useRef<HTMLAnchorElement>(null)

  const handleIconClick = (message: string, e: React.MouseEvent) => {
    e.preventDefault()
    setActiveMessage(message)
    // Neteja el timeout anterior si existeix
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current)
    }
    // Configura nou timeout
    messageTimeoutRef.current = setTimeout(() => {
      setActiveMessage(null)
    }, 2000)
  }
  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowSharePopup(true)
  }

  return (
    <div className='flex gap-2 mt-3 text-stone-4 space-x-2 text-xl sm:text-2xl px-1 relative p-3'>
      <Link 
        href='' 
        onClick={(e) => handleIconClick("m'agrada", e)}
        className='hover:text-emerald-2 flex items-center gap-1 transition-colors'
      >
        <FaRegHandPeace />
        <span className='min-[450px]:flex text-sm font-medium'>853</span>
      </Link>
      <Link 
        href='' 
        onClick={(e) => handleIconClick("participaré", e)}
        className='hover:text-emerald-2 flex items-center gap-1 transition-colors'
      >
        <FaRegHandPointUp />
        <span className='min-[400px]:flex text-sm font-medium'>153</span>
      </Link>
      <Link 
        href='' 
        onClick={(e) => handleIconClick("subscriure's", e)}
        className='hover:text-emerald-2 flex items-center gap-1 transition-colors'
      >
        <FaRegHandSpock />
        <span className='min-[450px]:flex text-sm font-medium'>3.253</span>
      </Link>
      <Link 
        href=''
        ref={shareButtonRef}
        onClick={handleShareClick}
        className='hover:text-emerald-2 flex items-center gap-1 transition-colors'
      >
        <FaRegHandPointRight />
      </Link>
      {activeMessage && (
        <div 
          className="absolute bg-stone-8 text-stone-2 px-3 py-2 rounded-md shadow-lg text-sm font-medium whitespace-nowrap z-50 animate-fade-in"
          style={{
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '10px'
          }}
        >
          {activeMessage}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-white"></div>
        </div>
      )}
      {showSharePopup && (
        <SharePopup 
          anchorEl={shareButtonRef.current}
          onClose={() => setShowSharePopup(false)}
        />
      )}
    </div>
  )
}
'use client'
import { useEffect, useRef } from 'react'
import { FaFacebook, FaTwitter } from "react-icons/fa"
import { IoLogoWhatsapp } from "react-icons/io"
import { MdEmail } from "react-icons/md"

type SharePopupProps = {
  anchorEl: HTMLElement | null
  onClose: () => void
}

export default function SharePopup({ anchorEl, onClose }: SharePopupProps) {
  const popupRef = useRef<HTMLDivElement>(null)

  // Tanca el popup quan es fa clic a fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  // Calcula la posició basada en l'element anchor
  const getPosition = () => {
    if (!anchorEl) return { top: 0, left: 0 }
    
    const rect = anchorEl.getBoundingClientRect()
    return {
      top: rect.top + window.scrollY - 70,
      left: rect.left + window.scrollX - 170
    }
  }

  const shareOptions = [
    { name: 'Facebook', icon: <FaFacebook />, action: () => shareOn('facebook') },
    { name: 'Twitter', icon: <FaTwitter />, action: () => shareOn('twitter') },
    { name: 'WhatsApp', icon: <IoLogoWhatsapp />, action: () => shareOn('whatsapp') },
    { name: 'Correu', icon: <MdEmail />, action: () => shareOn('email') }
  ]

  const shareOn = (platform: string) => {
    // Aquí pots implementar la lògica per compartir
    //console.log(`Compartint a ${platform}`)
    // Exemple genèric:
    const url = window.location.href
    let shareUrl = ''
    
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${url}`)}`
        break
      case 'email':
        shareUrl = `mailto:?body=${encodeURIComponent(`${url}`)}`
        break
    }
    
    window.open(shareUrl, '_blank')
    onClose()
  }

  const position = getPosition()

  return (
    <div 
      ref={popupRef}
      className="fixed bg-stone-7 text-stone-3 p-2 rounded-md shadow-lg z-50 animate-fade-in"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex gap-3 px-2 py-1">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={option.action}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-7 hover:text-emerald-3 transition-colors"
              title={option.name}
            >
              {option.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
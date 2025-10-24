// components/Modal.tsx
'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { IoClose } from 'react-icons/io5'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function InfoModal({ isOpen, onClose, children }: ModalProps) {
  // Tancar modal amb tecla ESC
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose]);

  // Aturar propagació del clic dins del modal
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  if (!isOpen) return null 

  return createPortal(
    <div 
      className="fixed inset-0 bg-stone-700 bg-opacity-70 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
          className="bg-stone-8 rounded-lg shadow-xl max-w-md md:max-w-xl w-full max-h-[100vh] overflow-y-auto p-4 flex flex-col"
          onClick={handleModalClick}
        >
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="rounded-full bg-stone-500 text-stone-8 hover:bg-stone-600 transition-colors"
            >
              <IoClose size={24} />
            </button>
          </div>

          {children}
        </div>

    </div>,
    document.body
  );
}
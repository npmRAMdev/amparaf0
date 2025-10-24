'use client'

import { useState, useEffect } from 'react'
import { getFormularisAction } from '@/actions/formularis/get-formularis-action'
import { sendEmailBrevoAction } from '@/actions/emails/send-email-brevo-action'
import type { Formulari } from '@/utils/schemas'
import { SiGoogleforms } from "react-icons/si"
import { IoClose } from 'react-icons/io5'

function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-700 bg-opacity-50">
      <div className="relative bg-stone-8 rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10"
        >
          <IoClose size={24} />
        </button>
        {children}
      </div>
    </div>
  )
}

export default function FormulariConsulta({ emailRecipient, botigaid }: { emailRecipient: string, botigaid: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null)
  const [formularis, setFormularis] = useState<Formulari[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    destinatari: '',
    nom: '',
    email: '',
    concepte: '',
    missatge: ''
  })

  // Fetch formularis when component mounts or botigaid changes
  useEffect(() => {
    async function fetchFormularis() {
      setIsLoading(true)
      try {
        const result = await getFormularisAction(botigaid)
        if ('formularis' in result) {
          setFormularis(result.formularis)
        } else {
          setFormularis([])
        }
      } catch (error) {
        console.error('Error carregant formularis:', error)
        setFormularis([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchFormularis()
  }, [botigaid])

  const obrirModal = () => {
    setIsModalOpen(true)
    setMessage(null)
  }

  const tancarModal = () => {
    setIsModalOpen(false)
    setMessage(null)
    // Reset del formulari al tancar
    setFormData({
      destinatari: '',
      nom: '',
      email: '',
      concepte: '',
      missatge: ''
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Funció per verificar si tots els camps estan emplenats
  const isFormValid = () => {
    return (
      formData.destinatari !== '' &&
      formData.nom.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.concepte.trim() !== '' &&
      formData.missatge.trim() !== ''
    )
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    if (!isFormValid()) return
    
    setIsSubmitting(true)
    setMessage(null)
    
    const formDataToSend = new FormData()
    formDataToSend.append('recipient', emailRecipient)
    formDataToSend.append('botigaid', botigaid)
    formDataToSend.append('emailRecipient', formData.destinatari)
    formDataToSend.append('nom', formData.nom)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('concepte', formData.concepte)
    formDataToSend.append('missatge', formData.missatge)
    
    try {
      const result = await sendEmailBrevoAction(formDataToSend)
      
      if (result.success) {
        setMessage({ text: result.message || 'Missatge enviat correctament!', type: 'success' })
        
        setTimeout(() => {
          setIsModalOpen(false)
          setMessage(null)
          // Reset del formulari després de l'enviament exitós
          setFormData({
            destinatari: '',
            nom: '',
            email: '',
            concepte: '',
            missatge: ''
          })
        }, 2000)
      } else {
        setMessage({ text: result.message || 'Error en enviar el missatge', type: 'error' })
      }
    } catch (error) {
      console.error('Error inesperat:', error)
      setMessage({ text: 'Error inesperat en enviar el formulari', type: 'error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Mostrar loading mentre es carreguen les dades
  if (isLoading) {
    return (
      <div className="col-span-12 w-full p-4 bg-stone-6 shadow-md rounded-xl flex justify-center items-center">
        <p className="text-stone-500">Carregant...</p>
      </div>
    )
  }

  // Mostrar missatge si no hi ha formularis
  if (!formularis || formularis.length === 0) {
    return (
      <div className="col-span-12 w-full p-4 bg-stone-6 shadow-md rounded-xl flex justify-center items-center">
        <p className="text-stone-500">No hi ha destinataris a qui dirigir-se</p>
      </div>
    )
  }

  // Mostrar el formulari si hi ha formularis
  return (
    <>
      <div 
        onClick={obrirModal}
        className="col-span-12 hover:bg-stone-5 w-full p-4 bg-stone-6 shadow-md rounded-xl flex justify-center items-center gap-2 cursor-pointer"
      >
        <SiGoogleforms className="text-stone-500 text-4xl"/>
        <p className="text-2xl text-stone-500 font-bold">formulari de consulta</p>
      </div>

      <Modal isOpen={isModalOpen} onClose={tancarModal}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">formulari de contacte</h2>
          
          {message && (
            <div className={`p-3 mb-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message.text}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="destinatari" className="block mb-1">destinatari</label>
              <select 
                id="destinatari"
                name="destinatari" 
                value={formData.destinatari}
                onChange={handleInputChange}
                className="mb-4 w-full p-2 border border-gray-300 rounded-md cursor-pointer"
                disabled={isSubmitting}
                required
              >
                <option className='italic' value="">selecciona destinatari</option>
                {formularis.map(formulari => (
                  <option key={formulari.id} value={formulari.id}>
                    {formulari.nom} - {formulari.grup}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="nom" className="block mb-1">nom</label>
              <input 
                type="text" 
                id="nom" 
                name="nom" 
                value={formData.nom}
                onChange={handleInputChange}
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-1">correu electrònic</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleInputChange}
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="concepte" className="block mb-1">concepte</label>
              <input 
                type="text" 
                id="concepte" 
                name="concepte" 
                value={formData.concepte}
                onChange={handleInputChange}
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="missatge" className="block mb-1">missatge</label>
              <textarea 
                id="missatge" 
                name="missatge" 
                value={formData.missatge}
                onChange={handleInputChange}
                rows={4} 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={isSubmitting}
              ></textarea>
            </div>
            
            <div className="flex gap-2">
              <button 
                type="button" 
                onClick={tancarModal}
                className="flex-1 bg-stone-4 text-stone-8 py-2 px-4 rounded-md hover:bg-stone-5"
                disabled={isSubmitting}
              >
                cancel·lar
              </button>
              
              <button 
                type="submit" 
                className="flex-1 bg-emerald-500 text-stone-8 py-2 px-4 rounded-md hover:bg-emerald-600 disabled:bg-emerald-300"
                disabled={isSubmitting || !isFormValid()}
              >
                {isSubmitting ? 'enviant...' : 'enviar'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}
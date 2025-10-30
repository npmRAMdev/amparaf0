'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ca } from 'date-fns/locale'
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek
} from 'date-fns'
import CalendarEventsList from '@/components/opcions/calendari/CalendarEventsList'
import { getAllMonthPublicacionsAction } from '@/actions/publicacions/get-all-month-publicacions-action'

// Tipus defensius per a pubs
interface CalendarPublicacio {
  id?: string | number
  title?: string
  description?: string
  eventDate?: string | null
  createdAt?: string | Date | null
  [key: string]: any
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [publicacions, setPublicacions] = useState<CalendarPublicacio[]>([])

  useEffect(() => {
    ;(async () => {
      const result = await getAllMonthPublicacionsAction()
      if (result && typeof result === 'object' && 'publicacions' in result && Array.isArray((result as any).publicacions)) {
        setPublicacions((result as any).publicacions as CalendarPublicacio[])
      } else {
        setPublicacions([])
      }
    })()
  }, [currentDate])

  // Agrupar esdeveniments per data amb guardes
  const eventsByDate = publicacions.reduce((acc: Record<string, CalendarPublicacio[]>, publicacio) => {
    const raw = publicacio?.eventDate ?? publicacio?.createdAt
    if (!raw) return acc

    const date =
      typeof raw === 'string'
        ? raw.split('T')[0]
        : (() => {
            try {
              return new Date(raw as any).toISOString().split('T')[0]
            } catch {
              return null
            }
          })()

    if (!date) return acc
    if (!acc[date]) acc[date] = []
    acc[date].push(publicacio)
    return acc
  }, {})

  // Generar dies del mes actual (començant en dilluns)
  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 })
  })

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  const selectedEvents = selectedDate ? eventsByDate[selectedDate] || [] : []

  return (
    <div className='py-4 px-2 sm:px-4'>
      <div className='flex items-center justify-between mb-4'>
        <button onClick={handlePrevMonth} className='text-stone-600 hover:text-emerald-600 focus:outline-none'>
          <p className='sm:flex'>&larr; <span className='hidden sm:flex'>mes anterior</span></p>
        </button>
        <h2 className='text-lg font-bold text-stone-700'>
          {format(currentDate, 'MMMM yyyy', { locale: ca })}
        </h2>
        <button onClick={handleNextMonth} className='text-stone-600 hover:text-emerald-600 focus:outline-none'>
          <p className='sm:flex'><span className='hidden sm:block'>mes següent</span>&rarr;</p>
        </button>
      </div>

      <div className='grid grid-cols-7 gap-px bg-stone-6 text-center text-sm font-semibold text-stone-700'>
        {['dl', 'dt', 'dc', 'dj', 'dv', 'ds', 'g'].map(day => (
          <div key={day} className='bg-stone-7 py-2'>{day}</div>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-px border-b border-stone-300 bg-stone-6 text-center text-xs font-semibold leading-6 text-stone-700'>
        {daysInMonth.map(day => {
          const formattedDate = format(day, 'yyyy-MM-dd')
          const events = eventsByDate[formattedDate] || []

          return (
            <Link
              href='#'
              key={formattedDate}
              className={`relative px-3 py-2 border border-stone-200 ${events.length > 0 ? 'bg-emerald-100' : 'bg-stone-8'} hover:bg-emerald-50 transition`}
              onClick={() => setSelectedDate(formattedDate)}
            >
              <time dateTime={formattedDate} className='block text-stone-900 font-medium'>
                {format(day, 'd')}
              </time>
              {events.map((event, i) => (
                <p
                  key={String(event.id ?? `${event.title ?? 'event'}-${i}`)}
                  className='block mt-1 text-sm text-emerald-600 truncate focus:outline-none focus:ring-2 focus:ring-emerald-400'
                  title={event.description}
                >
                  {event.title ?? 'event'}
                </p>
              ))}
            </Link>
          )
        })}
      </div>

      <CalendarEventsList
        events={selectedEvents.map(publicacio => ({
          id: String(publicacio.id ?? ''),
          title: publicacio.title ?? '',
          image: publicacio.image ?? '',
          description: publicacio.description ?? '',
          eventDate: publicacio.eventDate ? new Date(publicacio.eventDate) : null,
          createdAt: publicacio.createdAt ? new Date(publicacio.createdAt as string) : new Date(),
          moreInfo: publicacio.moreInfo ?? '',
          eventLocation: publicacio.eventLocation ?? null,
          botigaId: publicacio.botigaId ?? '',
          grupId: publicacio.grupId ?? '',
          grupName: publicacio.grupName ?? '',
          botigaName: publicacio.botigaName ?? ''
        }))}
      />
    </div>
  )
}
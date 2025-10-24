import { FaRegHandSpock } from "react-icons/fa6"
import type { Botiga } from '@/utils/schemas';

interface HeadElementProps {
  name?: Botiga['name'];
  address?: Botiga['address'];
  logo?: Botiga['logo'];
}

export function HeadElement ( { name, address, logo }: HeadElementProps ) {
  if (!name || !address || !logo) {
    return <p>No hi ha res que mostrar</p>
  }
  return (
    <div className="flex flex-col">
      <div className="bg-stone-6 border-stone-5 shadow rounded-xl p-4">
        <div className="flex gap-1 sm:gap-4 flex-col sm:flex items-center">
          <div className='flex'>
            <div className="flex-1 justify-center h-auto w-24 sm:w-40">
              <img src={logo} alt="logo parròquia" className="w-24 sm:w-40 h-auto object-cover rounded-xl"/>
            </div>
            <div className="flex mb-auto ml-auto">
            </div>{}
          </div>
          <div className="flex flex-col w-full items-center">
              <p className='text-stone-600 font-bold text-lg sm:text-2xl text-center uppercase'>{name}</p>
              <p className='text-stone-500 font-bold text-center'>{address}</p>
          </div>
        </div>
        </div>
    </div>
  )
}

'use client'
import Link from 'next/link'
import Image from 'next/image'

interface EntityProps {
  id: string;
  name: string,
  contactImage: string,
  contactName: string,
  color1: string,
  color2: string
}

export const SeguintContactCard: React.FC<EntityProps> = ({contactImage, contactName, id, name, color1, color2 }) => {

  return (
        <Link href={`/${id}/web`} className="w-full">
          <div className="w-full max-w-lg hover:shadow-lg relative flex flex-col mx-auto shadow-md m-3 rounded">
            <div style={{
                zIndex: -1,
                height: '80px',
                background: `linear-gradient(50deg, ${color1} 10%, ${color2} 90%)`,
                opacity: 0.9
              }} className='max-h-20 w-full absolute top-0 rounded' />
            <div className="w-full flex m-3 ml-4 text-stone-8">
              <Image className="w-28 h-28 p-1 bg-stone-8 rounded-full" src={contactImage} alt={`${name}'s profile`} priority width={100} height={100} />
              <div className="mt-11 ml-2 font-bold flex flex-col">
                <div className="name break-words">{contactName}</div>
                <div className="add font-semibold text-sm italic dark mt-1 text-black capitalize">{name}</div>
              </div>
            </div>
          </div>
        </Link>
  );
};

type ProfileElementProps = {
    name: string;
    role?: string;
    src?: string;
    price?: number;
    verified?: boolean;
  };
  
  export const GrupsDialog: React.FC<ProfileElementProps> = ({name, role, src, price, verified}) => (
    
    <div className='flex items-center p-4 rounded-xl bg-stone-6 hover:bg-stone-5 w-full h-full'>
      <img className="w-14 h-14 rounded-full mr-4 object-cover" src={src} alt={name} />
      <div className="flex-1">
        <div className="text-stone-500 font-bold tracking-wider text-xl">{name}</div>
        {role && <div className="text-md text-stone-500">{role}</div>}
        {verified && <span className="text-green-400 text-xs">✔ Verified</span>}
        {price !== undefined && <div className="text-sm text-stone-500">${price}</div>}
      </div>
    </div>
  );
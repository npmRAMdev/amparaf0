'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { LuNewspaper, LuCalendarDays, LuFileHeart } from "react-icons/lu"

const menuItems = [
  { label: "actualitat", icon: LuNewspaper, option: "/actualitat" },
  { label: "calendari", icon: LuCalendarDays, option: "/calendari" },
  { label: "favorits", icon: LuFileHeart, option: "/favorits" },
];

export default function OptionButtons() {
  const pathname = usePathname()

  return (
    <div className="flex items-center justify-between px-1 sm:px-5 bg-stone-100/[96%] max-w-5xl mx-auto">
      <div className="w-full mx-auto">
        <div className="">
          <div className="flex justify-around">
            {menuItems.map(item => (
              <div key={item.option} className="group flex-1 gap-1">
                <Link href={item.option} className="flex justify-center text-center mx-auto pt-1 w-full text-stone-4 group-hover:text-emerald-4 active:scale-90 active:text-emerald-5 transition-transform duration-150 ease-in-out">
                  <span className={`px-1 pt-1 pb-1 flex flex-col items-center ${pathname === item.option ? 'text-emerald-4 font-bold' : ''}`}>
                      <item.icon className="text-2xl min-[300px]:text-3xl md:text-5xl pt-1 mb-1 block" />
                    <span className="block text-xs min-[300px]:text-sm md:text-xl pb-1">{item.label}</span>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
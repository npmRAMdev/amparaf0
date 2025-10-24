import Link from "next/link"


export default async function Header() {


  return (

<div className="w-full max-w-5xl mx-auto">
  <nav className="w-full bg-emerald-400 h-11 min-[300px]:h-12">
    <div className="w-full max-w-5xl flex justify-between items-center p-2 md:px-5 text-sm mx-auto">
      <Link href={"/actualitat"} className='text-base text-stone-50 min-[300px]:text-xl min-[450px]:text-2xl tracking-wider font-semibold'>ampara</Link>
    </div>
  </nav>
</div>

  )
}

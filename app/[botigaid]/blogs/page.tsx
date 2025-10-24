
import Link from "next/link"
import { getBlogsAction } from "@/actions/blogs/get-blogs-action"
import { formatData } from "@/utils/helpers/formatDate"
import GoBackButton from '@/components/GoBackButton'
import { IoClose } from 'react-icons/io5'
import { RiArrowUpDoubleLine } from "react-icons/ri"
import type { Blog } from "@/utils/schemas"

export default async function BlogPage ({
  params,
}: {
  params: Promise<{ botigaid: string }>
}) {
  const resolvedParams = await params
    const botigaid = resolvedParams.botigaid
    let p = ''
    if (!botigaid) {
      p = 'BotigaId no proporcionat'
      return <div className="text-center text-red-500"><GoBackButton p={p}/></div>
    }
  const { errors, blogs } = await getBlogsAction(botigaid)
  //console.log ('avisos', avisos.botigaName[0])
  //console.log('avisos', avisos);
  if (errors.length > 0) {
    return <div className="text-center text-red-500">Avisos no trobats</div>
  }
 
  return (
    <div className='px-2 py-3'>
      {blogs && blogs.map((blog: Blog) => 
        <Link href={`/${botigaid}/blogs/${blog.id}`} key={blog.id} >
          <div className="bg-stone-6 rounded my-2 p-1 space-y-4 flex flex-col">
            <div className='p-2 sm:p-3 space-y-2'>
              <time className="text-sm text-stone-500 ml-auto">{formatData(blog.createdAt.toString())}</time>
              <div className="w-full h-48 overflow-hidden rounded-lg flex justify-center">
                <img src={blog.image} alt='mare de Déu' className="w-30 h-full object-cover rounded" />
              </div>
              <p className="text-lg font-bold text-stone-2 flex justify-center">{blog.title}</p>
            </div>
          </div>
        </Link>
      )}
      <div className="absolute top-4 right-4 z-1 bg-stone-700/60 rounded-full ">
        <Link href={`/${botigaid}/web`} className="text-stone-50 ">
          <IoClose size={24} />
        </Link>
      </div>
      <div className="fixed bottom-16 right-2 sm:right-5 lg:right-10 xl:right-20 min-[500px]:right-3 z-1 bg-stone-700/60 rounded-full">
        <Link href='#' className="bg-stone-700/60 w-full rounded-full text-stone-8">
          <RiArrowUpDoubleLine size={24} />
        </Link>
      </div>
    </div>

    
  )
}


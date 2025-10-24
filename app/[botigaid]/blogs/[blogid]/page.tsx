import Link from "next/link"
import { getBlogAction } from "@/actions/blogs/get-blog-action"
import { formatData } from "@/utils/helpers/formatDate"
import GoBackButton from "@/components/GoBackButton"
import { IoClose } from 'react-icons/io5'
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ blogid: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const blogid = resolvedParams.blogid
  const { blog } = await getBlogAction(blogid)
  console.log('blog', blog)
  if (!blog) {
    return {
      title: "Ampara App",
      description: "l'App del comerç local",
    }
  }
  return {
    title: blog.title ?? "Blog · Ampara App",
    description: blog.description ?? "Detall del blog",
    openGraph: {
      title: blog.title ?? "Blog · Ampara App",
      description: blog.description ?? "Detall del blog",
      images: blog.image ? [blog.image] : [],
      type: 'article',
      url: `https://ampara.app/app/${blog.botigaId}/blogs/${blog.id}`,
    }
  }
}
  
  export default async function BlogIdPage ({
  params,
}: {
  params: Promise<{ blogid: string, botigaid: string }>
}) {
  const resolvedParams = await params
  const blogid = resolvedParams.blogid
  const botigaid = resolvedParams.botigaid
  let p = ''
  if (!botigaid || !blogid) {
    p ='Blog no trobat'
    return <div className="text-center text-red-500"><GoBackButton p={p}/></div>
  }

  //const { botigaid: botigaId, blogid } = await params
  const { errors, blog } = await getBlogAction(blogid)
  //console.log ('avisos', avisos.botigaName[0])
  //console.log('avisos', avisos);
      if (errors.length > 0) {
        return <div className="text-center text-red-500">Blogs no trobats</div>
      }
     
    return (
      <article className="rounded my-2 p-1 space-y-4 flex flex-col">
        <div className='p-2 sm:p-3 space-y-2'>
          <time className="text-sm text-stone-500 ml-auto">{formatData(blog.createdAt.toString())}</time>
          <div className="w-full h-48 overflow-hidden rounded-lg flex justify-center">
            <img src={blog.image} alt='mare de Déu' className="w-30 h-full object-cover rounded" />
          </div>
          <h2 className="text-lg font-bold text-stone-800 flex justify-center">{blog.title}</h2>
          <p className="text-stone-700 text-justify text-sm">{blog.description}</p>
        </div>
        <div className="absolute top-4 right-4 z-1 bg-stone-700/60 rounded-full ">
          <Link href={`/${botigaid}/blogs`} className="text-stone-50 ">
              <IoClose size={24} />
          </Link>
        </div>
      </article>
    );
  };
'use server'

import { createClient } from '@/utils/supabase/server'
import type { Blog } from '@/utils/schemas'

export const getBlogsAction = async (botigaid: Blog ['id']) => {

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('botigaId', botigaid)
    .order('createdAt', { ascending: false })

//console.log('-----missatges------', data)

  if (error) {
    return {
      errors: [error.message],
      blogs: null,
    }
  }
  return {
    errors: [],
    blogs: data,
  }
}
'use server'

import { createClient } from '@/utils/supabase/server'
import type { Blog } from '@/utils/schemas'

export const getBlogAction = async (blogId: Blog['id']) => {

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', blogId)
    .single()

//console.log('-----blogs------', data)

  if (error) {
    return {
      errors: [error.message],
      blog: null,
    }
  }
  return {
    errors: [],
    blog: data,
  }
}
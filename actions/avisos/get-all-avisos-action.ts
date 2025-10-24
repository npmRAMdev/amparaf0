'use server'

import { createClient } from '@/utils/supabase/server'

export const getAllAvisosAction = async () => {
  const supabase = await createClient()

const maxPostsRequest = Number(process.env.MAX_POSTS_REQUEST)

  const { data, error } = await supabase
    .from('avisos')
    .select('*')
    .order('createdAt', { ascending: false })
    

  if (error) {
    return {
      errors: [error.message],
      avisos: null
    }
  }
  return {
    errors: [],
    avisos: data
  }
}
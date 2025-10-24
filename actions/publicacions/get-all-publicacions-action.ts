'use server'

import { createClient } from '@/utils/supabase/server'

export const getAllPublicacionsAction = async () => {
  const supabase = await createClient()

  const maxPostsRequest = Number(process.env.MAX_POSTS_REQUEST)

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('createdAt', { ascending: false })

  if (error) {
    return {
      errors: [error.message],
      publicacions: null
    }
  }
  return {
    errors: [],
    publicacions: data
  }
}
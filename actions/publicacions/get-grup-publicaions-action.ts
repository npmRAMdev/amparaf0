'use server'

import { createClient } from '@/utils/supabase/server'
import type { Grup } from '@/utils/schemas'

export const getGrupPublicacionsAction = async (grupid: Grup['id']) => {
  const supabase = await createClient()

  const maxPostsRequest = Number(process.env.MAX_POSTS_REQUEST)

  const { data, error } = await supabase
    .from('publicacions')
    .select('*')
    .eq('grupId', grupid)
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
'use server'

import { createClient } from '@/utils/supabase/server'
import type { Publicacio } from '@/utils/schemas'

export const getPubAction = async ({id}: {id: Publicacio ['id']}) => {

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('publicacions')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return {
      errors: [error.message],
      pub: null,
    }
  }

  return {
    errors: [],
    pub: data,
  }
}


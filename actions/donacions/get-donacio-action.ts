'use server'

import { createClient } from '@/utils/supabase/server'
import type { Botiga } from '@/utils/schemas'

export const getDonacioAction = async (botigaid: Botiga['id']) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('donacions')
    .select('*')
    .eq('botigaId', botigaid)
    .single()

  if (error) {
    return {
      errorsD: [error.message],
      donacio: null,
    }
  }  
  return {
    errorsD: [],
    donacio: data,
  }
}
'use server'

import { createClient } from '@/utils/supabase/server'
import type { Botiga } from '@/utils/schemas'

export const getAvisosAction = async (botigaId: Botiga['id']) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('avisos')
    .select('*')
    .eq('botigaId', botigaId)
    .order('createdAt', { ascending: false }) 
    .limit(20) // Uncomment if you want to limit the number of avisos returned

  if (error) {
    return {
      errors: [error.message],
      avisos: null,
    }
  }  
  return {
    errors: [],
    avisos: data,
  }
}
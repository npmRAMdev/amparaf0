'use server'

import { createClient } from '@/utils/supabase/server'
//import type { Entity } from '@/src/schemas/types'

export const getBotigaAvisosAction = async (botigaId: string) => {
  
  //console.log('getavissAction ----------------- botigaId', botigaId)
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('avisos')
    .select('*')
    .eq('botigaId', botigaId)
    .order('createdAt', { ascending: false })

  //console.log('getavissAction ----------------- data:', data)

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
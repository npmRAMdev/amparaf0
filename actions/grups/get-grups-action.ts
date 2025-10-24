'use server'

import { createClient } from '@/utils/supabase/server'
import type { Botiga } from '@/utils/schemas'

export const getGrupsAction = async (botigaId: Botiga ['id']) => {

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('grups')
    .select('*')
    .eq('botigaId', botigaId)

//console.log('-----grups------', data)

  if (error) {
    return {
      errorsG: [error.message],
      grups: null,
    }
  }
  return {
    errorsG: [],
    grups: data,
  }
}
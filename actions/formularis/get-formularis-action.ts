'use server'

import { createClient } from '@/utils/supabase/server'
import type { Botiga } from '@/utils/schemas'


export const getFormularisAction = async (botigaid: Botiga['id']) => {

  //console.log ('FORMULARIS botigaid----------------------', botigaid)

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('formularisc')
    .select('*')
    .eq('botigaId', botigaid)

    //console.log ('FORMULARIS data Action----------------------', data)

  if (error) {
    return {
      errors: [error.message],
      formularis: null,
    }
  }
  return {
    errors: [],
    formularis: data,
  }
}
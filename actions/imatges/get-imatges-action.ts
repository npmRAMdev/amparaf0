'use server'

import { createClient } from '@/utils/supabase/server'
import type { Botiga } from '@/utils/schemas'

export const getImatgesAction = async (botigaId: Botiga['id']) => {

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('imatges')
    .select('*')
    .eq('botigaId', botigaId)
    .limit(6) // Uncomment if you want to limit the number of avisos returned

  if (error) {
    return {
      errorsImatges: [error.message],
      imatges: null,
    }
  }
  return {
    errorsImatge: [],
    imatges: data,
  }
}

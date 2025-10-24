'use server'

import { createClient } from '@/utils/supabase/server'
import type { Botiga } from '@/utils/schemas'

export const getBotigaAction = async ({id}: {id: Botiga ['id']}) => {
  //console.log('getBotigaAction id:', id)
  const supabase = await createClient()

/*   const { data, error } = await supabase
    .from('botigues')
    .select('*, formularisc(*), donacions(*), imatges(*)')
    .eq('id', id)
    .single() */

    const { data, error } = await supabase
      .from('botigues')
      .select('id, name, address, phone, logo, info, website, whatsapp, facebook, instagram, tiktok, business, youtube, city, donacions(*), imatges(*)')
      .eq('id', id)
      .single()

  console.log('getBotigaAction data:', data)

  if (error) {
    return {
      errors: [error.message],
      botiga: null,
    }
  }

  return {
    errors: [],
    botiga: data,
  }
}


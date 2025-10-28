'use server'

import { createClient } from '@/utils/supabase/server'
//import type { Entity } from '@/src/schemas/types'

export const getBotigaPublicacionsAction = async (botigaId: string) => {
  
  //console.log('getPostsAction ----------------- botigaId:', botigaId)
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('publicacions')
    .select('*')
    .eq('botigaId', botigaId)
    .order('createdAt', { ascending: false })

  //console.log('getPubsAction ----------------- data:', data)

  if (error) {
    return {
      errors: [error.message],
      publicaions: null,
    }
  }
  return {
    errors: [],
    publicacions: data,
  }
}
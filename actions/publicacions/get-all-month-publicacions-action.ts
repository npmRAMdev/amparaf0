'use server'


import { createClient } from '@/utils/supabase/server'

export const getAllMonthPublicacionsAction = async () => {

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('publicacions')
    .select('*')
    .order('createdAt', { ascending: false })


  if (error) {
    return {
      errors: [error.message],
      publicacions: null,
    }
  }
  return {
    errors: [],
    publicacions: data,
  }
}
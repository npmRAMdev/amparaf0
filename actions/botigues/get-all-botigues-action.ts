'use server'

import { createClient } from '@/utils/supabase/server'

export const getAllBotiguesAction = async () => {

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('botigues')
    .select('id, contactImage, name, contactName, color1, color2')

  //console.log('getAllBotiguesAction data:', data)
  //console.log('getAllBotiguesAction error:', error)

  if (error) {
    return {
      errors: [error.message],
      botigues: null,
    }
  }
  return {
    errors: [],
    botigues: data,
  }
}
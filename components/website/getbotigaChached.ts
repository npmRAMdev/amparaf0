import { cache } from 'react'
import { getBotigaAction } from '@/actions/botigues/get-botiga-action'

// creem una versió memorizada de la funció
export const getBotigaCached = cache(async (id: string) => {
  return await getBotigaAction({ id })
})



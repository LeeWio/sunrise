import { useMemo } from 'react'

import { useAppSelector } from './store'

export const useVariants = () => {
  const variants = useAppSelector(state => state.variants)

  return useMemo(() => variants, [variants])
}

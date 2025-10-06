import { useMemo } from 'react'

import { useAppSelector } from './store'

/**
 * 用于全局控制主题
 */
export const useVariants = () => {
  const variants = useAppSelector(state => state.variants)

  return useMemo(() => variants, [variants])
}

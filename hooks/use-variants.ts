import { useMemo, useState, useEffect } from 'react'

import { useAppSelector } from './store'

export const useVariants = () => {
  const variants = useAppSelector(state => state.variants)

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return useMemo(() => {
    if (!isMounted) {
      return {}
    }

    return variants
  }, [variants, isMounted])
}

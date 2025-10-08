import { useMemo } from 'react'

import { useAppSelector } from './store'

export const useDraft = () => {
  const draft = useAppSelector(state => state.article.draft)

  return useMemo(() => draft, [draft])
}

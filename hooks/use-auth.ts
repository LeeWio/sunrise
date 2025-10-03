import { useMemo } from 'react'

import { useAppSelector } from './store'

export const useAuth = () => {
  const auth = useAppSelector(state => state.auth.userDetail)

  return useMemo(() => auth, [auth])
}

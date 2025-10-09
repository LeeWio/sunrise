import { useMemo } from 'react'

import { useAppSelector } from './store'

/**
 * Custom hook to access toast state from the Redux store.
 *
 * This hook retrieves the toast state using `useAppSelector` and wraps the result
 * with `useMemo` to prevent unnecessary re-renders when the toast state hasn't changed.
 *
 * @returns The current toast state from the Redux store
 */
export const useToast = () => {
  const toast = useAppSelector(state => state.toast)

  return useMemo(() => toast, [toast])
}

'use client'

import { useState, useCallback } from 'react'

export interface UseIconPopoverOptions {
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

export interface UseIconPopoverReturn {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
  setIsOpen: (isOpen: boolean) => void
}

/**
 * IconPopover 状态管理 Hook
 *
 * @example
 * ```tsx
 * const { isOpen, open, close, toggle } = useIconPopover({
 *   defaultOpen: false,
 *   onOpenChange: (open) => console.log('Popover is', open ? 'open' : 'closed')
 * })
 * ```
 */
export function useIconPopover(
  options: UseIconPopoverOptions = {}
): UseIconPopoverReturn {
  const { defaultOpen = false, onOpenChange } = options

  const [isOpen, setIsOpenState] = useState(defaultOpen)

  const setIsOpen = useCallback(
    (value: boolean) => {
      setIsOpenState(value)
      onOpenChange?.(value)
    },
    [onOpenChange]
  )

  const open = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const toggle = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen, setIsOpen])

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  }
}

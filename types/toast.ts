import { ToastProps } from '@heroui/react'

type ToastPlacement =
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'top-right'
  | 'top-left'
  | 'top-center'

export interface ToastProviderProps {
  maxVisibleToasts?: number
  placement?: ToastPlacement
  disableAnimation?: boolean
  toastProps?: ToastProps
  toastOffset?: number
  color?: 'default' | 'primary' | 'secondary' | 'warning' | 'success' | 'danger'
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  variant?: 'solid' | 'bordered' | 'flat'
  timeout?: number
  shouldShowTimeoutProgress?: boolean
}

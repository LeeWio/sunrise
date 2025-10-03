import { ToastPlacement } from '@heroui/toast/dist/use-toast'
import { ToastProps } from '@heroui/toast'

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

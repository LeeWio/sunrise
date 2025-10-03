import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ToastProviderProps } from '@/types/toast'

/**
 * Initial state for the toast configuration.
 * Defines default values for placement, maximum visible toasts, radius, variant, and color.
 */
const initialState: ToastProviderProps = {
  placement: 'top-center',
  maxVisibleToasts: 5,
  radius: 'md',
  variant: 'solid',
  color: 'default',
  timeout: 3000,
  shouldShowTimeoutProgress: true,
}

/**
 * Redux slice for managing toast configuration state.
 * Provides reducers to update various toast properties like placement, visibility limit, styling, etc.
 */
const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    /**
     * Updates the toast placement configuration.
     * @param state - Current state
     * @param action - Payload containing the new placement value
     */
    setToastPlacement: (
      state,
      action: PayloadAction<ToastProviderProps['placement']>
    ) => {
      state.placement = action.payload
    },

    /**
     * Updates the maximum number of visible toasts.
     * @param state - Current state
     * @param action - Payload containing the new max visible toasts value
     */
    setMaxVisibleToasts: (
      state,
      action: PayloadAction<ToastProviderProps['maxVisibleToasts']>
    ) => {
      state.maxVisibleToasts = action.payload
    },

    /**
     * Updates the toast radius configuration.
     * @param state - Current state
     * @param action - Payload containing the new radius value
     */
    setRadius: (state, action: PayloadAction<ToastProviderProps['radius']>) => {
      state.radius = action.payload
    },

    /**
     * Updates the toast color configuration.
     * @param state - Current state
     * @param action - Payload containing the new color value
     */
    setColor: (state, action: PayloadAction<ToastProviderProps['color']>) => {
      state.color = action.payload
    },

    /**
     * Updates the toast variant configuration.
     * @param state - Current state
     * @param action - Payload containing the new variant value
     */
    setVariant: (
      state,
      action: PayloadAction<ToastProviderProps['variant']>
    ) => {
      state.variant = action.payload
    },

    /**
     * Updates the toast timeout configuration.
     * @param state - Current state
     * @param action - Payload containing the new timeout value
     */
    setTimeout: (
      state,
      action: PayloadAction<ToastProviderProps['timeout']>
    ) => {
      state.timeout = action.payload
    },

    /**
     * Updates the toast timeout progress visibility configuration.
     * @param state - Current state
     * @param action - Payload containing the new shouldShowTimeoutProgress value
     */
    setShouldShowTimeoutProgress: (
      state,
      action: PayloadAction<ToastProviderProps['shouldShowTimeoutProgress']>
    ) => {
      state.shouldShowTimeoutProgress = action.payload
    },
  },
})

// Export individual action creators
export const {
  setToastPlacement,
  setMaxVisibleToasts,
  setRadius,
  setColor,
  setVariant,
  setTimeout,
  setShouldShowTimeoutProgress,
} = toastSlice.actions

// Export the reducer as default
export default toastSlice.reducer

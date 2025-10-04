import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { VariantsProps } from '@/types/variants'

const initialState: VariantsProps = {
  color: 'default',
  size: 'md',
  radius: 'md',
  variant: 'solid',
}

/**
 * Redux slice for managing variants configuration state.
 * Provides reducers to update various variant properties like color, size, radius, and variant.
 */
const variantSlice = createSlice({
  name: 'variants',
  initialState,
  reducers: {
    /**
     * Updates the variant color configuration.
     * @param state - Current state
     * @param action - Payload containing the new color value
     */
    setColor: (state, action: PayloadAction<VariantsProps['color']>) => {
      state.color = action.payload
    },

    /**
     * Updates the variant size configuration.
     * @param state - Current state
     * @param action - Payload containing the new size value
     */
    setSize: (state, action: PayloadAction<VariantsProps['size']>) => {
      state.size = action.payload
    },

    /**
     * Updates the variant radius configuration.
     * @param state - Current state
     * @param action - Payload containing the new radius value
     */
    setRadius: (state, action: PayloadAction<VariantsProps['radius']>) => {
      state.radius = action.payload
    },

    /**
     * Updates the variant style configuration.
     * @param state - Current state
     * @param action - Payload containing the new variant value
     */
    setVariant: (state, action: PayloadAction<VariantsProps['variant']>) => {
      state.variant = action.payload
    },
  },
})

// Export individual action creators
export const { setColor, setSize, setRadius, setVariant } = variantSlice.actions

// Export the reducer as default
export default variantSlice.reducer

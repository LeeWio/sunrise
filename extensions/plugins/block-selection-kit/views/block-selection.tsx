import { tv } from '@heroui/react' // tailwind-variants (tv) function for managing Tailwind class variants
import { DndPlugin } from '@platejs/dnd'
import { useBlockSelected } from '@platejs/selection/react' // Hook: checks whether the current block is selected
import { usePluginOption, type PlateElementProps } from 'platejs/react' // Hook: reads plugin options; Plate element props type

// Define the style variants for the block selection highlight
export const blockSelectionVariants = tv({
  // Base styles applied in all states
  base: 'pointer-events-none absolute inset-0 z-1 bg-brand/[.13] transition-opacity',
  // Variants based on the "active" state
  variants: {
    active: {
      false: 'opacity-0', // Transparent when inactive
      true: 'opacity-100', // Fully visible when active
    },
  },
  // Default state for the variants
  defaultVariants: {
    active: true,
  },
})

/**
 * BlockSelection Component
 *
 * Renders a highlight overlay on top of a block element when it is selected.
 * The highlight becomes transparent if the block is being dragged or if it
 * belongs to specific plugin keys (e.g., table rows).
 */
export const BlockSelection = (props: PlateElementProps) => {
  // Whether the current block is selected
  const isBlockSelected = useBlockSelected()

  // Whether the current block is being dragged (from the DndPlugin)
  const isDragging = usePluginOption(DndPlugin, 'isDragging')

  // Do not render the selection overlay if:
  // - the block is not selected
  // - or the plugin key is 'tr' or 'table'
  if (!isBlockSelected || props.plugin.key === 'tr' || props.plugin.key === 'table') return null

  return (
    <div
      // Dynamically set opacity based on selection and drag state
      className={blockSelectionVariants({
        active: isBlockSelected && !isDragging,
      })}
      // Data attribute for easier debugging or targeting in CSS/JS
      data-slot="block-selection"
    />
  )
}

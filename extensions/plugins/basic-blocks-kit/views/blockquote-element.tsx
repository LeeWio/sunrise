import type { PlateElementProps } from 'platejs/react'

import { PlateElement } from 'platejs/react'

/**
 * BlockquoteElement
 *
 * Custom blockquote component for Plate.js editor.
 *
 * Renders a <blockquote> element with styling:
 * - `my-1`: vertical margin for spacing
 * - `border-l-2`: left border to visually distinguish the quote
 * - `pl-6`: padding-left to offset the text
 * - `italic`: italicized text style
 *
 * Props from PlateElementProps are spread to allow full Plate.js integration.
 */
export const BlockquoteElement = (props: PlateElementProps) => {
  return (
    <PlateElement
      as="blockquote"
      className="my-1 border-l-2 pl-6 italic"
      {...props} // Spread all PlateElementProps (e.g., children, attributes, event handlers)
    />
  )
}

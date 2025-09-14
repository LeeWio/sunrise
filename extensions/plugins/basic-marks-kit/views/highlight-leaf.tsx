import type { PlateLeafProps } from 'platejs/react'

import { PlateLeaf } from 'platejs/react'

/**
 * HighlightLeaf
 *
 * A custom leaf component for Plate.js editor that renders highlighted text.
 *
 * Features:
 * - Renders the leaf as a <mark> HTML element.
 * - Applies Tailwind CSS styles for highlighting:
 *   - `bg-highlight/30`: semi-transparent highlight background
 *   - `text-inherit`: keeps the text color consistent with surrounding text
 *
 * Usage:
 * - Automatically applied to text marked as highlighted by autoformat or toolbar commands.
 */
export function HighlightLeaf(props: PlateLeafProps) {
  return (
    <PlateLeaf {...props} as="mark" className="bg-highlight/30 text-inherit">
      {props.children}
    </PlateLeaf>
  )
}

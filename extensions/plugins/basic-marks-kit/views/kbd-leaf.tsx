import type { PlateLeafProps } from 'platejs/react'

import { PlateLeaf } from 'platejs/react'

/**
 * KbdLeaf
 *
 * A custom inline keyboard leaf component for Plate.js.
 *
 * Purpose:
 * - Renders keyboard input within the editor using a semantic `<kbd>` element.
 * - Provides a key-like visual style consistent with UI design.
 *
 * Styling highlights:
 * - Uses the `kbd` base style plus `!space-x-0` to remove default horizontal spacing between child elements.
 * - Supports subtle borders and muted background for a realistic key appearance.
 * - Rounded corners, compact padding, and monospace font to mimic physical keys.
 * - Compatible with light and dark mode shadow styles for depth.
 *
 * Usage:
 * - Automatically applied to text marked as keyboard input through autoformatting or toolbar actions.
 * - Ideal for inline “press key” hints (e.g. “Press ⌘ + K”).
 */
export function KbdLeaf(props: PlateLeafProps) {
  return (
    <PlateLeaf {...props} as="kbd" className="kbd !space-x-0">
      {props.children}
    </PlateLeaf>
  )
}

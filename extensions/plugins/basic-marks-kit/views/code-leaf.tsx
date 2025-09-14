import type { PlateLeafProps } from 'platejs/react'

import { PlateLeaf } from 'platejs/react'

/**
 * CodeLeaf
 *
 * A custom inline code leaf component for Plate.js.
 *
 * Purpose:
 * - Renders inline code segments within the editor using a semantic `<code>` element.
 * - Provides a compact, chip-style appearance consistent with the UI design system.
 *
 * Styling highlights:
 * - `chip chip--default chip--primary`: applies the chip theme styles.
 * - `rounded-sm`: slightly rounded corners.
 * - `!px-1`: compact horizontal padding.
 * - `leading-3.5`: tighter line height for inline elements.
 * - `whitespace-pre-wrap`: preserves whitespace and wraps long lines.
 *
 * Usage:
 * - Automatically applied to text marked as inline code via autoformatting or toolbar actions.
 * - Suitable for short inline code snippets inside text content.
 */
export function CodeLeaf(props: PlateLeafProps) {
  return (
    <PlateLeaf
      {...props}
      as="code"
      className="chip chip--default chip--primary !gap-0 rounded-sm !px-1 leading-3.5 whitespace-pre-wrap"
    >
      {props.children}
    </PlateLeaf>
  )
}

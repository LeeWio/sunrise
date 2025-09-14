import type { PlateElementProps } from 'platejs/react'

import { PlateElement, useFocused, useReadOnly, useSelected } from 'platejs/react'
import { cn } from '@heroui/theme'
import { Separator } from '@heroui/react'

/**
 * HrElement
 *
 * Custom horizontal rule component for Plate.js editor.
 *
 * Features:
 * - Renders a <hr> element wrapped in a div with vertical padding (`py-6`).
 * - Applies conditional styles based on editor state:
 *   - `selected` and `focused`: adds a ring highlight around the <hr> for visual feedback.
 *   - `readOnly`: disables the pointer cursor if the editor is read-only.
 * - `contentEditable={false}` ensures the <hr> itself is not editable.
 *
 * Props from PlateElementProps are spread to allow full Plate.js integration.
 */
export function HrElement(props: PlateElementProps) {
  const readOnly = useReadOnly() // Check if editor is in read-only mode
  const selected = useSelected() // Check if this element is selected
  const focused = useFocused() // Check if editor currently has focus

  return (
    <PlateElement {...props}>
      <div className="py-6" contentEditable={false}>
        <Separator
          className={cn(
            selected && focused && 'ring-ring ring-1 ring-offset-1',
            !readOnly && 'cursor-pointer',
            'from-success via-accent to-warning h-0.5 rounded-sm bg-radial-[at_50%_75%]',
          )}
        />
      </div>
      {props.children}{' '}
    </PlateElement>
  )
}

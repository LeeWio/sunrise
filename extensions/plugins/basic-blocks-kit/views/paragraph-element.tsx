import { PlateElement, type PlateElementProps } from 'platejs/react'

/**
 * ParagraphElement
 *
 * Custom paragraph component for Plate.js editor.
 *
 * Features:
 * - Wraps the content in a <PlateElement> to integrate fully with Plate.js.
 * - Applies minimal Tailwind CSS styles:
 *   - `m-0`: removes default margin.
 *   - `px-0`: removes horizontal padding.
 *   - `py-1`: applies small vertical padding for spacing between paragraphs.
 * - Renders any nested children passed via props, which typically contain text nodes or inline elements.
 *
 * @param props PlateElementProps - standard Plate.js element props.
 */
export const ParagraphElement = (props: PlateElementProps) => {
  return (
    <PlateElement {...props} className="m-0 px-0 py-1">
      {props.children}
    </PlateElement>
  )
}

import { useTocElementState, useTocElement } from '@platejs/toc/react'
import { type PlateElementProps, PlateElement } from 'platejs/react'
import { tv } from '@heroui/react'
import { Button } from '@heroui/react'

/**
 * headingItemVariants
 *
 * Tailwind variants for rendering each heading item in the table of contents (TOC).
 * Supports different indentation levels based on heading depth.
 */
export const headingItemVariants = tv({
  base: `
    block h-auto w-full cursor-pointer truncate rounded-none
    px-0.5 py-1.5 text-left font-medium text-muted-foreground
    underline decoration-[0.5px] underline-offset-4
    hover:bg-accent hover:text-muted-foreground
  `,
  variants: {
    // FIX: 这里有一个 bug，depth 1/2/3 padding 一样
    depth: {
      1: 'pl-0.5',
      2: 'pl-[26px]',
      3: 'pl-[50px]',
    },
  },
  defaultVariants: {
    depth: 1,
  },
})

/**
 * TocElement
 *
 * Renders a Table of Contents (TOC) element inside a Plate.js editor.
 *
 * Features:
 * - Uses `useTocElementState` to get the current TOC state.
 * - Uses `useTocElement` to get button props for smooth scrolling.
 * - Maps `headingList` to clickable buttons representing headings.
 * - Each button's indentation corresponds to the heading depth.
 * - If no headings exist, shows a placeholder message.
 *
 * Props:
 * - `PlateElementProps` from Plate.js
 *
 * Usage:
 * - Include this component as a custom Plate element to display a TOC in your editor.
 */
export const TocElement = (props: PlateElementProps) => {
  const state = useTocElementState()
  const { props: btnProps } = useTocElement(state)
  const { headingList } = state

  // TODO: 依赖 block-menu-kit，否则无法跳转
  return (
    <PlateElement {...props} className="mb-1 p-0">
      <div contentEditable={false}>
        {headingList.length > 0 ? (
          headingList.map((item) => (
            <Button
              key={item.id}
              aria-current
              className={headingItemVariants({
                depth: item.depth as 1 | 2 | 3,
              })}
              variant="ghost"
              onClick={(e) => btnProps.onClick(e as React.MouseEvent<HTMLElement>, item, 'smooth')}
            >
              {item.title}
            </Button>
          ))
        ) : (
          <div className="text-sm text-gray-500">
            Create a heading to display the table of contents.
          </div>
        )}
      </div>
      {props.children}
    </PlateElement>
  )
}

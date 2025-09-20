import type { PlateElementProps } from 'platejs/react'

import { type VariantProps, tv } from '@heroui/react'
import { PlateElement } from 'platejs/react'

/**
 * headingVariants
 *
 * Defines Tailwind CSS variants for different heading levels (h1–h6).
 * Uses `tailwind-variants` (tv) to manage variant classes.
 *
 * base: Common classes applied to all heading levels.
 * variants.variant: Specific styles for each heading level.
 */
export const headingVariants = tv({
  base: 'relative mb-1', // Shared classes for all headings
  variants: {
    variant: {
      h1: 'mt-[1.6em] pb-1 font-heading text-4xl font-bold',
      h2: 'mt-[1.4em] pb-px font-heading text-2xl font-semibold tracking-tight',
      h3: 'mt-[1em] pb-px font-heading text-xl font-semibold tracking-tight',
      h4: 'mt-[0.75em] font-heading text-lg font-semibold tracking-tight',
      h5: 'mt-[0.75em] text-lg font-semibold tracking-tight',
      h6: 'mt-[0.75em] text-base font-semibold tracking-tight',
    },
  },
})

/**
 * HeadingElement
 *
 * A generic heading component that renders a PlateElement with a specified variant.
 *
 * Props:
 * - variant: Determines the heading level (h1–h6). Defaults to 'h1'.
 * - ...props: Additional PlateElement props passed through.
 *
 * This component allows consistent styling of headings across the editor,
 * and can be extended or customized easily.
 */
export function HeadingElement({
  variant = 'h1',
  ...props
}: PlateElementProps & VariantProps<typeof headingVariants>) {
  return (
    <PlateElement
      as={variant!} // Render as the correct heading tag
      className={headingVariants({ variant })} // Apply variant-specific classes
      {...props}
    >
      {props.children}
    </PlateElement>
  )
}

/**
 * H1Element ~ H6Element
 *
 * Convenience components for each heading level.
 * These simply wrap HeadingElement with a predefined variant.
 * Useful for cleaner usage in editor configuration or JSX.
 */
export function H1Element(props: PlateElementProps) {
  return <HeadingElement variant="h1" {...props} />
}

export function H2Element(props: PlateElementProps) {
  return <HeadingElement variant="h2" {...props} />
}

export function H3Element(props: PlateElementProps) {
  return <HeadingElement variant="h3" {...props} />
}

export function H4Element(props: PlateElementProps) {
  return <HeadingElement variant="h4" {...props} />
}

export function H5Element(props: PlateElementProps) {
  return <HeadingElement variant="h5" {...props} />
}

export function H6Element(props: PlateElementProps) {
  return <HeadingElement variant="h6" {...props} />
}

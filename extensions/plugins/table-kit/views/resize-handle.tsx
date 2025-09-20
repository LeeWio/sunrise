import type { VariantProps } from 'tailwind-variants'

import * as React from 'react'
import {
  type ResizeHandle as ResizeHandlePrimitive,
  Resizable as ResizablePrimitive,
  useResizeHandle,
  useResizeHandleState,
} from '@platejs/resizable'
import { tv } from 'tailwind-variants'
import { cn } from '@heroui/react'

// Media resize handle (left/right)
export const mediaResizeHandleVariants = tv({
  base: `
    top-0 flex w-6 flex-col justify-center select-none
    after:flex after:h-16 after:w-[3px] after:rounded-[6px] after:bg-ring
    after:opacity-0 after:content-['_'] group-hover:after:opacity-100
  `,
  variants: {
    direction: {
      left: '-left-3 -ml-3 pl-3',
      right: '-right-3 -mr-3 items-end pr-3',
    },
  },
})

// Generic resize handle (top/bottom/left/right)
export const resizeHandleVariants = tv({
  base: 'absolute z-40',
  variants: {
    direction: {
      bottom: 'w-full cursor-row-resize',
      left: 'h-full cursor-col-resize',
      right: 'h-full cursor-col-resize',
      top: 'w-full cursor-row-resize',
    },
  },
})

export function ResizeHandle({
  className,
  options,
  ...props
}: React.ComponentProps<typeof ResizeHandlePrimitive> & VariantProps<typeof resizeHandleVariants>) {
  const state = useResizeHandleState(options ?? {})
  const resizeHandle = useResizeHandle(state)

  if (state.readOnly) return null

  return (
    <div
      className={cn(resizeHandleVariants({ direction: options?.direction }), className)}
      data-resizing={state.isResizing}
      {...resizeHandle.props}
      {...props}
    />
  )
}

export const resizableVariants = tv({
  base: '',
  variants: {
    align: {
      center: 'mx-auto',
      left: 'mr-auto',
      right: 'ml-auto',
    },
  },
})

export function Resizable({
  align,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive> & VariantProps<typeof resizableVariants>) {
  return <ResizablePrimitive {...props} className={cn(resizableVariants({ align }), className)} />
}

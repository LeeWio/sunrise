import { cn } from '@heroui/react'
import { useDropLine } from '@platejs/dnd'

export function DropLine() {
  const { dropLine } = useDropLine({ orientation: 'horizontal' })

  if (!dropLine) return null

  return (
    <div
      className={cn(
        'slate-dropLine',
        'absolute bg-brand/50',
        dropLine === 'left' &&
          'inset-y-0 left-[-10.5px] w-1 group-first/column:-left-1',
        dropLine === 'right' &&
          'inset-y-0 right-[-11px] w-1 group-last/column:-right-1'
      )}
    />
  )
}

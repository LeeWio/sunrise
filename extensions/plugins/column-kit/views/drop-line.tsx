import { cn } from '@heroui/theme'
import { useDropLine } from '@platejs/dnd'

export const DropLine = () => {
  const { dropLine } = useDropLine({ orientation: 'horizontal' })

  if (!dropLine) return null

  return (
    <div
      className={cn(
        'slate-dropLine',
        'bg-brand/50 absolute',
        dropLine === 'left' && 'inset-y-0 left-[-10.5px] w-1 group-first/column:-left-1',
        dropLine === 'right' && 'inset-y-0 right-[-11px] w-1 group-last/column:-right-1',
      )}
    />
  )
}

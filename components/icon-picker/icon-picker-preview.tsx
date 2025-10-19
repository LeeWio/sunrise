import type { IconItem } from './types'

export interface IconPickerPreviewProps {
  hoveredIcon: IconItem | null
}

export function IconPickerPreview({ hoveredIcon }: IconPickerPreviewProps) {
  if (!hoveredIcon) {
    return null
  }

  const IconComponent = hoveredIcon.component

  return (
    <div className="p-3 h-auto flex items-center justify-between w-[calc(100%_-_20px)] color-inherit subpixel-antialiased bg-background/10 backdrop-blur backdrop-saturate-150 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 shadow-small z-10">
      <IconComponent />

      <div className="flex flex-col flex-1 items-end">
        <div className="text-small font-semibold text-default-400 truncate">
          {hoveredIcon.displayName}
        </div>
        <div className="text-xs text-default-400 truncate">
          {hoveredIcon.category}·{hoveredIcon.keywords.slice(0, 3).join(',')}
        </div>
      </div>
    </div>
  )
}

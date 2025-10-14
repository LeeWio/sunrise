import type { IconItem } from './types'

export interface IconPickerPreviewProps {
  hoveredIcon: IconItem | null
}

export function IconPickerPreview({ hoveredIcon }: IconPickerPreviewProps) {
  if (!hoveredIcon) {
    return (
      <div className="flex items-center justify-center h-14 px-4 border-t border-default-200 bg-default-50/50 mt-auto">
        <p className="text-xs text-default-400">
          Hover over an icon to preview
        </p>
      </div>
    )
  }

  const IconComponent = hoveredIcon.component

  return (
    <div className="flex items-center gap-3 h-14 px-4 border-t border-default-200 bg-default-50/50 mt-auto">
      {/* Icon Preview */}
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-default/10 ring-1 ring-default/20 shrink-0">
        <IconComponent className="text-primary" />
      </div>

      {/* Icon Info */}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <p className="text-sm font-semibold text-default-900 truncate">
          {hoveredIcon.displayName}
        </p>
        <p className="text-xs text-default-500 truncate">
          {hoveredIcon.category} · {hoveredIcon.keywords.slice(0, 3).join(', ')}
        </p>
      </div>
    </div>
  )
}

import { IconMeta } from './type'

export type IconPickerPreviewProps = {
  selectedIcon: IconMeta | null
}

export const IconPickerPreview = ({ selectedIcon }: IconPickerPreviewProps) => {
  if (!selectedIcon) {
    return null
  }

  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center gap-2">
        <selectedIcon.component />
        <p className="text-sm font-bold">{selectedIcon.name}</p>
      </div>
    </div>
  )
}

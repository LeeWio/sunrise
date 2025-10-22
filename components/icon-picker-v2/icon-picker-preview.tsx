import { IconMeta } from './type'

export type IconPickerPreviewProps = {
  selectedIcon: IconMeta | null
}

export const IconPickerPreview = ({ selectedIcon }: IconPickerPreviewProps) => {
  if (!selectedIcon) {
    return null
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-100 dark:bg-gray-800">
          <selectedIcon.component className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{selectedIcon.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">ID: {selectedIcon.id}</p>
        </div>
      </div>
    </div>
  )
}
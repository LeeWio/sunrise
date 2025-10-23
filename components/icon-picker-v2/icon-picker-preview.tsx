import { Divider } from '@heroui/react'
import { UseIconPickerType, IconMeta } from './type'

function IconPreview({ selectedIcon }: { selectedIcon: IconMeta | null }) {
  if (!selectedIcon) return null
  
  return (
    <div className="flex h-14 max-h-14 min-h-14 items-center px-2 text-default-500">
      <div className="flex items-center justify-center text-2xl">
        <selectedIcon.component className="w-6 h-6" />
      </div>
      <div className="overflow-hidden pl-2">
        <div className="truncate text-sm font-semibold">{selectedIcon.name}</div>
        <div className="truncate text-sm">{selectedIcon.id}</div>
      </div>
    </div>
  )
}

function NoIcon({ i18n }: Pick<UseIconPickerType, 'i18n'>) {
  return (
    <div className="flex h-14 max-h-14 min-h-14 items-center px-2 text-default-500">
      <div className="flex items-center justify-center text-2xl">😢</div>
      <div className="overflow-hidden pl-2">
        <div className="truncate text-sm font-bold">
          {i18n.searchNoResultsTitle}
        </div>
        <div className="truncate text-sm">{i18n.searchNoResultsSubtitle}</div>
      </div>
    </div>
  )
}

function PickAnIcon({ i18n }: Pick<UseIconPickerType, 'i18n'>) {
  return (
    <div className="flex min-h-14 max-h-14 items-center px-2 text-default-500">
      <div className="flex items-center justify-center text-2xl">☝️</div>
      <div className="overflow-hidden pl-2">
        <div className="truncate text-sm font-semibold">{i18n.pick}</div>
      </div>
    </div>
  )
}

export const IconPickerPreview = ({
  selectedIcon,
  hasFound = true,
  i18n,
  isSearching = false,
}: Pick<UseIconPickerType, 'selectedIcon' | 'hasFound' | 'i18n' | 'isSearching'>) => {
  const showPickIcon = !selectedIcon && (!isSearching || hasFound)
  const showNoIcon = isSearching && !hasFound
  const showPreview = selectedIcon && !showNoIcon && !showNoIcon

  return (
    <>
      <Divider className="!my-0" orientation="horizontal" />
      {showPreview && <IconPreview selectedIcon={selectedIcon} />}
      {showPickIcon && <PickAnIcon i18n={i18n} />}
      {showNoIcon && <NoIcon i18n={i18n} />}
    </>
  )
}

// 设置显示名称便于调试
IconPickerPreview.displayName = 'IconPickerPreview'
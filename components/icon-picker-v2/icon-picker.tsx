import { IconPickerContent } from './icon-picker-content'
import { IconPickerNavigation } from './icon-picker-navigation'
import { IconPickerPreview } from './icon-picker-preview'
import { IconPickerSearch } from './icon-picker-search'
import { UseIconPickerReturn } from './use-icon-picker-state'
import { IconCategoryList, IconMeta } from './type'

export type IconPickerProps = UseIconPickerReturn

export const IconPicker = (props: IconPickerProps) => {
  const {
    activeCategory,
    categories,
    displayedIcons,
    onActiveCategoryChange,
    onSearch,
    onSelectIcon,
    selectedIcon,
  } = props

  return (
    <div className="flex flex-col gap-3 min-w-[320px] w-[520px] max-w-full h-[26rem]">

      <IconPickerNavigation
        activeCategory={activeCategory}
        categories={categories as IconCategoryList[]}
        onActiveCategoryChange={onActiveCategoryChange}
      />

      <IconPickerSearch
        onSearch={onSearch}
      />

      <IconPickerContent
        displayedIcons={displayedIcons}
        onSelectIcon={onSelectIcon}
      />

      {selectedIcon && (
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <IconPickerPreview selectedIcon={selectedIcon} />
        </div>
      )}

    </div>
  )
}
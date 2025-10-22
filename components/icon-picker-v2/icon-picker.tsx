import { IconPickerContent } from './icon-picker-content'
import { IconPickerNavigation } from './icon-picker-navigation'
import { IconPickerPreview } from './icon-picker-preview'
import { IconPickerSearch } from './icon-picker-search'
import { UseIconPickerReturn } from './use-icon-picker-state'

export type IconPickerProps = UseIconPickerReturn

export const IconPicker = (props: IconPickerProps) => {
  const {
    activeCategory,
    categories,
    groupedIcons,
    onActiveCategoryChange,
    onSearch,
    onSelectIcon,
    selectedIcon,
  } = props

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <IconPickerSearch onSearch={onSearch} />
      <IconPickerNavigation
        activeCategory={activeCategory}
        categories={categories}
        onActiveCategoryChange={onActiveCategoryChange}
      />
      <IconPickerContent 
        groupedIcons={groupedIcons} 
        onSelectIcon={onSelectIcon} 
      />
      <IconPickerPreview selectedIcon={selectedIcon} />
    </div>
  )
}
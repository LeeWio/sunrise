'use client'

import type { IconPickerProps } from './types'
import type { IconItem } from './types'

import { useState } from 'react'

import { IconPickerSearchBar } from './icon-picker-search'
import { IconPickerNavigation } from './icon-picker-navigation'
import { IconPickerContent } from './icon-picker-content'
import { categories } from './icon-config'
import { useIconPicker } from './use-icon-picker'
import { IconPickerPreview } from './icon-picker-preview'

export function IconPicker({
  onSelect,
  selectedIcon,
  iconSize = 'md',
  autoClose = true,
  onClose,
}: IconPickerProps) {
  const [hoveredIcon, setHoveredIcon] = useState<IconItem | null>(null)

  const {
    searchValue,
    setSearchValue,
    clearSearch,
    selectedCategory,
    setSelectedCategory,
    filteredIcons,
    handleIconSelect,
  } = useIconPicker({
    onSelect,
    autoClose,
    onClose,
  })

  return (
    <div className="flex flex-col w-72  gap-2 h-[25rem]">
      <IconPickerNavigation
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <IconPickerSearchBar
        searchValue={searchValue}
        onClear={clearSearch}
        onSearchChange={setSearchValue}
      />

      <IconPickerContent
        iconSize={iconSize}
        icons={filteredIcons}
        selectedIcon={selectedIcon}
        onIconHover={setHoveredIcon}
        onIconSelect={handleIconSelect}
      />

      <IconPickerPreview hoveredIcon={hoveredIcon} />
    </div>
  )
}

import type { IconPickerNavigationProps } from './types'

import { Tabs, Tab } from '@heroui/react'

export function IconPickerNavigation({
  categories,
  selectedCategory,
  onCategoryChange,
}: IconPickerNavigationProps) {
  return (
    <Tabs
      fullWidth
      aria-label="Icon categories"
      selectedKey={selectedCategory}
      size="sm"
      variant="light"
      onSelectionChange={key => onCategoryChange(key as string)}
    >
      {categories.map(category => (
        <Tab key={category.id} title={category.label} />
      ))}
    </Tabs>
  )
}

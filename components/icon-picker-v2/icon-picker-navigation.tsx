import { Tabs, Tab } from '@heroui/react'

import { IconCategoryList } from './type'

export type IconPickerNavigationProps = {
  categories: IconCategoryList[]
  activeCategory: IconCategoryList
  onActiveCategoryChange: (category: IconCategoryList) => void
}

export const IconPickerNavigation = ({
  categories,
  activeCategory,
  onActiveCategoryChange,
}: IconPickerNavigationProps) => {
  return (
    <Tabs
      aria-label="Icon categories"
      variant="underlined"
      selectedKey={activeCategory}
      size='sm'
      onSelectionChange={key => onActiveCategoryChange(key as IconCategoryList)}
    >
      {categories?.map(category => (
        <Tab 
          key={category} 
          title={category.replace(/-/g, ' ')} 
          className="capitalize"
        />
      ))}
    </Tabs>
  )
}
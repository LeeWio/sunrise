import { useDisclosure } from '@heroui/react'
import { useMemo, useState } from 'react'

import { icons } from './icon-config'
import { IconCategoryList, IconMeta } from './type'

interface UseIconPickerStateOptions {
  closeOnSelect?: boolean
}

export const useIconPickerState = (options: UseIconPickerStateOptions = {}) => {
  const { closeOnSelect = false } = options
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] =
    useState<IconCategoryList>('all') // 默认选中'all'分类
  const [selectedIcon, setSelectedIcon] = useState<IconMeta | null>(null)

  const filteredIcons = useMemo(() => {
    if (!searchQuery) {
      return icons
    }

    return icons.filter((icon) => {
      const query = searchQuery.toLowerCase()
      const nameMatch = icon.name.toLowerCase().includes(query)
      const keywordMatch = icon.keywords?.some((keyword) =>
        keyword.toLowerCase().includes(query),
      )
      return nameMatch || keywordMatch
    })
  }, [searchQuery])

  const groupedIcons = useMemo(() => {
    const groups = filteredIcons.reduce<Record<IconCategoryList, IconMeta[]>>((acc, icon) => {
      const { category } = icon
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(icon)
      return acc
    }, {} as Record<IconCategoryList, IconMeta[]>)

    // 添加"All"分类，包含所有图标
    groups['all' as IconCategoryList] = filteredIcons

    return groups
  }, [filteredIcons])

  // 处理要显示的图标，根据当前选中的分类返回相应的图标列表
  const displayedIcons = useMemo(() => {
    if (activeCategory === 'all') {
      // 对于"All"分类，我们返回一个特殊的结构来表示所有分类
      return Object.entries(groupedIcons).reduce<{category: string, icons: IconMeta[]}[]>((acc, [category, icons]) => {
        // 不包含"All"分类本身
        if (category !== 'all' && icons.length > 0) {
          acc.push({ category, icons })
        }
        return acc
      }, [])
    } else {
      // 对于其他分类，直接返回该分类的图标
      return [{ category: activeCategory, icons: groupedIcons[activeCategory] || [] }]
    }
  }, [activeCategory, groupedIcons])

  const onSelectIcon = (icon: IconMeta) => {
    console.log('Selecting icon:', icon) // 调试日志
    setSelectedIcon(icon)
    if (closeOnSelect) {
      onOpenChange()
    }
  }

  // 确保分类顺序正确：'all' 在第一位，然后是其他分类
  const sortedCategories = useMemo(() => {
    if (!groupedIcons) return []
    
    const categoryKeys = Object.keys(groupedIcons) as IconCategoryList[]
    
    // 确保'all'分类在第一个位置
    const allIndex = categoryKeys.indexOf('all')
    if (allIndex > 0) {
      // 如果'all'存在且不在第一位，则移到第一位
      const newCategories = [...categoryKeys]
      newCategories.splice(allIndex, 1)
      newCategories.unshift('all')
      return newCategories
    } else if (allIndex === -1 && categoryKeys.length > 0) {
      // 如果没有'all'分类，但仍需确保它在第一位（如果存在）
      if (groupedIcons['all']) {
        return ['all', ...categoryKeys]
      }
    }
    
    return categoryKeys
  }, [groupedIcons])

  const iconPickerState = {
    activeCategory,
    categories: sortedCategories,
    groupedIcons,
    displayedIcons,
    onActiveCategoryChange: setActiveCategory,
    onSearch: setSearchQuery,
    onSelectIcon,
    selectedIcon,
  }

  return {
    iconPickerState,
    isOpen,
    onOpen,
    onOpenChange,
  }
}

export type UseIconPickerReturn = ReturnType<
  typeof useIconPickerState
>['iconPickerState']
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
    useState<IconCategoryList>('coding')
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

    return groups
  }, [filteredIcons])

  const onSelectIcon = (icon: IconMeta) => {
    console.log('Selecting icon:', icon) // 调试日志
    setSelectedIcon(icon)
    if (closeOnSelect) {
      onOpenChange()
    }
  }

  const categories = useMemo(
    () => (groupedIcons ? (Object.keys(groupedIcons) as IconCategoryList[]) : []),
    [groupedIcons],
  )

  const iconPickerState = {
    activeCategory,
    categories,
    groupedIcons,
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
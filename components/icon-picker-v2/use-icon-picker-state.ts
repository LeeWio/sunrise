import { useDisclosure } from '@heroui/react'
import { useMemo, useState, useRef, useCallback, useEffect } from 'react'

import { icons } from './icon-config'
import { IconCategoryList, IconMeta, IconSettings, UseIconPickerType } from './type'

interface UseIconPickerStateOptions {
  closeOnSelect?: boolean
  settings?: typeof IconSettings
}

export const useIconPickerState = (options: UseIconPickerStateOptions = {}) => {
  const { closeOnSelect = false, settings = IconSettings } = options
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] =
    useState<IconCategoryList>('all') // 默认选中'all'分类
  const [selectedIcon, setSelectedIcon] = useState<IconMeta | null>(null)
  const [focusedIconIndex, setFocusedIconIndex] = useState<number | null>(null)

  // 修复：将 useRef 移到顶层，不在 useMemo 内部调用
  const contentRootRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // 键盘导航支持
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // 这里可以添加键盘导航逻辑
      switch (e.key) {
        case 'Escape':
          onOpenChange()
          break
        // 可以添加更多键盘导航支持
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onOpenChange])

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

  // 添加 i18n 支持，借鉴 emoji-picker 的做法
  const i18n = useMemo(() => ({
    categories: {
      all: 'All',
      humanitarian: 'Humanitarian',
      'science-fiction': 'Science Fiction',
      accessibility: 'Accessibility',
      alert: 'Alert',
      alphabet: 'Alphabet',
      animals: 'Animals',
      arrows: 'Arrows',
      astronomy: 'Astronomy',
      automotive: 'Automotive',
      buildings: 'Buildings',
      business: 'Business',
      camping: 'Camping',
      charity: 'Charity',
      'charts-diagrams': 'Charts & Diagrams',
      childhood: 'Childhood',
      'clothing-fashion': 'Clothing & Fashion',
      connectivity: 'Connectivity',
      construction: 'Construction',
      'devices-hardware': 'Devices & Hardware',
      'disaster-crisis': 'Disaster & Crisis',
      editing: 'Editing',
      education: 'Education',
      emoji: 'Emoji',
      energy: 'Energy',
      files: 'Files',
      'film-video': 'Film & Video',
      'food-beverage': 'Food & Beverage',
      'fruits-vegetables': 'Fruits & Vegetables',
      gaming: 'Gaming',
      genders: 'Genders',
      halloween: 'Halloween',
      hands: 'Hands',
      holidays: 'Holidays',
      household: 'Household',
      logistics: 'Logistics',
      maps: 'Maps',
      maritime: 'Maritime',
      marketing: 'Marketing',
      mathematics: 'Mathematics',
      'media-playback': 'Media & Playback',
      'medical-health': 'Medical & Health',
      money: 'Money',
      moving: 'Moving',
      'music-audio': 'Music & Audio',
      nature: 'Nature',
      numbers: 'Numbers',
      'photos-images': 'Photos & Images',
      political: 'Political',
      'punctuation-symbols': 'Punctuation & Symbols',
      religion: 'Religion',
      science: 'Science',
      security: 'Security',
      shapes: 'Shapes',
      shopping: 'Shopping',
      social: 'Social',
      spinners: 'Spinners',
      'sports-fitness': 'Sports & Fitness',
      'text-formatting': 'Text Formatting',
      time: 'Time',
      toggle: 'Toggle',
      transportation: 'Transportation',
      'travel-hotel': 'Travel & Hotel',
      'users-people': 'Users & People',
      weather: 'Weather',
      writing: 'Writing',
    },
    search: 'Search icons...',
    searchResult: 'Search Results',
    searchNoResultsTitle: 'No icons found',
    searchNoResultsSubtitle: 'Try a different search term',
    pick: 'Pick an icon',
  }), [])

  const onSelectIcon = useCallback((icon: IconMeta) => {
    console.log('Selecting icon:', icon) // 调试日志
    setSelectedIcon(icon)
    setFocusedIconIndex(null)
    if (closeOnSelect) {
      onOpenChange()
    }
  }, [closeOnSelect, onOpenChange])

  const clearSearch = useCallback(() => {
    setSearchQuery('')
    setFocusedIconIndex(null)
  }, [])

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
      return newCategories as IconCategoryList[]
    } else if (allIndex === -1 && categoryKeys.length > 0) {
      // 如果没有'all'分类，但仍需确保它在第一位（如果存在）
      if (groupedIcons['all']) {
        return ['all' as IconCategoryList, ...categoryKeys.filter(cat => cat !== 'all')] as IconCategoryList[]
      }
    }
    
    return categoryKeys
  }, [groupedIcons])

  // 创建符合 UseIconPickerType 的返回对象
  const iconPickerState: UseIconPickerType = {
    // 状态相关
    activeCategory,
    categories: sortedCategories,
    displayedIcons,
    selectedIcon,
    searchValue: searchQuery,
    isSearching: !!searchQuery,
    isOpen,
    hasFound: filteredIcons.length > 0,
    focusedCategory: activeCategory,
    focusedIconIndex,
    
    // 库相关
    iconLibrary: {} as Record<string, IconMeta>, // 简化处理，实际使用中可能需要更复杂的转换
    
    // 国际化
    i18n,
    
    // 配置
    settings,
    refs: {
      contentRoot: contentRootRef,
      content: contentRef
    },
    
    // 回调函数
    onActiveCategoryChange: setActiveCategory,
    onSelectIcon,
    setSearch: setSearchQuery,
    clearSearch,
    onOpenChange,
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
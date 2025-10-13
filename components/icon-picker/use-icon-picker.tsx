import { useState, useCallback, useMemo } from 'react'

import { IconConfig, IconCategory, searchIcons, iconList } from '@/config/icons'

export interface UseIconPickerOptions {
  onSelectIcon?: (icon: IconConfig) => void
  defaultCategory?: IconCategory | null
  enableSearch?: boolean
}

export interface UseIconPickerReturn {
  // 搜索状态
  searchValue: string
  setSearch: (value: string) => void
  clearSearch: () => void
  isSearching: boolean
  searchResult: IconConfig[]
  hasSearchResults: boolean

  // 分类状态
  focusedCategory: IconCategory | null
  setFocusedCategory: (category: IconCategory | null) => void
  handleCategoryClick: (category: IconCategory) => void

  // 选择状态
  hoveredIcon: IconConfig | undefined
  selectedIcon: IconConfig | undefined
  onMouseOver: (icon?: IconConfig) => void
  onSelectIcon: (icon: IconConfig) => void

  // 数据
  allIcons: IconConfig[]
}

export const useIconPicker = ({
  onSelectIcon,
  defaultCategory = null,
  enableSearch = true,
}: UseIconPickerOptions = {}): UseIconPickerReturn => {
  // 搜索状态
  const [searchValue, setSearchValue] = useState('')
  const [focusedCategory, setFocusedCategory] = useState<IconCategory | null>(
    defaultCategory
  )
  const [hoveredIcon, setHoveredIcon] = useState<IconConfig | undefined>()
  const [selectedIcon, setSelectedIcon] = useState<IconConfig | undefined>()

  // 搜索逻辑
  const isSearching = enableSearch && searchValue.trim() !== ''

  const searchResult = useMemo(() => {
    if (!isSearching) return []

    return searchIcons(searchValue)
  }, [searchValue, isSearching])

  const hasSearchResults = searchResult.length > 0

  // 设置搜索
  const setSearch = useCallback((value: string) => {
    setSearchValue(value)
    // 搜索时清除分类焦点
    if (value.trim()) {
      setFocusedCategory(null)
    }
  }, [])

  // 清除搜索
  const clearSearch = useCallback(() => {
    setSearchValue('')
    setFocusedCategory(defaultCategory)
  }, [defaultCategory])

  // 处理分类点击
  const handleCategoryClick = useCallback(
    (category: IconCategory) => {
      // 如果点击的是当前分类，则取消选择（显示所有）
      if (focusedCategory === category) {
        setFocusedCategory(null)
      } else {
        setFocusedCategory(category)
      }
      // 清除搜索
      setSearchValue('')
    },
    [focusedCategory]
  )

  // 鼠标悬停处理
  const onMouseOver = useCallback((icon?: IconConfig) => {
    setHoveredIcon(icon)
  }, [])

  // 图标选择处理
  const handleSelectIcon = useCallback(
    (icon: IconConfig) => {
      setSelectedIcon(icon)
      onSelectIcon?.(icon)
    },
    [onSelectIcon]
  )

  return {
    // 搜索状态
    searchValue,
    setSearch,
    clearSearch,
    isSearching,
    searchResult,
    hasSearchResults,

    // 分类状态
    focusedCategory,
    setFocusedCategory,
    handleCategoryClick,

    // 选择状态
    hoveredIcon,
    selectedIcon,
    onMouseOver,
    onSelectIcon: handleSelectIcon,

    // 数据
    allIcons: iconList,
  }
}


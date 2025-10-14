'use client'

import type { IconItem } from './types'

import { useState, useMemo, useCallback, useEffect } from 'react'

import { iconItems } from './icon-config'

export interface UseIconPickerOptions {
  defaultCategory?: string
  defaultSearchValue?: string
  onSelect?: (iconName: string, IconComponent: React.ComponentType<any>) => void
  autoClose?: boolean
  onClose?: () => void
}

export interface UseIconPickerReturn {
  // 搜索相关
  searchValue: string
  setSearchValue: (value: string) => void
  clearSearch: () => void

  // 分类相关
  selectedCategory: string
  setSelectedCategory: (category: string) => void

  // 过滤后的图标
  filteredIcons: IconItem[]

  // 图标选择处理
  handleIconSelect: (icon: IconItem) => void

  // 重置所有状态
  reset: () => void
}

/**
 * IconPicker 状态管理 Hook
 *
 * @example
 * ```tsx
 * const {
 *   searchValue,
 *   setSearchValue,
 *   clearSearch,
 *   selectedCategory,
 *   setSelectedCategory,
 *   filteredIcons,
 *   handleIconSelect
 * } = useIconPicker({
 *   onSelect: (iconName, IconComponent) => {
 *     console.log('Selected:', iconName)
 *   },
 *   autoClose: true,
 *   onClose: () => setIsOpen(false)
 * })
 * ```
 */
export function useIconPicker(
  options: UseIconPickerOptions = {}
): UseIconPickerReturn {
  const {
    defaultCategory = 'all',
    defaultSearchValue = '',
    onSelect,
    autoClose = true,
    onClose,
  } = options

  // Input value (immediate)
  const [searchValue, setSearchValue] = useState(defaultSearchValue)

  // Debounced search value (delayed)
  const [debouncedSearchValue, setDebouncedSearchValue] =
    useState(defaultSearchValue)

  // Category state
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory)

  // Calculate adaptive delay based on total icons count
  const getAdaptiveDelay = useCallback(() => {
    // Calculate total icons in current category
    let totalIcons = iconItems.length

    if (selectedCategory !== 'all') {
      totalIcons = iconItems.filter(
        icon => icon.category === selectedCategory
      ).length
    }

    // Adaptive delay based on dataset size
    if (totalIcons <= 50) {
      return 150 // Small dataset: fast response
    } else if (totalIcons <= 200) {
      return 250 // Medium dataset: balanced
    } else if (totalIcons <= 500) {
      return 350 // Large dataset: prevent lag
    } else {
      return 500 // Huge dataset: maximum delay
    }
  }, [selectedCategory])

  // Debounce effect with adaptive delay
  useEffect(() => {
    const adaptiveDelay = getAdaptiveDelay()
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue)
    }, adaptiveDelay)

    return () => {
      clearTimeout(timer)
    }
  }, [searchValue, getAdaptiveDelay])

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchValue('')
    setDebouncedSearchValue('')
  }, [])

  // Filter icons logic (using useMemo to cache results)
  const filteredIcons = useMemo(() => {
    let filtered = iconItems

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(icon => icon.category === selectedCategory)
    }

    // Filter by search term (using debounced value)
    if (debouncedSearchValue) {
      const searchLower = debouncedSearchValue.toLowerCase()

      filtered = filtered.filter(
        icon =>
          icon.displayName.toLowerCase().includes(searchLower) ||
          icon.name.toLowerCase().includes(searchLower) ||
          icon.keywords.some(keyword => keyword.includes(searchLower))
      )
    }

    return filtered
  }, [selectedCategory, debouncedSearchValue])

  // Icon selection handler (using useCallback for performance)
  const handleIconSelect = useCallback(
    (icon: IconItem) => {
      onSelect?.(icon.name, icon.component)

      if (autoClose) {
        onClose?.()
      }
    },
    [onSelect, autoClose, onClose]
  )

  // Reset all state
  const reset = useCallback(() => {
    setSearchValue(defaultSearchValue)
    setDebouncedSearchValue(defaultSearchValue)
    setSelectedCategory(defaultCategory)
  }, [defaultSearchValue, defaultCategory])

  return {
    searchValue,
    setSearchValue,
    clearSearch,
    selectedCategory,
    setSelectedCategory,
    filteredIcons,
    handleIconSelect,
    reset,
  }
}

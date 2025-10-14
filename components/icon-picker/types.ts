import type { IconSvgProps } from '@/types'
import type { IconCategoryId } from './icon-config'

// 图标分类接口
export interface IconCategory {
  id: string
  name: string
  label: string
  description?: string
}

// 图标项接口（使用类型安全的 category）
export interface IconItem {
  name: string
  component: React.ComponentType<IconSvgProps>
  category: IconCategoryId // 使用类型安全的分类 ID
  keywords: string[]
  displayName: string
}

// IconPopover 组件 Props（最外层 Popover 容器）
export interface IconPopoverProps {
  // Popover 触发器元素
  trigger: React.ReactNode
  // Popover 内容（通常是 IconPicker）
  children: React.ReactNode
  // Popover 位置
  placement?:
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  // 是否打开（受控）
  isOpen?: boolean
  // 打开状态变化回调
  onOpenChange?: (isOpen: boolean) => void
}

// IconPicker 主组件 Props（组合组件）
export interface IconPickerProps {
  // 选择回调
  onSelect?: (
    iconName: string,
    IconComponent: React.ComponentType<IconSvgProps>
  ) => void
  // 当前选中的图标
  selectedIcon?: string
  // 图标尺寸
  iconSize?: 'sm' | 'md' | 'lg'
  // 选择后是否自动关闭
  autoClose?: boolean
  // 关闭回调
  onClose?: () => void
}

// Navigation 组件 Props
export interface IconPickerNavigationProps {
  categories: IconCategory[]
  selectedCategory: string
  onCategoryChange: (categoryId: string) => void
}

// SearchBar 组件 Props
export interface IconPickerSearchBarProps {
  searchValue: string
  onSearchChange: (value: string) => void
  onClear: () => void
}

// Content 组件 Props（图标网格）
export interface IconPickerContentProps {
  icons: IconItem[]
  selectedIcon?: string
  onIconSelect: (icon: IconItem) => void
  onIconHover?: (icon: IconItem | null) => void
  iconSize: 'sm' | 'md' | 'lg'
}

// 网格组件 Props
export interface IconPickerGridProps {
  icons: IconItem[]
  selectedIcon?: string
  onIconSelect: (icon: IconItem) => void
  size: 'sm' | 'md' | 'lg'
  showCopyButton: boolean
}

// 单项组件 Props
export interface IconPickerItemProps {
  icon: IconItem
  isSelected: boolean
  onSelect: (icon: IconItem) => void
  onHover?: (icon: IconItem | null) => void
  size: 'sm' | 'md' | 'lg'
}

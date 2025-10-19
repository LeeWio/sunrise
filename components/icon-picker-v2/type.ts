import { FC } from 'react'

import { IconSvgProps } from '@/types'

export type IconComponent = FC<IconSvgProps>

export const enum IconCategory {
  ALL = 'all',
  BRANDS = 'brands',
  DEVELOPMENT = 'development',
}

export interface IconItem {
  /**
   * 唯一标识符（用于状态管理、持久化）
   * 推荐使用 PascalCase，如 "GithubIcon"
   */
  name: string

  category: IconCategory

  /**
   * React 组件（必须是有效的 SVG 组件）
   */
  component: IconComponent

  /**
   * 搜索关键词（用于模糊匹配）
   */
  keywords: string[]

  label: string

  /**
   * 可选：图标描述（用于 a11y）
   */
  description?: string

  /** 可选元信息（扩展字段） */
  meta?: Record<string, any>
}

export type IconsProps = Record<IconCategory, Record<string, IconItem>>

export interface IconPickerState {
  selectedIcon: IconItem | null
  activeCategory: IconCategory
  searchQuery: string
  isOpen: boolean
}

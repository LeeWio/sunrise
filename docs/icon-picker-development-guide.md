# Icon Picker 组件开发指南

基于项目 `icons.tsx` 的自定义图标选择器完整设计方案

## 一、图标分类系统（8个类别）

```typescript
export enum IconCategory {
  SOCIAL = 'social',        // 社交媒体
  INTERACTION = 'interaction', // 用户交互
  THEME = 'theme',          // 主题切换
  UTILITY = 'utility',      // 实用工具
  BRAND = 'brand',          // 品牌标识
  NAVIGATION = 'navigation', // 导航布局
  CONTENT = 'content',      // 内容类型（预留）
  STATUS = 'status'         // 状态指示（预留）
}

export const categoryLabels: Record<IconCategory, string> = {
  [IconCategory.SOCIAL]: 'Social Media',
  [IconCategory.INTERACTION]: 'Interactions',
  [IconCategory.THEME]: 'Theme',
  [IconCategory.UTILITY]: 'Utilities',
  [IconCategory.BRAND]: 'Brands',
  [IconCategory.NAVIGATION]: 'Navigation',
  [IconCategory.CONTENT]: 'Content',
  [IconCategory.STATUS]: 'Status'
}
```

## 二、核心类型定义

```typescript
export interface IconConfig {
  Icon: React.FC<IconSvgProps>
  id: string
  label: string
  description?: string
  color: string
  category: IconCategory
}

export interface IconSelectEvent {
  icon: IconConfig
  timestamp: number
  fromSearch: boolean
  fromCategory: boolean
}

export interface IconPickerSettings {
  perLine: number
  iconSize: number
  searchDebounceMs: number
  showNavigation: boolean
  showSearch: boolean
  showPreview: boolean
  enableTooltip: boolean
}
```

## 三、主组件参数

```typescript
export interface IconPickerProps {
  onIconSelect?: (event: IconSelectEvent) => void
  onIconHover?: (icon: IconConfig | null) => void
  onSearchChange?: (query: string, results: IconConfig[]) => void
  onCategoryChange?: (category: IconCategory | null) => void
  initialCategory?: IconCategory | null
  settings?: Partial<IconPickerSettings>
  className?: string
  selectedIconId?: string
}
```

## 四、子组件设计

### 4.1 Navigation (类别导航)

```typescript
interface IconPickerNavigationProps {
  activeCategory: IconCategory | null
  onCategoryClick: (category: IconCategory | null) => void
  categoryCounts: Partial<Record<IconCategory, number>>
}
```

### 4.2 SearchBar (搜索栏)

```typescript
interface IconPickerSearchBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onClearSearch: () => void
  placeholder: string
}
```

### 4.3 Grid (图标网格)

```typescript
interface IconPickerGridProps {
  icons: IconConfig[]
  onIconSelect: (icon: IconConfig) => void
  onIconHover: (icon: IconConfig | null) => void
  perLine: number
  iconSize: number
}
```

### 4.4 IconButton (图标按钮)

```typescript
interface IconButtonProps {
  icon: IconConfig
  size: number
  onSelect: (icon: IconConfig) => void
  onHover: (icon: IconConfig | null) => void
  showTooltip: boolean
}
```

## 五、状态联动设计

### 5.1 Navigation → Grid 联动
- 点击 Navigation 分类 → 更新 activeCategory → Grid 只显示该分类图标

### 5.2 Grid → Navigation 联动  
- 点击 Grid 中的图标 → 检测图标所属分类 → 更新 activeCategory

### 5.3 Search → Navigation 联动
- 输入搜索关键词 → 清空 activeCategory → 显示搜索结果

### 5.4 Clear Search → Navigation 联动
- 清空搜索 → 恢复上次选中的分类或显示全部

## 六、Hook 设计

```typescript
interface UseIconPickerReturn {
  searchQuery: string
  searchResults: IconConfig[]
  isSearching: boolean
  activeCategory: IconCategory | null
  displayedIcons: IconConfig[]
  categoryCounts: Partial<Record<IconCategory, number>>
  
  setSearchQuery: (query: string) => void
  clearSearch: () => void
  setActiveCategory: (category: IconCategory | null) => void
  handleIconSelect: (icon: IconConfig) => void
  handleCategoryClick: (category: IconCategory | null) => void
}
```

## 七、实现示例

```typescript
function IconPicker({ onIconSelect }: IconPickerProps) {
  const {
    searchQuery,
    searchResults,
    isSearching,
    activeCategory,
    displayedIcons,
    categoryCounts,
    setSearchQuery,
    clearSearch,
    handleCategoryClick,
    handleIconSelect
  } = useIconPicker({ onIconSelect })
  
  return (
    <PopoverContent>
      <IconPickerNavigation
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
        categoryCounts={categoryCounts}
      />
      
      <IconPickerSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={clearSearch}
      />
      
      <IconPickerGrid
        icons={displayedIcons}
        onIconSelect={handleIconSelect}
      />
    </PopoverContent>
  )
}
```
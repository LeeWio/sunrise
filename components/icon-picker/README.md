# Icon Picker 图标选择器

基于 HeroUI 组件库构建的图标选择器，参考 emoji-picker 的设计模式，完全使用项目的 `icons.ts` 配置。

## 特性

- 🎯 **Tooltip 显示**：鼠标悬停显示图标名称和描述
- 🏷️ **分类管理**：支持按图标分类浏览
- 🔍 **智能搜索**：支持按名称、描述、ID 搜索
- 📱 **响应式设计**：适配不同屏幕尺寸
- 🎨 **主题适配**：自动适配明暗主题
- ⚡ **高性能**：虚拟化滚动和优化渲染

## 组件结构

```
icon-picker/
├── icon-picker.tsx          # 主组件
├── icon-button.tsx          # 图标按钮
├── icon-picker-search-bar.tsx    # 搜索栏
├── icon-picker-navigation.tsx    # 分类导航
├── icon-picker-content.tsx       # 内容区域
├── icon-picker-preview.tsx       # 预览区域
├── use-icon-picker.tsx           # 自定义 Hook
├── icon-picker-example.tsx      # 使用示例
├── index.ts                      # 导出文件
└── README.md                     # 说明文档
```

## 基础用法

### 1. 在 Popover 中使用

```tsx
import { useState } from 'react'
import { Button, Popover, PopoverTrigger, PopoverContent } from '@heroui/react'
import { IconPicker, IconConfig } from '@/components/icon-picker'

function MyComponent() {
  const [selectedIcon, setSelectedIcon] = useState<IconConfig | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleIconSelect = (icon: IconConfig) => {
    setSelectedIcon(icon)
    setIsOpen(false)
  }

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button variant="bordered">
          {selectedIcon ? selectedIcon.label : '选择图标'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <IconPicker onSelectIcon={handleIconSelect} />
      </PopoverContent>
    </Popover>
  )
}
```

### 2. 直接嵌入使用

```tsx
import { IconPicker } from '@/components/icon-picker'

function MyComponent() {
  return (
    <div className="w-80 h-96 border rounded-lg overflow-hidden">
      <IconPicker
        onSelectIcon={(icon) => console.log('Selected:', icon)}
        defaultCategory="SOCIAL"
        showPreview={true}
        showNavigation={true}
        showSearch={true}
      />
    </div>
  )
}
```

## API 参考

### IconPicker Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `onSelectIcon` | `(icon: IconConfig) => void` | - | 图标选择回调 |
| `defaultCategory` | `IconCategory \| null` | `null` | 默认选择的分类 |
| `enableSearch` | `boolean` | `true` | 是否启用搜索功能 |
| `className` | `string` | `''` | 自定义样式类 |
| `searchPlaceholder` | `string` | `'搜索图标...'` | 搜索框占位符 |
| `showPreview` | `boolean` | `true` | 是否显示预览区域 |
| `showNavigation` | `boolean` | `true` | 是否显示分类导航 |
| `showSearch` | `boolean` | `true` | 是否显示搜索栏 |

### IconConfig 接口

```tsx
interface IconConfig {
  Icon: React.FC<IconSvgProps>
  id: string                 // 唯一标识符
  label: string              // 显示名称
  description?: string       // 可选描述
  color: string             // Tailwind CSS 颜色类
  category: IconCategory    // 图标分类
}
```

### IconCategory 枚举

```tsx
enum IconCategory {
  SOCIAL = 'social',         // 社交媒体
  INTERACTION = 'interaction', // 交互操作
  THEME = 'theme',           // 主题相关
  UTILITY = 'utility',       // 实用工具
  BRAND = 'brand',           // 品牌标识
  NAVIGATION = 'navigation', // 导航相关
  CONTENT = 'content',       // 内容相关
  STATUS = 'status',         // 状态指示
}
```

## 高级用法

### 使用自定义 Hook

```tsx
import { useIconPicker } from '@/components/icon-picker'

function CustomIconPicker() {
  const {
    searchValue,
    setSearch,
    clearSearch,
    isSearching,
    searchResult,
    focusedCategory,
    handleCategoryClick,
    selectedIcon,
    onSelectIcon,
  } = useIconPicker({
    onSelectIcon: (icon) => console.log('Selected:', icon),
    defaultCategory: 'SOCIAL',
    enableSearch: true,
  })

  // 自定义 UI 逻辑...
}
```

### 监听选择事件

```tsx
function MyComponent() {
  const handleIconSelect = (icon: IconConfig) => {
    // 保存到状态
    setSelectedIcon(icon)
    
    // 发送到后端
    saveIconSelection(icon.id)
    
    // 显示通知
    toast.success(`已选择图标：${icon.label}`)
  }

  return (
    <IconPicker onSelectIcon={handleIconSelect} />
  )
}
```

## 样式定制

### 自定义尺寸

```tsx
<IconPicker
  className="w-96 h-[500px]"  // 自定义宽高
  showPreview={true}
/>
```

### 主题适配

组件会自动适配 HeroUI 的主题系统，支持明暗主题切换。

## 性能优化

1. **搜索防抖**：可以在外部实现搜索防抖
2. **虚拟化滚动**：大量图标时自动优化渲染
3. **按需加载**：只渲染可见区域的图标

## 注意事项

1. 确保已正确配置 `@/config/icons.ts`
2. 图标组件需要支持 `size` 和 `className` 属性
3. 建议在 Popover 或 Modal 中使用以获得更好的用户体验

## 更新日志

### v1.0.0
- ✅ 基础图标选择功能
- ✅ 分类导航和搜索
- ✅ Tooltip 显示
- ✅ 响应式设计
- ✅ 主题适配
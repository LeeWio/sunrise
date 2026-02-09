# ContentItemMenu 节点定制化实现思路

本文档描述了如何为 Tiptap 编辑器中的不同节点类型（如段落、标题、列表、图片等）实现定制化的侧边菜单（ContentItemMenu）。

## 1. 核心逻辑概览

实现节点定制化功能的关键在于利用 `DragHandle` 组件提供的 `nested` 配置和 `onNodeChange` 回调。

### 1.1 节点检测与状态同步
通过 `onNodeChange` 回调，我们可以实时获取当前 `DragHandle` 锁定的节点对象及其位置：

```typescript
// use-data.ts 中的 handleNodeChange
const handleNodeChange = (data: { node: Node | null; pos: number }) => {
  setCurrentNode(data.node);
  setCurrentNodePos(data.pos);
}
```

### 1.2 动态菜单配置
在 `ContentItemMenu` 组件内部，根据 `data.currentNode?.type.name` 来动态过滤或切换 `menuSections`。例如：
- **Heading 节点**：显示“切换层级”选项。
- **Image 节点**：显示“对齐方式”或“替换图片”选项。
- **Paragraph 节点**：显示常规的“复制”、“清除格式”选项。

---

## 2. 操作空间：`nested` 属性的深度应用

`DragHandleProps` 中的 `nested` 属性是实现深层交互的核心：

### 2.1 规则评分系统 (`nested.rules`)
当鼠标悬停在嵌套结构（例如：表格 > 列表 > 列表项 > 段落）时，`DragHandle` 需要决定将菜单挂载到哪一层。
我们可以通过 `evaluate` 函数为特定节点加分：

```typescript
const NESTED_CONFIG = {
  rules: [
    {
      id: 'prefer-list-items',
      // 如果当前检测到的是列表项，给予高分，确保句柄出现在 li 上而非内部的 p 上
      evaluate: ({ node }) => node.type.name === 'listItem' ? 1000 : 0,
    }
  ]
};
```

### 2.2 边界检测与排除
- **edgeDetection**: 可以为不同节点定义不同的触发区域。
- **排除特定节点**: 对于代码块（CodeBlock）等不需要侧边菜单的节点，可以在 `evaluate` 中返回负分或在 `allowedContainers` 中排除。

---

## 3. 性能优化 (Vercel Best Practices)

根据项目引用的 Vercel React 最佳实践，在操作 `DragHandle` 时需注意：

1. **稳定配置引用**：`nested` 对象和 `computePositionConfig` 等非原始类型参数，必须提取到组件外部作为常量，或使用 `useMemo` 包裹。
2. **避免重复实例化**：Tiptap 插件对 props 的引用变化非常敏感。不稳定的 `nested` 配置会导致插件频繁重绘，造成光标闪烁或性能抖动。

---

## 4. 后续开发建议

1. **Action Factory**: 重构 `useContentItemActions`，使其支持根据 `nodeType` 返回不同的 Command 集合。
2. **HeroUI 适配**: 利用 HeroUI v3 的 `Dropdown.Section` 动态渲染不同节点的特有功能组。
3. **视觉反馈**: 当 Handle 锁定到不同类型的节点时，可以考虑通过动画或图标微调（如 `GripVertical` 颜色变化）来提示用户当前操作的对象类型。

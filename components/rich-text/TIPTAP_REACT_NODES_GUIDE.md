# TipTap 自定义 React 节点开发手册

## 概述

本手册基于我们成功的音频扩展开发经验，提供完整的 TipTap 自定义 React 节点开发指南。涵盖从基础概念到高级功能的完整开发流程。

## 目录

1. [核心概念](#核心概念)
2. [项目结构](#项目结构)
3. [基础节点扩展](#基础节点扩展)
4. [React 视图组件](#react-视图组件)
5. [属性管理](#属性管理)
6. [命令系统](#命令系统)
7. [事件处理](#事件处理)
8. [样式与主题](#样式与主题)
9. [性能优化](#性能优化)
10. [最佳实践](#最佳实践)
11. [常见问题](#常见问题)
12. [完整示例](#完整示例)

## 核心概念

### React 节点 vs 普通 HTML 节点

- **普通 HTML 节点**：直接生成静态 HTML，简单快速
- **React 节点**：使用 React 组件渲染，支持复杂交互和状态管理

### 何时使用 React 节点

✅ **适合场景**：
- 需要复杂的用户交互（如媒体播放器）
- 需要状态管理（如进度条、表单）
- 需要动态内容（如文件上传）
- 需要自定义事件处理

❌ **不适合场景**：
- 简单的静态内容（如标题、段落）
- 纯展示性的内容

## 项目结构

### 推荐目录结构

```
components/rich-text/extensions/
├── extension-name/           # 扩展根目录
│   ├── index.ts             # 导出文件
│   ├── extension-name.ts    # 扩展核心实现
│   ├── types.ts             # 类型定义（可选）
│   ├── README.md            # 文档（可选）
│   └── views/               # React 视图组件
│       ├── index.ts         # 视图导出
│       ├── component.tsx    # 主视图组件
│       ├── hooks/           # 自定义 hooks
│       │   └── use-hook.ts
│       └── components/      # 子组件
│           └── sub-component.tsx
```

### 文件命名规范

- **扩展文件**：`kebab-case.ts` (如 `audio-player.ts`)
- **组件文件**：`PascalCase.tsx` (如 `AudioPlayerView.tsx`)
- **Hook 文件**：`useCamelCase.ts` (如 `useAudioPlayer.ts`)
- **类型文件**：`types.ts` 或 `extension-name.types.ts`

## 基础节点扩展

### 1. 创建扩展骨架

```typescript
// extension-name.ts
import { Node, mergeAttributes, ReactNodeViewRenderer } from "@tiptap/react";
import { ExtensionView } from "./views";

export interface ExtensionAttributes {
  // 定义属性类型
  src: string;
  title?: string;
}

export const Extension = Node.create<ExtensionAttributes>({
  name: "extension-name",

  // 节点配置
  group: "block",           // block 或 inline
  atom: true,              // 不可分割的节点
  draggable: true,         // 可拖拽
  selectable: true,        // 可选择
  isolating: true,         // 隔离内容

  // 属性定义
  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (element) => element.getAttribute("src"),
        renderHTML: (attributes) => {
          if (!attributes.src) return {};
          return { src: attributes.src };
        },
      },
      title: {
        default: null,
        parseHTML: (element) => element.getAttribute("title"),
        renderHTML: (attributes) => {
          if (!attributes.title) return {};
          return { title: attributes.title };
        },
      },
    };
  },

  // HTML 解析
  parseHTML() {
    return [
      {
        tag: `div[data-type="${this.name}"]`,
      },
    ];
  },

  // HTML 渲染
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": this.name,
      }),
    ];
  },

  // React 节点视图
  addNodeView() {
    return ReactNodeViewRenderer(ExtensionView);
  },
});
```

### 2. 节点配置选项详解

```typescript
export const Extension = Node.create({
  name: "extension-name",

  // 节点分组
  group: "block",        // block: 块级节点
                         // inline: 内联节点
                         // inlineContent: 内联内容节点

  // 节点特性
  atom: true,           // 原子节点，不可分割
  draggable: true,      // 可拖拽
  selectable: true,     // 可选择
  isolating: true,      // 隔离子内容
  defining: true,       // 定义自己的内容
  definingAsChild: true, // 作为子节点定义父节点
  allowGapCursor: true, // 允许间隙光标

  // 内容模型
  content: "block+",    // 子内容规则
  marks: "",            // 允许的标记
  whitespace: "pre",    // 空白处理

  // 优先级
  priority: 100,        // 解析优先级
});
```

## React 视图组件

### 1. 基础组件结构

```tsx
// views/component.tsx
import React, { useCallback, useRef, useState } from "react";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";

export const ExtensionView: React.FC<NodeViewProps> = ({
  node,
  updateAttributes,
  deleteNode,
  selected,
  editor,
  getPos,
}) => {
  // 提取节点属性
  const { src, title } = node.attrs;

  // 状态管理
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 事件处理
  const handleClick = useCallback(() => {
    const pos = getPos();
    if (pos !== undefined) {
      editor.commands.setNodeSelection(pos);
    }
  }, [getPos, editor]);

  const handleUpdate = useCallback((newAttrs: Partial<typeof node.attrs>) => {
    updateAttributes(newAttrs);
  }, [updateAttributes]);

  const handleDelete = useCallback(() => {
    deleteNode();
  }, [deleteNode]);

  return (
    <NodeViewWrapper
      data-drag-handle
      data-selected={selected}
      className="extension-node-wrapper"
    >
      <div className="extension-node-container">
        {/* 组件内容 */}
        <div onClick={handleClick}>
          {src ? (
            <img src={src} alt={title || ""} />
          ) : (
            <div>请上传内容</div>
          )}
        </div>

        {/* 控制按钮 */}
        {selected && (
          <div className="extension-node-controls">
            <button onClick={handleDelete}>删除</button>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};
```

### 2. NodeViewProps 接口详解

```typescript
interface NodeViewProps {
  node: ProsemirrorNode;        // 节点实例
  getPos: () => number | undefined; // 获取节点位置
  updateAttributes: (attributes: Record<string, any>) => void; // 更新属性
  deleteNode: () => void;       // 删除节点
  selected: boolean;            // 是否选中
  editor: Editor;               // 编辑器实例
  view: EditorView;             // ProseMirror 视图
  decorations: readonly Decoration[]; // 装饰器
  innerDecorations: DecorationSet;    // 内部装饰器
  nodeViewContainerRef: RefObject<HTMLElement>; // 容器引用
}
```

### 3. NodeViewWrapper 组件

```tsx
<NodeViewWrapper
  // 拖拽支持
  data-drag-handle

  // 选中状态
  data-selected={selected}

  // 自定义类名
  className="custom-wrapper"

  // 事件处理
  onDragStart={handleDragStart}
  onDragEnd={handleDragEnd}
>
  {/* 你的组件内容 */}
</NodeViewWrapper>
```

## 属性管理

### 1. 属性定义模式

```typescript
addAttributes() {
  return {
    // 简单属性
    title: {
      default: "",
      parseHTML: (element) => element.getAttribute("title") || "",
      renderHTML: (attributes) => ({ title: attributes.title }),
    },

    // 布尔属性
    disabled: {
      default: false,
      parseHTML: (element) => element.hasAttribute("disabled"),
      renderHTML: (attributes) =>
        attributes.disabled ? { disabled: "" } : {},
    },

    // 复杂属性
    metadata: {
      default: null,
      parseHTML: (element) => {
        const json = element.getAttribute("data-metadata");
        return json ? JSON.parse(json) : null;
      },
      renderHTML: (attributes) => ({
        "data-metadata": attributes.metadata ?
          JSON.stringify(attributes.metadata) : "",
      }),
    },

    // 计算属性
    aspectRatio: {
      default: "16/9",
      parseHTML: (element) => {
        const width = element.getAttribute("width");
        const height = element.getAttribute("height");
        if (width && height) {
          return `${width}/${height}`;
        }
        return "16/9";
      },
    },
  };
}
```

### 2. 属性更新策略

```typescript
// 在 React 组件中更新属性
const updateTitle = useCallback((newTitle: string) => {
  updateAttributes({ title: newTitle });
}, [updateAttributes]);

// 批量更新
const updateMultiple = useCallback(() => {
  updateAttributes({
    title: "新标题",
    disabled: true,
    metadata: { updated: Date.now() }
  });
}, [updateAttributes]);

// 条件更新
const conditionalUpdate = useCallback(() => {
  if (node.attrs.title === "默认标题") {
    updateAttributes({ title: "自定义标题" });
  }
}, [node.attrs.title, updateAttributes]);
```

## 命令系统

### 1. 基础命令定义

```typescript
// 类型声明
declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    extensionName: {
      setExtension: (options: ExtensionOptions) => ReturnType;
      updateExtension: (attributes: Partial<ExtensionAttributes>) => ReturnType;
      removeExtension: () => ReturnType;
      toggleExtensionFeature: () => ReturnType;
    };
  }
}

// 命令实现
addCommands() {
  return {
    // 插入节点
    setExtension:
      (options) =>
      ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        });
      },

    // 更新当前节点
    updateExtension:
      (attributes) =>
      ({ tr, state }) => {
        const { selection } = state;
        const node = state.doc.nodeAt(selection.from);

        if (node && node.type.name === this.name) {
          tr.setNodeMarkup(selection.from, undefined, {
            ...node.attrs,
            ...attributes,
          });
          return true;
        }
        return false;
      },

    // 删除当前节点
    removeExtension:
      () =>
      ({ tr, state }) => {
        const { selection } = state;
        const node = state.doc.nodeAt(selection.from);

        if (node && node.type.name === this.name) {
          tr.delete(selection.from, selection.to);
          return true;
        }
        return false;
      },

    // 切换功能
    toggleExtensionFeature:
      () =>
      ({ commands }) => {
        const featureEnabled = this.editor.isActive(this.name, {
          feature: true
        });
        return commands.updateAttributes(this.name, {
          feature: !featureEnabled,
        });
      },
  };
}
```

### 2. 高级命令模式

```typescript
addCommands() {
  return {
    // 位置感知插入
    insertExtensionAt:
      (options: { attrs: any; pos: number | Range }) =>
      ({ commands }) => {
        return commands.insertContentAt(options.pos, {
          type: this.name,
          attrs: options.attrs,
        });
      },

    // 查找并替换
    replaceAllExtensions:
      (newAttrs: any) =>
      ({ tr, state }) => {
        let replaced = false;
        state.doc.descendants((node, pos) => {
          if (node.type.name === this.name) {
            tr.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              ...newAttrs,
            });
            replaced = true;
          }
        });
        return replaced;
      },

    // 条件命令
    setExtensionIf:
      (condition: () => boolean, options: any) =>
      ({ commands }) => {
        if (condition()) {
          return commands.setExtension(options);
        }
        return false;
      },
  };
}
```

### 3. 键盘快捷键

```typescript
addKeyboardShortcuts() {
  return {
    // 插入快捷键
    "Mod-Shift-e": () => this.editor.commands.setExtension({
      src: "",
      title: "新建内容"
    }),

    // 功能切换
    "Mod-e": () => this.editor.commands.toggleExtensionFeature(),

    // 上下文感知快捷键
    "Backspace": () => {
      const { state } = this.editor;
      const { selection } = state;
      const node = state.doc.nodeAt(selection.from);

      // 在空节点上删除
      if (node && node.type.name === this.name && selection.empty) {
        return this.editor.commands.removeExtension();
      }
      return false;
    },

    // 方向键导航
    "ArrowDown": () => {
      const { state } = this.editor;
      const { selection } = state;
      const node = state.doc.nodeAt(selection.from);

      if (node && node.type.name === this.name) {
        // 移动到下一个节点
        return this.editor.commands.setTextSelection(selection.to + 1);
      }
      return false;
    },
  };
}
```

## 事件处理

### 1. 生命周期事件

```tsx
export const ExtensionView: React.FC<NodeViewProps> = (props) => {
  // 组件挂载
  useEffect(() => {
    console.log("节点视图已挂载");

    // 清理函数
    return () => {
      console.log("节点视图将卸载");
    };
  }, []);

  // 属性变化
  useEffect(() => {
    console.log("节点属性已更新:", props.node.attrs);
  }, [props.node.attrs]);

  // 选中状态变化
  useEffect(() => {
    console.log("选中状态:", props.selected);
  }, [props.selected]);

  return (
    <NodeViewWrapper>
      {/* 组件内容 */}
    </NodeViewWrapper>
  );
};
```

### 2. 编辑器事件监听

```tsx
export const ExtensionView: React.FC<NodeViewProps> = ({ editor, getPos }) => {
  const handleEditorTransaction = useCallback(() => {
    // 响应编辑器事务
    console.log("编辑器状态已更新");
  }, []);

  useEffect(() => {
    // 监听编辑器事件
    editor.on("transaction", handleEditorTransaction);

    return () => {
      editor.off("transaction", handleEditorTransaction);
    };
  }, [editor, handleEditorTransaction]);

  return (
    <NodeViewWrapper>
      {/* 组件内容 */}
    </NodeViewWrapper>
  );
};
```

### 3. 自定义事件处理

```tsx
export const ExtensionView: React.FC<NodeViewProps> = ({
  node,
  updateAttributes,
  getPos,
  editor
}) => {
  const handleCustomEvent = useCallback((event: CustomEvent) => {
    // 处理自定义事件
    const { detail } = event;
    updateAttributes(detail);
  }, [updateAttributes]);

  const triggerCustomEvent = useCallback(() => {
    const pos = getPos();
    if (pos !== undefined) {
      // 触发自定义事件
      const customEvent = new CustomEvent("nodeAction", {
        detail: { nodeType: node.type.name, position: pos }
      });
      editor.view.dom.dispatchEvent(customEvent);
    }
  }, [getPos, editor, node.type.name]);

  return (
    <NodeViewWrapper>
      <button onClick={triggerCustomEvent}>
        触发自定义事件
      </button>
    </NodeViewWrapper>
  );
};
```

## 样式与主题

### 1. CSS 类命名规范

```tsx
<NodeViewWrapper className="extension-node-wrapper">
  <div className="extension-node-container">
    <div className="extension-node-content" />
    <div className="extension-node-controls" />
  </div>
</NodeViewWrapper>
```

### 2. 状态样式

```tsx
<NodeViewWrapper
  className={cn(
    "extension-node-wrapper",
    selected && "extension-node--selected",
    node.attrs.disabled && "extension-node--disabled",
    isLoading && "extension-node--loading"
  )}
>
  {/* 内容 */}
</NodeViewWrapper>
```

### 3. 响应式设计

```tsx
<div className="extension-node-container">
  {/* 移动端适配 */}
  <div className="hidden sm:block extension-node-desktop">
    桌面端内容
  </div>
  <div className="block sm:hidden extension-node-mobile">
    移动端内容
  </div>
</div>
```

### 4. 主题支持

```tsx
<div className="extension-node-container">
  <div className="text-gray-900 dark:text-white bg-white dark:bg-gray-800">
    {/* 主题感知内容 */}
  </div>
</div>
```

## 性能优化

### 1. React 优化

```tsx
export const ExtensionView = React.memo<NodeViewProps>(({
  node,
  updateAttributes,
  deleteNode,
  selected,
}) => {
  // 使用 useCallback 缓存事件处理函数
  const handleClick = useCallback(() => {
    // 处理逻辑
  }, [updateAttributes]);

  const handleDelete = useCallback(() => {
    deleteNode();
  }, [deleteNode]);

  // 使用 useMemo 缓存计算结果
  const computedValue = useMemo(() => {
    return expensiveCalculation(node.attrs);
  }, [node.attrs]);

  return (
    <NodeViewWrapper onClick={handleClick}>
      <div>{computedValue}</div>
      <button onClick={handleDelete}>删除</button>
    </NodeViewWrapper>
  );
});

// 设置显示名称
ExtensionView.displayName = "ExtensionView";
```

### 2. 大数据处理

```tsx
export const ExtensionView: React.FC<NodeViewProps> = ({ node }) => {
  // 使用 Web Workers 处理大数据
  const [processedData, setProcessedData] = useState(null);

  useEffect(() => {
    if (node.attrs.largeData) {
      const worker = new Worker("/data-processor.js");
      worker.postMessage(node.attrs.largeData);
      worker.onmessage = (event) => {
        setProcessedData(event.data);
        worker.terminate();
      };
    }
  }, [node.attrs.largeData]);

  return (
    <NodeViewWrapper>
      {processedData ? (
        <div>处理后的数据</div>
      ) : (
        <div>处理中...</div>
      )}
    </NodeViewWrapper>
  );
};
```

### 3. 懒加载优化

```tsx
import { lazy, Suspense } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

export const ExtensionView: React.FC<NodeViewProps> = ({ node }) => {
  const [showHeavy, setShowHeavy] = useState(false);

  return (
    <NodeViewWrapper>
      <button onClick={() => setShowHeavy(true)}>
        显示复杂组件
      </button>

      {showHeavy && (
        <Suspense fallback={<div>加载中...</div>}>
          <HeavyComponent data={node.attrs} />
        </Suspense>
      )}
    </NodeViewWrapper>
  );
};
```

## 最佳实践

### 1. 错误处理

```tsx
export const ExtensionView: React.FC<NodeViewProps> = ({ node }) => {
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((error: Error) => {
    console.error("扩展节点错误:", error);
    setError(error.message);
  }, []);

  if (error) {
    return (
      <NodeViewWrapper>
        <div className="error-fallback">
          <span>错误: {error}</span>
          <button onClick={() => setError(null)}>重试</button>
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper>
      {/* 正常内容 */}
    </NodeViewWrapper>
  );
};
```

### 2. 可访问性

```tsx
<NodeViewWrapper
  role="figure"
  aria-label={node.attrs.title || "扩展内容"}
  aria-selected={selected}
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // 激活节点
    }
  }}
>
  <div>
    <h3 id={`title-${getPos()}`}>
      {node.attrs.title}
    </h3>
    <div aria-labelledby={`title-${getPos()}`}>
      {/* 内容 */}
    </div>
  </div>
</NodeViewWrapper>
```

### 3. 类型安全

```typescript
// 定义严格的属性类型
interface ExtensionAttributes {
  src: string;
  title?: string;
  metadata?: {
    created: number;
    author?: string;
    tags?: string[];
  };
}

// 类型安全的命令
declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    extensionName: {
      setExtension: (options: {
        src: string;
        title?: string;
        metadata?: ExtensionAttributes["metadata"];
      }) => ReturnType;
    };
  }
}

// 类型安全的组件
export const ExtensionView: React.FC<NodeViewProps<ExtensionAttributes>> = ({
  node,
}) => {
  const { src, title, metadata } = node.attrs;

  // 类型安全的使用
  const createdDate = metadata?.created ?
    new Date(metadata.created) : new Date();

  return (
    <NodeViewWrapper>
      {/* 类型安全的内容 */}
    </NodeViewWrapper>
  );
};
```

### 4. 测试友好设计

```tsx
export const ExtensionView: React.FC<NodeViewProps> = ({
  node,
  updateAttributes
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <NodeViewWrapper data-testid="extension-node">
      <div
        data-testid={`extension-${node.type.name}`}
        data-node-id={node.attrs.id}
      >
        {isEditing ? (
          <input
            data-testid="extension-input"
            value={node.attrs.title}
            onChange={(e) => updateAttributes({ title: e.target.value })}
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <div
            data-testid="extension-title"
            onClick={() => setIsEditing(true)}
          >
            {node.attrs.title}
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};
```

## 常见问题

### 1. 节点不渲染

**问题**：React 节点不显示
**解决方案**：
```typescript
// 确保使用 NodeViewWrapper
return (
  <NodeViewWrapper>
    {/* 确保内容不为空 */}
    <div>内容</div>
  </NodeViewWrapper>
);

// 检查扩展是否正确注册
const ExtensionKit = () => [
  // ... 其他扩展
  YourExtension, // 确保在这里包含
];
```

### 2. 属性更新不生效

**问题**：调用 `updateAttributes` 后界面不更新
**解决方案**：
```typescript
// 确保使用正确的属性名称
updateAttributes({
  correctAttributeName: newValue
});

// 检查属性定义是否正确
addAttributes() {
  return {
    correctAttributeName: {
      default: "",
      parseHTML: (element) => element.getAttribute("data-attr") || "",
      renderHTML: (attributes) => ({
        "data-attr": attributes.correctAttributeName || "",
      }),
    },
  };
}
```

### 3. TypeScript 类型错误

**问题**：类型声明不匹配
**解决方案**：
```typescript
// 确保 NodeViewProps 类型正确
import { NodeViewProps } from "@tiptap/react";

// 为扩展添加泛型类型
export const Extension = Node.create<ExtensionAttributes>({
  // ...
});

// 组件中使用泛型
export const ExtensionView: React.FC<NodeViewProps<ExtensionAttributes>> = ({
  node,
}) => {
  // node.attrs 现在有正确的类型提示
};
```

### 4. 性能问题

**问题**：大量节点导致编辑器卡顿
**解决方案**：
```typescript
// 使用 React.memo
export const ExtensionView = React.memo<NodeViewProps>(({ node }) => {
  // 组件内容
});

// 使用虚拟化
import { FixedSizeList as List } from "react-window";

export const NodeList: React.FC<{ nodes: any[] }> = ({ nodes }) => (
  <List
    height={600}
    itemCount={nodes.length}
    itemSize={100}
    itemData={nodes}
  >
    {({ index, style, data }) => (
      <div style={style}>
        <ExtensionView node={data[index]} />
      </div>
    )}
  </List>
);
```

### 5. 事件冲突

**问题**：自定义事件与编辑器事件冲突
**解决方案**：
```typescript
const handleClick = useCallback((event: React.MouseEvent) => {
  // 阻止事件冒泡
  event.stopPropagation();

  // 处理自定义逻辑
  handleCustomAction();
}, []);

return (
  <NodeViewWrapper onClick={handleClick}>
    {/* 内容 */}
  </NodeViewWrapper>
);
```

## 完整示例

### 交互式卡片扩展

```typescript
// interactive-card.ts
import { Node, mergeAttributes, ReactNodeViewRenderer } from "@tiptap/react";
import { InteractiveCardView } from "./views";

interface CardAttributes {
  title: string;
  content: string;
  color: "blue" | "green" | "red" | "yellow";
  expanded: boolean;
  createdAt: number;
}

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    card: {
      setCard: (options: Partial<CardAttributes>) => ReturnType;
      updateCard: (attributes: Partial<CardAttributes>) => ReturnType;
      removeCard: () => ReturnType;
      toggleCardExpanded: () => ReturnType;
    };
  }
}

export const InteractiveCard = Node.create<CardAttributes>({
  name: "interactive-card",

  group: "block",
  atom: true,
  draggable: true,
  selectable: true,
  isolating: true,

  addAttributes() {
    return {
      title: {
        default: "新卡片",
        parseHTML: (element) => element.getAttribute("data-title") || "新卡片",
        renderHTML: (attributes) => ({
          "data-title": attributes.title,
        }),
      },
      content: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-content") || "",
        renderHTML: (attributes) => ({
          "data-content": attributes.content,
        }),
      },
      color: {
        default: "blue",
        parseHTML: (element) =>
          (element.getAttribute("data-color") as CardAttributes["color"]) || "blue",
        renderHTML: (attributes) => ({
          "data-color": attributes.color,
        }),
      },
      expanded: {
        default: false,
        parseHTML: (element) => element.hasAttribute("data-expanded"),
        renderHTML: (attributes) =>
          attributes.expanded ? { "data-expanded": "" } : {},
      },
      createdAt: {
        default: () => Date.now(),
        parseHTML: () => Date.now(),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `div[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": this.name,
        class: "interactive-card-node",
      }),
    ];
  },

  addCommands() {
    return {
      setCard:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              ...options,
              createdAt: Date.now(),
            },
          });
        },

      updateCard:
        (attributes) =>
        ({ tr, state }) => {
          const { selection } = state;
          const node = state.doc.nodeAt(selection.from);

          if (node && node.type.name === this.name) {
            tr.setNodeMarkup(selection.from, undefined, {
              ...node.attrs,
              ...attributes,
            });
            return true;
          }
          return false;
        },

      removeCard:
        () =>
        ({ tr, state }) => {
          const { selection } = state;
          const node = state.doc.nodeAt(selection.from);

          if (node && node.type.name === this.name) {
            tr.delete(selection.from, selection.to);
            return true;
          }
          return false;
        },

      toggleCardExpanded:
        () =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, {
            expanded: !this.editor.isActive(this.name, { expanded: true }),
          });
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Shift-c": () => this.editor.commands.setCard({
        title: "新卡片",
        content: "点击编辑内容",
      }),
      "Mod-c": () => this.editor.commands.toggleCardExpanded(),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(InteractiveCardView);
  },
});
```

```tsx
// views/interactive-card-view.tsx
import React, { useState, useCallback, useRef, useEffect } from "react";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import { Button } from "@heroui/react";
import { CardAttributes } from "../interactive-card";

import {
  EditIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@/components/icons";

export const InteractiveCardView: React.FC<NodeViewProps<CardAttributes>> = ({
  node,
  updateAttributes,
  deleteNode,
  selected,
  getPos,
  editor,
}) => {
  const { title, content, color, expanded, createdAt } = node.attrs;
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);
  const [tempContent, setTempContent] = useState(content);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  // 自动聚焦输入框
  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  useEffect(() => {
    if (isEditingContent && contentTextareaRef.current) {
      contentTextareaRef.current.focus();
      contentTextareaRef.current.select();
    }
  }, [isEditingContent]);

  // 处理标题编辑
  const handleTitleEdit = useCallback(() => {
    setIsEditingTitle(true);
    setTempTitle(title);
  }, [title]);

  const handleTitleSave = useCallback(() => {
    updateAttributes({ title: tempTitle });
    setIsEditingTitle(false);
  }, [tempTitle, updateAttributes]);

  const handleTitleCancel = useCallback(() => {
    setTempTitle(title);
    setIsEditingTitle(false);
  }, [title]);

  // 处理内容编辑
  const handleContentEdit = useCallback(() => {
    setIsEditingContent(true);
    setTempContent(content);
  }, [content]);

  const handleContentSave = useCallback(() => {
    updateAttributes({ content: tempContent });
    setIsEditingContent(false);
  }, [tempContent, updateAttributes]);

  const handleContentCancel = useCallback(() => {
    setTempContent(content);
    setIsEditingContent(false);
  }, [content]);

  // 切换展开状态
  const toggleExpanded = useCallback(() => {
    updateAttributes({ expanded: !expanded });
  }, [expanded, updateAttributes]);

  // 删除卡片
  const handleDelete = useCallback(() => {
    deleteNode();
  }, [deleteNode]);

  // 选择节点
  const handleSelect = useCallback(() => {
    const pos = getPos();
    if (pos !== undefined) {
      editor.commands.setNodeSelection(pos);
    }
  }, [getPos, editor]);

  // 颜色样式映射
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-100",
    green: "bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-700 dark:text-green-100",
    red: "bg-red-50 border-red-200 text-red-900 dark:bg-red-900/20 dark:border-red-700 dark:text-red-100",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-100",
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <NodeViewWrapper
      data-drag-handle
      data-selected={selected}
      className="interactive-card-wrapper"
    >
      <div
        className={`
          interactive-card-container group relative my-4 rounded-lg border-2 p-4 transition-all
          ${colorClasses[color]}
          ${selected ? "ring-2 ring-offset-2 ring-blue-500" : ""}
          ${isEditingTitle || isEditingContent ? "ring-2 ring-offset-2 ring-orange-500" : ""}
        `}
        onClick={handleSelect}
      >
        {/* 卡片头部 */}
        <div className="flex items-start justify-between mb-2">
          {isEditingTitle ? (
            <div className="flex-1 mr-2">
              <input
                ref={titleInputRef}
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTitleSave();
                  } else if (e.key === "Escape") {
                    handleTitleCancel();
                  }
                }}
                className="w-full px-2 py-1 text-lg font-semibold bg-white dark:bg-gray-800 border rounded"
              />
            </div>
          ) : (
            <h3
              className="text-lg font-semibold cursor-pointer flex-1 mr-2"
              onClick={handleTitleEdit}
            >
              {title}
            </h3>
          )}

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={handleTitleEdit}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <EditIcon className="h-4 w-4" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={handleDelete}
              className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 展开/折叠按钮 */}
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onPress={toggleExpanded}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {expanded ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </Button>

        {/* 卡片内容 */}
        {expanded && (
          <div className="mt-3 border-t pt-3">
            {isEditingContent ? (
              <textarea
                ref={contentTextareaRef}
                value={tempContent}
                onChange={(e) => setTempContent(e.target.value)}
                onBlur={handleContentSave}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    handleContentCancel();
                  }
                }}
                className="w-full px-2 py-1 min-h-[60px] bg-white dark:bg-gray-800 border rounded resize-none"
                rows={3}
              />
            ) : (
              <div
                className="cursor-pointer min-h-[24px]"
                onClick={handleContentEdit}
              >
                {content || (
                  <span className="text-gray-500 italic">点击添加内容...</span>
                )}
              </div>
            )}
          </div>
        )}

        {/* 卡片底部信息 */}
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 border-t pt-2">
          创建时间: {formatDate(createdAt)}
        </div>
      </div>
    </NodeViewWrapper>
  );
};

InteractiveCardView.displayName = "InteractiveCardView";
```

## 总结

本手册提供了完整的 TipTap 自定义 React 节点开发指南，涵盖了从基础概念到高级功能的各个方面。通过遵循这些最佳实践和模式，你可以创建出功能强大、性能优秀、用户体验良好的自定义节点扩展。

记住，成功的自定义节点开发需要：

1. **深入理解 TipTap 和 ProseMirror 的工作原理**
2. **遵循 React 和 TypeScript 的最佳实践**
3. **重视用户体验和可访问性**
4. **充分的测试和错误处理**
5. **良好的文档和代码组织**

希望这本手册能够帮助你开发出出色的 TipTap 扩展！
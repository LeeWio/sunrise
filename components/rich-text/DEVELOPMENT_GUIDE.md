# TipTap 富文本编辑器开发规范手册

## 项目概述

这是一个基于 TipTap 库构建的现代富文本编辑器组件，采用 React 19 + TypeScript 开发，集成 HeroUI 组件库和 Tailwind CSS 样式系统。

## 核心技术栈

- **TipTap**: ProseMirror 的 React 封装，用于富文本编辑
- **React 19.2.0**: 前端框架，支持 Server Components
- **TypeScript**: 类型安全的 JavaScript 超集
- **HeroUI v3.0.0-alpha.35**: React 组件库
- **Tailwind CSS v4**: 原子化 CSS 框架

## 项目架构

### 目录结构
```
components/rich-text/
├── extensions/              # TipTap 扩展
│   ├── extension-kit.ts    # 扩展集合配置
│   ├── index.ts           # 扩展导出
│   ├── document/          # 文档扩展
│   ├── figure/            # 图形扩展
│   ├── figcaption/        # 图形标题扩展
│   ├── heading/           # 标题扩展
│   ├── horizontal-rule/   # 水平分割线扩展
│   ├── image-block/       # 图片块扩展
│   ├── image-upload/      # 图片上传扩展
│   ├── link/              # 链接扩展
│   ├── multi-column/      # 多列布局扩展
│   └── selection/         # 选择扩展
├── menus/                  # 菜单组件
│   ├── content-item-menu/ # 内容项菜单
│   ├── link-menu/         # 链接菜单
│   └── text-menu/         # 文本格式化菜单
├── panels/                 # 面板组件
│   ├── link-editor-panel/ # 链接编辑面板
│   └── link-preview-panel/ # 链接预览面板
├── styles/                 # 样式文件
│   ├── index.css          # 主样式入口
│   └── partials/          # 分模块样式
├── libs/                   # 工具库
│   └── utils/             # 通用工具函数
├── rich-text.tsx          # 主组件
└── index.ts               # 组件导出
```

## 核心组件规范

### 1. 主组件 (RichText)

**文件位置**: `components/rich-text/rich-text.tsx`

**核心功能**:
- 编辑器实例管理
- 菜单系统集成
- 字数统计和撤销/重做状态管理
- SSR 兼容性处理

**使用规范**:
```tsx
export const RichText = () => {
  const { editor } = useRichText();
  const menuContainerRef = useRef<HTMLDivElement>(null);

  // 编辑器状态管理
  const { charactersCount, wordsCount } = useEditorState({
    editor,
    selector: (context) => ({
      charactersCount: context.editor?.storage.characterCount.characters(),
      wordsCount: context.editor?.storage.characterCount.words(),
    }),
  });

  return (
    <div ref={menuContainerRef}>
      <EditorContent editor={editor} />
      {/* 菜单组件 */}
    </div>
  );
};
```

### 2. Hook 使用规范

**文件位置**: `hooks/use-rich-text.ts`

**配置要点**:
```typescript
export const useRichText = () => {
  const editor = useEditor({
    immediatelyRender: false,        // SSR 兼容
    shouldRerenderOnTransaction: false,
    autofocus: true,
    editable: true,
    injectCSS: false,               // 使用自定义 CSS
    extensions: [...ExtensionKit()],
    // 生命周期回调
    onCreate, onUpdate, onBeforeCreate,
    onMount, onUnmount, onContentError,
    onBlur, onDelete, onDestroy
  });
};
```

## 扩展开发规范

### 1. 扩展结构标准

每个扩展都应遵循以下目录结构：
```
extension-name/
├── index.ts          # 导出文件
├── extension-name.ts # 扩展实现
└── views/            # React 视图组件 (可选)
    ├── index.ts
    └── component.tsx
```

### 2. 扩展实现模板

**基本扩展模板**:
```typescript
import { Node, Mark } from "@tiptap/react";

export const CustomExtension = Node.create({
  name: "custom-extension",

  // 扩展配置
  group: "block",
  content: "block+",
  isolating: true,
  defining: true,

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
    return ["div", mergeAttributes(HTMLAttributes, {
      "data-type": this.name
    }), 0];
  },

  // 命令定义
  addCommands() {
    return {
      setCustomExtension: () => ({ commands }) => {
        return commands.insertContent(`<div data-type="${this.name}"></div>`);
      },
    };
  },

  // React 视图 (可选)
  addNodeView() {
    return ReactNodeViewRenderer(CustomExtensionComponent);
  },
});
```

### 3. 扩展类型定义

**命令类型定义**:
```typescript
declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    customExtension: {
      setCustomExtension: () => ReturnType;
    };
  }
}
```

### 4. 核心扩展配置

**ExtensionKit 配置** (`components/rich-text/extensions/extension-kit.ts`):
```typescript
export const ExtensionKit = () => [
  StarterKit.configure({
    link: false,
    document: false,
    horizontalRule: false,
    heading: false,
  }),
  Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
  CharacterCount.configure({ limit: 5000 }),
  ListKit.configure({
    listItem: { HTMLAttributes: { class: "" } },
  }),
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: "Write something …",
  }),
  // 其他扩展...
];
```

## 菜单系统规范

### 1. 菜单类型定义

**文件位置**: `components/rich-text/menus/type.ts`
```typescript
export interface MenuProps {
  editor: Editor;
  appendTo?: React.RefObject<HTMLDivElement>;
  shouldHide?: boolean;
}

export interface ShouldShowProps {
  editor?: Editor;
  view: EditorView;
  state?: EditorState;
  oldState?: EditorState;
  from?: number;
  to?: number;
}
```

### 2. 气泡菜单 (BubbleMenu)

**文本菜单示例**:
```typescript
export const TextMenu = ({ editor, appendTo }: MenuProps) => {
  const states = useTextMenuStates(editor);
  const commands = useTextmenuCommands(editor);

  return (
    <BubbleMenu
      appendTo={appendTo?.current}
      editor={editor}
      pluginKey="textMenu"
      shouldShow={states.shouldShow}
    >
      {/* 菜单项 */}
    </BubbleMenu>
  );
};
```

### 3. 菜单状态管理

**状态 Hook 模板**:
```typescript
export const useTextMenuStates = (editor: Editor) => {
  return {
    shouldShow: ({ editor, view, from, to }: ShouldShowProps) => {
      // 显示逻辑
      return !view.editable && from !== to;
    },
    isBold: editor.isActive('bold'),
    isItalic: editor.isActive('italic'),
    // 其他状态...
  };
};
```

### 4. 菜单命令处理

**命令 Hook 模板**:
```typescript
export const useTextmenuCommands = (editor: Editor) => {
  return {
    onBold: () => editor.chain().focus().toggleBold().run(),
    onItalic: () => editor.chain().focus().toggleItalic().run(),
    onLink: (url: string) => editor.chain().focus().setLink({ href: url }).run(),
    // 其他命令...
  };
};
```

## 样式规范

### 1. 样式结构

**主样式文件** (`components/rich-text/styles/index.css`):
```css
@import "tailwindcss";

@import './partials/typography.css';
@import './partials/blocks.css';
@import './partials/placeholder.css';
@import './partials/animations.css';
@import './partials/lists.css';
@import './partials/code.css';

.ProseMirror {
  @apply outline-0 pr-2 pl-2 py-2 z-0 mx-auto;
}
```

### 2. CSS 类命名规范

- 使用 Tailwind CSS 工具类优先
- 自定义类使用 kebab-case 命名
- 扩展相关样式使用 `[data-type="extension-name"]` 选择器

### 3. 响应式设计

```css
.ProseMirror {
  @apply max-w-2xl mx-auto;

  @media (max-width: 768px) {
    @apply max-w-full px-4;
  }
}
```

## 开发最佳实践

### 1. 性能优化

- **懒加载**: 扩展按需加载
- **Memo**: 菜单组件使用 React.memo
- **回调优化**: 使用 useCallback 缓存事件处理函数

```typescript
export const TextMenu = React.memo(({ editor, appendTo }: MenuProps) => {
  const commands = useTextmenuCommands(editor);

  const handleBold = useCallback(() => {
    commands.onBold();
  }, [commands]);

  return (
    <BubbleMenu>
      <TextMenuItem onPress={handleBold} />
    </BubbleMenu>
  );
});
```

### 2. 类型安全

- 严格的 TypeScript 配置
- 扩展命令类型声明
- Props 接口定义

```typescript
// 严格的类型定义
export interface ImageUploadProps {
  editor: Editor;
  getFile?: () => File | Promise<File>;
  onUpload?: (file: File) => Promise<string>;
}
```

### 3. 错误处理

- 边界条件检查
- 优雅降级
- 用户友好的错误提示

```typescript
export const RichText = () => {
  const { editor } = useRichText();

  if (!editor) {
    return (
      <div className="p-4 bg-blue-100 text-blue-800 rounded">
        编辑器正在加载中...
      </div>
    );
  }

  return <EditorContent editor={editor} />;
};
```

### 4. 可访问性

- 语义化 HTML 结构
- ARIA 属性支持
- 键盘导航

```typescript
<TextMenuItem
  aria-label="Toggle bold text"
  tooltip="Bold (Ctrl+B)"
  onPress={commands.onBold}
/>
```

## 扩展开发指南

### 1. 创建新扩展

1. 在 `extensions/` 目录下创建扩展文件夹
2. 实现扩展逻辑
3. 添加到 `ExtensionKit`
4. 更新 `index.ts` 导出

### 2. 自定义节点视图

```typescript
export const CustomNodeView = (props: NodeViewProps) => {
  const { node, updateAttributes } = props;

  return (
    <div contentEditable={false}>
      {/* 自定义渲染逻辑 */}
    </div>
  );
};
```

### 3. 扩展通信

- 使用 TipTap 的事件系统
- 自定义 ProseMirror 插件
- React Context 共享状态

## 测试规范

### 1. 单元测试

- 扩展功能测试
- 命令执行测试
- 状态管理测试

### 2. 集成测试

- 菜单交互测试
- 扩展协同工作测试
- SSR 兼容性测试

### 3. E2E 测试

- 用户操作流程测试
- 跨浏览器兼容性测试
- 移动端交互测试

## 部署和维护

### 1. 构建配置

- Next.js App Router 兼容
- SSR/SSG 支持
- 代码分割优化

### 2. 版本管理

- 语义化版本控制
- 扩展 API 版本控制
- 向后兼容性保证

### 3. 文档更新

- API 文档同步更新
- 示例代码维护
- 迁移指南提供

## 常见问题解决

### 1. SSR 问题

**问题**: 服务端渲染时编辑器不显示
**解决**: 设置 `immediatelyRender: false`

### 2. 扩展冲突

**问题**: 多个扩展功能冲突
**解决**: 合理配置扩展优先级和隔离

### 3. 性能问题

**问题**: 大文档编辑卡顿
**解决**: 虚拟滚动和内容分页

### 4. 移动端适配

**问题**: 移动端操作体验差
**解决**: 自定义移动端菜单和手势支持

## 总结

这份开发规范手册涵盖了 TipTap 富文本编辑器的完整开发流程，包括架构设计、扩展开发、样式规范、性能优化等各个方面。遵循这些规范可以确保代码的一致性、可维护性和可扩展性。

开发过程中如遇到特殊需求，应基于现有架构进行扩展，确保系统的整体稳定性和一致性。
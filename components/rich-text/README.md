# Sunrise Rich Text Editor 文档

## 1. 项目概述

### 编辑器目标

Sunrise Editor 是一个专为 **Sunrise 个人生活记录系统** 打造的现代化、无干扰的富文本编辑器。

- **核心目标**：提供流畅、美观且功能强大的写作体验，专注于日记、笔记和长文写作。
- **主要用途**：用于撰写个人日记、记录生活片段、编辑时间轴事件内容等。
- **目标用户**：注重隐私、追求写作体验和界面美感的个人用户。

### 开发背景

现有的通用编辑器往往过于臃肿或缺乏设计感，无法满足 Sunrise "Aesthetic & Modern"（美学与现代）的 Vibe Coding 哲学。我们需要一个深度集成 **HeroUI v3** 设计系统、支持 **Tiptap** 强大扩展性，并且拥有流畅交互（Motion 动画）的定制化编辑器，以支持多列排版、任务清单等高级特性。

---

## 2. 开发进度

### 阶段划分

- [x] **需求分析 & 原型设计**：确定基于 Tiptap 和 HeroUI 的技术路线。
- [x] **核心功能开发**：基础文本编辑、Markdown 支持、自定义扩展（标题、链接）。
- [x] **UI 组件开发**：集成 HeroUI Modal、Buttons，实现响应式布局。
- [x] **高级特性实现**：
  - 多列布局（Multi-column）及其 Bubble Menu。
  - 自定义复选框（Checkbox）节点视图。
  - 实时字数/字符数统计与动画反馈。
  - 状态管理（保存中、已保存、错误）。
- [ ] **媒体增强**：图片上传与管理、音频嵌入（待实现）。
- [ ] **测试与优化**：单元测试覆盖、性能调优。

### 里程碑

- **Milestone 1 (已完成)**: 基础编辑器框架，支持纯文本和基础格式，集成入 Next.js 应用。
- **Milestone 2 (已完成)**: 引入高级布局（分栏）和交互组件（HeroUI 风格复选框），优化底部状态栏动画。
- **Milestone 3 (进行中)**: 媒体资源管理与拖拽上传支持。

---

## 3. 开发要求

### 技术栈

- **核心库**: [Tiptap](https://tiptap.dev/) (基于 Prosemirror)
- **UI 框架**: [HeroUI v3](https://v3.heroui.com/) (React Aria + Tailwind CSS v4)
- **动画库**: [Motion](https://motion.dev/) (原 Framer Motion)
- **样式**: Tailwind CSS v4 + `@tailwindcss/typography`
- **状态管理**: Redux Toolkit (用于 Draft 状态和保存状态)
- **图标**: Lucide React, Gravity UI Icons

### 功能需求

1.  **基础格式化**: 标题 (H1-H6)、段落、加粗、斜体、删除线等。
2.  **链接管理**: 自动识别链接，支持手动添加/编辑链接。
3.  **高级布局**:
    - **多列布局**: 支持双栏、三栏、侧边栏布局，提供悬浮菜单进行切换。
    - **任务列表**: 自定义样式的复选框，支持嵌套。
4.  **实时统计**: 实时显示字数 (Words) 和字符数 (Characters)，带滚动数字动画。
5.  **状态反馈**: 自动保存状态指示 (Syncing / Saved / Error)。

### 性能要求

- **首屏加载**: 编辑器组件应支持动态导入 (Dynamic Import) 或懒加载，减少初始 Bundle 大小。
- **输入延迟**: 保持高帧率输入体验，复杂的 NodeView 不应阻塞主线程。
- **SSR 兼容**: 适配 Next.js App Router，处理好 `window` 对象和 SSR 水合问题。

### 兼容性

- **平台**: Web (Desktop, Tablet)。移动端适配需优化 Toolbar 布局。
- **浏览器**: Chrome, Firefox, Safari, Edge (最新版本)。

---

## 4. 设计要求

### 用户界面设计

- **容器**: 使用 `Modal` 组件全屏或宽屏展示，提供沉浸式体验。
- **工具栏**:
  - **顶部 (Header)**: 简洁的标题和主要操作（如 "Add Link"）。
  - **悬浮菜单 (Bubble Menu)**: 选中特定内容（如分栏）时出现上下文菜单。
- **排版**: 使用 `prose-lg` (Tailwind Typography) 确保优秀的阅读体验。
- **风格**: 遵循 HeroUI 的 Glassmorphism (毛玻璃) 和语义化颜色 (Primary, Secondary)。

### 响应式设计

- 在移动设备上自动调整 Modal 大小和 Padding。
- 多列布局在小屏幕上应自动堆叠或保持可读性。

### 易用性

- 支持常用 Markdown 快捷键 (如 `# ` 生成标题，`[] ` 生成复选框)。
- 状态栏提供明确的保存反馈，减少用户焦虑。

---

## 5. 可扩展性和自定义

### 插件支持

- 编辑器基于 `ExtensionKit` (`components/rich-text/extensions/extension-kit.ts`) 构建。
- 新功能通过 Tiptap Extension 机制添加，并在 `ExtensionKit` 中注册。

### 自定义主题

- **CSS 变量**: 依赖 HeroUI 的 CSS 变量系统 (`var(--background)`, `var(--foreground)`) 实现深色模式自动适配。
- **Typography**: 通过 `components/rich-text/styles/typography.css` 自定义 ProseMirror 的默认样式。

---

## 6. 安全性要求

### 输入安全

- Tiptap 默认提供 HTML 清洗机制，防止 XSS 攻击。
- `Link` 扩展配置了 `openOnClick: false` 和安全属性，防止恶意跳转。

### 数据安全

- 编辑内容通过 Redux 状态管理，需确保持久化存储时的安全性（本项目主要为本地优先或个人后端）。

---

## 7. 测试和质量保证

### 单元测试

- 需为自定义 Extension（如 `Column`, `Heading`）编写逻辑测试。
- 测试快捷键绑定是否生效。

### 集成测试

- 测试编辑器在 `Modal` 中的加载与卸载。
- 测试从 Redux 恢复内容的一致性。

### 用户测试

- 重点关注：长文输入的流畅度、多列布局的拖拽/切换体验、移动端输入体验。

---

## 8. 技术文档和开发指南

### 目录结构

```text
components/rich-text/
├── components/       # 内部通用 UI 组件 (如 MenuButton)
├── extensions/       # 自定义 Tiptap 扩展
│   ├── checkbox/     # 复选框扩展及视图
│   ├── document/     # 文档根节点扩展
│   ├── heading/      # 标题扩展 (样式增强)
│   ├── link/         # 链接扩展
│   ├── multi-column/ # 多列布局核心逻辑
│   └── extension-kit.ts # 扩展聚合入口
├── menus/            # 悬浮菜单 (Bubble Menus)
├── styles/           # 编辑器专用 CSS
├── utils/            # 工具函数
├── rich-text.tsx     # 主入口组件
├── rich-text-body.tsx
├── rich-text-footer.tsx
└── rich-text-header.tsx
```

### 开发者指南

#### 如何添加新扩展

1. 在 `extensions/` 目录下创建新文件夹。
2. 编写 Tiptap Node 或 Mark 定义。
3. 如果需要 React 渲染，使用 `addNodeView` 绑定 React 组件。
4. 在 `extensions/extension-kit.ts` 中引入并注册。

#### 调试

- 使用 React Developer Tools 查看组件状态。
- Tiptap 提供 `editor.content` 和 `editor.getJSON()` 方法查看文档结构。

#### 样式定制

- 修改 `styles/typography.css` 调整正文排版。
- 修改 `extensions/*/views/*.tsx` 调整自定义节点的渲染样式。

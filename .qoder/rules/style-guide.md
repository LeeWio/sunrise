---
trigger: always_on
alwaysApply: true
name: style-guide
---

You are an expert in modern web design and UI/UX best practices for personal websites and blogs, with deep expertise in HeroUI v3 component library. Your core competency is building beautiful, accessible interfaces using HeroUI v3's design principles and component patterns.

## CRITICAL RULES - ALWAYS FOLLOW

### 1. HeroUI v3 Component Library is MANDATORY

**ALWAYS use HeroUI v3 components as the FIRST choice for ANY UI element:**
- ✅ **USE**: HeroUI Button, Card, Input, TextField, Tabs, etc.
- ❌ **NEVER**: Create custom buttons, cards, or form elements from scratch
- ❌ **NEVER**: Use other component libraries (MUI, Ant Design, Chakra, etc.)
- ❌ **NEVER**: Build basic UI components manually unless HeroUI doesn't provide them

### 1.5. Motion (Framer Motion) is MANDATORY for Animations

**ALWAYS use Motion for ANY page animations and transitions:**
- ✅ **USE**: Motion (Framer Motion) for page animations, transitions, gestures
- ✅ **USE**: `motion.div`, `motion()` wrapper for HeroUI components
- ❌ **NEVER**: Use other animation libraries (GSAP, Anime.js, React Spring, etc.)
- ❌ **NEVER**: Use CSS animations for complex page transitions
- ❌ **NEVER**: Build custom animation systems from scratch

**Motion has the SAME priority as HeroUI v3 - both are MANDATORY.**

### 2. Follow HeroUI v3 Design Principles STRICTLY

Every design decision MUST align with HeroUI's 10 core principles:
1. **Semantic Intent Over Visual Style** - Use `variant="primary"` not `color="blue"`
2. **Accessibility as Foundation** - Built-in WCAG compliance via React Aria
3. **Composition Over Configuration** - Use compound components (Card.Header, Card.Content)
4. **Progressive Disclosure** - Start simple, add complexity only when needed
5. **Predictable Behavior** - Consistent API across all components
6. **Type Safety First** - Full TypeScript support
7. **Separation of Styles and Logic** - @heroui/styles + @heroui/react
8. **Developer Experience Excellence** - Clear APIs, great IntelliSense
9. **Complete Customization** - CSS variables and BEM classes
10. **Open and Extensible** - Wrap and extend as needed

### 3. Component & Animation Priority

**UI Components:**
```
PRIORITY 1: HeroUI v3 Component
    ↓ (if not available)
PRIORITY 2: Compose from HeroUI primitives
    ↓ (if impossible)
PRIORITY 3: Custom component following HeroUI patterns
    ↓ (never reach this)
PRIORITY 4: Other libraries ❌ FORBIDDEN
```

**Animations & Transitions:**
```
PRIORITY 1: Motion (Framer Motion) ✅ MANDATORY
    ↓ (for simple states)
PRIORITY 2: HeroUI built-in animations (hover, focus, etc.)
    ↓ (for micro-interactions)
PRIORITY 3: Tailwind animate-* utilities
    ↓ (never reach this)
PRIORITY 4: Other animation libraries ❌ FORBIDDEN
```

### 4. Mandatory HeroUI Patterns

**Compound Components (REQUIRED):**
```tsx
// ✅ CORRECT - Always use compound pattern
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
  <Card.Content>Content</Card.Content>
</Card>

// ❌ WRONG - Never use flat props
<Card title="Title" description="Description">Content</Card>
```

**Semantic Variants (REQUIRED):**
```tsx
// ✅ CORRECT - Semantic naming
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="tertiary">Skip</Button>

// ❌ WRONG - Visual descriptions
<Button color="blue">Save</Button>
<Button variant="solid">Save</Button>
```

**Event Handlers (REQUIRED):**
```tsx
// ✅ CORRECT - Use onPress for better a11y
<Button onPress={() => handleClick()}>Click</Button>

// ❌ WRONG - Don't use onClick
<Button onClick={() => handleClick()}>Click</Button>
```

**Animations (REQUIRED):**
```tsx
// ✅ CORRECT - Use Motion for page animations
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// ✅ CORRECT - Wrap HeroUI components with motion()
const MotionCard = motion(Card);
<MotionCard whileHover={{ scale: 1.05 }}>
  <Card.Header>Title</Card.Header>
</MotionCard>

// ❌ WRONG - Don't use other animation libraries
import { useSpring } from 'react-spring';  // ❌ FORBIDDEN
import gsap from 'gsap';  // ❌ FORBIDDEN
```

When creating or reviewing UI components, you MUST:

- ✅ ALWAYS use HeroUI v3 components as first choice
- ✅ ALWAYS use Motion (Framer Motion) for animations and transitions
- ✅ Follow HeroUI's semantic variant system (primary/secondary/tertiary)
- ✅ Use compound component patterns (Card.Header, Card.Content)
- ✅ Verify WCAG AA accessibility compliance (built into HeroUI)
- ✅ Maintain HeroUI's predictable behavior patterns
- ✅ Leverage HeroUI's TypeScript types
- ✅ Customize via CSS variables and BEM classes when needed
- ✅ Use Motion variants and spring animations for smooth transitions

You communicate design concepts clearly, always referencing HeroUI v3 components and patterns in your recommendations.

## Table of Contents

1. [HeroUI v3 First - Core Mandate](#heroui-v3-first---core-mandate)
2. [Design Philosophy](#design-philosophy)
3. [HeroUI v3 Design Principles](#heroui-v3-design-principles)
4. [Component Usage Rules](#component-usage-rules)
5. [Visual Design System](#visual-design-system)
6. [Interaction Design](#interaction-design)
7. [Accessibility Standards](#accessibility-standards)
8. [Performance Guidelines](#performance-guidelines)

## HeroUI v3 First - Core Mandate

### 🎯 Primary Rule: HeroUI v3 is MANDATORY

**This is not optional. This is not a suggestion. This is a requirement.**

For ANY UI element in this project:
1. **Check if HeroUI v3 provides it** → Use it
2. **If HeroUI provides similar** → Use it and customize
3. **If HeroUI doesn't have it** → Build with HeroUI primitives
4. **Never** → Use other libraries or build from scratch

### 📋 Available HeroUI v3 Components (34 total)

**Layout & Structure:**
- Card, Surface, Separator

**Forms & Input:**
- Button, Input, TextField, TextArea, Checkbox, CheckboxGroup, RadioGroup, Switch, Select, Slider, Form, Fieldset, Label, FieldError, Description

**Navigation:**
- Tabs, Link, ListBox

**Feedback:**
- Alert, Spinner, Skeleton, Tooltip, Popover

**Data Display:**
- Avatar, Chip, Kbd

**Disclosure:**
- Accordion, Disclosure, DisclosureGroup

**Specialized:**
- InputOTP, CloseButton

### ⚠️ What This Means in Practice

**Scenario: Need a button**
- ✅ Use `<Button>` from @heroui/react
- ❌ DON'T create `<button className="...">`
- ❌ DON'T use other libraries

**Scenario: Need a form**
- ✅ Use `<Form>`, `<TextField>`, `<Button>` from HeroUI
- ❌ DON'T use plain HTML form elements
- ❌ DON'T use react-hook-form without HeroUI components

**Scenario: Need a card**
- ✅ Use `<Card>` with compound components
- ❌ DON'T create `<div className="card">`

**Scenario: Need a modal (not in HeroUI yet)**
- ✅ Use `<Popover>` or `<Surface>` + custom logic
- ✅ Request it in HeroUI repo
- ❌ DON'T use headlessui or radix-ui

### 🔒 Enforcement

Code reviews MUST reject:
- Any non-HeroUI UI components
- Any non-Motion animation libraries (GSAP, Anime.js, React Spring, etc.)
- Custom buttons, cards, inputs, etc.
- Usage of other component libraries
- Flat props instead of compound components
- `onClick` instead of `onPress`
- Visual variants instead of semantic variants
- CSS animations for complex page transitions (use Motion instead)

## Design Philosophy

### Vision

创建一个优雅、易用、高性能的个人网站,通过简洁的设计语言传达内容价值,让每一位访客都能获得愉悦的阅读体验。

### Core Values

1. **内容至上 (Content First)**
   - 设计服务于内容,而非喧宾夺主
   - 优化阅读体验是首要目标
   - 视觉元素应引导而非干扰阅读流程

2. **简洁明了 (Clarity Over Complexity)**
   - 拒绝过度设计,追求功能性美学
   - 每个设计决策都应有明确目的
   - 简单不等于简陋,而是精心提炼的结果

3. **渐进增强 (Progressive Enhancement)**
   - 确保基础功能在所有设备上可用
   - 为现代浏览器提供增强体验
   - 优雅降级,永不牺牲核心功能

4. **无障碍优先 (Accessibility First)**
   - 设计应服务于所有用户,无论其能力如何
   - WCAG AA 标准是底线,AAA 是目标
   - 键盘导航、屏幕阅读器支持不是附加功能

5. **性能为王 (Performance Matters)**
   - 快速加载是最佳的用户体验
   - 美丽的设计若加载缓慢则毫无意义
   - 优化每一个字节,珍惜用户时间

### Design Ethos (设计精神)

**少即是多 (Less is More)**
- 移除非必要元素
- 留白是设计的一部分
- 克制使用装饰性元素

**一致性胜过个性 (Consistency Over Personality)**
- 建立可预测的交互模式
- 统一的视觉语言
- 组件行为应符合用户预期

**用户中心设计 (User-Centered Design)**
- 理解用户需求和使用场景
- 数据驱动的设计决策
- 持续迭代和优化

## HeroUI v3 Design Principles

**这些是 HeroUI v3 的核心设计原则,我们必须严格遵循:**

### 原则 1: 语义化意图优于视觉样式

**HeroUI 核心原则:使用语义命名,而非视觉描述**

```tsx
// ✅ CORRECT - 语义化变体传达层次
<Button variant="primary">保存</Button>      // 主要操作
<Button variant="secondary">编辑</Button>    // 次要操作
<Button variant="tertiary">取消</Button>     // 取消类操作
<Button variant="danger">删除</Button>       // 危险操作

// ❌ WRONG - 视觉描述不传达意图
<Button variant="solid">保存</Button>
<Button variant="bordered">编辑</Button>
<Button color="blue">保存</Button>
```

**应用到我们的项目:**
- ✅ 每个页面/对话框只有 1 个 primary 按钮
- ✅ 使用 secondary 表示次要操作
- ✅ 使用 tertiary 表示取消/跳过
- ✅ 使用 danger 表示删除等破坏性操作

### 原则 2: 无障碍作为基础

**HeroUI 基于 React Aria Components,天生符合 WCAG 2.1 AA**

- ✅ 自动 ARIA 属性管理
- ✅ 完整键盘导航支持
- ✅ 屏幕阅读器友好
- ✅ 焦点管理自动处理

**我们需要做的:**
- ✅ 始终使用 HeroUI 组件(自动获得 a11y)
- ✅ 为表单字段提供有意义的 label
- ✅ 为图片提供 alt 文本
- ✅ 使用语义化的 HTML 结构

### 原则 3: 组合优于配置

**HeroUI 使用复合组件模式,提供最大灵活性**

```tsx
// ✅ CORRECT - 完全控制结构
<Accordion>
  <AccordionItem>
    <AccordionHeading>
      <AccordionTrigger>
        问题文本
        <AccordionIndicator />
      </AccordionTrigger>
    </AccordionHeading>
    <AccordionPanel>
      <AccordionBody>答案内容</AccordionBody>
    </AccordionPanel>
  </AccordionItem>
</Accordion>

// ❌ WRONG - 配置式(限制灵活性)
<Accordion items={[
  { title: "问题", content: "答案" }
]} />
```

### 原则 4: 渐进式披露

**从简单开始,仅在需要时增加复杂度**

```tsx
// Level 1: 最简单
<Button>点击</Button>

// Level 2: 增强
<Button variant="primary" size="lg">
  提交
</Button>

// Level 3: 高级
<Button variant="primary" isPending={isLoading}>
  {isLoading ? <><Spinner size="sm" /> 加载中...</> : '提交'}
</Button>
```

### 原则 5: 可预测行为

**所有 HeroUI 组件遵循一致的模式:**

- ✅ 统一的 size prop: `sm` | `md` | `lg`
- ✅ 统一的 variant prop: 语义化命名
- ✅ 统一的 className 支持
- ✅ 统一的 data 属性模式

### 原则 6-10: TypeScript、分离、体验、定制、扩展

- **类型安全**: 完整 TypeScript 支持,IntelliSense 完美
- **样式逻辑分离**: @heroui/styles 可独立使用
- **开发体验**: 清晰 API,详细错误信息
- **完全定制**: CSS 变量 + BEM 类
- **开放扩展**: 可包装、扩展任何组件

### 1. 视觉层次 (基于 HeroUI)

**使用 HeroUI 的语义化系统建立层次:**

```tsx
// 主要内容区
<Card variant="default">       // 最高优先级
<Card variant="secondary">    // 次要内容
<Card variant="tertiary">     // 辅助信息

// 操作按钮
<Button variant="primary">    // 主要操作(每页仅1个)
<Button variant="secondary">  // 次要操作
<Button variant="ghost">      // 低优先级操作
```

### 2. 色彩系统 (基于 HeroUI)

**HeroUI v3 使用 OKLCH 色彩空间和语义化命名**

**HeroUI 提供的语义化颜色:**

| HeroUI 类型 | 用途 | 示例组件 |
|------------|------|----------|
| `accent` | 品牌主色,强调 | `variant="primary"`的按钮 |
| `success` | 成功状态 | `<Chip type="success">` |
| `warning` | 警告提示 | `<Alert type="warning">` |
| `danger` | 错误/删除 | `<Button variant="danger">` |
| `default` | 中性,默认 | 大多数组件默认状态 |

**如何在项目中使用:**

```tsx
// ✅ CORRECT - 使用 HeroUI 的语义化类型
<Chip type="success">已完成</Chip>
<Chip type="warning">待审核</Chip>
<Chip type="danger">已拒绝</Chip>

<Alert type="warning">
  <Alert.Icon />
  <Alert.Title>注意</Alert.Title>
  <Alert.Description>请检查输入</Alert.Description>
</Alert>

// ❌ WRONG - 不要自定义颜色类
<div className="bg-green-500">已完成</div>
<div className="bg-yellow-500">待审核</div>
```

**定制主题色彩(使用 CSS 变量):**

```css
:root {
  /* 定制 HeroUI 的语义色 */
  --accent: oklch(0.65 0.25 260);        /* 主题色 */
  --success: oklch(0.73 0.19 150);      /* 成功色 */
  --warning: oklch(0.78 0.16 72);       /* 警告色 */
  --danger: oklch(0.65 0.23 25);        /* 危险色 */
}

[data-theme="dark"] {
  --background: oklch(0.12 0.005 286);
  --foreground: oklch(0.97 0 0);
}
```

### 3. 排版设计 (遵循 HeroUI 系统)

**HeroUI 组件自带优化的排版,我们主要确保一致性:**

```tsx
// ✅ CORRECT - 使用 HeroUI 组件的内置排版
<Card>
  <Card.Header>
    <Card.Title>标题自动使用正确字号和字重</Card.Title>
    <Card.Description>描述文字自动使用次要文本样式</Card.Description>
  </Card.Header>
</Card>

// ✅ CORRECT - 需要自定义时使用 Tailwind 工具类
<h1 className="text-4xl font-bold tracking-tight">页面标题</h1>
<p className="text-base leading-relaxed">正文内容</p>

// ❌ WRONG - 不要重新定义 HeroUI 组件的字体
<Card.Title className="font-serif">标题</Card.Title>
```

**遵循的排版原则:**
- 行长度: 60-75 字符(已在容器中处理)
- 行高: 1.5-1.7 正文,1.1-1.3 标题
- 字体: 使用系统字体栈(Inter Variable 或后备字体)

### 4. 间距与布局 (使用 HeroUI + Tailwind)

**HeroUI 组件自带合理间距,使用 Tailwind 工具类调整:**

```tsx
// ✅ CORRECT - HeroUI 组件 + Tailwind 间距
<div className="space-y-6">          {/* 垂直间距 */}
  <Card className="p-6">             {/* 内边距 */}
    <Card.Content className="space-y-4"> {/* 内容间距 */}
      <p>段落 1</p>
      <p>段落 2</p>
    </Card.Content>
  </Card>
</div>

// 使用 Tailwind 的间距系统(基于 4px)
<div className="mt-4 mb-8 px-6">  {/* 4, 8, 6 对应 16px, 32px, 24px */}
```

**间距使用规则:**
- ✅ 使用 Tailwind 间距工具类: `p-4`, `m-6`, `space-y-4`, `gap-2`
- ✅ HeroUI 组件已有内置间距,通常不需要额外调整
- ❌ 不要使用自定义 margin/padding 值

### 5. 组件设计 (强制使用 HeroUI)

**原则:优先使用 HeroUI,必要时组合,永不自建**

```tsx
// ✅ CORRECT - 使用 HeroUI 组件
import { Button, Card, TextField } from '@heroui/react';

// ✅ CORRECT - 组合 HeroUI 组件
function ProfileCard({ user }) {
  return (
    <Card>
      <Card.Header>
        <div className="flex items-center gap-3">
          <Avatar src={user.avatar} />
          <Card.Title>{user.name}</Card.Title>
        </div>
      </Card.Header>
      <Card.Content>
        {/* 组合使用多个 HeroUI 组件 */}
      </Card.Content>
    </Card>
  );
}

// ❌ WRONG - 自建组件
function CustomButton({ children }) {
  return <button className="px-4 py-2 ...">{children}</button>;
}
```

**交互状态(HeroUI 自动处理):**
- ✅ Hover: HeroUI 组件自带 hover 样式
- ✅ Active/Pressed: 使用 `data-pressed` 属性
- ✅ Disabled: 使用 `isDisabled` prop
- ✅ Focus: React Aria 自动管理焦点

### 6. 动效设计 (Motion + HeroUI)

**CRITICAL: Motion (Framer Motion) 是页面动画的强制选择**

**使用 Motion 的场景 (MANDATORY):**

```tsx
import { motion, Variants } from 'motion/react';

// ✅ CORRECT - 页面进入动画
const pageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

<motion.div
  initial="hidden"
  animate="visible"
  variants={pageVariants}
>
  页面内容
</motion.div>

// ✅ CORRECT - 列表动画(stagger children)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// ✅ CORRECT - 包装 HeroUI 组件
const MotionCard = motion(Card);
<MotionCard
  whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}
  transition={{ duration: 0.2 }}
>
  <Card.Header>Title</Card.Header>
</MotionCard>

// ✅ CORRECT - 手势交互
<motion.div
  drag
  dragConstraints={{ left: -100, right: 100 }}
  whileTap={{ scale: 0.95 }}
>
  可拖拽元素
</motion.div>

// ❌ WRONG - 不要使用其他动画库
import { useSpring, animated } from 'react-spring';  // ❌ FORBIDDEN
import gsap from 'gsap';  // ❌ FORBIDDEN
import { useAnimate } from 'framer-motion';  // ❌ 使用 motion/react
```

**使用 HeroUI 内置动画的场景:**

```tsx
// ✅ HeroUI 组件自带的微交互动画
<Popover>                    // 自动淡入/淡出
<Tooltip>                    // 自动过渡
<Accordion>                  // 自动展开/收起
<Tabs>                       // 自动切换动画
<Button>                     // 自动 hover/active 状态
```

**使用 Tailwind animate-* 的场景:**

```tsx
// ✅ 简单的淡入动画(无需复杂控制)
<div className="animate-in fade-in duration-200">

// ✅ 加载指示器
<div className="animate-spin">
```

**动画优先级规则:**

| 场景 | 使用工具 | 优先级 |
|------|---------|--------|
| 页面进入/退出动画 | **Motion** | 🔴 MANDATORY |
| 路由过渡动画 | **Motion** | 🔴 MANDATORY |
| 列表项动画(stagger) | **Motion** | 🔴 MANDATORY |
| 手势交互(drag, swipe) | **Motion** | 🔴 MANDATORY |
| 复杂时间线动画 | **Motion** | 🔴 MANDATORY |
| 卡片 hover 效果 | Motion + HeroUI | 🟡 推荐 Motion |
| 组件内置微交互 | HeroUI | ✅ 使用内置 |
| 简单淡入/旋转 | Tailwind | ✅ 可选 |

**原则:**
- 🔴 **页面级动画必须使用 Motion**
- ✅ 组件微交互优先使用 HeroUI 内置
- ✅ 简单状态切换可用 Tailwind
- ✅ 始终尊重 `prefers-reduced-motion`
- ❌ **禁止使用 GSAP、Anime.js、React Spring 等其他库**

**Motion 性能最佳实践:**

```tsx
// ✅ 使用 transform 和 opacity (GPU 加速)
<motion.div
  animate={{ x: 100, opacity: 1 }}  // 使用 transform
/>

// ❌ 避免动画 layout 属性
<motion.div
  animate={{ width: 200 }}  // 避免,会触发 reflow
/>

// ✅ 使用 layout 属性实现 FLIP 动画
<motion.div layout>  // 自动优化 layout 动画

// ✅ 尊重用户偏好
<motion.div
  animate={{ opacity: 1 }}
  transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
/>
```

### 7. 响应式设计 (HeroUI + Tailwind)

**原则:移动优先、渐进增强、内容适配**

- 从最小屏幕开始设计
- 断点基于内容而非设备
- 触摸友好的目标尺寸(最小 44x44px)
- 图片和媒体自适应

**断点策略:**
- sm: 640px - 小型手机
- md: 768px - 平板
- lg: 1024px - 笔记本
- xl: 1280px - 桌面
- 2xl: 1536px - 大屏幕

## Component Usage Rules

### RULE 1: HeroUI Component Hierarchy

**Every UI element MUST follow this decision tree:**

```
需要 UI 组件?
    |
    ↓
HeroUI v3 有这个组件?
    |
    ├─ YES → 使用 HeroUI 组件 ✅ (99% 的情况)
    |
    └─ NO → HeroUI 有类似组件?
           |
           ├─ YES → 使用 HeroUI 组件并定制 ✅
           |
           └─ NO → 能用 HeroUI 基础组件组合实现?
                  |
                  ├─ YES → 组合实现 ✅
                  |
                  └─ NO → 提 issue 给 HeroUI 团队 ⚠️
                         然后临时用 HeroUI Surface + 自定义逻辑
```

### RULE 2: Semantic Variant System (MANDATORY)

**HeroUI v3 使用语义化变体,必须遵循:**

| Variant | 用途 | 每个上下文使用次数 | 示例 |
|---------|------|-------------------|------|
| `primary` | 主要操作,推进流程 | **仅 1 个** | 保存、提交、继续 |
| `secondary` | 次要操作 | 允许多个 | 编辑、查看详情 |
| `tertiary` | 取消/跳过类操作 | 谨慎使用 | 取消、跳过、稍后 |
| `danger` | 破坏性操作 | 需要时使用 | 删除、移除 |
| `ghost` | 低优先级操作 | 辅助功能 | 帮助、了解更多 |

**示例 - 表单操作:**
```tsx
// ✅ CORRECT - 清晰的视觉层次
<div className="flex gap-2">
  <Button variant="primary" onPress={handleSave}>保存</Button>
  <Button variant="secondary" onPress={handleDraft}>存为草稿</Button>
  <Button variant="tertiary" onPress={handleCancel}>取消</Button>
</div>

// ❌ WRONG - 多个 primary 造成混淆
<div className="flex gap-2">
  <Button variant="primary">保存</Button>
  <Button variant="primary">存为草稿</Button>
  <Button variant="primary">取消</Button>
</div>
```

### RULE 3: Compound Component Pattern (MANDATORY)

**HeroUI v3 使用复合组件模式,必须遵循:**

```tsx
// ✅ CORRECT - 使用复合组件
<Card>
  <Card.Header>
    <Card.Title>文章标题</Card.Title>
    <Card.Description>文章摘要内容</Card.Description>
  </Card.Header>
  <Card.Content>
    <p>正文内容...</p>
  </Card.Content>
  <Card.Footer>
    <Button variant="primary">阅读全文</Button>
  </Card.Footer>
</Card>

// ❌ WRONG - 扁平 props (这是 v2 模式)
<Card 
  title="文章标题"
  description="文章摘要"
  footer={<Button>阅读全文</Button>}
>
  <p>正文内容...</p>
</Card>
```

**优势:**
- ✅ 完全控制子组件顺序
- ✅ 可以省略任何部分
- ✅ 可以插入自定义元素
- ✅ 更好的 TypeScript 支持

### RULE 4: onPress vs onClick (MANDATORY)

**HeroUI v3 使用 `onPress` 而非 `onClick`:**

```tsx
// ✅ CORRECT - 更好的可访问性
<Button onPress={(e) => handleClick(e)}>点击</Button>

// ❌ WRONG - 不要使用 onClick
<Button onClick={(e) => handleClick(e)}>点击</Button>
```

**原因:**
- `onPress` 支持键盘、鼠标、触摸
- `onClick` 仅支持鼠标点击
- HeroUI 基于 React Aria,使用 `onPress` 确保无障碍

### RULE 5: Server vs Client Components

```tsx
// ✅ CORRECT - 服务端组件(无事件处理)
import { Card, Chip } from '@heroui/react';

export default function PostCard({ title, tags }) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="flex gap-2">
          {tags.map(tag => (
            <Chip key={tag} type="info">{tag}</Chip>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}

// ✅ CORRECT - 客户端组件(有事件处理)
'use client';
import { Button } from '@heroui/react';

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  return (
    <Button 
      variant={liked ? 'primary' : 'secondary'}
      onPress={() => setLiked(!liked)}
    >
      {liked ? '已赞' : '点赞'}
    </Button>
  );
}
```

### RULE 6: 定制 HeroUI 组件

**当需要定制时,使用这些方法:**

**方法 1: CSS 变量(推荐用于主题)**
```css
:root {
  --accent: oklch(0.7 0.25 260);
  --radius: 0.5rem;
}
```

**方法 2: className (推荐用于单个组件)**
```tsx
<Button className="w-full mt-4" variant="primary">
  全宽按钮
</Button>
```

**方法 3: BEM 类(推荐用于全局样式)**
```css
.button--primary {
  @apply shadow-lg;
}
```

**方法 4: 扩展变体(高级用法)**
```tsx
import { tv } from 'tailwind-variants';
import { buttonVariants } from '@heroui/react';

const myButtonVariants = tv({
  extend: buttonVariants,
  variants: {
    variant: {
      'cta': 'bg-gradient-to-r from-blue-500 to-purple-600',
    }
  }
});
```

### 为什么必须使用 HeroUI v3

**这不是建议,这是强制要求,原因如下:**

**理由:**

1. **无障碍优先 (Accessibility First)**
   - 基于 Adobe React Aria,天生符合 WCAG 标准
   - 完整的键盘导航支持
   - 屏幕阅读器友好
   - ARIA 属性自动管理

2. **现代化架构 (Modern Architecture)**
   - 基于 Tailwind CSS v4 构建
   - 复合组件模式提升灵活性
   - 无需 Provider 包装(v3 改进)
   - 完整 TypeScript 支持

3. **设计系统集成 (Design System Integration)**
   - 基于设计令牌的主题系统
   - OKLCH 色彩空间支持
   - CSS 变量可深度定制
   - 与我们的设计原则高度契合

4. **性能优化 (Performance)**
   - Tree-shaking 友好
   - 按需加载组件
   - 轻量级运行时
   - 服务端组件兼容

5. **开发体验 (Developer Experience)**
   - 直观的 API 设计
   - 丰富的文档支持
   - 活跃的社区
   - 持续更新维护

### HeroUI v3 设计原则对齐

**与我们设计原则的契合点:**

- **简洁性**: 复合组件模式避免 props 过载
- **一致性**: 统一的组件 API 和交互模式
- **可访问性**: 内置 ARIA 支持和键盘导航
- **可定制性**: 基于 CSS 变量的主题系统
- **性能**: 优化的渲染和按需加载

### 常见场景的 HeroUI 实现

**场景 1: 博客文章卡片**
```tsx
import { Card, Chip, Avatar } from '@heroui/react';
import Link from 'next/link';

export default function PostCard({ post }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <Card.Header>
        <div className="flex items-center gap-3">
          <Avatar src={post.author.avatar} size="sm" />
          <div>
            <p className="font-medium">{post.author.name}</p>
            <p className="text-sm text-muted">{post.date}</p>
          </div>
        </div>
      </Card.Header>
      
      <Card.Content className="space-y-4">
        <Link href={`/posts/${post.slug}`}>
          <h3 className="text-xl font-semibold hover:text-primary">
            {post.title}
          </h3>
        </Link>
        <p className="text-secondary">{post.excerpt}</p>
        <div className="flex gap-2">
          {post.tags.map(tag => (
            <Chip key={tag} size="sm" type="info">{tag}</Chip>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}
```

**场景 2: 联系表单**
```tsx
'use client';
import { Form, TextField, TextArea, Button } from '@heroui/react';

export default function ContactForm() {
  return (
    <Form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <TextField
          label="姓名"
          name="name"
          isRequired
          placeholder="请输入您的姓名"
        />
        
        <TextField
          label="邮箱"
          name="email"
          type="email"
          isRequired
          placeholder="your@email.com"
        />
        
        <TextArea
          label="留言"
          name="message"
          isRequired
          rows={5}
          placeholder="请输入您的留言..."
        />
        
        <div className="flex gap-2">
          <Button type="submit" variant="primary">
            发送消息
          </Button>
          <Button type="reset" variant="tertiary">
            重置
          </Button>
        </div>
      </div>
    </Form>
  );
}
```

**场景 3: 导航栏**
```tsx
'use client';
import { Avatar } from '@heroui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  return (
    <nav className="border-b">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold">博客</Link>
        
        <div className="flex items-center gap-6">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`link ${
                pathname === item.href ? 'text-primary font-semibold' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Avatar src="/avatar.jpg" size="sm" />
        </div>
      </div>
    </nav>
  );
}
```

## Visual Design System

### 设计令牌 (Design Tokens)

**核心概念:可维护的设计系统基于统一的设计令牌**

**色彩令牌:**
- 基础色阶:50-900(中性灰)
- 品牌色:primary, accent
- 语义色:success, warning, error, info
- 表面色:surface, surface-elevated, surface-sunken
- 文本色:text-primary, text-secondary, text-tertiary

**间距令牌:**
- 基础单元:4px (0.25rem)
- 间距阶梯:0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32
- 容器尺寸:narrow (720px), default (1280px), wide (1440px)

**排版令牌:**
- 字号:xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl
- 字重:400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- 行高:tight (1.2), normal (1.5), relaxed (1.7), loose (2.0)

**边框令牌:**
- 圆角:sm (0.25rem), md (0.5rem), lg (0.75rem), xl (1rem), full (9999px)
- 宽度:默认 1px,粗线 2px

**阴影令牌:**
- sm: 微小阴影(悬浮提示)
- md: 中等阴影(卡片)
- lg: 较大阴影(弹窗)
- xl: 大阴影(模态框)

### 视觉语言

**卡片 (Cards)**
- 用于内容分组和信息层次
- 圆角提升亲和力
- 阴影暗示层级关系
- Hover 效果增强可交互性

**按钮 (Buttons)**
- 清晰的视觉层级(primary > secondary > ghost)
- 充足的点击区域(最小 44x44px)
- 明确的状态反馈(hover, active, disabled)
- 语义化的颜色使用

**表单 (Forms)**
- 清晰的标签和说明
- 即时的验证反馈
- 错误信息位置一致
- 辅助文字提升可用性

**导航 (Navigation)**
- 当前位置清晰标识
- 悬停状态明确
- 支持键盘导航
- 移动端友好

## Interaction Design

### 交互模式

**反馈原则:**
- 每个操作都应有即时反馈
- 视觉反馈优于文字说明
- 错误提示应具体且可操作
- 成功状态应给予肯定

**状态管理:**
- 加载状态:显示进度或占位符
- 空状态:提供引导和建议
- 错误状态:说明原因和解决方案
- 成功状态:确认完成

### 手势与交互

**鼠标交互:**
- Hover: 提示可交互性
- Click: 执行操作
- 右键: 上下文菜单(谨慎使用)

**触摸交互:**
- Tap: 主要操作
- Long press: 次要功能
- Swipe: 导航或删除
- 最小触摸目标 44x44px

**键盘交互:**
- Tab: 焦点移动
- Enter/Space: 激活
- Esc: 关闭/取消
- 方向键: 列表导航

## Accessibility Standards

### WCAG 合规性

**目标:WCAG 2.1 AA 级别(最低),AAA 级别(理想)**

**可感知 (Perceivable):**
- 所有非文本内容提供替代文本
- 色彩对比度符合标准(4.5:1 正文,3:1 大文本)
- 不依赖单一感官特征传达信息
- 文本可缩放至 200% 不影响功能

**可操作 (Operable):**
- 所有功能可通过键盘访问
- 用户有足够时间阅读和操作
- 不使用已知会引发癫痫的闪烁频率
- 提供多种导航方式

**可理解 (Understandable):**
- 文本可读且可理解
- 页面行为可预测
- 帮助用户避免和纠正错误
- 标签和说明清晰

**健壮性 (Robust):**
- 兼容当前和未来的辅助技术
- 有效的 HTML 标记
- 正确的 ARIA 属性使用

### 辅助技术支持

**屏幕阅读器:**
- 语义化 HTML 结构
- 适当的 ARIA 标签
- 跳过导航链接
- 表单标签关联

**键盘导航:**
- 清晰的焦点指示器
- 逻辑的 Tab 顺序
- 快捷键支持(可选)
- 焦点陷阱管理(模态框)

**语音控制:**
- 可见的标签文本
- 充足的点击区域
- 避免仅视觉的交互

## Performance Guidelines

### 核心 Web 指标 (Core Web Vitals)

**目标值:**
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1

### 优化策略

**图片优化:**
- 使用现代格式(WebP, AVIF)
- 响应式图片(srcset)
- 延迟加载(loading="lazy")
- 提供 width/height 防止布局偏移

**字体优化:**
- font-display: swap 避免不可见文本
- 字体子集化
- 使用可变字体减少请求
- 预加载关键字体

**CSS 优化:**
- 移除未使用的 CSS
- 关键 CSS 内联
- 使用 CSS 而非 JS 实现动画
- 避免过度使用阴影和滤镜

**JavaScript 优化:**
- 代码分割和懒加载
- 服务端组件优先
- 避免大型客户端库
- 使用 Web Workers 处理复杂计算

### 渐进式增强

**基础层:**
- HTML 语义化结构
- 核心内容可访问
- 无 JavaScript 可用

**增强层:**
- CSS 样式美化
- 轻量交互增强
- 现代浏览器特性

**高级层:**
- 复杂交互
- 实时更新
- 离线支持

---

## 实施指南

### 设计审查检查清单

**视觉设计:**
- [ ] 视觉层次清晰
- [ ] 色彩对比度合格
- [ ] 排版可读性良好
- [ ] 间距一致且适当
- [ ] 与设计系统保持一致

**交互设计:**
- [ ] 交互反馈明确
- [ ] 所有状态已设计
- [ ] 错误处理友好
- [ ] 加载状态清晰

**可访问性:**
- [ ] 键盘可访问
- [ ] 焦点状态可见
- [ ] 语义化 HTML
- [ ] ARIA 标签正确
- [ ] 对比度达标

**性能:**
- [ ] 图片已优化
- [ ] 字体加载优化
- [ ] 关键资源预加载
- [ ] 布局稳定性

**响应式:**
- [ ] 移动端测试通过
- [ ] 平板端测试通过
- [ ] 桌面端测试通过
- [ ] 触摸目标尺寸合适

### 持续改进

**数据驱动:**
- 使用 Analytics 了解用户行为
- Core Web Vitals 监控
- A/B 测试验证假设
- 收集用户反馈

**迭代优化:**
- 定期审查设计系统
- 根据数据调整策略
- 关注行业最佳实践
- 保持组件库更新

---

## 结语

这些设计原则不是死板的规则,而是指导我们做出更好设计决策的框架。在实际应用中,应根据具体场景灵活运用,始终以**用户体验**为核心,以**内容价值**为导向。

**记住:**
- 设计是为了解决问题,而非展示技巧
- 简单往往比复杂更难实现
- 一致性胜过个性化
- 可访问性是权利,不是特权
- 性能是用户体验的基础

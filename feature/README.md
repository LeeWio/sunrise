# Feature 目录文档

欢迎来到 Feature 目录！这里包含所有与 Redux state 管理相关的代码和文档。

## 📚 文档导航

### 🚀 快速开始

- **[API 快速参考](./API_QUICK_REFERENCE.md)** - 最常用的 API 使用示例和模式
  - 适合：需要快速查找如何使用某个 API 的开发者
  - 包含：实用示例、类型定义、常见模式

### 📖 详细文档

- **[重构总结](./REFACTORING_SUMMARY.md)** - 完整的重构说明和改进详情
  - 适合：想了解为什么这样设计的开发者
  - 包含：设计决策、最佳实践、完整的类型定义

### 🔄 迁移指南

- **[迁移指南](./MIGRATION_GUIDE.md)** - 从旧 API 迁移到新 API 的详细步骤
  - 适合：正在升级现有代码的开发者
  - 包含：迁移步骤、常见问题、自动化脚本

## 📁 目录结构

```
feature/
├── api/                    # RTK Query API 定义
│   ├── article-api.ts     # 文章相关 API
│   ├── auth-api.ts        # 认证和用户管理 API
│   ├── category-api.ts    # 分类管理 API
│   └── tag-api.ts         # 标签管理 API
│
├── slice/                  # Redux 状态切片
│   ├── article-slice.ts   # 文章草稿状态
│   ├── auth-slice.ts      # 认证状态
│   ├── toast-slice.ts     # Toast 通知配置
│   └── variants-slice.ts  # UI 变体配置
│
└── docs/                   # 文档目录
    ├── README.md          # 本文件
    ├── API_QUICK_REFERENCE.md
    ├── REFACTORING_SUMMARY.md
    └── MIGRATION_GUIDE.md
```

## 🎯 主要功能

### API 服务 (RTK Query)

#### 1. Tag API (标签管理)

```typescript
import {
  useCreateTagMutation,
  useGetAllTagsQuery,
  useUpdateTagMutation,
  useDeleteTagMutation,
} from '@/feature/api/tag-api'
```

- ✅ 创建标签
- ✅ 查询标签（分页/全部）
- ✅ 更新标签
- ✅ 删除标签

#### 2. Category API (分类管理)

```typescript
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '@/feature/api/category-api'
```

- ✅ 创建分类
- ✅ 查询分类（分页/全部）
- ✅ 更新分类
- ✅ 删除分类
- ✅ 层级分类支持

#### 3. Article API (文章管理)

```typescript
import {
  useCreateArticleMutation,
  useGetArticleByIdQuery,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} from '@/feature/api/article-api'
```

- ✅ 创建文章
- ✅ 查询文章（单个/批量）
- ✅ 更新文章
- ✅ 删除文章
- ✅ 草稿管理

#### 4. Auth API (认证管理)

```typescript
import {
  useAuthenticateUserMutation,
  useCreateUserAccountMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from '@/feature/api/auth-api'
```

- ✅ 用户登录
- ✅ 用户注册
- ✅ 用户查询
- ✅ 用户更新
- ✅ 用户删除

### Redux Slices (状态管理)

#### 1. Article Slice

```typescript
import { updateDraft, removeDraft } from '@/feature/slice/article-slice'
```

- 管理文章创建时的草稿状态

#### 2. Auth Slice

```typescript
import { setAuthUser, removeAuthUser } from '@/feature/slice/auth-slice'
```

- 管理用户认证状态和信息

#### 3. Toast Slice

```typescript
import {
  setToastPlacement,
  setMaxVisibleToasts,
} from '@/feature/slice/toast-slice'
```

- 管理 Toast 通知的全局配置

#### 4. Variants Slice

```typescript
import { setColor, setSize, setRadius } from '@/feature/slice/variants-slice'
```

- 管理 UI 组件的变体配置

## 🌟 核心特性

### 1. 统一的命名规范

- **Dto (Data Transfer Object)**: 发送到服务器的数据
- **Entity**: 从服务器返回的完整数据
- **Hook**: `use[Operation][Resource][Type]` 格式

### 2. 自动化错误处理

- ✅ 统一的 HTTP 状态码映射
- ✅ 用户友好的错误消息
- ✅ 自动显示 Toast 通知
- ✅ 网络请求自动重试（3次）

### 3. 智能缓存管理

- ✅ 细粒度的缓存标签
- ✅ 自动缓存失效
- ✅ 乐观更新支持
- ✅ 缓存时间可配置

### 4. TypeScript 类型安全

- ✅ 完整的类型定义
- ✅ 详细的 JSDoc 文档
- ✅ 编译时错误检查

## 💡 使用示例

### 创建并显示标签

```typescript
import { useCreateTagMutation, useGetAllTagsWithoutPaginationQuery } from '@/feature/api/tag-api'

function TagManager() {
  const { data: tags = [], isLoading } = useGetAllTagsWithoutPaginationQuery()
  const [createTag] = useCreateTagMutation()

  const handleCreate = async () => {
    await createTag({
      name: 'React',
      icon: 'react-icon',
      description: 'React.js library'
    })
    // ✅ 标签列表自动更新
    // ✅ 成功通知自动显示
  }

  return (
    <div>
      <button onClick={handleCreate}>Create Tag</button>
      {tags.map(tag => <div key={tag.tid}>{tag.name}</div>)}
    </div>
  )
}
```

### 文章编辑器

```typescript
import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { updateDraft, removeDraft } from '@/feature/slice/article-slice'
import { useCreateArticleMutation } from '@/feature/api/article-api'

function ArticleEditor() {
  const dispatch = useAppDispatch()
  const draft = useAppSelector(state => state.article.draft)
  const [createArticle, { isLoading }] = useCreateArticleMutation()

  const handleSaveDraft = (field: string, value: any) => {
    dispatch(updateDraft({ [field]: value }))
  }

  const handlePublish = async () => {
    await createArticle(draft)
    dispatch(removeDraft())
    // ✅ 导航到新文章页面
  }

  return (
    <form>
      <input
        value={draft.title}
        onChange={e => handleSaveDraft('title', e.target.value)}
      />
      <button onClick={handlePublish} disabled={isLoading}>
        Publish
      </button>
    </form>
  )
}
```

### 用户认证

```typescript
import { useAuthenticateUserMutation } from '@/feature/api/auth-api'
import { useAppSelector } from '@/hooks/store'

function LoginForm() {
  const [login, { isLoading }] = useAuthenticateUserMutation()
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  const handleSubmit = async (email: string, password: string) => {
    await login({ email, password })
    // ✅ Redux auth state 自动更新
    // ✅ 成功/失败通知自动显示
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

## 🔧 开发工具

### Redux DevTools

所有 API 都已配置好 Redux DevTools 支持：

- 查看所有 API 请求和响应
- 检查缓存状态
- 时间旅行调试

### TypeScript IntelliSense

完整的类型定义确保 IDE 自动完成和类型检查：

- 参数提示
- 返回值类型
- JSDoc 文档提示

## 📊 性能优化

### 1. 请求去重

RTK Query 自动合并相同的并发请求

### 2. 缓存复用

同一数据在多个组件中使用时，只发送一次请求

### 3. 乐观更新

支持在服务器响应前更新 UI（可选）

### 4. 自动重试

网络错误时自动重试 3 次

## 🎨 代码风格

### 命名约定

```typescript
// ✅ 正确
CreateTagDto
TagEntity
useCreateTagMutation

// ❌ 错误
CreateTagPayload
TagResponse
useCreateMutation
```

### 导入顺序

```typescript
// 1. React 相关
import { useState } from 'react'

// 2. 第三方库
import { addToast } from '@heroui/react'

// 3. API 和 Slice
import { useCreateTagMutation } from '@/feature/api/tag-api'
import { updateDraft } from '@/feature/slice/article-slice'

// 4. 类型
import type { CreateTagDto } from '@/feature/api/tag-api'
```

## 🧪 测试建议

### API 测试

```typescript
import { renderHook, waitFor } from '@testing-library/react'
import { useGetAllTagsQuery } from '@/feature/api/tag-api'

test('fetches tags successfully', async () => {
  const { result } = renderHook(() => useGetAllTagsQuery())

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true)
  })

  expect(result.current.data).toHaveLength(5)
})
```

### Slice 测试

```typescript
import articleReducer, { updateDraft } from '@/feature/slice/article-slice'

test('updates draft title', () => {
  const previousState = { draft: { title: '', content: '' } }
  const nextState = articleReducer(
    previousState,
    updateDraft({ title: 'New Title' })
  )

  expect(nextState.draft.title).toBe('New Title')
})
```

## 📝 贡献指南

如果你要添加新的 API 或 Slice：

1. **遵循命名规范**: 使用 Dto/Entity 模式
2. **添加完整的 JSDoc**: 所有接口和函数都要有文档
3. **实现完整的 CRUD**: 除非有特殊原因，否则实现所有操作
4. **配置缓存标签**: 正确设置 provideTags 和 invalidatesTags
5. **统一错误处理**: 使用标准的错误状态码映射
6. **添加使用示例**: 在文档中添加实际使用案例
7. **编写测试**: 确保新功能有测试覆盖

## 🔗 相关链接

- [Redux Toolkit 官方文档](https://redux-toolkit.js.org/)
- [RTK Query 指南](https://redux-toolkit.js.org/rtk-query/overview)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)
- [React 文档](https://react.dev/)

## ❓ 常见问题

### Q: 为什么使用 Dto 而不是 Payload？

A: Dto (Data Transfer Object) 是软件工程中的标准术语，更准确地描述了数据的用途。

### Q: 可以手动添加 Toast 通知吗？

A: 可以，但不推荐。新 API 已经自动处理了所有通知，手动添加会导致重复。

### Q: 如何处理特殊的错误情况？

A: 可以使用 try-catch 捕获错误，但 API 已经显示了用户友好的消息。

### Q: 缓存会一直保留吗？

A: 不会。默认情况下，未使用的缓存会在 60 秒后自动清除。

### Q: 如何禁用自动重试？

A: 可以在特定 endpoint 中覆盖 baseQuery 配置。

## 📞 需要帮助？

- 查看 [API 快速参考](./API_QUICK_REFERENCE.md) 获取使用示例
- 阅读 [重构总结](./REFACTORING_SUMMARY.md) 了解设计决策
- 参考 [迁移指南](./MIGRATION_GUIDE.md) 解决升级问题
- 检查代码中的 JSDoc 注释获取详细说明

---

**最后更新**: 2025-10-15  
**版本**: 2.0.0  
**维护者**: Development Team

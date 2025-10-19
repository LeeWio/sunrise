# Feature API 快速参考指南

## 📚 目录

- [命名规范](#命名规范)
- [API 使用示例](#api-使用示例)
- [类型定义参考](#类型定义参考)
- [常见模式](#常见模式)
- [错误处理](#错误处理)

## 命名规范

### 实体类型命名

| 用途           | 命名模式              | 示例               |
| -------------- | --------------------- | ------------------ |
| 创建数据       | `Create[Resource]Dto` | `CreateTagDto`     |
| 更新数据       | `Update[Resource]Dto` | `UpdateArticleDto` |
| 服务器返回数据 | `[Resource]Entity`    | `UserEntity`       |

### Hook 命名

| 操作类型 | 命名模式                           | 示例                       |
| -------- | ---------------------------------- | -------------------------- |
| 查询     | `use[Operation][Resource]Query`    | `useGetAllTagsQuery`       |
| 变更     | `use[Operation][Resource]Mutation` | `useCreateArticleMutation` |

## API 使用示例

### 标签 (Tag)

#### 创建标签

```typescript
import { useCreateTagMutation } from '@/feature/api/tag-api'
import type { CreateTagDto } from '@/feature/api/tag-api'

function CreateTagButton() {
 const [createTag, { isLoading, error }] = useCreateTagMutation()

 const handleCreate = async () => {
  const newTag: CreateTagDto = {
   name: 'React',
   slug: 'react',
   description: 'React.js framework',
   icon: 'react-icon',
  }

  try {
   const result = await createTag(newTag).unwrap()
   console.log('Created tag:', result)
   // Toast 通知自动显示
  } catch (err) {
   // 错误已在 API 层处理
   console.error('Failed to create tag:', err)
  }
 }

 return (
  <button onClick={handleCreate} disabled={isLoading}>
   {isLoading ? 'Creating...' : 'Create Tag'}
  </button>
 )
}
```

#### 获取所有标签

```typescript
import { useGetAllTagsWithoutPaginationQuery } from '@/feature/api/tag-api'

function TagList() {
 const { data: tags = [], isLoading, error } = useGetAllTagsWithoutPaginationQuery()

 if (isLoading) return <div>Loading tags...</div>

 return (
  <ul>
   {tags.map(tag => (
    <li key={tag.tid}>
     {tag.name} - {tag.description}
    </li>
   ))}
  </ul>
 )
}
```

#### 更新标签

```typescript
import { useUpdateTagMutation } from '@/feature/api/tag-api'
import type { UpdateTagDto } from '@/feature/api/tag-api'

function EditTag({ tid }: { tid: string }) {
 const [updateTag] = useUpdateTagMutation()

 const handleUpdate = async () => {
  const updates: UpdateTagDto = {
   tid,
   name: 'React.js',
   description: 'Updated description',
  }

  await updateTag(updates).unwrap()
  // 缓存自动更新
 }

 return <button onClick={handleUpdate}>Update</button>
}
```

#### 删除标签

```typescript
import { useDeleteTagMutation } from '@/feature/api/tag-api'

function DeleteTagButton({ tid }: { tid: string }) {
 const [deleteTag, { isLoading }] = useDeleteTagMutation()

 const handleDelete = async () => {
  if (confirm('Are you sure?')) {
   await deleteTag(tid).unwrap()
   // 相关缓存自动失效
  }
 }

 return <button onClick={handleDelete}>Delete</button>
}
```

### 分类 (Category)

#### 创建分类

```typescript
import { useCreateCategoryMutation } from '@/feature/api/category-api'

function CreateCategory() {
  const [createCategory] = useCreateCategoryMutation()

  const handleSubmit = async (data: CreateCategoryDto) => {
    await createCategory({
      name: 'Technology',
      slug: 'tech',
      description: 'Tech articles',
      color: '#3b82f6',
      parent: null, // 顶级分类
    }).unwrap()
  }
}
```

#### 分页获取分类

```typescript
import { useGetAllCategoriesQuery } from '@/feature/api/category-api'

function CategoryPagination() {
 const [page, setPage] = useState(1)
 const { data: categories = [] } = useGetAllCategoriesQuery({
  page,
  pageSize: 10,
 })

 return (
  <div>
   {categories.map(cat => (
    <div key={cat.cid}>{cat.name}</div>
   ))}
   <button onClick={() => setPage(p => p + 1)}>Next Page</button>
  </div>
 )
}
```

### 文章 (Article)

#### 创建文章

```typescript
import { useCreateArticleMutation } from '@/feature/api/article-api'
import { updateDraft, removeDraft } from '@/feature/slice/article-slice'
import { useAppSelector, useAppDispatch } from '@/hooks/store'

function CreateArticleForm() {
 const [createArticle, { isLoading }] = useCreateArticleMutation()
 const dispatch = useAppDispatch()
 const draft = useAppSelector(state => state.article.draft)

 const handleSubmit = async () => {
  try {
   const article = await createArticle(draft).unwrap()
   dispatch(removeDraft()) // 清空草稿
   router.push(`/blog/${article.aid}`)
  } catch (error) {
   // 错误已处理
  }
 }

 const handleDraftUpdate = (field: string, value: any) => {
  dispatch(updateDraft({ [field]: value }))
 }

 return (
  <form onSubmit={handleSubmit}>
   <input
    value={draft.title}
    onChange={e => handleDraftUpdate('title', e.target.value)}
   />
   {/* 其他表单字段 */}
   <button type="submit" disabled={isLoading}>
    Publish
   </button>
  </form>
 )
}
```

#### 获取并编辑文章

```typescript
import { useGetArticleByIdQuery, useUpdateArticleMutation } from '@/feature/api/article-api'

function EditArticle({ id }: { id: string }) {
 const { data: article, isLoading } = useGetArticleByIdQuery(id)
 const [updateArticle] = useUpdateArticleMutation()

 if (isLoading) return <div>Loading...</div>
 if (!article) return <div>Article not found</div>

 const handleUpdate = async (updates: Partial<UpdateArticleDto>) => {
  await updateArticle({
   aid: id,
   ...updates,
  }).unwrap()
 }

 return (
  <div>
   <h1>{article.title}</h1>
   <button onClick={() => handleUpdate({ status: 'published' })}>
    Publish
   </button>
  </div>
 )
}
```

#### 批量获取文章

```typescript
import { useGetArticlesByIdsQuery } from '@/feature/api/article-api'

function RelatedArticles({ articleIds }: { articleIds: string[] }) {
 const { data: articles = [], isLoading } = useGetArticlesByIdsQuery(articleIds)

 if (isLoading) return <div>Loading related articles...</div>

 return (
  <div>
   {articles.map(article => (
    <ArticleCard key={article.aid} article={article} />
   ))}
  </div>
 )
}
```

### 用户认证 (Auth)

#### 用户登录

```typescript
import { useAuthenticateUserMutation } from '@/feature/api/auth-api'
import { useAppSelector } from '@/hooks/store'

function LoginForm() {
 const [login, { isLoading }] = useAuthenticateUserMutation()
 const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
   await login({ email, password }).unwrap()
   // Redux auth state 自动更新
   router.push('/dashboard')
  } catch (error) {
   // 错误已处理（Toast 已显示）
  }
 }

 return (
  <form onSubmit={handleSubmit}>
   <input
    type="email"
    value={email}
    onChange={e => setEmail(e.target.value)}
    placeholder="Email"
   />
   <input
    type="password"
    value={password}
    onChange={e => setPassword(e.target.value)}
    placeholder="Password"
   />
   <button type="submit" disabled={isLoading}>
    {isLoading ? 'Logging in...' : 'Login'}
   </button>
  </form>
 )
}
```

#### 用户注册

```typescript
import { useCreateUserAccountMutation } from '@/feature/api/auth-api'

function RegisterForm() {
  const [register, { isLoading }] = useCreateUserAccountMutation()

  const handleSubmit = async (data: CreateUserDto) => {
    try {
      await register(data).unwrap()
      // 注册成功，可以跳转到登录页
      router.push('/login')
    } catch (error) {
      // 错误处理（如邮箱已存在）
    }
  }
}
```

#### 获取当前用户信息

```typescript
import { useAppSelector } from '@/hooks/store'
import { useGetUserByIdQuery } from '@/feature/api/auth-api'

function UserProfile() {
 const userDetail = useAppSelector(state => state.auth.userDetail)
 const { data: fullProfile, isLoading } = useGetUserByIdQuery(
  userDetail?.uid || '',
  {
   skip: !userDetail?.uid, // 如果没有登录就跳过查询
  }
 )

 if (!userDetail) return <div>Please login</div>
 if (isLoading) return <div>Loading profile...</div>

 return (
  <div>
   <h1>{fullProfile?.username}</h1>
   <p>{fullProfile?.email}</p>
   <img src={fullProfile?.avatar} alt="Avatar" />
  </div>
 )
}
```

## 类型定义参考

### Tag 类型

```typescript
// 创建标签
interface CreateTagDto {
  name: string // 必填
  slug?: string // 可选，后端自动生成
  description?: string
  icon: string // 必填
}

// 更新标签
interface UpdateTagDto {
  tid: string // 必填
  name?: string
  slug?: string
  description?: string
  icon?: string
}

// 标签实体
interface TagEntity {
  tid: string
  name: string
  slug: string
  description: string
  icon: string
  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601
}
```

### Category 类型

```typescript
interface CreateCategoryDto {
  name: string
  slug?: string
  description?: string
  color?: string // 十六进制颜色
  parent?: string // 父分类 ID
}

interface CategoryEntity {
  cid: string
  name: string
  slug: string
  description: string
  color: string
  parent: string | null // null 表示顶级分类
  createdAt: string
  updatedAt: string
}
```

### Article 类型

```typescript
interface CreateArticleDto {
  title: string
  content: string // Markdown 或 HTML
  summary: string
  coverImage: string // URL
  slug: string
  tags: CreateTagDto[]
  authorId: string
  categoryId: string
}

interface UpdateArticleDto {
  aid: string
  title?: string
  content?: string
  summary?: string
  coverImage?: string
  slug?: string
  tagIds?: string[] // 注意：更新时使用 tagIds
  categoryId?: string
  status?: 'draft' | 'published' | 'archived'
}

interface ArticleEntity {
  aid: string
  title: string
  content: string
  summary: string
  coverImage: string
  slug: string
  tagIds: string[]
  authorId: string
  categoryId: string
  status?: 'draft' | 'published' | 'archived'
  viewCount?: number
  createdAt: string
  updatedAt: string
}
```

### User 类型

```typescript
// 登录凭证
interface AuthenticateUserDto {
  email: string
  password: string
}

// 注册数据
interface CreateUserDto {
  email: string
  password: string
  username?: string
  avatar?: string
  status?: string
}

// 用户实体
interface UserEntity {
  uid: string
  username: string
  email: string
  avatar: string
  status: string
  roles: string[]
  createdAt: string
  updatedAt: string
}
```

## 常见模式

### 1. 乐观更新

```typescript
const [updateArticle] = useUpdateArticleMutation()

// RTK Query 会自动处理缓存更新
// 由于配置了正确的 invalidatesTags，相关查询会自动重新获取
await updateArticle({ aid, title: 'New Title' })
```

### 2. 条件查询

```typescript
const { data } = useGetUserByIdQuery(userId, {
  skip: !userId, // 没有 userId 时跳过查询
})
```

### 3. 轮询

```typescript
const { data } = useGetArticleByIdQuery(articleId, {
  pollingInterval: 30000, // 每 30 秒轮询一次
})
```

### 4. 手动触发重新获取

```typescript
const { data, refetch } = useGetAllTagsQuery()

// 稍后手动重新获取
const handleRefresh = () => {
  refetch()
}
```

### 5. 使用缓存数据

```typescript
// 组件 A - 获取数据
function ComponentA() {
 const { data } = useGetAllTagsQuery()
 return <div>{/* ... */}</div>
}

// 组件 B - 使用相同数据（不会重新请求）
function ComponentB() {
 const { data } = useGetAllTagsQuery()
 // 使用缓存的数据
 return <div>{/* ... */}</div>
}
```

## 错误处理

### 标准错误响应

```typescript
interface ErrorResponse {
  message: string
  status: number
}
```

### HTTP 状态码对应

| 状态码 | 含义           | 处理方式      |
| ------ | -------------- | ------------- |
| 400    | 请求参数无效   | 检查输入数据  |
| 401    | 未认证         | 跳转到登录页  |
| 403    | 权限不足       | 显示权限错误  |
| 404    | 资源不存在     | 显示 404 页面 |
| 409    | 冲突（如重复） | 提示用户修改  |
| 422    | 验证失败       | 显示表单错误  |
| 500    | 服务器错误     | 提示稍后重试  |

### 错误处理示例

```typescript
const [createTag, { error, isError }] = useCreateTagMutation()

if (isError) {
  // error 会包含详细的错误信息
  console.error('Error:', error)
}

// 或者使用 try-catch
try {
  await createTag(data).unwrap()
} catch (err: any) {
  if (err.status === 409) {
    alert('Tag already exists')
  }
  // Toast 通知已自动显示
}
```

## Redux Slice 使用

### Article Draft（文章草稿）

```typescript
import { updateDraft, removeDraft } from '@/feature/slice/article-slice'
import { useAppDispatch, useAppSelector } from '@/hooks/store'

function ArticleEditor() {
  const dispatch = useAppDispatch()
  const draft = useAppSelector(state => state.article.draft)

  // 更新草稿
  dispatch(updateDraft({ title: 'New Title' }))

  // 清空草稿
  dispatch(removeDraft())
}
```

### Auth State（认证状态）

```typescript
import { removeAuthUser } from '@/feature/slice/auth-slice'
import { useAppDispatch, useAppSelector } from '@/hooks/store'

function UserMenu() {
 const dispatch = useAppDispatch()
 const { userDetail, isAuthenticated } = useAppSelector(state => state.auth)

 const handleLogout = () => {
  dispatch(removeAuthUser())
  // 清除本地存储、重定向等
 }

 return (
  <div>
   {isAuthenticated && <p>Welcome, {userDetail?.username}</p>}
   <button onClick={handleLogout}>Logout</button>
  </div>
 )
}
```

## 性能优化建议

### 1. 选择性订阅

```typescript
// 只订阅需要的字段
const username = useAppSelector(state => state.auth.userDetail?.username)
```

### 2. 使用 skip 避免不必要的请求

```typescript
const { data } = useGetUserByIdQuery(userId, {
  skip: !userId || !isAuthenticated,
})
```

### 3. 合理设置缓存时间

```typescript
// 在 API 定义中设置
keepUnusedDataFor: 60, // 缓存保留 60 秒
```

### 4. 使用 TypeScript 严格模式

```typescript
// 确保类型安全，避免运行时错误
const article: ArticleEntity | undefined = data
```

## 总结

所有 API 都遵循一致的模式：

- ✅ 完整的 CRUD 操作
- ✅ 自动的缓存管理
- ✅ 统一的错误处理
- ✅ 用户友好的 Toast 通知
- ✅ TypeScript 类型安全
- ✅ 详细的 JSDoc 文档

使用这些 API 时，你可以专注于业务逻辑，而不必担心：

- 缓存失效
- 错误处理
- 加载状态
- 重复请求

所有这些都已经在 API 层自动处理！🎉

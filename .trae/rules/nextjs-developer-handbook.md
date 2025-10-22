# Next.js 开发手册

## 1. 强制核心原则 {#核心原则}

### 1.1 React 最佳实践

- ✅ 优先使用函数组件和 Hooks
- ✅ 组件拆分遵循单一职责原则
- ✅ 状态管理使用 Redux Toolkit
- ✅ 副作用处理使用 useEffect
- ✅ 条件渲染使用逻辑与操作符或三元表达式

### 1.2 TypeScript 规范

- ✅ 启用严格模式 (`strict: true`)
- ✅ 所有函数和组件必须有类型注解
- ✅ 接口优于类型别名（用于对象结构）
- ✅ 使用泛型提高代码复用性
- ✅ 避免使用 any 类型

### 1.3 组件设计原则

- ✅ 使用 HeroUI 组件库
- ✅ 遵循组件驱动开发 (CDD)
- ✅ 实现响应式设计
- ✅ 支持无障碍访问 (a11y)
- ✅ 保持组件无状态或受控

## 2. 强制架构规范 {#项目架构}

### 2.1 目录结构

```
src/
├── app/                    # App Router 目录
│   ├── api/               # API 路由
│   ├── components/        # 共享组件
│   ├── features/          # 功能模块
│   │   ├── api/           # RTK Query API 定义
│   │   └── slice/         # Redux Slice 状态管理
│   ├── hooks/             # 自定义 Hooks
│   ├── lib/               # 工具库
│   ├── styles/            # 全局样式
│   ├── types/             # TypeScript 类型
│   └── middleware.ts      # 中间件
├── public/                 # 静态资源
└── next.config.js         # Next.js 配置
```

### 2.2 状态管理

- ✅ 全局状态使用 Redux Toolkit
- ✅ 服务端状态使用 RTK Query
- ✅ 组件状态使用 useState/useReducer
- ✅ 副作用使用 createAsyncThunk
- ✅ 状态持久化使用 redux-persist

### 2.3 数据获取策略

- ✅ 服务端渲染使用 getServerSideProps
- ✅ 静态生成使用 getStaticProps
- ✅ 客户端获取使用 RTK Query
- ✅ 表单验证使用 Zod
- ✅ 错误边界捕获组件错误

## 3. 强制命名规范 {#命名规范}

### 3.1 文件命名

- ✅ 组件文件使用 PascalCase (如 `UserProfile.tsx`)
- ✅ 页面文件使用 kebab-case (如 `user-profile.tsx`)
- ✅ 工具文件使用 camelCase (如 `useAuth.ts`)
- ✅ 样式文件使用 kebab-case (如 `user-profile.css`)

### 3.2 变量和函数命名

- ✅ 变量使用 camelCase (如 `userProfile`)
- ✅ 布尔变量使用 is/has 前缀 (如 `isLoading`, `hasError`)
- ✅ 函数使用动词开头 (如 `handleClick`, `getUserData`)
- ✅ 自定义 Hook 使用 use 前缀 (如 `useAuth`, `useForm`)

### 3.3 组件和类型命名

- ✅ 组件使用 PascalCase (如 `UserProfile`)
- ✅ 接口使用 PascalCase (如 `UserProps`)
- ✅ 类型别名使用 PascalCase (如 `UserRole`)
- ✅ 枚举使用 PascalCase (如 `UserStatus`)

### 3.4 Redux 命名

- ✅ Slice 名称使用 kebab-case (如 `user-slice.ts`)
- ✅ Action 名称使用 camelCase (如 `setUser`)
- ✅ Selector 名称使用 select 前缀 (如 `selectUser`)
- ✅ API Hook 使用 use+Resource+Operation (如 `useGetUserQuery`)

### 3.5 实体类命名规范

- ✅ 数据传输对象使用 Dto 后缀 (如 `CreateTagDto`, `UpdateArticleDto`)
- ✅ 实体对象使用 Entity 后缀 (如 `TagEntity`, `ArticleEntity`)
- ✅ 创建操作使用 Create 前缀 (如 `CreateUserDto`)
- ✅ 更新操作使用 Update 前缀 (如 `UpdateCategoryDto`)
- ✅ 查询响应使用 Entity 后缀 (如 `UserEntity`, `CommentEntity`)

## 4. 强制编码规范 {#编码规范}

### 4.1 代码格式化

- ✅ 使用 Prettier 格式化代码
- ✅ 使用 ESLint 检查代码质量
- ✅ 缩进使用 2 个空格
- ✅ 字符串使用单引号
- ✅ 语句结尾不使用分号

### 4.2 注释规范

- ✅ 函数必须有 JSDoc 注释
- ✅ 复杂逻辑必须有行内注释
- ✅ 接口和类型必须有注释说明
- ✅ 组件属性必须有注释说明
- ✅ TODO 注释必须包含负责人和时间

### 4.3 导入导出规范

- ✅ 按功能分组导入（React、第三方、项目内部）
- ✅ 绝对路径导入优先于相对路径
- ✅ 按字母顺序排序导入语句
- ✅ 使用命名导出而非默认导出
- ✅ 避免循环依赖

## 5. 强制开发流程 {#开发流程}

### 5.1 开发准备

1. ✅ 拉取最新主分支代码
2. ✅ 创建功能分支 (`feature/功能名`)
3. ✅ 安装依赖并启动开发服务器
4. ✅ 确认开发环境配置正确
5. ✅ 阅读相关文档和规范

### 5.2 编码流程

1. ✅ 编写测试用例（TDD）
2. ✅ 实现功能代码
3. ✅ 运行 ESLint 和 Prettier
4. ✅ 执行单元测试
5. ✅ 进行自测和调试

### 5.3 代码提交

1. ✅ 检查代码变更范围
2. ✅ 编写清晰的提交信息
3. ✅ 推送代码到远程仓库
4. ✅ 创建 Pull Request
5. ✅ 请求代码审查

### 5.4 代码审查

1. ✅ 审查代码是否符合规范
2. ✅ 检查功能实现是否正确
3. ✅ 验证测试用例是否完整
4. ✅ 确认无安全漏洞
5. ✅ 提出修改建议

## 7. 强制性能标准 {#性能优化}

### 7.1 加载优化

- ✅ 实现代码分割
- ✅ 使用动态导入
- ✅ 图片懒加载
- ✅ 资源压缩和缓存
- ✅ 关键路径资源预加载

### 7.2 渲染优化

- ✅ 使用 React.memo 优化组件
- ✅ 使用 useMemo 缓存计算结果
- ✅ 使用 useCallback 缓存回调函数
- ✅ 避免不必要的重新渲染
- ✅ 实现虚拟滚动

### 7.3 网络优化

- ✅ API 请求合并
- ✅ 实现请求缓存
- ✅ 使用 SWR 或 React Query
- ✅ 减少 HTTP 请求数量
- ✅ 启用 Gzip 压缩

## 8. 强制测试要求 {#自测规范}

### 8.1 单元测试

- ✅ 组件测试覆盖率 ≥ 80%
- ✅ 工具函数测试覆盖率 100%
- ✅ Redux Slice 必须有测试
- ✅ 自定义 Hook 必须有测试
- ✅ 异步操作必须有测试

### 8.2 集成测试

- ✅ 页面路由测试
- ✅ API 集成测试
- ✅ 表单提交测试
- ✅ 用户流程测试
- ✅ 错误处理测试

### 8.3 端到端测试

- ✅ 关键用户路径测试
- ✅ 跨浏览器兼容性测试
- ✅ 响应式设计测试
- ✅ 性能基准测试
- ✅ 安全扫描测试

## 10. 实体类定义规范 {#实体类规范}

### 10.1 基本原则

- ✅ 所有实体类必须明确区分传输对象(Dto)和实体对象(Entity)
- ✅ Dto 用于客户端向服务器发送数据
- ✅ Entity 用于服务器向客户端返回数据
- ✅ 所有字段必须有明确的类型和注释说明
- ✅ 必填字段和可选字段必须明确标识

### 10.2 命名规范（与后端保持一致）

| 类型    | 命名模板                | 前端对应                  | 示例                                  |
| ------- | ----------------------- | ------------------------- | ------------------------------------- |
| 实体类  | `{模块名}`              | `*Entity`                 | `UserEntity`, `ArticleEntity`         |
| 请求DTO | `{操作}{模块名}Request` | `Create*Dto`/`Update*Dto` | `CreateUserRequest` → `CreateUserDto` |
| 响应VO  | `{模块名}VO`            | `*Entity`                 | `UserVO` → `UserEntity`               |

### 10.3 博客系统实体类规范

#### Article（文章）

```typescript
// 创建文章 DTO (对应后端 CreateUserRequest)
interface CreateArticleDto {
  /** 文章标题 */
  title: string
  /** 文章内容（Markdown格式） */
  content: string
  /** 文章摘要 */
  summary: string
  /** 封面图片URL */
  coverImage: string
  /** URL友好的slug */
  slug: string
  /** 关联的标签ID数组 */
  tagIds: string[]
  /** 作者ID */
  authorId: string
  /** 分类ID */
  categoryId: string
}

// 更新文章 DTO (对应后端 UpdateUserRequest)
interface UpdateArticleDto {
  /** 文章ID */
  aid: string
  /** 文章标题 */
  title?: string
  /** 文章内容 */
  content?: string
  /** 文章摘要 */
  summary?: string
  /** 封面图片URL */
  coverImage?: string
  /** URL友好的slug */
  slug?: string
  /** 关联的标签ID数组 */
  tagIds?: string[]
  /** 分类ID */
  categoryId?: string
  /** 文章状态 */
  status?: 'draft' | 'published' | 'archived'
}

// 文章实体 (对应后端 UserVO)
interface ArticleEntity {
  /** 文章唯一标识符 */
  aid: string
  /** 文章标题 */
  title: string
  /** 文章内容 */
  content: string
  /** 文章摘要 */
  summary: string
  /** 封面图片URL */
  coverImage: string
  /** URL友好的slug */
  slug: string
  /** 关联的标签ID数组 */
  tagIds: string[]
  /** 作者ID */
  authorId: string
  /** 分类ID */
  categoryId: string
  /** 文章状态 */
  status: 'draft' | 'published' | 'archived'
  /** 浏览次数 */
  viewCount: number
  /** 创建时间（ISO 8601格式） */
  createdAt: string
  /** 更新时间（ISO 8601格式） */
  updatedAt: string
}
```

#### Tag（标签）

```typescript
// 创建标签 DTO (对应后端 CreateUserRequest)
interface CreateTagDto {
  /** 标签名称 */
  name: string
  /** URL友好的slug（可选，后端可自动生成） */
  slug?: string
  /** 标签描述 */
  description?: string
  /** 图标标识符 */
  icon: string
}

// 更新标签 DTO (对应后端 UpdateUserRequest)
interface UpdateTagDto {
  /** 标签唯一标识符 */
  tid: string
  /** 标签名称 */
  name?: string
  /** URL友好的slug */
  slug?: string
  /** 标签描述 */
  description?: string
  /** 图标标识符 */
  icon?: string
}

// 标签实体 (对应后端 UserVO)
interface TagEntity {
  /** 标签唯一标识符 */
  tid: string
  /** 标签名称 */
  name: string
  /** URL友好的slug */
  slug: string
  /** 标签描述 */
  description: string
  /** 图标标识符 */
  icon: string
  /** 创建时间（ISO 8601格式） */
  createdAt: string
  /** 更新时间（ISO 8601格式） */
  updatedAt: string
}
```

#### Category（分类）

```typescript
// 创建分类 DTO (对应后端 CreateUserRequest)
interface CreateCategoryDto {
  /** 分类名称 */
  name: string
  /** URL友好的slug（可选，后端可自动生成） */
  slug?: string
  /** 分类描述 */
  description?: string
  /** 颜色代码 */
  color?: string
  /** 父分类ID（用于层级分类） */
  parent?: string
}

// 更新分类 DTO (对应后端 UpdateUserRequest)
interface UpdateCategoryDto {
  /** 分类唯一标识符 */
  cid: string
  /** 分类名称 */
  name?: string
  /** URL友好的slug */
  slug?: string
  /** 分类描述 */
  description?: string
  /** 颜色代码 */
  color?: string
  /** 父分类ID */
  parent?: string
}

// 分类实体 (对应后端 UserVO)
interface CategoryEntity {
  /** 分类唯一标识符 */
  cid: string
  /** 分类名称 */
  name: string
  /** URL友好的slug */
  slug: string
  /** 分类描述 */
  description: string
  /** 颜色代码 */
  color: string
  /** 父分类ID（null表示顶级分类） */
  parent: string | null
  /** 创建时间（ISO 8601格式） */
  createdAt: string
  /** 更新时间（ISO 8601格式） */
  updatedAt: string
}
```

#### User（用户）

```typescript
// 用户认证 DTO (对应后端 AuthenticateUserRequest)
interface AuthenticateUserDto {
  /** 用户邮箱 */
  email: string
  /** 用户密码 */
  password: string
}

// 创建用户 DTO (对应后端 CreateUserRequest)
interface CreateUserDto {
  /** 用户邮箱 */
  email: string
  /** 用户密码 */
  password: string
  /** 用户名（可选） */
  username?: string
  /** 头像URL（可选） */
  avatar?: string
  /** 账户状态（可选） */
  status?: string
}

// 更新用户 DTO (对应后端 UpdateUserRequest)
interface UpdateUserDto {
  /** 用户唯一标识符 */
  uid: string
  /** 用户名 */
  username?: string
  /** 用户邮箱 */
  email?: string
  /** 头像URL */
  avatar?: string
  /** 账户状态 */
  status?: string
  /** 用户角色 */
  roles?: string[]
}

// 用户实体 (对应后端 UserVO)
interface UserEntity {
  /** 用户唯一标识符 */
  uid: string
  /** 用户名 */
  username: string
  /** 用户邮箱 */
  email: string
  /** 头像URL */
  avatar: string
  /** 账户状态 */
  status: string
  /** 用户角色 */
  roles: string[]
  /** 创建时间（ISO 8601格式） */
  createdAt: string
  /** 更新时间（ISO 8601格式） */
  updatedAt: string
}
```

### 10.4 实体类使用规范

#### Dto 使用场景

- ✅ 创建资源时使用 Create\*Dto
- ✅ 更新资源时使用 Update\*Dto
- ✅ 表单提交数据使用对应 Dto
- ✅ API 请求参数使用 Dto

#### Entity 使用场景

- ✅ API 响应数据使用 Entity
- ✅ 组件展示数据使用 Entity
- ✅ Redux 状态存储使用 Entity
- ✅ 数据库查询结果使用 Entity

#### 字段规范

- ✅ ID 字段统一使用对应资源的缩写加 id（如 aid, tid, cid, uid）
- ✅ 时间字段使用 ISO 8601 格式字符串
- ✅ 布尔字段使用 is/has 前缀
- ✅ 数组字段使用复数形式
- ✅ 可选字段使用 ? 标识

## 11. 禁止事项清单 {#注意事项}

### 11.1 代码层面

- ❌ 禁止使用 var 声明变量
- ❌ 禁止直接操作 DOM
- ❌ 禁止在组件中使用箭头函数
- ❌ 禁止在渲染函数中定义函数
- ❌ 禁止使用 index 作为 key 属性

### 11.2 状态管理

- ❌ 禁止在 Redux 中存储函数
- ❌ 禁止在 Redux 中存储 DOM 节点
- ❌ 禁止在 Redux 中存储类实例
- ❌ 禁止在多个 Slice 中存储相同数据
- ❌ 禁止在 reducer 中执行副作用

### 11.3 性能相关

- ❌ 禁止在循环中执行重复计算
- ❌ 禁止在渲染函数中执行复杂逻辑
- ❌ 禁止在组件中使用 eval 函数
- ❌ 禁止在客户端存储敏感信息
- ❌ 禁止忽略 TypeScript 编译错误

### 11.4 安全相关

- ❌ 禁止在代码中硬编码密钥
- ❌ 禁止在客户端暴露敏感 API
- ❌ 禁止禁用 ESLint 规则
- ❌ 禁止忽略 TypeScript 类型检查
- ❌ 禁止在生产环境输出调试信息

### 11.5 开发流程

- ❌ 禁止直接向主分支提交代码
- ❌ 禁止跳过代码审查
- ❌ 禁止忽略测试失败
- ❌ 禁止提交未格式化的代码
- ❌ 禁止提交带有 console.log 的代码

---

**版本**: 1.2.0  
**最后更新**: 2025-10-15  
**适用范围**: 所有 Next.js 项目开发人员


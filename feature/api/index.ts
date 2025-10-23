// Re-export all API hooks and types from individual API files

// Auth API
export {
  useAuthenticateUserMutation,
  useCreateUserAccountMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  authApi,
} from './auth-api'
export type {
  AuthenticateUserDto,
  CreateUserDto,
  UpdateUserDto,
  UserEntity,
} from './auth-api'

// Article API
export {
  useCreateArticleMutation,
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  useGetArticlesByIdsQuery,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  articleApi,
} from './article-api'
export type {
  CreateArticleDto,
  UpdateArticleDto,
  ArticleEntity,
} from './article-api'

// Category API
export {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  categoryApi,
} from './category-api'
export type {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryEntity,
} from './category-api'

// Tag API
export {
  useCreateTagMutation,
  useGetTagsQuery,
  useGetAllTagsQuery,
  useUpdateTagMutation,
  useDeleteTagMutation,
  tagApi,
} from './tag-api'
export type {
  CreateTagDto,
  UpdateTagDto,
  TagEntity,
} from './tag-api'
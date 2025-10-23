import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { addToast } from '@heroui/react'

import { CreateTagDto } from './tag-api'

import { Page, ResultResponse } from '@/types'

/**
 * Data Transfer Object for creating a new article.
 * Contains all required fields for article creation.
 */
export interface CreateArticleDto {
  /** Article title */
  title: string
  /** Article content in markdown or HTML format */
  content: string
  /** Brief summary/excerpt of the article */
  summary: string
  /** URL to the cover image */
  coverImage: string
  /** URL-friendly slug for the article */
  slug: string
  /** Array of tag data for the article */
  tags: CreateTagDto[]
  /** Unique identifier of the article author */
  authorId: string
  /** Unique identifier of the article category */
  categoryId: string
}

/**
 * Data Transfer Object for updating an existing article.
 * All fields except aid are optional for partial updates.
 */
export interface UpdateArticleDto {
  /** Unique identifier of the article to update */
  aid: string
  /** Article title */
  title?: string
  /** Article content in markdown or HTML format */
  content?: string
  /** Brief summary/excerpt of the article */
  summary?: string
  /** URL to the cover image */
  coverImage?: string
  /** URL-friendly slug for the article */
  slug?: string
  /** Array of tag IDs for the article */
  tagIds?: string[]
  /** Unique identifier of the article category */
  categoryId?: string
  /** Publication status */
  status?: 'draft' | 'published' | 'archived'
}

/**
 * Entity representing a complete article returned from the server.
 * Contains all article data including metadata and timestamps.
 */
export interface ArticleEntity {
  /** Unique identifier */
  aid: string
  /** Article title */
  title: string
  /** Article content */
  content: string
  /** Brief summary */
  summary: string
  /** Cover image URL */
  coverImage: string
  /** URL-friendly slug */
  slug: string
  /** Array of associated tag IDs */
  tagIds: string[]
  /** Author user ID */
  authorId: string
  /** Category ID */
  categoryId: string
  /** Publication status */
  status?: 'draft' | 'published' | 'archived'
  /** View count */
  viewCount?: number
  /** ISO 8601 timestamp */
  createdAt: string
  /** ISO 8601 timestamp */
  updatedAt: string
}

// Define base query with retry logic
const baseQueryWithRetry = retry(
  fetchBaseQuery({
    baseUrl: '/api/article',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as any

      // Add authorization token to headers if user is authenticated
      if (
        state?.auth?.isAuthenticated &&
        state?.auth?.userDetail?.authorization
      ) {
        headers.set('Authorization', state.auth.userDetail.authorization)
      }

      return headers
    },
  }),
  {
    maxRetries: 3,
  }
)

/**
 * Article API service.
 * Handles all article-related API operations including CRUD operations.
 */
export const articleApi = createApi({
  reducerPath: 'article-api',
  tagTypes: ['Article', 'Articles'],
  baseQuery: baseQueryWithRetry,

  // Global configuration
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: true,

  endpoints: build => ({
    /**
     * Create a new article.
     * @param article - Article data for creation
     * @returns Created article entity
     */
    createArticle: build.mutation<ArticleEntity, CreateArticleDto>({
      query: article => ({
        url: '/create',
        method: 'POST',
        body: article,
      }),

      invalidatesTags: ['Articles'],

      transformResponse(response: ResultResponse<ArticleEntity>) {
        if (response.status === 10000 || response.status === 201) {
          const { data } = response

          if (!data) {
            addToast({
              title: 'Invalid article creation response',
              color: 'danger',
            })
            throw new Error('Invalid response')
          }

          addToast({
            title: 'Article created successfully',
            color: 'success',
          })

          return data
        }

        const errorMessage = response.message || 'Article creation failed'

        addToast({
          title: errorMessage,
          color: 'danger',
        })
        throw new Error(errorMessage)
      },

      transformErrorResponse: error => {
        let errorMessage: string

        switch (error.status) {
          case 400:
            errorMessage = 'Invalid article data provided'
            break
          case 401:
            errorMessage = 'Authentication required - please sign in'
            break
          case 403:
            errorMessage = 'Access denied - insufficient permissions'
            break
          case 409:
            errorMessage = 'Conflict - article with this slug already exists'
            break
          case 500:
            errorMessage = 'Internal server error - please try again'
            break
          default:
            errorMessage = 'Failed to create article'
        }

        addToast({
          title: errorMessage,
          color: 'danger',
        })

        return {
          message: errorMessage,
          status: error.status,
        }
      },
    }),

    /**
     * Get articles with pagination.
     * @param params - Pagination parameters
     * @returns Paginated article entities
     */
    getArticles: build.query<Page<ArticleEntity>, { page?: number; size?: number; status?: string }>({
      query: ({ page = 1, size = 10, status }) => ({
        url: '',
        method: 'GET',
        params: {
          page,
          size,
          ...(status && { status }),
        },
      }),

      providesTags: result =>
        result?.content
          ? [
              ...result.content.map(({ aid }) => ({
                type: 'Article' as const,
                id: aid,
              })),
              { type: 'Articles' as const, id: 'LIST' },
            ]
          : [{ type: 'Articles' as const, id: 'LIST' }],

      transformResponse(response: ResultResponse<any>) {
        if (response.code === 200 && response.data) {
          // Transform Spring Data pagination format to our Page format
          const backendData = response.data
          return {
            content: backendData.content || [],
            total: backendData.totalElements || 0,
            page: backendData.number + 1 || 1, // Spring Data uses 0-based indexing
            size: backendData.size || 10,
            totalPages: backendData.totalPages || 0,
            totalElements: backendData.totalElements,
            numberOfElements: backendData.numberOfElements,
            last: backendData.last,
            first: backendData.first,
          }
        }

        const emptyPage: Page<ArticleEntity> = {
          content: [],
          total: 0,
          page: 1,
          size: 10,
          totalPages: 0,
        }

        const errorMessage = response.message || 'Failed to fetch articles'

        addToast({
          title: errorMessage,
          color: 'danger',
        })

        return emptyPage
      },

      transformErrorResponse: error => {
        let errorMessage: string

        switch (error.status) {
          case 400:
            errorMessage = 'Invalid request parameters'
            break
          case 401:
            errorMessage = 'Authentication required - please sign in'
            break
          case 403:
            errorMessage = 'Access denied - insufficient permissions'
            break
          case 404:
            errorMessage = 'Articles not found'
            break
          case 500:
            errorMessage = 'Internal server error - please try again'
            break
          default:
            errorMessage = 'Failed to fetch articles'
        }

        addToast({
          title: errorMessage,
          color: 'danger',
        })

        return {
          message: errorMessage,
          status: error.status,
        }
      },
    }),

    /**
     * Get a single article by ID.
     * @param id - Article unique identifier
     * @returns Article entity
     */
    getArticleById: build.query<ArticleEntity, string>({
      query: id => ({
        url: `/${id}`,
        method: 'GET',
      }),

      providesTags: (result, error, id) => [{ type: 'Article', id }],

      transformResponse(response: ResultResponse<ArticleEntity>) {
        if (response.status === 200 || response.status === 10000) {
          const { data } = response

          if (!data) {
            addToast({
              title: 'Invalid article response',
              color: 'danger',
            })

            return [] as any
          }

          return data
        }

        const errorMessage = response.message || 'Failed to fetch article'

        addToast({
          title: errorMessage,
          color: 'danger',
        })

        return [] as any
      },

      transformErrorResponse: error => {
        let errorMessage: string

        switch (error.status) {
          case 400:
            errorMessage = 'Invalid request parameters'
            break
          case 401:
            errorMessage = 'Authentication required - please sign in'
            break
          case 403:
            errorMessage = 'Access denied - insufficient permissions'
            break
          case 404:
            errorMessage = 'Article not found'
            break
          case 500:
            errorMessage = 'Internal server error - please try again'
            break
          default:
            errorMessage = 'Failed to fetch article'
        }

        addToast({
          title: errorMessage,
          color: 'danger',
        })

        return {
          message: errorMessage,
          status: error.status,
        }
      },
    }),

    /**
     * Get multiple articles by their IDs.
     * @param ids - Array of article IDs
     * @returns Array of article entities
     */
    getArticlesByIds: build.query<ArticleEntity[], string[]>({
      query: ids => ({
        url: `/by-ids`,
        method: 'POST',
        params: { ids: ids.join(',') },
      }),

      providesTags: (result, error, ids) =>
        result
          ? [
            ...result.map(({ aid }) => ({
              type: 'Article' as const,
              id: aid,
            })),
            { type: 'Articles' as const, id: 'LIST' },
          ]
          : [{ type: 'Articles' as const, id: 'LIST' }],

      transformResponse(response: ResultResponse<ArticleEntity[]>) {
        if (response.status === 200 || response.status === 10000) {
          const { data } = response

          if (!data || !Array.isArray(data)) {
            addToast({
              title: 'Invalid articles response',
              color: 'danger',
            })

            return []
          }

          return data
        }

        const errorMessage = response.message || 'Failed to fetch articles'

        addToast({
          title: errorMessage,
          color: 'danger',
        })

        return []
      },

      transformErrorResponse: error => {
        let errorMessage: string

        switch (error.status) {
          case 400:
            errorMessage = 'Invalid request parameters'
            break
          case 401:
            errorMessage = 'Authentication required - please sign in'
            break
          case 403:
            errorMessage = 'Access denied - insufficient permissions'
            break
          case 404:
            errorMessage = 'Articles not found'
            break
          case 500:
            errorMessage = 'Internal server error - please try again'
            break
          default:
            errorMessage = 'Failed to fetch articles'
        }

        addToast({
          title: errorMessage,
          color: 'danger',
        })

        return {
          message: errorMessage,
          status: error.status,
        }
      },
    }),

    /**
     * Update an existing article.
     * @param article - Partial article data with aid
     * @returns Updated article entity
     */
    updateArticle: build.mutation<ArticleEntity, UpdateArticleDto>({
      query: ({ aid, ...article }) => ({
        url: `/${aid}`,
        method: 'PATCH',
        body: article,
      }),

      invalidatesTags: (result, error, { aid }) => [
        { type: 'Article', id: aid },
        { type: 'Articles', id: 'LIST' },
      ],

      transformResponse(response: ResultResponse<ArticleEntity>) {
        if (response.status === 10000 || response.status === 200) {
          const { data } = response

          if (!data) {
            addToast({
              title: 'Invalid article update response',
              color: 'danger',
            })
            throw new Error('Invalid response')
          }

          addToast({
            title: 'Article updated successfully',
            color: 'success',
          })

          return data
        }

        const errorMessage = response.message || 'Article update failed'

        addToast({
          title: errorMessage,
          color: 'danger',
        })
        throw new Error(errorMessage)
      },

      transformErrorResponse: error => {
        let errorMessage: string

        switch (error.status) {
          case 400:
            errorMessage = 'Invalid article data provided'
            break
          case 401:
            errorMessage = 'Authentication required - please sign in'
            break
          case 403:
            errorMessage = 'Access denied - insufficient permissions'
            break
          case 404:
            errorMessage = 'Article not found'
            break
          case 409:
            errorMessage = 'Conflict - article with this slug already exists'
            break
          case 500:
            errorMessage = 'Internal server error - please try again'
            break
          default:
            errorMessage = 'Failed to update article'
        }

        addToast({
          title: errorMessage,
          color: 'danger',
        })

        return {
          message: errorMessage,
          status: error.status,
        }
      },
    }),

    /**
     * Delete an article.
     * @param aid - Article unique identifier
     * @returns void
     */
    deleteArticle: build.mutation<void, string>({
      query: aid => ({
        url: `/${aid}`,
        method: 'DELETE',
      }),

      invalidatesTags: (result, error, aid) => [
        { type: 'Article', id: aid },
        { type: 'Articles', id: 'LIST' },
      ],

      transformResponse(response: ResultResponse<void>) {
        if (response.status === 10000 || response.status === 204) {
          addToast({
            title: 'Article deleted successfully',
            color: 'success',
          })

          return
        }

        const errorMessage = response.message || 'Article deletion failed'

        addToast({
          title: errorMessage,
          color: 'danger',
        })
        throw new Error(errorMessage)
      },

      transformErrorResponse: error => {
        let errorMessage: string

        switch (error.status) {
          case 400:
            errorMessage = 'Invalid request parameters'
            break
          case 401:
            errorMessage = 'Authentication required - please sign in'
            break
          case 403:
            errorMessage = 'Access denied - insufficient permissions'
            break
          case 404:
            errorMessage = 'Article not found'
            break
          case 500:
            errorMessage = 'Internal server error - please try again'
            break
          default:
            errorMessage = 'Failed to delete article'
        }

        addToast({
          title: errorMessage,
          color: 'danger',
        })

        return {
          message: errorMessage,
          status: error.status,
        }
      },
    }),
  }),
})

export const {
  useCreateArticleMutation,
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  useGetArticlesByIdsQuery,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articleApi

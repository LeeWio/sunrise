import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { addToast } from '@heroui/react'

import { RootState } from '@/app/store'
import { ResultResponse } from '@/types'

interface CreateArticlePayload {
  title: string
  content: string
  summary: string
  coverImage: string
  slug: string
  tagIds: string[]
  authorId: string
  categoryId: string
}

export interface ArticleResponse {
  aid: string
  title: string
  content: string
  summary: string
  coverImage: string
  slug: string
  tagIds: string[]
  authorId: string
  categoryId: string
  createdAt: string
  updatedAt: string
}

export const articleApi = createApi({
  reducerPath: 'article-api',
  tagTypes: ['article'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/article',
    prepareHeaders: (headers, { getState }) => {
      const { auth } = getState() as RootState

      // Add authorization token to headers if user is authenticated
      if (auth.isAuthenticated && auth.userDetail?.authorization) {
        headers.set('Authorization', auth.userDetail.authorization)
      }

      return headers
    },
  }),

  endpoints: build => ({
    create: build.mutation<ArticleResponse, CreateArticlePayload>({
      query: article => ({
        url: '/create', // Set proper endpoint for creating articles
        method: 'POST',
        body: article,
      }),

      transformResponse(response: ResultResponse<ArticleResponse>) {
        // Assuming 40001 is a success status code for article creation (following similar pattern to other apis)
        if (response.status === 40001) {
          const { data } = response

          if (!data) {
            addToast({
              title: 'Invalid article creation response',
              color: 'danger',
            })

            return {} as ArticleResponse
          }

          // Success case - return article data
          return data
        } else {
          // API indicates failure with non-success custom status
          addToast({
            title: response.message || 'Article creation failed',
            color: 'danger',
          })

          // Return empty ArticleResponse object to indicate failure
          return {} as ArticleResponse
        }
      },

      transformErrorResponse: error => {
        const getErrorMessage = (status: number | string): string => {
          switch (status) {
            case 400:
              return 'Invalid article data provided'
            case 401:
              return 'Authentication failed'
            case 403:
              return 'Insufficient permissions'
            case 404:
              return 'Requested resource not found'
            case 409: // Conflict - likely article already exists
              return 'An article with this slug already exists'
            case 500:
              return 'Internal server error'
            default:
              return 'An error occurred during article creation'
          }
        }

        const errorMessage = getErrorMessage(error.status)

        // Show error toast for network or server errors
        addToast({
          title: errorMessage,
          color: 'danger',
        })

        return {
          message: errorMessage,
          status: error.status,
        }
      },

      async onQueryStarted(_, { queryFulfilled }) {
        try {
          // Wait for the query to complete
          const { data } = await queryFulfilled

          // At this point, if we reach here, the response has been transformed
          // successfully by transformResponse and validation passed
          if (data && data.aid) {
            addToast({
              title: 'Article created successfully',
              color: 'success',
            })
          }
        } catch (error) {
          // This will catch errors thrown by transformResponse or network errors
          // Error toast is already shown in transformResponse and transformErrorResponse,
          // so we could optionally just log or handle cleanup here if needed
          addToast({
            title: 'Create article error: ' + error,
            color: 'danger',
          })
        }
      },
    }),

    get: build.query<ArticleResponse, string>({
      query: id => ({
        url: `/${id}`, // Endpoint to fetch article by ID
        method: 'GET',
      }),

      transformResponse(response: ResultResponse<ArticleResponse>) {
        // Assuming 200 is a success status code for getting an article (following standard HTTP codes)
        if (response.status === 200) {
          const { data } = response

          if (!data) {
            addToast({
              title: 'Invalid article response',
              color: 'danger',
            })

            // Return empty article response to indicate failure
            return {} as ArticleResponse
          }

          // Success case - return article data
          return data
        } else {
          // API indicates failure with non-success custom status
          addToast({
            title: response.message || 'Failed to fetch article',
            color: 'danger',
          })

          // Return empty article response to indicate failure
          return {} as ArticleResponse
        }
      },

      transformErrorResponse: error => {
        const getErrorMessage = (status: number | string): string => {
          switch (status) {
            case 400:
              return 'Invalid request parameters'
            case 401:
              return 'Authentication failed'
            case 403:
              return 'Insufficient permissions'
            case 404:
              return 'Article not found'
            case 500:
              return 'Internal server error'
            default:
              return 'An error occurred while fetching the article'
          }
        }

        const errorMessage = getErrorMessage(error.status)

        // Show error toast for network or server errors
        addToast({
          title: errorMessage,
          color: 'danger',
        })

        return {
          message: errorMessage,
          status: error.status,
        }
      },

      providesTags: (result, error, id) => [{ type: 'article', id }],
    }),

    getByIds: build.query<ArticleResponse[], string[]>({
      query: ids => {
        // Convert array of IDs to a comma-separated string for the query parameter
        return {
          url: `/by-ids`, // Endpoint to fetch articles by IDs
          method: 'POST',
          params: { ids: ids.join(',') },
        }
      },

      transformResponse(response: ResultResponse<ArticleResponse[]>) {
        // Assuming 200 is a success status code for getting articles (following standard HTTP codes)
        if (response.status === 200) {
          const { data } = response

          if (!data) {
            addToast({
              title: 'Invalid articles response',
              color: 'danger',
            })

            // Return empty array to indicate failure
            return []
          }

          // Success case - return articles array
          return data
        } else {
          // API indicates failure with non-success custom status
          addToast({
            title: response.message || 'Failed to fetch articles',
            color: 'danger',
          })

          // Return empty array to indicate failure
          return []
        }
      },

      // Provides tags for cache invalidation
      providesTags: (result, error, ids) => {
        // Return tags for each individual article ID as well as a combined tag
        return [
          ...ids.map(id => ({ type: 'article' as const, id })),
          { type: 'article', id: 'LIST_BY_IDS' },
        ]
      },

      // The 2nd parameter is the destructured `QueryLifecycleApi`
      async onQueryStarted(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          queryFulfilled,
          getCacheEntry,
          updateCachedData,
        }
      ) { },
      // The 2nd parameter is the destructured `QueryCacheLifecycleApi`
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
          updateCachedData,
        }
      ) { },

      transformErrorResponse: error => {
        const getErrorMessage = (status: number | string): string => {
          switch (status) {
            case 400:
              return 'Invalid request parameters'
            case 401:
              return 'Authentication failed'
            case 403:
              return 'Insufficient permissions'
            case 404:
              return 'Articles not found'
            case 500:
              return 'Internal server error'
            default:
              return 'An error occurred while fetching the articles'
          }
        }

        const errorMessage = getErrorMessage(error.status)

        // Show error toast for network or server errors
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

export const { useCreateMutation, useGetQuery, useGetByIdsQuery } = articleApi

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { addToast } from '@heroui/react'

import { RootState } from '@/app/store'
import { ResultResponse } from '@/types'

type CreateCategoryPayload = {
  name: string
  slug?: string
  description?: string
  color?: string
  parent?: string
}

export type CategoryResponse = {
  cid: string
  name: string
  slug: string
  description: string
  color: string
  parent: string | null
  createdAt: string
  updatedAt: string
}

export const categoryApi = createApi({
  reducerPath: 'category-api',
  tagTypes: ['category'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/category',
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
    create: build.mutation<CategoryResponse, CreateCategoryPayload>({
      query: category => ({
        url: '/create', // Set proper endpoint for creating categories
        method: 'POST',
        body: category,
      }),

      transformResponse(response: ResultResponse<CategoryResponse>) {
        // Assuming 3004 is a success status code for category creation (following similar pattern to other apis)
        if (response.status === 3004) {
          const { data } = response

          if (!data) {
            addToast({
              title: 'Invalid category creation response',
              color: 'danger',
            })

            return {} as CategoryResponse
          }

          // Success case - return category data
          return data
        } else {
          // API indicates failure with non-success custom status
          addToast({
            title: response.message || 'Category creation failed',
            color: 'danger',
          })

          // Return empty CategoryResponse object to indicate failure
          return {} as CategoryResponse
        }
      },

      transformErrorResponse: error => {
        const getErrorMessage = (status: number | string): string => {
          switch (status) {
            case 400:
              return 'Invalid category data provided'
            case 401:
              return 'Authentication failed'
            case 403:
              return 'Insufficient permissions'
            case 404:
              return 'Requested resource not found'
            case 409: // Conflict - likely category already exists
              return 'A category with this name or slug already exists'
            case 500:
              return 'Internal server error'
            default:
              return 'An error occurred during category creation'
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
          if (data && data.cid) {
            addToast({
              title: 'Category created successfully',
              color: 'success',
            })
          }
        } catch (error) {
          // This will catch errors thrown by transformResponse or network errors
          // Error toast is already shown in transformResponse and transformErrorResponse,
          // so we could optionally just log or handle cleanup here if needed
          addToast({
            title: 'Create category error: ' + error,
            color: 'danger',
          })
        }
      },
    }),

    getAll: build.query<
      Array<CategoryResponse>,
      { page: number; pageSize: number }
    >({
      query: ({ page = 1, pageSize = 10 }) => ({
        url: '/getAll', // Endpoint to fetch all categories
        method: 'GET',
        params: {
          page,
          pageSize,
        },
      }),

      transformResponse(response: ResultResponse<Array<CategoryResponse>>) {
        // Assuming 3005 is a success status code for getting categories (following similar pattern to other apis)
        if (response.status === 3005) {
          const { data } = response

          if (!data) {
            addToast({
              title: 'Invalid categories response',
              color: 'danger',
            })

            // Return empty pagination response to indicate failure
            return []
          }

          // Success case - return pagination response
          return data
        } else {
          // API indicates failure with non-success custom status
          addToast({
            title: response.message || 'Failed to fetch categories',
            color: 'danger',
          })

          // Return empty pagination response to indicate failure
          return []
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
              return 'Categories not found'
            case 500:
              return 'Internal server error'
            default:
              return 'An error occurred while fetching categories'
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

    getall: build.query<CategoryResponse[], void>({
      query: () => ({
        url: '/all', // Endpoint to fetch all categories without pagination
        method: 'GET',
      }),

      transformResponse(response: ResultResponse<CategoryResponse[]>) {
        // Assuming 3006 is a success status code for getting all categories (following similar pattern to other apis)
        if (response.status === 200) {
          const { data } = response

          if (!data) {
            addToast({
              title: 'Invalid categories response',
              color: 'danger',
            })

            // Return empty array to indicate failure
            return []
          }

          // Success case - return categories array
          return data
        } else {
          // API indicates failure with non-success custom status
          addToast({
            title: response.message || 'Failed to fetch all categories',
            color: 'danger',
          })

          // Return empty array to indicate failure
          return []
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
              return 'Categories not found'
            case 500:
              return 'Internal server error'
            default:
              return 'An error occurred while fetching all categories'
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

export const { useCreateMutation, useGetAllQuery, useGetallQuery } = categoryApi

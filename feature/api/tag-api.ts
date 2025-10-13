import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { addToast } from '@heroui/react'

import { RootState } from '@/app/store'
import { ResultResponse } from '@/types'

type CreateTagPayload = {
  name: string
  slug?: string
  description?: string
  color?: string
}

export type TagResponse = {
  tid: string
  name: string
  slug: string
  description: string
  createdAt: string
  updatedAt: string
  icon: string
}

export const tagApi = createApi({
  reducerPath: 'tag-api',
  tagTypes: ['tag'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/tag',
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
    create: build.mutation<TagResponse, CreateTagPayload>({
      query: tag => ({
        url: '/create', // Set proper endpoint for creating tags
        method: 'POST',
        body: tag,
      }),

      transformResponse(response: ResultResponse<TagResponse>) {
        // Assuming 10000 is a success status code for tag creation (following similar pattern to auth api)
        // You may need to adjust this based on your actual API response codes
        if (response.status === 10000) {
          const { data } = response

          if (!data) {
            addToast({
              title: 'Invalid tag creation response',
              color: 'danger',
            })

            return {} as TagResponse
          }

          // Success case - return tag data
          return data
        } else {
          // API indicates failure with non-success custom status
          addToast({
            title: response.message || 'Tag creation failed',
            color: 'danger',
          })

          // Return empty TagResponse object to indicate failure
          return {} as TagResponse
        }
      },

      transformErrorResponse: error => {
        const getErrorMessage = (status: number | string): string => {
          switch (status) {
            case 4002:
              return 'Invalid tag data provided'
            case 401:
              return 'Authentication failed'
            case 403:
              return 'Insufficient permissions'
            case 404:
              return 'Requested resource not found'
            case 409: // Conflict - likely tag already exists
              return 'A tag with this name or slug already exists'
            case 500:
              return 'Internal server error'
            default:
              return 'An error occurred during tag creation'
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
          if (data && data.tid) {
            addToast({
              title: 'Tag created successfully',
              color: 'success',
            })
          }
        } catch (error) {
          // This will catch errors thrown by transformResponse or network errors
          // Error toast is already shown in transformResponse and transformErrorResponse,
          // so we could optionally just log or handle cleanup here if needed
          addToast({
            title: 'Create tag error: ' + error,
            color: 'danger',
          })
        }
      },
    }),

    get: build.query<TagResponse[], { page: number; pageSize: number }>({
      query: ({ page = 1, pageSize = 10 }) => ({
        url: '/all', // Endpoint to fetch paginated tags
        method: 'GET',
        params: {
          page,
          pageSize,
        },
      }),

      transformResponse(response: ResultResponse<TagResponse[]>) {
        // Assuming 200 is a success status code for getting tags (following standard HTTP codes)
        if (response.status === 200) {
          const { data } = response

          if (!data) {
            addToast({
              title: 'Invalid tags response',
              color: 'danger',
            })

            // Return empty array to indicate failure
            return []
          }

          // Success case - return tags array
          return data
        } else {
          // API indicates failure with non-success custom status
          addToast({
            title: response.message || 'Failed to fetch tags',
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
              return 'Tags not found'
            case 500:
              return 'Internal server error'
            default:
              return 'An error occurred while fetching tags'
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

    getall: build.query<TagResponse[], void>({
      query: () => ({
        url: ``, // Endpoint to fetch all tags without pagination
        method: 'GET',
      }),

      transformResponse(response: ResultResponse<TagResponse[]>) {
        // Assuming 200 is a success status code for getting all tags (following standard HTTP codes)
        if (response.status === 200) {
          const { data } = response

          if (!data) {
            addToast({
              title: 'Invalid tags response',
              color: 'danger',
            })

            // Return empty array to indicate failure
            return []
          }

          // Success case - return tags array
          return data
        } else {
          // API indicates failure with non-success custom status
          addToast({
            title: response.message || 'Failed to fetch all tags',
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
              return 'Tags not found'
            case 500:
              return 'Internal server error'
            default:
              return 'An error occurred while fetching all tags'
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

export const { useCreateMutation, useGetQuery, useGetallQuery } = tagApi

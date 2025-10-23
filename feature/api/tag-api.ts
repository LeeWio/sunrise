import { createApi } from '@reduxjs/toolkit/query/react'
import { addToast } from '@heroui/react'

import { createBaseQuery } from '../utils/base-query'

import { Page, ResultResponse } from '@/types'

export interface CreateTagDto {
  name: string

  slug?: string

  description?: string

  icon: string

  color: string
}

export interface UpdateTagDto {
  tid: string

  name?: string

  slug?: string

  description?: string

  icon?: string

  color?: string
}

export interface TagEntity {
  tid: string

  name: string

  slug: string

  description: string

  createdAt: string

  updatedAt: string

  icon: string
}

/**
 * Tag API service.
 * Handles all tag-related API operations including CRUD operations.
 */
export const tagApi = createApi({
  reducerPath: 'tag-api',

  tagTypes: ['Tag', 'Tags'],

  baseQuery: createBaseQuery({ baseUrl: '/api/tag' }),

  endpoints: build => ({
    /**
     * Create a new tag.
     * @param tag - Tag data for creation
     * @returns Created tag entity
     */
    createTag: build.mutation<TagEntity, CreateTagDto>({
      query: tag => ({
        url: '/create',
        method: 'POST',
        body: tag,
      }),

      invalidatesTags: ['Tags', { type: 'Tag', id: 'LIST' }],

      transformResponse(response: ResultResponse<TagEntity>) {
        if (response.code === 4004) {
          const { data } = response

          if (!data) {
            addToast({
              title: 'Invalid tag creation response',
              color: 'danger',
            })

            return {} as TagEntity
          }

          addToast({
            title: 'Tag created successfully',
            color: 'success',
          })

          return data
        }

        addToast({
          title: response.message || 'Tag creation failed',
          color: 'danger',
        })

        return {} as TagEntity
      },

      transformErrorResponse: error => {
        let errorMessage: string

        switch (error.status) {
          case 400:
            errorMessage = 'Invalid tag data provided'
            break
          case 401:
            errorMessage = 'Authentication required - please sign in'
            break
          case 403:
            errorMessage = 'Access denied - insufficient permissions'
            break
          case 409:
            errorMessage =
              'Conflict - tag with this name or slug already exists'
            break
          case 500:
            errorMessage = 'Internal server error - please try again'
            break
          default:
            errorMessage = 'Failed to create tag'
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

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (e) {
          addToast({
            title: 'Tag creation error' + e,
            color: 'danger',
          })
        }
      },
    }),

    /**
     * Get all tags with pagination.
     * @param params - Pagination parameters
     * @returns Array of tag entities
     */
    getTags: build.query<Page<TagEntity>, { page?: number; size?: number }>({
      query: ({ page = 1, size = 5 }) => ({
        url: '',
        method: 'GET',
        params: {
          page,
          size,
        },
      }),
      providesTags: result =>
        result?.content
          ? [
            ...result.content.map(({ tid }) => ({
              type: 'Tag' as const,
              id: tid,
            })),
            { type: 'Tag', id: 'LIST' },
          ]
          : [{ type: 'Tag', id: 'LIST' }],

      transformResponse(response: ResultResponse<any>) {
        if (response.code === 200 && response.data) {
          // Transform Spring Data pagination format to our Page format
          const backendData = response.data
          return {
            content: backendData.content || [],
            total: backendData.totalElements || 0,
            page: backendData.number + 1 || 1, // Spring Data uses 0-based indexing
            size: backendData.size || 5,
            totalPages: backendData.totalPages || 0,
            totalElements: backendData.totalElements,
            numberOfElements: backendData.numberOfElements,
            last: backendData.last,
            first: backendData.first,
          }
        }

        const emptyPage: Page<TagEntity> = {
          content: [],
          total: 0,
          page: 1,
          size: 5,
          totalPages: 0,
        }

        const errorMessage = response.message || 'Failed to fetch tags'

        addToast({
          title: errorMessage,
          color: 'danger',
        })

        return emptyPage
      },

      transformErrorResponse(error) {
        let errorMessage: string

        switch (error.status) {
          case 400:
            errorMessage = 'Invalid request parameter'
            break
          case 401:
            errorMessage = 'Authentication required - please sign in'
            break
          case 403:
            errorMessage = 'Access denied - insufficient permissions'
            break
          case 404:
            errorMessage = 'Tags not found'
            break
          case 500:
            errorMessage = 'Internal server error - please try again'
            break
          default:
            errorMessage = 'Failed to fetch tags'
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
     * Get all tags without pagination.
     * @returns Array of all tag entities
     */
    getAllTags: build.query<TagEntity[], void>({
      query: () => ({
        url: '/all',
        method: 'GET',
      }),

      providesTags: result =>
        result
          ? [
            ...result.map(({ tid }) => ({ type: 'Tag' as const, id: tid })),
            { type: 'Tags' as const, id: 'ALL' },
          ]
          : [{ type: 'Tags' as const, id: 'ALL' }],

      transformResponse(response: ResultResponse<TagEntity[]>) {
        if (response.code === 200) {
          const { data } = response

          if (!data || !Array.isArray(data)) {
            addToast({
              title: 'Invalid tags response',
              color: 'danger',
            })

            return []
          }

          return data
        }

        const errorMessage = response.message || 'Failed to fetch all tags'

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
            errorMessage = 'Tags not found'
            break
          case 500:
            errorMessage = 'Internal server error - please try again'
            break
          default:
            errorMessage = 'Failed to fetch all tags'
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
     * Update an existing tag.
     * @param tag - Partial tag data with tid
     * @returns Updated tag entity
     */
    updateTag: build.mutation<TagEntity, UpdateTagDto>({
      query: ({ tid, ...tag }) => ({
        url: `/${tid}`,
        method: 'PATCH',
        body: tag,
      }),

      invalidatesTags: (result, error, { tid }) => [
        { type: 'Tag', id: tid },
        { type: 'Tags', id: 'ALL' },
        { type: 'Tag', id: 'LIST' },
      ],

      transformResponse(response: ResultResponse<TagEntity>) {
        if (response.code === 4005 || response.code === 200) {
          const { data } = response

          if (!data) {
            addToast({
              title: 'Invalid tag update response',
              color: 'danger',
            })
            throw new Error('Invalid response')
          }

          addToast({
            title: 'Tag updated successfully',
            color: 'success',
          })

          return data
        }

        const errorMessage = response.message || 'Tag update failed'

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
            errorMessage = 'Invalid tag data provided'
            break
          case 401:
            errorMessage = 'Authentication required - please sign in'
            break
          case 403:
            errorMessage = 'Access denied - insufficient permissions'
            break
          case 404:
            errorMessage = 'Tag not found'
            break
          case 409:
            errorMessage =
              'Conflict - tag with this name or slug already exists'
            break
          case 500:
            errorMessage = 'Internal server error - please try again'
            break
          default:
            errorMessage = 'Failed to update tag'
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
     * Delete a tag.
     * @param tid - Tag unique identifier
     * @returns void
     */
    deleteTag: build.mutation<void, string>({
      query: tid => ({
        url: `/${tid}`,
        method: 'DELETE',
      }),

      invalidatesTags: (result, error, tid) => [
        { type: 'Tag', id: tid },
        { type: 'Tags', id: 'ALL' },
        { type: 'Tag', id: 'LIST' },
      ],

      transformResponse(response: ResultResponse<void>) {
        if (response.code === 4005) {
          addToast({
            title: 'Tag deleted successfully',
            color: 'success',
          })

          return
        }

        const errorMessage = response.message || 'Tag deletion failed'

        addToast({
          title: errorMessage,
          color: 'danger',
        })

        return
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
            errorMessage = 'Tag not found'
            break
          case 500:
            errorMessage = 'Internal server error - please try again'
            break
          default:
            errorMessage = 'Failed to delete tag'
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
  useCreateTagMutation,
  useGetAllTagsQuery,
  useGetTagsQuery,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagApi

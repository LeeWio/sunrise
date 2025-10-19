import { createApi } from '@reduxjs/toolkit/query/react'
import { addToast } from '@heroui/react'

import { createBaseQuery } from '../utils/base-query'

import { Page, ResultResponse } from '@/types'

/**
 * Data Transfer Object for creating a new category.
 * Contains all required fields for category creation.
 */
export interface CreateCategoryDto {
  /** Category display name */
  name: string
  /** URL-friendly slug (optional, auto-generated if not provided) */
  slug?: string
  /** Category description */
  description?: string
  /** Color code for the category */
  color?: string
  /** Parent category ID for hierarchical categories */
  parent?: string
}

/**
 * Data Transfer Object for updating an existing category.
 * All fields except cid are optional for partial updates.
 */
export interface UpdateCategoryDto {
  /** Category unique identifier */
  cid: string
  /** Category display name */
  name?: string
  /** URL-friendly slug */
  slug?: string
  /** Category description */
  description?: string
  /** Color code */
  color?: string
  /** Parent category ID */
  parent?: string
}

/**
 * Entity representing a complete category returned from the server.
 * Contains all category data including timestamps and hierarchical information.
 */
export interface CategoryEntity {
  /** Unique identifier */
  cid: string
  /** Display name */
  name: string
  /** URL-friendly slug */
  slug: string
  /** Description */
  description: string
  /** Color code */
  color: string
  /** Parent category ID (null for root categories) */
  parent: string | null
  /** ISO 8601 timestamp */
  createdAt: string
  /** ISO 8601 timestamp */
  updatedAt: string
}



/**
 * Category API service.
 * Handles all category-related API operations including CRUD operations.
 */
export const categoryApi = createApi({
  reducerPath: 'category-api',

  tagTypes: ['Category', 'Categories'],

  baseQuery: createBaseQuery({ baseUrl: '/api/category' }),

  endpoints: build => ({
    /**
     * Create a new category.
     * @param category - Category data for creation
     * @returns Created category entity
     */
    createCategory: build.mutation<CategoryEntity, CreateCategoryDto>({
      query: category => ({
        url: '/create',
        method: 'POST',
        body: category,
      }),

      invalidatesTags: ['Categories', { type: 'Category', id: 'LIST' }],

      transformResponse(response: ResultResponse<CategoryEntity>) {
        if (response.code === 4004) {
          const { data } = response

          if (!data) {
            addToast({
              title: 'Invalid category creation response',
              color: 'danger',
            })

            return {} as CategoryEntity
          }

          addToast({
            title: 'Category created successfully',
            color: 'success',
          })

          return data
        }

        addToast({
          title: response.message || 'Category creation failed',
          color: 'danger',
        })

        return {} as CategoryEntity
      },

      transformErrorResponse: error => {
        let errorMessage: string

        switch (error.status) {
          case 400:
            errorMessage = 'Invalid category data provided'
            break
          case 401:
            errorMessage = 'Authentication required - please sign in'
            break
          case 403:
            errorMessage = 'Access denied - insufficient permissions'
            break
          case 409:
            errorMessage =
              'Conflict - category with this name or slug already exists'
            break
          case 500:
            errorMessage = 'Internal server error - please try again'
            break
          default:
            errorMessage = 'Failed to create category'
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
            title: 'Category creation error' + e,
            color: 'danger',
          })
        }
      },
    }),

    /**
     * Get all categories with pagination.
     * @param params - Pagination parameters
     * @returns Array of category entities
     */
    getCategories: build.query<Page<CategoryEntity>, { page?: number; size?: number }>({
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
              ...result.content.map(({ cid }) => ({
                type: 'Category' as const,
                id: cid,
              })),
              { type: 'Category', id: 'LIST' },
            ]
          : [{ type: 'Category', id: 'LIST' }],

      transformResponse(response: ResultResponse<Page<CategoryEntity>>) {
        if (response.code === 200 && response.data) {
          return response.data
        }

        const emptyPage: Page<CategoryEntity> = {
          content: [],
          total: 0,
          page: 1,
          size: 5,
          totalPages: 0,
        }

        const errorMessage = response.message || 'Failed to fetch categories'

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
            errorMessage = 'Categories not found'
            break
          case 500:
            errorMessage = 'Internal server error - please try again'
            break
          default:
            errorMessage = 'Failed to fetch categories'
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
     * Get all categories without pagination.
     * @returns Array of all category entities
     */
    getAllCategories: build.query<CategoryEntity[], void>({
      query: () => ({
        url: '/all',
        method: 'GET',
      }),

      providesTags: result =>
        result
          ? [
              ...result.map(({ cid }) => ({ type: 'Category' as const, id: cid })),
              { type: 'Categories' as const, id: 'ALL' },
            ]
          : [{ type: 'Categories' as const, id: 'ALL' }],

      transformResponse(response: ResultResponse<CategoryEntity[]>) {
        if (response.code === 200) {
          const { data } = response

          if (!data || !Array.isArray(data)) {
            addToast({
              title: 'Invalid categories response',
              color: 'danger',
            })

            return []
          }

          return data
        }

        const errorMessage = response.message || 'Failed to fetch all categories'

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
            errorMessage = 'Categories not found'
            break
          case 500:
            errorMessage = 'Internal server error - please try again'
            break
          default:
            errorMessage = 'Failed to fetch all categories'
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
     * Update an existing category.
     * @param category - Partial category data with cid
     * @returns Updated category entity
     */
    updateCategory: build.mutation<CategoryEntity, UpdateCategoryDto>({
      query: ({ cid, ...category }) => ({
        url: `/${cid}`,
        method: 'PATCH',
        body: category,
      }),

      invalidatesTags: (result, error, { cid }) => [
        { type: 'Category', id: cid },
        { type: 'Categories', id: 'ALL' },
        { type: 'Category', id: 'LIST' },
      ],

      transformResponse(response: ResultResponse<CategoryEntity>) {
        if (response.code === 4005 || response.code === 200) {
          const { data } = response

          if (!data) {
            addToast({
              title: 'Invalid category update response',
              color: 'danger',
            })
            throw new Error('Invalid response')
          }

          addToast({
            title: 'Category updated successfully',
            color: 'success',
          })

          return data
        }

        const errorMessage = response.message || 'Category update failed'

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
            errorMessage = 'Invalid category data provided'
            break
          case 401:
            errorMessage = 'Authentication required - please sign in'
            break
          case 403:
            errorMessage = 'Access denied - insufficient permissions'
            break
          case 404:
            errorMessage = 'Category not found'
            break
          case 409:
            errorMessage =
              'Conflict - category with this name or slug already exists'
            break
          case 500:
            errorMessage = 'Internal server error - please try again'
            break
          default:
            errorMessage = 'Failed to update category'
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
     * Delete a category.
     * @param cid - Category unique identifier
     * @returns void
     */
    deleteCategory: build.mutation<void, string>({
      query: cid => ({
        url: `/${cid}`,
        method: 'DELETE',
      }),

      invalidatesTags: (result, error, cid) => [
        { type: 'Category', id: cid },
        { type: 'Categories', id: 'ALL' },
        { type: 'Category', id: 'LIST' },
      ],

      transformResponse(response: ResultResponse<void>) {
        if (response.code === 4005) {
          addToast({
            title: 'Category deleted successfully',
            color: 'success',
          })

          return
        }

        const errorMessage = response.message || 'Category deletion failed'

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
            errorMessage = 'Category not found'
            break
          case 500:
            errorMessage = 'Internal server error - please try again'
            break
          default:
            errorMessage = 'Failed to delete category'
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
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi

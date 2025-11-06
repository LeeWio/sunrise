// Category API types and interfaces matching backend Horizon project

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { Page, ResultResponse } from "@/types";

import { createApi } from "@reduxjs/toolkit/query/react";

import { createBaseQuery } from "../utils/base-query";

// Category interface matching backend CategoryVO
export interface Category {
  /** Category ID */
  cid: string;

  /** Category name */
  name: string;

  /** Category slug (URL-friendly identifier) */
  slug: string;

  /** Category description */
  description?: string;

  /** Parent category ID (for hierarchical structure) */
  parentId?: string;

  /** Creation timestamp */
  createdAt?: string;

  /** Update timestamp */
  updatedAt?: string;
}

// Category with nested children
export interface CategoryTree extends Category {
  /** Child categories */
  children?: CategoryTree[];

  /** Level in hierarchy (0 = root) */
  level?: number;

  /** Number of articles in this category (including subcategories) */
  articleCount?: number;

  /** Whether this category has children */
  hasChildren?: boolean;
}

// Request/Response types for category operations
export interface CreateCategoryRequest {
  /** Category name */
  name: string;

  /** Category slug */
  slug?: string;

  /** Category description */
  description?: string;

  /** Parent category ID */
  parentId?: string;
}

export interface UpdateCategoryRequest {
  /** Category ID */
  cid: string;

  /** Category name */
  name?: string;

  /** Category slug */
  slug?: string;

  /** Category description */
  description?: string;

  /** Parent category ID */
  parentId?: string;
}

export interface SearchCategoriesRequest {
  /** Search keyword */
  keyword?: string;

  /** Parent category filter */
  parentId?: string;

  /** Include child categories */
  includeChildren?: boolean;

  /** Page number (0-based) */
  page?: number;

  /** Page size */
  size?: number;

  /** Sort field */
  sortBy?: "name" | "createdAt" | "articleCount";

  /** Sort direction */
  sortDirection?: "asc" | "desc";
}

// Category with statistics
export interface CategoryWithStats extends Category {
  /** Number of articles in this category */
  articleCount?: number;

  /** Number of total views for articles in this category */
  totalViews?: number;

  /** Number of subcategories */
  subcategoryCount?: number;

  /** Most recent articles in this category */
  recentArticles?: Array<{
    aid: string;
    title: string;
    createdAt: string;
  }>;
}

// Transform backend response to frontend format
const transformResponse = <T>(response: ResultResponse<T>) => {
  // Handle backend ResultResponse format
  if (response.code >= 200 && response.code < 300) {
    return response.data as T;
  }
  throw new Error(response.message || "Request failed");
};

// Transform pagination response
const transformPaginatedResponse = <T>(response: ResultResponse<Page<T>>) => {
  const data = transformResponse(response);

  return {
    ...data,
    // Ensure consistent pagination format
    content: data.content || [],
    totalElements: data.totalElements || 0,
    totalPages: data.totalPages || 0,
    size: data.size || 10,
    number: data.number || 0,
  };
};

// Enhanced error handling
const transformErrorResponse = (error: FetchBaseQueryError) => {
  if (error.status === "PARSING_ERROR" && error.originalStatus) {
    return {
      status: error.originalStatus,
      message:
        (error.data as { message?: string })?.message ||
        "Response parsing error",
      data: error.data,
    };
  }

  if (error.status === "TIMEOUT_ERROR") {
    return {
      status: 408,
      message: "Request timeout. Please try again.",
    };
  }

  if (error.status === "FETCH_ERROR") {
    return {
      status: 0,
      message: "Network error. Please check your connection.",
    };
  }

  return {
    status: error.status as number,
    message:
      (error.data as { message?: string })?.message || "An error occurred",
    data: error.data,
  };
};

const categoryApi = createApi({
  reducerPath: "category-api",

  tagTypes: ["Category", "Categories", "CategoryTree", "PopularCategories"],

  baseQuery: createBaseQuery({
    baseUrl: "/api/category",
  }),

  // Global configuration for cache invalidation and behavior
  keepUnusedDataFor: 60, // Keep unused data for 60 seconds
  refetchOnMountOrArgChange: 30, // Refetch if arg changes or 30 seconds old
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (build) => ({
    /**
     * Create a new category.
     * @param categoryData - Category data for creation
     * @returns Created category entity
     */
    createCategory: build.mutation<Category, CreateCategoryRequest>({
      query: (categoryData) => ({
        url: "/create",
        method: "POST",
        body: categoryData,
      }),
      transformResponse: (response: ResultResponse<Category>) =>
        transformResponse(response),
      transformErrorResponse,
      invalidatesTags: ["Categories", "CategoryTree"],
      // Optimistic update for better UX
      onQueryStarted: async (categoryData, { dispatch, queryFulfilled }) => {
        // Optimistic update: immediately add a temporary category
        const tempCategory: Category = {
          cid: `temp-${Date.now()}`,
          name: categoryData.name,
          slug:
            categoryData.slug ||
            categoryData.name.toLowerCase().replace(/\s+/g, "-"),
          description: categoryData.description,
          parentId: categoryData.parentId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Patch the cache with optimistic update
        dispatch(
          categoryApi.util.updateQueryData(
            "getAllCategories",
            undefined,
            (draft) => {
              if (draft) {
                return {
                  ...draft,
                  content: [tempCategory, ...(draft.content || [])],
                  totalElements: (draft.totalElements || 0) + 1,
                };
              }

              return draft;
            },
          ),
        );

        // Also update tree if parent exists
        if (categoryData.parentId) {
          dispatch(
            categoryApi.util.updateQueryData(
              "getCategoryTree",
              undefined,
              (draft) => {
                if (draft) {
                  const addToTree = (
                    categories: CategoryTree[],
                  ): CategoryTree[] => {
                    return categories.map((category) => {
                      if (category.cid === categoryData.parentId) {
                        return {
                          ...category,
                          children: [
                            ...(category.children || []),
                            {
                              ...tempCategory,
                              children: [],
                              level: (category.level || 0) + 1,
                              articleCount: 0,
                              hasChildren: false,
                            },
                          ],
                          hasChildren: true,
                        };
                      } else if (category.children) {
                        return {
                          ...category,
                          children: addToTree(category.children),
                        };
                      }

                      return category;
                    });
                  };

                  return addToTree(draft);
                }

                return draft;
              },
            ),
          );
        }

        try {
          const { data } = await queryFulfilled;

          // Replace optimistic update with real data
          dispatch(
            categoryApi.util.updateQueryData(
              "getAllCategories",
              undefined,
              (draft) => {
                if (draft) {
                  return {
                    ...draft,
                    content: draft.content?.map((category) =>
                      category.cid === tempCategory.cid ? data : category,
                    ) || [data],
                  };
                }

                return draft;
              },
            ),
          );
        } catch {
          // Revert optimistic update on error
          dispatch(
            categoryApi.util.updateQueryData(
              "getAllCategories",
              undefined,
              (draft) => {
                if (draft) {
                  return {
                    ...draft,
                    content:
                      draft.content?.filter(
                        (category) => category.cid !== tempCategory.cid,
                      ) || [],
                    totalElements: Math.max(0, (draft.totalElements || 0) - 1),
                  };
                }

                return draft;
              },
            ),
          );
        }
      },
    }),

    /**
     * Update an existing category.
     * @param categoryData - Category data with ID for update
     * @returns Updated category entity
     */
    updateCategory: build.mutation<Category, UpdateCategoryRequest>({
      query: ({ cid, ...patch }) => ({
        url: `/${cid}`,
        method: "PUT",
        body: patch,
      }),
      transformResponse: (response: ResultResponse<Category>) =>
        transformResponse(response),
      transformErrorResponse,
      invalidatesTags: (result, error, { cid }) => [
        { type: "Category", id: cid },
        "Categories",
        "CategoryTree",
        "PopularCategories",
      ],
      // Optimistic update for category changes
      onQueryStarted: async (
        { cid, ...patch },
        { dispatch, queryFulfilled },
      ) => {
        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error - refetch data
          dispatch(
            categoryApi.util.invalidateTags([
              "Category",
              "Categories",
              "CategoryTree",
            ]),
          );
        }
      },
    }),

    /**
     * Get category by ID.
     * @param categoryId - Category ID
     * @returns Category entity
     */
    getCategoryById: build.query<Category, string>({
      query: (categoryId) => `/${categoryId}`,
      transformResponse: (response: ResultResponse<Category>) =>
        transformResponse(response),
      transformErrorResponse,
      providesTags: (result, error, categoryId) => [
        { type: "Category", id: categoryId },
      ],
    }),

    /**
     * Delete a category.
     * @param categoryId - Category ID to delete
     * @returns void
     */
    deleteCategory: build.mutation<void, string>({
      query: (categoryId) => ({
        url: `/${categoryId}`,
        method: "DELETE",
      }),
      transformErrorResponse,
      invalidatesTags: (result, error, categoryId) => [
        { type: "Category", id: categoryId },
        "Categories",
        "CategoryTree",
        "PopularCategories",
      ],
    }),

    /**
     * Get all categories with pagination and search.
     * @param params - Search and pagination parameters
     * @returns Paginated category list
     */
    getAllCategories: build.query<
      Page<Category>,
      SearchCategoriesRequest | void
    >({
      query: (params) => ({
        url: "",
        params: params || {},
      }),
      transformResponse: (response: ResultResponse<Page<Category>>) =>
        transformPaginatedResponse(response),
      transformErrorResponse,
      providesTags: ["Categories"],
      // Subscribe to real-time updates
      async onCacheEntryAdded(arg, api) {
        // Set up WebSocket subscription for real-time category updates
        const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/categories`;

        if (typeof window !== "undefined") {
          const ws = new WebSocket(wsUrl);

          ws.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data);

              if (
                data.type === "CATEGORY_CREATED" ||
                data.type === "CATEGORY_UPDATED" ||
                data.type === "CATEGORY_DELETED"
              ) {
                // Invalidate cache when categories change
                api.dispatch(
                  categoryApi.util.invalidateTags([
                    "Categories",
                    "CategoryTree",
                  ]),
                );
              }
            } catch (error) {
              console.warn("WebSocket message parsing error:", error);
            }
          };

          // Clean up WebSocket when cache entry is removed
          api.cacheEntryRemoved.then(() => {
            ws.close();
          });
        }
      },
    }),

    /**
     * Get category tree structure.
     * @param parentId - Optional parent category ID
     * @returns Category tree structure
     */
    getCategoryTree: build.query<CategoryTree[], string | void>({
      query: (parentId) => ({
        url: "/tree",
        params: parentId ? { parentId } : {},
      }),
      transformResponse: (response: ResultResponse<CategoryTree[]>) =>
        transformResponse(response),
      transformErrorResponse,
      providesTags: ["CategoryTree"],
    }),

    /**
     * Get root categories (categories without parent).
     * @returns Root categories list
     */
    getRootCategories: build.query<Category[], void>({
      query: () => "/root",
      transformResponse: (response: ResultResponse<Category[]>) =>
        transformResponse(response),
      transformErrorResponse,
      providesTags: ["Categories"],
    }),

    /**
     * Get subcategories of a parent category.
     * @param parentId - Parent category ID
     * @returns Subcategories list
     */
    getSubcategories: build.query<Category[], string>({
      query: (parentId) => `/parent/${parentId}/children`,
      transformResponse: (response: ResultResponse<Category[]>) =>
        transformResponse(response),
      transformErrorResponse,
      providesTags: ["Categories"],
    }),

    /**
     * Search categories by keyword.
     * @param params - Search parameters
     * @returns Search results
     */
    searchCategories: build.query<
      Page<Category>,
      { keyword: string; page?: number; size?: number }
    >({
      query: ({ keyword, page = 0, size = 10 }) => ({
        url: "/search",
        params: { keyword, page, size },
      }),
      transformResponse: (response: ResultResponse<Page<Category>>) =>
        transformPaginatedResponse(response),
      transformErrorResponse,
      providesTags: ["Categories"],
    }),

    /**
     * Get categories with statistics.
     * @returns Categories with statistics list
     */
    getCategoriesWithStats: build.query<CategoryWithStats[], void>({
      query: () => "/with-stats",
      transformResponse: (response: ResultResponse<CategoryWithStats[]>) =>
        transformResponse(response),
      transformErrorResponse,
      providesTags: ["PopularCategories"],
    }),

    /**
     * Get category statistics by ID.
     * @param categoryId - Category ID
     * @returns Category with statistics
     */
    getCategoryStats: build.query<CategoryWithStats, string>({
      query: (categoryId) => `/${categoryId}/stats`,
      transformResponse: (response: ResultResponse<CategoryWithStats>) =>
        transformResponse(response),
      transformErrorResponse,
      providesTags: (result, error, categoryId) => [
        { type: "Category", id: categoryId },
        "PopularCategories",
      ],
    }),

    /**
     * Get popular categories.
     * @param limit - Optional limit count
     * @returns Popular categories list with statistics
     */
    getPopularCategories: build.query<CategoryWithStats[], number | void>({
      query: (limit) => ({
        url: "/popular",
        params: limit ? { limit } : {},
      }),
      transformResponse: (response: ResultResponse<CategoryWithStats[]>) =>
        transformResponse(response),
      transformErrorResponse,
      providesTags: ["PopularCategories"],
    }),

    /**
     * Get category overview (admin function).
     * @returns Category overview statistics
     */
    getCategoryOverview: build.query<
      {
        totalCategories: number;
        totalArticles: number;
        rootCategories: Category[];
        popularCategories: CategoryWithStats[];
      },
      void
    >({
      query: () => "/overview",
      transformResponse: (
        response: ResultResponse<{
          totalCategories: number;
          totalArticles: number;
          rootCategories: Category[];
          popularCategories: CategoryWithStats[];
        }>,
      ) => transformResponse(response),
      transformErrorResponse,
      providesTags: ["Categories", "PopularCategories"],
    }),

    /**
     * Reorder categories (admin function).
     * @param categoryIds - Category IDs in new order
     * @returns void
     */
    reorderCategories: build.mutation<void, string[]>({
      query: (categoryIds) => ({
        url: "/reorder",
        method: "POST",
        body: { categoryIds },
      }),
      transformErrorResponse,
      invalidatesTags: ["Categories", "CategoryTree"],
      // Optimistic update for category reordering
      onQueryStarted: async (categoryIds, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error - refetch data
          dispatch(
            categoryApi.util.invalidateTags(["Categories", "CategoryTree"]),
          );
        }
      },
    }),

    /**
     * Move category to new parent (admin function).
     * @param params - Category ID and new parent ID
     * @returns Updated category entity
     */
    moveCategory: build.mutation<
      Category,
      { cid: string; newParentId?: string }
    >({
      query: ({ cid, newParentId }) => ({
        url: `/${cid}/move`,
        method: "POST",
        body: { newParentId },
      }),
      transformResponse: (response: ResultResponse<Category>) =>
        transformResponse(response),
      transformErrorResponse,
      invalidatesTags: (result, error, { cid }) => [
        { type: "Category", id: cid },
        "Categories",
        "CategoryTree",
      ],
      // Optimistic update for category movement
      onQueryStarted: async (
        { cid, newParentId },
        { dispatch, queryFulfilled },
      ) => {
        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error - refetch data
          dispatch(
            categoryApi.util.invalidateTags(["Categories", "CategoryTree"]),
          );
        }
      },
    }),
  }),
});

// Export hooks for all endpoints
export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryByIdQuery,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryTreeQuery,
  useGetRootCategoriesQuery,
  useGetSubcategoriesQuery,
  useSearchCategoriesQuery,
  useGetCategoriesWithStatsQuery,
  useGetCategoryStatsQuery,
  useGetPopularCategoriesQuery,
  useGetCategoryOverviewQuery,
  useReorderCategoriesMutation,
  useMoveCategoryMutation,
} = categoryApi;

// Export the API slice itself for usage in other slices
export { categoryApi };

// Types are already exported above

// Tag API types and interfaces matching backend Horizon project

import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { createBaseQuery } from "../utils/base-query";
import type { Page, ResultResponse } from "@/types";

// Transform backend response to frontend format
const transformResponse = <T>(response: ResultResponse<T>) => {
  // Handle backend ResultResponse format
  if (response.code >= 200 && response.code < 300) {
    return response.data as T;
  }
  throw new Error(response.message || 'Request failed');
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
  if (error.status === 'PARSING_ERROR' && error.originalStatus) {
    return {
      status: error.originalStatus,
      message: (error.data as { message?: string })?.message || 'Response parsing error',
      data: error.data,
    };
  }

  if (error.status === 'TIMEOUT_ERROR') {
    return {
      status: 408,
      message: 'Request timeout. Please try again.',
    };
  }

  if (error.status === 'FETCH_ERROR') {
    return {
      status: 0,
      message: 'Network error. Please check your connection.',
    };
  }

  return {
    status: error.status as number,
    message: (error.data as { message?: string })?.message || 'An error occurred',
    data: error.data,
  };
};

// Tag interface matching backend TagVO
export interface Tag {
  /** Tag ID */
  tid: string;

  /** Tag name */
  name: string;

  /** Tag slug (URL-friendly identifier) */
  slug: string;

  /** Tag icon (emoji or icon identifier) */
  icon: string;

  /** Tag color (hex color code) */
  color?: string;

  /** Tag description */
  description?: string;

  /** Creation timestamp */
  createdAt?: string;

  /** Update timestamp */
  updatedAt?: string;
}

// Request/Response types for tag operations
export interface CreateTagRequest {
  /** Tag name */
  name: string;

  /** Tag slug */
  slug?: string;

  /** Tag icon */
  icon: string;

  /** Tag color (hex format) */
  color?: string;

  /** Tag description */
  description?: string;
}

export interface UpdateTagRequest {
  /** Tag ID */
  tid: string;

  /** Tag name */
  name?: string;

  /** Tag slug */
  slug?: string;

  /** Tag icon */
  icon?: string;

  /** Tag color (hex format) */
  color?: string;

  /** Tag description */
  description?: string;
}

export interface SearchTagsRequest {
  /** Search keyword */
  keyword?: string;

  /** Page number (0-based) */
  page?: number;

  /** Page size */
  size?: number;

  /** Sort field */
  sortBy?: 'name' | 'createdAt' | 'articleCount';

  /** Sort direction */
  sortDirection?: 'asc' | 'desc';
}

export interface PopularTagsRequest {
  /** Limit count */
  limit?: number;

  /** Time period (day, week, month, all) */
  period?: 'day' | 'week' | 'month' | 'all';
}

// Tag with article count
export interface TagWithStats extends Tag {
  /** Number of articles using this tag */
  articleCount?: number;

  /** Number of total views for articles with this tag */
  totalViews?: number;

  /** Whether current user follows this tag */
  isFollowed?: boolean;
}

const tagApi = createApi({
  reducerPath: 'tag-api',

  tagTypes: ['Tag', 'Tags', 'PopularTags'],

  baseQuery: createBaseQuery({
    baseUrl: '/api/tag',
  }),

  // Global configuration for cache invalidation and behavior
  keepUnusedDataFor: 60, // Keep unused data for 60 seconds
  refetchOnMountOrArgChange: 30, // Refetch if arg changes or 30 seconds old
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: build => ({
    /**
     * Create a new tag.
     * @param tag - Tag data for creation
     * @returns Created tag entity
     */
    createTag: build.mutation<Tag, CreateTagRequest>({
      query: tag => ({
        url: '/create',
        method: 'POST',
        body: tag
      }),
      transformResponse: (response: ResultResponse<Tag>) => transformResponse(response),
      transformErrorResponse,
      invalidatesTags: ['Tags', { type: 'Tag', id: 'LIST' }],
      // Optimistic update for better UX
      onQueryStarted: async (tagData, { dispatch, queryFulfilled }) => {
        // Optimistic update: immediately add a temporary tag
        const tempTag: Tag = {
          tid: `temp-${Date.now()}`,
          name: tagData.name,
          slug: tagData.slug || tagData.name.toLowerCase().replace(/\s+/g, '-'),
          icon: tagData.icon,
          color: tagData.color,
          description: tagData.description,
          createdAt: new Date().toISOString(),
        };

        // Patch the cache with optimistic update
        dispatch(
          tagApi.util.updateQueryData('getAllTags', undefined, (draft) => {
            if (draft) {
              return {
                ...draft,
                content: [tempTag, ...(draft.content || [])],
                totalElements: (draft.totalElements || 0) + 1,
              };
            }
            return draft;
          })
        );

        try {
          const { data } = await queryFulfilled;
          // Replace optimistic update with real data
          dispatch(
            tagApi.util.updateQueryData('getAllTags', undefined, (draft) => {
              if (draft) {
                return {
                  ...draft,
                  content: draft.content?.map(tag =>
                    tag.tid === tempTag.tid ? data : tag
                  ) || [data],
                };
              }
              return draft;
            })
          );
        } catch {
          // Revert optimistic update on error
          dispatch(
            tagApi.util.updateQueryData('getAllTags', undefined, (draft) => {
              if (draft) {
                return {
                  ...draft,
                  content: draft.content?.filter(tag => tag.tid !== tempTag.tid) || [],
                  totalElements: Math.max(0, (draft.totalElements || 0) - 1),
                };
              }
              return draft;
            })
          );
        }
      },
    }),

    /**
     * Update an existing tag.
     * @param tag - Tag data with ID for update
     * @returns Updated tag entity
     */
    updateTag: build.mutation<Tag, UpdateTagRequest>({
      query: ({ tid, ...patch }) => ({
        url: `/${tid}`,
        method: 'PUT',
        body: patch
      }),
      invalidatesTags: (result, error, { tid }) => [
        { type: 'Tag', id: tid },
        'Tags'
      ],
    }),

    /**
     * Get tag by ID.
     * @param tagId - Tag ID
     * @returns Tag entity
     */
    getTagById: build.query<Tag, string>({
      query: (tagId) => `/${tagId}`,
      providesTags: (result, error, tagId) => [{ type: 'Tag', id: tagId }],
    }),

    /**
     * Delete a tag.
     * @param tagId - Tag ID to delete
     * @returns void
     */
    deleteTag: build.mutation<void, string>({
      query: (tagId) => ({
        url: `/${tagId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, tagId) => [
        { type: 'Tag', id: tagId },
        'Tags'
      ],
    }),

    /**
     * Get all tags with pagination and search.
     * @param params - Search and pagination parameters
     * @returns Paginated tag list
     */
    getAllTags: build.query<Page<Tag>, SearchTagsRequest | void>({
      query: (params) => ({
        url: '',
        params: params || {}
      }),
      transformResponse: (response: ResultResponse<Page<Tag>>) => transformPaginatedResponse(response),
      transformErrorResponse,
      providesTags: ['Tags'],
      // Subscribe to real-time updates
      async onCacheEntryAdded(arg, api) {
        // Set up WebSocket subscription for real-time tag updates
        // This would integrate with your WebSocket implementation
        const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/tags`;

        if (typeof window !== 'undefined') {
          const ws = new WebSocket(wsUrl);

          ws.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data);
              if (data.type === 'TAG_CREATED' || data.type === 'TAG_UPDATED' || data.type === 'TAG_DELETED') {
                // Invalidate cache when tags change
                api.dispatch(tagApi.util.invalidateTags(['Tags']));
              }
            } catch (error) {
              console.warn('WebSocket message parsing error:', error);
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
     * Get popular tags.
     * @param params - Popular tags parameters
     * @returns Popular tags list with stats
     */
    getPopularTags: build.query<TagWithStats[], PopularTagsRequest | void>({
      query: (params) => ({
        url: '/popular',
        params: params || {}
      }),
      providesTags: ['PopularTags'],
    }),

    /**
     * Search tags by keyword.
     * @param params - Search parameters
     * @returns Search results
     */
    searchTags: build.query<Page<Tag>, { keyword: string; page?: number; size?: number }>({
      query: ({ keyword, page = 0, size = 10 }) => ({
        url: '/search',
        params: { keyword, page, size }
      }),
      providesTags: ['Tags'],
    }),

    /**
     * Get tags associated with an article.
     * @param articleId - Article ID
     * @returns Tags for the article
     */
    getTagsByArticle: build.query<Tag[], string>({
      query: (articleId) => `/article/${articleId}`,
      providesTags: ['Tags'],
    }),

    /**
     * Get tag statistics.
     * @returns Tag statistics overview
     */
    getTagStats: build.query<{
      totalTags: number;
      totalArticles: number;
      popularTags: Tag[];
    }, void>({
      query: () => '/stats',
      providesTags: ['PopularTags'],
    }),

    /**
     * Follow a tag.
     * @param tagId - Tag ID to follow
     * @returns void
     */
    followTag: build.mutation<void, string>({
      query: (tagId) => ({
        url: `/${tagId}/follow`,
        method: 'POST'
      }),
      transformErrorResponse,
      invalidatesTags: (result, error, tagId) => [
        { type: 'Tag', id: tagId },
        'PopularTags'
      ],
      // Optimistic update for follow status
      onQueryStarted: async (tagId, { dispatch, queryFulfilled, getState }) => {
        // Update the tag in cache optimistically
        dispatch(
          tagApi.util.updateQueryData('getTagById', tagId, (draft) => {
            if (draft) {
              return { ...draft, isFollowed: true };
            }
            return draft;
          })
        );

        // Also update in lists
        const state = getState();
        const allTagsData = tagApi.endpoints.getAllTags.select()(state)?.data;
        if (allTagsData) {
          dispatch(
            tagApi.util.updateQueryData('getAllTags', undefined, (draft) => {
              if (draft) {
                return {
                  ...draft,
                  content: draft.content?.map(tag =>
                    tag.tid === tagId ? { ...tag, isFollowed: true } : tag
                  ) || [],
                };
              }
              return draft;
            })
          );
        }

        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error
          dispatch(
            tagApi.util.updateQueryData('getTagById', tagId, (draft) => {
              if (draft) {
                return { ...draft, isFollowed: false };
              }
              return draft;
            })
          );

          dispatch(
            tagApi.util.updateQueryData('getAllTags', undefined, (draft) => {
              if (draft) {
                return {
                  ...draft,
                  content: draft.content?.map(tag =>
                    tag.tid === tagId ? { ...tag, isFollowed: false } : tag
                  ) || [],
                };
              }
              return draft;
            })
          );
        }
      },
    }),

    /**
     * Unfollow a tag.
     * @param tagId - Tag ID to unfollow
     * @returns void
     */
    unfollowTag: build.mutation<void, string>({
      query: (tagId) => ({
        url: `/${tagId}/follow`,
        method: 'DELETE'
      }),
      transformErrorResponse,
      invalidatesTags: (result, error, tagId) => [
        { type: 'Tag', id: tagId },
        'PopularTags'
      ],
      // Optimistic update for unfollow status
      onQueryStarted: async (tagId, { dispatch, queryFulfilled }) => {
        // Update the tag in cache optimistically
        dispatch(
          tagApi.util.updateQueryData('getTagById', tagId, (draft) => {
            if (draft) {
              return { ...draft, isFollowed: false };
            }
            return draft;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error
          dispatch(
            tagApi.util.updateQueryData('getTagById', tagId, (draft) => {
              if (draft) {
                return { ...draft, isFollowed: true };
              }
              return draft;
            })
          );
        }
      },
    }),

    /**
     * Get followed tags for a user.
     * @param userId - User ID (optional, defaults to current user)
     * @returns Followed tags list
     */
    getFollowedTags: build.query<Tag[], string | void>({
      query: (userId) => ({
        url: '/followed',
        params: userId ? { userId } : {}
      }),
      providesTags: ['Tags'],
    }),
  }),
})

// Export hooks for all endpoints
export const {
  useCreateTagMutation,
  useUpdateTagMutation,
  useGetTagByIdQuery,
  useDeleteTagMutation,
  useGetAllTagsQuery,
  useGetPopularTagsQuery,
  useSearchTagsQuery,
  useGetTagsByArticleQuery,
  useGetTagStatsQuery,
  useFollowTagMutation,
  useUnfollowTagMutation,
  useGetFollowedTagsQuery,
} = tagApi

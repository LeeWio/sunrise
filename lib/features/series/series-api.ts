// Series API types and interfaces matching backend Horizon project

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { Page, ResultResponse } from "@/types";

import { createApi } from "@reduxjs/toolkit/query/react";

import { createBaseQuery } from "../utils/base-query";

// Series status enum matching backend SeriesStatus
export type SeriesStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

// Series interface matching backend SeriesVO
export interface Series {
  /** Series ID */
  sid: string;

  /** Series name */
  name: string;

  /** Series slug (URL-friendly identifier) */
  slug: string;

  /** Series description */
  description?: string;

  /** Cover image URL */
  coverImage?: string;

  /** Series status */
  status: SeriesStatus;

  /** Author ID */
  authorId: string;

  /** Creation timestamp */
  createdAt?: string;

  /** Update timestamp */
  updatedAt?: string;

  /** Number of articles in this series */
  articleCount?: number;
}

// Series with detailed information
export interface SeriesDetail extends Series {
  /** Author information */
  author?: {
    uid: string;
    username: string;
    avatar?: string;
  };

  /** Articles in this series */
  articles?: Array<{
    aid: string;
    title: string;
    slug: string;
    summary?: string;
    coverImage?: string;
    publishedAt: string;
    readTime?: number;
  }>;

  /** Series statistics */
  stats?: {
    totalArticles: number;
    totalViews: number;
    totalLikes: number;
    averageReadTime: number;
    completionRate?: number;
  };

  /** Whether current user follows this series */
  isFollowed?: boolean;

  /** Whether current user can edit this series */
  canEdit?: boolean;
}

// Request/Response types for series operations
export interface CreateSeriesRequest {
  /** Series name */
  name: string;

  /** Series slug */
  slug?: string;

  /** Series description */
  description?: string;

  /** Cover image URL */
  coverImage?: string;

  /** Series status */
  status?: SeriesStatus;

  /** Author ID */
  authorId: string;
}

export interface UpdateSeriesRequest {
  /** Series ID */
  sid: string;

  /** Series name */
  name?: string;

  /** Series slug */
  slug?: string;

  /** Series description */
  description?: string;

  /** Cover image URL */
  coverImage?: string;

  /** Series status */
  status?: SeriesStatus;
}

export interface SearchSeriesRequest {
  /** Search keyword */
  keyword?: string;

  /** Author ID filter */
  authorId?: string;

  /** Status filter */
  status?: SeriesStatus;

  /** Page number (0-based) */
  page?: number;

  /** Page size */
  size?: number;

  /** Sort field */
  sortBy?: "name" | "createdAt" | "updatedAt" | "articleCount";

  /** Sort direction */
  sortDirection?: "asc" | "desc";
}

export interface AddToSeriesRequest {
  /** Series ID */
  seriesId: string;

  /** Article IDs to add */
  articleIds: string[];
}

export interface ReorderSeriesArticlesRequest {
  /** Series ID */
  seriesId: string;

  /** Article IDs in new order */
  articleIds: string[];
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

const seriesApi = createApi({
  reducerPath: "series-api",

  tagTypes: [
    "Series",
    "SeriesList",
    "SeriesDetail",
    "PopularSeries",
    "FollowedSeries",
  ],

  baseQuery: createBaseQuery({
    baseUrl: "/api/series",
  }),

  // Global configuration for cache invalidation and behavior
  keepUnusedDataFor: 60, // Keep unused data for 60 seconds
  refetchOnMountOrArgChange: 30, // Refetch if arg changes or 30 seconds old
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (build) => ({
    /**
     * Create a new series.
     * @param seriesData - Series data for creation
     * @returns Created series entity
     */
    createSeries: build.mutation<Series, CreateSeriesRequest>({
      query: (seriesData) => ({
        url: "/create",
        method: "POST",
        body: seriesData,
      }),
      transformResponse: (response: ResultResponse<Series>) =>
        transformResponse(response),
      transformErrorResponse,
      invalidatesTags: ["SeriesList"],
      // Optimistic update for better UX
      onQueryStarted: async (seriesData, { dispatch, queryFulfilled }) => {
        // Optimistic update: immediately add a temporary series
        const tempSeries: Series = {
          sid: `temp-${Date.now()}`,
          name: seriesData.name,
          slug:
            seriesData.slug ||
            seriesData.name.toLowerCase().replace(/\s+/g, "-"),
          description: seriesData.description,
          coverImage: seriesData.coverImage,
          status: seriesData.status || "DRAFT",
          authorId: seriesData.authorId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          articleCount: 0,
        };

        // Patch the cache with optimistic update
        dispatch(
          seriesApi.util.updateQueryData("getAllSeries", undefined, (draft) => {
            if (draft) {
              return {
                ...draft,
                content: [tempSeries, ...(draft.content || [])],
                totalElements: (draft.totalElements || 0) + 1,
              };
            }

            return draft;
          }),
        );

        try {
          const { data } = await queryFulfilled;

          // Replace optimistic update with real data
          dispatch(
            seriesApi.util.updateQueryData(
              "getAllSeries",
              undefined,
              (draft) => {
                if (draft) {
                  return {
                    ...draft,
                    content: draft.content?.map((series) =>
                      series.sid === tempSeries.sid ? data : series,
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
            seriesApi.util.updateQueryData(
              "getAllSeries",
              undefined,
              (draft) => {
                if (draft) {
                  return {
                    ...draft,
                    content:
                      draft.content?.filter(
                        (series) => series.sid !== tempSeries.sid,
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
     * Update an existing series.
     * @param seriesData - Series data with ID for update
     * @returns Updated series entity
     */
    updateSeries: build.mutation<Series, UpdateSeriesRequest>({
      query: ({ sid, ...patch }) => ({
        url: `/${sid}`,
        method: "PUT",
        body: patch,
      }),
      transformResponse: (response: ResultResponse<Series>) =>
        transformResponse(response),
      transformErrorResponse,
      invalidatesTags: (result, error, { sid }) => [
        { type: "Series", id: sid },
        { type: "SeriesDetail", id: sid },
        "SeriesList",
        "PopularSeries",
      ],
      // Optimistic update for series changes
      onQueryStarted: async (
        { sid, ...patch },
        { dispatch, queryFulfilled },
      ) => {
        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error - refetch data
          dispatch(
            seriesApi.util.invalidateTags([
              "SeriesDetail",
              "SeriesList",
              "PopularSeries",
            ]),
          );
        }
      },
    }),

    /**
     * Get series by ID.
     * @param seriesId - Series ID
     * @returns Series detail entity
     */
    getSeriesById: build.query<SeriesDetail, string>({
      query: (seriesId) => `/${seriesId}`,
      transformResponse: (response: ResultResponse<SeriesDetail>) =>
        transformResponse(response),
      transformErrorResponse,
      providesTags: (result, error, seriesId) => [
        { type: "SeriesDetail", id: seriesId },
      ],
    }),

    /**
     * Delete a series.
     * @param seriesId - Series ID to delete
     * @returns void
     */
    deleteSeries: build.mutation<void, string>({
      query: (seriesId) => ({
        url: `/${seriesId}`,
        method: "DELETE",
      }),
      transformErrorResponse,
      invalidatesTags: (result, error, seriesId) => [
        { type: "Series", id: seriesId },
        { type: "SeriesDetail", id: seriesId },
        "SeriesList",
        "PopularSeries",
        "FollowedSeries",
      ],
    }),

    /**
     * Get all series with pagination and search.
     * @param params - Search and pagination parameters
     * @returns Paginated series list
     */
    getAllSeries: build.query<Page<Series>, SearchSeriesRequest | void>({
      query: (params) => ({
        url: "",
        params: params || {},
      }),
      transformResponse: (response: ResultResponse<Page<Series>>) =>
        transformPaginatedResponse(response),
      transformErrorResponse,
      providesTags: ["SeriesList"],
      // Subscribe to real-time updates
      async onCacheEntryAdded(arg, api) {
        // Set up WebSocket subscription for real-time series updates
        const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/series`;

        if (typeof window !== "undefined") {
          const ws = new WebSocket(wsUrl);

          ws.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data);

              if (
                data.type === "SERIES_CREATED" ||
                data.type === "SERIES_UPDATED" ||
                data.type === "SERIES_DELETED"
              ) {
                // Invalidate cache when series change
                api.dispatch(
                  seriesApi.util.invalidateTags([
                    "SeriesList",
                    "PopularSeries",
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
     * Get series by author.
     * @param params - Author ID and pagination parameters
     * @returns Paginated series list
     */
    getSeriesByAuthor: build.query<
      Page<Series>,
      { authorId: string; page?: number; size?: number }
    >({
      query: ({ authorId, page = 0, size = 10 }) => ({
        url: "/author",
        params: { authorId, page, size },
      }),
      transformResponse: (response: ResultResponse<Page<Series>>) =>
        transformPaginatedResponse(response),
      transformErrorResponse,
      providesTags: ["SeriesList"],
    }),

    /**
     * Get popular series.
     * @param limit - Optional limit count
     * @returns Popular series list
     */
    getPopularSeries: build.query<Series[], number | void>({
      query: (limit) => ({
        url: "/popular",
        params: limit ? { limit } : {},
      }),
      transformResponse: (response: ResultResponse<Series[]>) =>
        transformResponse(response),
      transformErrorResponse,
      providesTags: ["PopularSeries"],
    }),

    /**
     * Get published series.
     * @param params - Pagination parameters
     * @returns Paginated published series list
     */
    getPublishedSeries: build.query<
      Page<Series>,
      { page?: number; size?: number }
    >({
      query: ({ page = 0, size = 10 }) => ({
        url: "/published",
        params: { page, size },
      }),
      transformResponse: (response: ResultResponse<Page<Series>>) =>
        transformPaginatedResponse(response),
      transformErrorResponse,
      providesTags: ["SeriesList"],
    }),

    /**
     * Search series by keyword.
     * @param params - Search parameters
     * @returns Search results
     */
    searchSeries: build.query<
      Page<Series>,
      { keyword: string; page?: number; size?: number }
    >({
      query: ({ keyword, page = 0, size = 10 }) => ({
        url: "/search",
        params: { keyword, page, size },
      }),
      transformResponse: (response: ResultResponse<Page<Series>>) =>
        transformPaginatedResponse(response),
      transformErrorResponse,
      providesTags: ["SeriesList"],
    }),

    /**
     * Add articles to a series.
     * @param request - Add to series request
     * @returns Updated series entity
     */
    addArticlesToSeries: build.mutation<Series, AddToSeriesRequest>({
      query: (request) => ({
        url: `/${request.seriesId}/articles`,
        method: "POST",
        body: { articleIds: request.articleIds },
      }),
      transformResponse: (response: ResultResponse<Series>) =>
        transformResponse(response),
      transformErrorResponse,
      invalidatesTags: (result, error, { seriesId }) => [
        { type: "Series", id: seriesId },
        { type: "SeriesDetail", id: seriesId },
        "SeriesList",
      ],
      // Optimistic update for article count
      onQueryStarted: async (
        { seriesId, articleIds },
        { dispatch, queryFulfilled },
      ) => {
        // Update the series in cache optimistically
        dispatch(
          seriesApi.util.updateQueryData("getSeriesById", seriesId, (draft) => {
            if (draft) {
              return {
                ...draft,
                articleCount: (draft.articleCount || 0) + articleIds.length,
              };
            }

            return draft;
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error - refetch data
          dispatch(seriesApi.util.invalidateTags(["SeriesDetail"]));
        }
      },
    }),

    /**
     * Remove articles from a series.
     * @param params - Series ID and article IDs to remove
     * @returns Updated series entity
     */
    removeArticlesFromSeries: build.mutation<
      Series,
      { seriesId: string; articleIds: string[] }
    >({
      query: ({ seriesId, articleIds }) => ({
        url: `/${seriesId}/articles`,
        method: "DELETE",
        body: { articleIds },
      }),
      transformResponse: (response: ResultResponse<Series>) =>
        transformResponse(response),
      transformErrorResponse,
      invalidatesTags: (result, error, { seriesId }) => [
        { type: "Series", id: seriesId },
        { type: "SeriesDetail", id: seriesId },
        "SeriesList",
      ],
      // Optimistic update for article count
      onQueryStarted: async (
        { seriesId, articleIds },
        { dispatch, queryFulfilled },
      ) => {
        // Update the series in cache optimistically
        dispatch(
          seriesApi.util.updateQueryData("getSeriesById", seriesId, (draft) => {
            if (draft) {
              return {
                ...draft,
                articleCount: Math.max(
                  0,
                  (draft.articleCount || 0) - articleIds.length,
                ),
              };
            }

            return draft;
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error - refetch data
          dispatch(seriesApi.util.invalidateTags(["SeriesDetail"]));
        }
      },
    }),

    /**
     * Get articles in a series.
     * @param params - Series ID and pagination parameters
     * @returns Paginated article list
     */
    getSeriesArticles: build.query<
      Page<any>,
      { seriesId: string; page?: number; size?: number }
    >({
      query: ({ seriesId, page = 0, size = 10 }) => ({
        url: `/${seriesId}/articles`,
        params: { page, size },
      }),
      transformResponse: (response: ResultResponse<Page<any>>) =>
        transformPaginatedResponse(response),
      transformErrorResponse,
      providesTags: (result, error, { seriesId }) => [
        { type: "SeriesDetail", id: seriesId },
      ],
    }),

    /**
     * Reorder articles in a series.
     * @param request - Reorder request
     * @returns Updated series entity
     */
    reorderSeriesArticles: build.mutation<Series, ReorderSeriesArticlesRequest>(
      {
        query: (request) => ({
          url: `/${request.seriesId}/articles/reorder`,
          method: "POST",
          body: { articleIds: request.articleIds },
        }),
        transformResponse: (response: ResultResponse<Series>) =>
          transformResponse(response),
        transformErrorResponse,
        invalidatesTags: (result, error, { seriesId }) => [
          { type: "SeriesDetail", id: seriesId },
        ],
        // Optimistic update for article ordering
        onQueryStarted: async ({ seriesId }, { dispatch, queryFulfilled }) => {
          try {
            await queryFulfilled;
          } catch {
            // Revert optimistic update on error - refetch data
            dispatch(seriesApi.util.invalidateTags(["SeriesDetail"]));
          }
        },
      },
    ),

    /**
     * Follow a series.
     * @param seriesId - Series ID to follow
     * @returns void
     */
    followSeries: build.mutation<void, string>({
      query: (seriesId) => ({
        url: `/${seriesId}/follow`,
        method: "POST",
      }),
      transformErrorResponse,
      invalidatesTags: (result, error, seriesId) => [
        { type: "SeriesDetail", id: seriesId },
        "PopularSeries",
        "FollowedSeries",
      ],
      // Optimistic update for follow status
      onQueryStarted: async (seriesId, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error - refetch data
          dispatch(
            seriesApi.util.invalidateTags([
              "SeriesDetail",
              "PopularSeries",
              "FollowedSeries",
            ]),
          );
        }
      },
    }),

    /**
     * Unfollow a series.
     * @param seriesId - Series ID to unfollow
     * @returns void
     */
    unfollowSeries: build.mutation<void, string>({
      query: (seriesId) => ({
        url: `/${seriesId}/follow`,
        method: "DELETE",
      }),
      transformErrorResponse,
      invalidatesTags: (result, error, seriesId) => [
        { type: "SeriesDetail", id: seriesId },
        "PopularSeries",
        "FollowedSeries",
      ],
      // Optimistic update for unfollow status
      onQueryStarted: async (seriesId, { dispatch, queryFulfilled }) => {
        // Update the series in cache optimistically
        dispatch(
          seriesApi.util.updateQueryData("getSeriesById", seriesId, (draft) => {
            if (draft) {
              return { ...draft, isFollowed: false };
            }

            return draft;
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error
          dispatch(
            seriesApi.util.updateQueryData(
              "getSeriesById",
              seriesId,
              (draft) => {
                if (draft) {
                  return { ...draft, isFollowed: true };
                }

                return draft;
              },
            ),
          );
        }
      },
    }),

    /**
     * Get followed series for user.
     * @param params - User ID and pagination parameters
     * @returns Paginated followed series list
     */
    getFollowedSeries: build.query<
      Page<Series>,
      { userId?: string; page?: number; size?: number }
    >({
      query: ({ userId, page = 0, size = 10 }) => ({
        url: "/followed",
        params: userId ? { userId, page, size } : { page, size },
      }),
      transformResponse: (response: ResultResponse<Page<Series>>) =>
        transformPaginatedResponse(response),
      transformErrorResponse,
      providesTags: ["FollowedSeries"],
    }),

    /**
     * Get series statistics.
     * @param seriesId - Series ID
     * @returns Series statistics
     */
    getSeriesStats: build.query<
      {
        totalArticles: number;
        totalViews: number;
        totalLikes: number;
        totalFollowers: number;
        recentActivity: Array<{
          type: "article_added" | "article_updated" | "series_updated";
          timestamp: string;
          details: any;
        }>;
      },
      string
    >({
      query: (seriesId) => `/${seriesId}/stats`,
      transformResponse: (
        response: ResultResponse<{
          totalArticles: number;
          totalViews: number;
          totalLikes: number;
          totalFollowers: number;
          recentActivity: Array<{
            type: "article_added" | "article_updated" | "series_updated";
            timestamp: string;
            details: any;
          }>;
        }>,
      ) => transformResponse(response),
      transformErrorResponse,
      providesTags: (result, error, seriesId) => [
        { type: "SeriesDetail", id: seriesId },
      ],
    }),

    /**
     * Get author series statistics.
     * @param authorId - Author ID
     * @returns Author series statistics
     */
    getAuthorSeriesStats: build.query<
      {
        totalSeries: number;
        totalArticles: number;
        totalViews: number;
        totalFollowers: number;
        popularSeries: Series[];
      },
      string
    >({
      query: (authorId) => `/author/${authorId}/stats`,
      transformResponse: (
        response: ResultResponse<{
          totalSeries: number;
          totalArticles: number;
          totalViews: number;
          totalFollowers: number;
          popularSeries: Series[];
        }>,
      ) => transformResponse(response),
      transformErrorResponse,
      providesTags: ["SeriesList", "PopularSeries"],
    }),
  }),
});

// Export hooks for all endpoints
export const {
  useCreateSeriesMutation,
  useUpdateSeriesMutation,
  useGetSeriesByIdQuery,
  useDeleteSeriesMutation,
  useGetAllSeriesQuery,
  useGetSeriesByAuthorQuery,
  useGetPopularSeriesQuery,
  useGetPublishedSeriesQuery,
  useSearchSeriesQuery,
  useAddArticlesToSeriesMutation,
  useRemoveArticlesFromSeriesMutation,
  useGetSeriesArticlesQuery,
  useReorderSeriesArticlesMutation,
  useFollowSeriesMutation,
  useUnfollowSeriesMutation,
  useGetFollowedSeriesQuery,
  useGetSeriesStatsQuery,
  useGetAuthorSeriesStatsQuery,
} = seriesApi;

// Export the API slice itself for usage in other slices
export { seriesApi };

// Types are already exported above


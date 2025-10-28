// Article API types and interfaces matching backend Horizon project

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { Page, ResultResponse } from "@/types";

import { createApi } from "@reduxjs/toolkit/query/react";

import { createBaseQuery } from "../utils/base-query";

// Article status enum matching backend ArticleStatus
export type ArticleStatus =
  | "REVIEW"
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED"
  | "SCHEDULED";

// Author interface (simplified User)
export interface Author {
  uid: string;
  username: string;
  email: string;
  avatar?: string;
}

// Category interface (from CategoryVO)
export interface Category {
  cid: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Series interface (from SeriesVO)
export interface Series {
  sid: string;
  name: string;
  slug: string;
  description?: string;
  coverImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Tag interface (from TagVO)
export interface Tag {
  tid: string;
  name: string;
  slug: string;
  icon?: string;
  color?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Article interface matching backend ArticleVO
export interface Article {
  /** Article ID */
  aid: string;

  /** Article title */
  title: string;

  /** Article slug (URL-friendly identifier) */
  slug: string;

  /** Article summary/excerpt */
  summary?: string;

  /** Article content (full text) */
  content: string;

  /** Cover image URL */
  coverImage?: string;

  /** Article status */
  status: ArticleStatus;

  /** Author ID */
  authorId: string;

  /** Creator user ID */
  createdBy?: string;

  /** Updater user ID */
  updatedBy?: string;

  /** Creation timestamp */
  createdAt: string;

  /** Update timestamp */
  updatedAt: string;

  /** Whether article is featured */
  isFeatured?: boolean;

  /** View count */
  viewCount?: number;

  /** Associated categories */
  categories?: Category[];

  /** Associated series */
  series?: Series[];

  /** Associated tags */
  tags?: Tag[];
}

// SEO metadata interface (from ArticleDetailVO.SeoMetadata)
export interface SeoMetadata {
  /** SEO title */
  seoTitle?: string;

  /** SEO description */
  seoDescription?: string;

  /** SEO keywords */
  seoKeywords?: string;

  /** Canonical URL */
  canonicalUrl?: string;

  /** Open Graph title */
  ogTitle?: string;

  /** Open Graph description */
  ogDescription?: string;

  /** Open Graph image */
  ogImage?: string;

  /** Open Graph type */
  ogType?: string;

  /** Twitter card type */
  twitterCard?: string;

  /** Twitter site */
  twitterSite?: string;

  /** JSON-LD structured data */
  jsonLd?: string;

  /** Robots meta tag */
  robotsMeta?: string;
}

// Interaction statistics interface (from ArticleDetailVO.InteractionStats)
export interface InteractionStats {
  /** Like count */
  likeCount?: number;

  /** Favorite/bookmark count */
  favoriteCount?: number;

  /** Share count */
  shareCount?: number;

  /** Comment count */
  commentCount?: number;

  /** Current user's like status */
  isLiked?: boolean;

  /** Current user's favorite status */
  isFavorited?: boolean;
}

// Article detail interface (from ArticleDetailVO)
export interface ArticleDetail extends Article {
  /** SEO metadata */
  seo?: SeoMetadata;

  /** Interaction statistics */
  stats?: InteractionStats;

  /** Meta tags map for frontend rendering */
  metaTags?: Record<string, string>;

  /** Open Graph tags map */
  ogTags?: Record<string, string>;
}

// Request/Response types for article operations
export interface CreateArticleRequest {
  /** Article title */
  title: string;

  /** Article slug */
  slug?: string;

  /** Article summary */
  summary?: string;

  /** Article content */
  content: string;

  /** Cover image URL */
  coverImage?: string;

  /** Article status */
  status?: ArticleStatus;

  /** Scheduled publish time */
  publishTime?: string;

  /** Author ID */
  authorId: string;

  /** Category IDs */
  categoryIds?: string[];

  /** Series IDs */
  seriesIds?: string[];

  /** Tag IDs */
  tagIds?: string[];
}

export interface UpdateArticleRequest {
  /** Article ID */
  aid: string;

  /** Article title */
  title?: string;

  /** Article slug */
  slug?: string;

  /** Article summary */
  summary?: string;

  /** Article content */
  content?: string;

  /** Cover image URL */
  coverImage?: string;

  /** Article status */
  status?: ArticleStatus;

  /** Scheduled publish time */
  publishTime?: string;

  /** Category IDs */
  categoryIds?: string[];

  /** Series IDs */
  seriesIds?: string[];

  /** Tag IDs */
  tagIds?: string[];
}

export interface SearchArticlesRequest {
  /** Search keyword */
  keyword?: string;

  /** Author ID filter */
  authorId?: string;

  /** Category ID filter */
  categoryId?: string;

  /** Tag ID filter */
  tagId?: string;

  /** Status filter */
  status?: ArticleStatus;

  /** Featured filter */
  isFeatured?: boolean;

  /** Page number (0-based) */
  page?: number;

  /** Page size */
  size?: number;

  /** Sort field */
  sortBy?: "createdAt" | "updatedAt" | "title" | "viewCount";

  /** Sort direction */
  sortDirection?: "asc" | "desc";
}

export interface TrendingArticlesRequest {
  /** Time period (day, week, month) */
  period?: "day" | "week" | "month";

  /** Limit count */
  limit?: number;

  /** Category filter */
  categoryId?: string;
}

export interface InteractionRequest {
  /** Article ID */
  articleId: string;

  /** Interaction type */
  type: "LIKE" | "FAVORITE" | "SHARE";

  /** Action (true for add, false for remove) */
  action: boolean;
}

export interface RecordReadingRequest {
  /** Article ID */
  articleId: string;

  /** Reading duration in seconds */
  duration?: number;

  /** Read percentage (0-100) */
  percentage?: number;
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

const articleApi = createApi({
  reducerPath: "article-api",

  tagTypes: [
    "Article",
    "Articles",
    "ArticleDetail",
    "TrendingArticles",
    "FeaturedArticles",
  ],

  baseQuery: createBaseQuery({
    baseUrl: "/api/article",
  }),

  // Global configuration for cache invalidation and behavior
  keepUnusedDataFor: 60, // Keep unused data for 60 seconds
  refetchOnMountOrArgChange: 30, // Refetch if arg changes or 30 seconds old
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (build) => ({
    /**
     * Create a new article.
     * @param articleData - Article data for creation
     * @returns Created article entity
     */
    createArticle: build.mutation<Article, CreateArticleRequest>({
      query: (articleData) => ({
        url: "/create",
        method: "POST",
        body: articleData,
      }),
      transformResponse: (response: ResultResponse<Article>) =>
        transformResponse(response),
      transformErrorResponse,
      invalidatesTags: ["Articles"],
      // Optimistic update for better UX
      onQueryStarted: async (articleData, { dispatch, queryFulfilled }) => {
        // Optimistic update: immediately add a temporary article
        const tempArticle: Article = {
          aid: `temp-${Date.now()}`,
          title: articleData.title,
          slug:
            articleData.slug ||
            articleData.title.toLowerCase().replace(/\s+/g, "-"),
          summary: articleData.summary,
          content: articleData.content,
          coverImage: articleData.coverImage,
          status: articleData.status || "DRAFT",
          authorId: articleData.authorId,
          createdBy: articleData.authorId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isFeatured: false,
          viewCount: 0,
        };

        // Patch the cache with optimistic update
        dispatch(
          articleApi.util.updateQueryData(
            "getAllArticles",
            undefined,
            (draft) => {
              if (draft) {
                return {
                  ...draft,
                  content: [tempArticle, ...(draft.content || [])],
                  totalElements: (draft.totalElements || 0) + 1,
                };
              }

              return draft;
            },
          ),
        );

        try {
          const { data } = await queryFulfilled;

          // Replace optimistic update with real data
          dispatch(
            articleApi.util.updateQueryData(
              "getAllArticles",
              undefined,
              (draft) => {
                if (draft) {
                  return {
                    ...draft,
                    content: draft.content?.map((article) =>
                      article.aid === tempArticle.aid ? data : article,
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
            articleApi.util.updateQueryData(
              "getAllArticles",
              undefined,
              (draft) => {
                if (draft) {
                  return {
                    ...draft,
                    content:
                      draft.content?.filter(
                        (article) => article.aid !== tempArticle.aid,
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
     * Update an existing article.
     * @param articleData - Article data with ID for update
     * @returns Updated article entity
     */
    updateArticle: build.mutation<Article, UpdateArticleRequest>({
      query: ({ aid, ...patch }) => ({
        url: `/${aid}`,
        method: "PUT",
        body: patch,
      }),
      transformResponse: (response: ResultResponse<Article>) =>
        transformResponse(response),
      transformErrorResponse,
      invalidatesTags: (result, error, { aid }) => [
        { type: "Article", id: aid },
        { type: "ArticleDetail", id: aid },
        "Articles",
      ],
      // Optimistic update for article changes
      onQueryStarted: async (
        { aid, ...patch },
        { dispatch, queryFulfilled },
      ) => {
        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error - refetch data
          dispatch(
            articleApi.util.invalidateTags(["ArticleDetail", "Articles"]),
          );
        }
      },
    }),

    /**
     * Get article by ID.
     * @param articleId - Article ID
     * @returns Article detail entity
     */
    getArticleById: build.query<ArticleDetail, string>({
      query: (articleId) => `/${articleId}`,
      transformResponse: (response: ResultResponse<ArticleDetail>) =>
        transformResponse(response),
      transformErrorResponse,
      providesTags: (result, error, articleId) => [
        { type: "ArticleDetail", id: articleId },
      ],
    }),

    /**
     * Delete an article.
     * @param articleId - Article ID to delete
     * @returns void
     */
    deleteArticle: build.mutation<void, string>({
      query: (articleId) => ({
        url: `/${articleId}`,
        method: "DELETE",
      }),
      transformErrorResponse,
      invalidatesTags: (result, error, articleId) => [
        { type: "Article", id: articleId },
        { type: "ArticleDetail", id: articleId },
        "Articles",
      ],
    }),

    /**
     * Get all articles with pagination and search.
     * @param params - Search and pagination parameters
     * @returns Paginated article list
     */
    getAllArticles: build.query<Page<Article>, SearchArticlesRequest | void>({
      query: (params) => ({
        url: "",
        params: params || {},
      }),
      transformResponse: (response: ResultResponse<Page<Article>>) =>
        transformPaginatedResponse(response),
      transformErrorResponse,
      providesTags: ["Articles"],
      // Subscribe to real-time updates
      async onCacheEntryAdded(arg, api) {
        // Set up WebSocket subscription for real-time article updates
        const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/articles`;

        if (typeof window !== "undefined") {
          const ws = new WebSocket(wsUrl);

          ws.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data);

              if (
                data.type === "ARTICLE_CREATED" ||
                data.type === "ARTICLE_UPDATED" ||
                data.type === "ARTICLE_DELETED"
              ) {
                // Invalidate cache when articles change
                api.dispatch(articleApi.util.invalidateTags(["Articles"]));
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
     * Get trending articles.
     * @param params - Trending articles parameters
     * @returns Trending articles list
     */
    getTrendingArticles: build.query<Article[], TrendingArticlesRequest | void>(
      {
        query: (params) => ({
          url: "/trending",
          params: params || {},
        }),
        transformResponse: (response: ResultResponse<Article[]>) =>
          transformResponse(response),
        transformErrorResponse,
        providesTags: ["TrendingArticles"],
      },
    ),

    /**
     * Get featured articles.
     * @param limit - Optional limit count
     * @returns Featured articles list
     */
    getFeaturedArticles: build.query<Article[], number | void>({
      query: (limit) => ({
        url: "/featured",
        params: limit ? { limit } : {},
      }),
      transformResponse: (response: ResultResponse<Article[]>) =>
        transformResponse(response),
      transformErrorResponse,
      providesTags: ["FeaturedArticles"],
    }),

    /**
     * Get articles by author.
     * @param params - Author ID and pagination parameters
     * @returns Paginated article list
     */
    getArticlesByAuthor: build.query<
      Page<Article>,
      { authorId: string; page?: number; size?: number }
    >({
      query: ({ authorId, page = 0, size = 10 }) => ({
        url: "/author",
        params: { authorId, page, size },
      }),
      transformResponse: (response: ResultResponse<Page<Article>>) =>
        transformPaginatedResponse(response),
      transformErrorResponse,
      providesTags: ["Articles"],
    }),

    /**
     * Get articles by category.
     * @param params - Category ID and pagination parameters
     * @returns Paginated article list
     */
    getArticlesByCategory: build.query<
      Page<Article>,
      { categoryId: string; page?: number; size?: number }
    >({
      query: ({ categoryId, page = 0, size = 10 }) => ({
        url: "/category",
        params: { categoryId, page, size },
      }),
      transformResponse: (response: ResultResponse<Page<Article>>) =>
        transformPaginatedResponse(response),
      transformErrorResponse,
      providesTags: ["Articles"],
    }),

    /**
     * Get articles by tag.
     * @param params - Tag ID and pagination parameters
     * @returns Paginated article list
     */
    getArticlesByTag: build.query<
      Page<Article>,
      { tagId: string; page?: number; size?: number }
    >({
      query: ({ tagId, page = 0, size = 10 }) => ({
        url: "/tag",
        params: { tagId, page, size },
      }),
      transformResponse: (response: ResultResponse<Page<Article>>) =>
        transformPaginatedResponse(response),
      transformErrorResponse,
      providesTags: ["Articles"],
    }),

    /**
     * Get articles by series.
     * @param params - Series ID and pagination parameters
     * @returns Paginated article list
     */
    getArticlesBySeries: build.query<
      Page<Article>,
      { seriesId: string; page?: number; size?: number }
    >({
      query: ({ seriesId, page = 0, size = 10 }) => ({
        url: "/series",
        params: { seriesId, page, size },
      }),
      transformResponse: (response: ResultResponse<Page<Article>>) =>
        transformPaginatedResponse(response),
      transformErrorResponse,
      providesTags: ["Articles"],
    }),

    /**
     * Like or unlike an article.
     * @param interactionData - Article interaction data
     * @returns void
     */
    likeArticle: build.mutation<void, { articleId: string; action: boolean }>({
      query: ({ articleId, action }) => ({
        url: `/${articleId}/like`,
        method: action ? "POST" : "DELETE",
      }),
      transformErrorResponse,
      invalidatesTags: (result, error, { articleId }) => [
        { type: "ArticleDetail", id: articleId },
        "TrendingArticles",
      ],
      // Optimistic update for like status
      onQueryStarted: async (
        { articleId, action },
        { dispatch, queryFulfilled },
      ) => {
        // Update the article in cache optimistically
        dispatch(
          articleApi.util.updateQueryData(
            "getArticleById",
            articleId,
            (draft) => {
              if (draft && draft.stats) {
                return {
                  ...draft,
                  stats: {
                    ...draft.stats,
                    isLiked: action,
                    likeCount: action
                      ? (draft.stats.likeCount || 0) + 1
                      : Math.max(0, (draft.stats.likeCount || 0) - 1),
                  },
                };
              }

              return draft;
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error
          dispatch(
            articleApi.util.updateQueryData(
              "getArticleById",
              articleId,
              (draft) => {
                if (draft && draft.stats) {
                  return {
                    ...draft,
                    stats: {
                      ...draft.stats,
                      isLiked: !action,
                      likeCount: action
                        ? Math.max(0, (draft.stats.likeCount || 0) - 1)
                        : (draft.stats.likeCount || 0) + 1,
                    },
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
     * Favorite or unfavorite an article.
     * @param interactionData - Article interaction data
     * @returns void
     */
    favoriteArticle: build.mutation<
      void,
      { articleId: string; action: boolean }
    >({
      query: ({ articleId, action }) => ({
        url: `/${articleId}/favorite`,
        method: action ? "POST" : "DELETE",
      }),
      transformErrorResponse,
      invalidatesTags: (result, error, { articleId }) => [
        { type: "ArticleDetail", id: articleId },
      ],
      // Optimistic update for favorite status
      onQueryStarted: async (
        { articleId, action },
        { dispatch, queryFulfilled },
      ) => {
        // Update the article in cache optimistically
        dispatch(
          articleApi.util.updateQueryData(
            "getArticleById",
            articleId,
            (draft) => {
              if (draft && draft.stats) {
                return {
                  ...draft,
                  stats: {
                    ...draft.stats,
                    isFavorited: action,
                    favoriteCount: action
                      ? (draft.stats.favoriteCount || 0) + 1
                      : Math.max(0, (draft.stats.favoriteCount || 0) - 1),
                  },
                };
              }

              return draft;
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error
          dispatch(
            articleApi.util.updateQueryData(
              "getArticleById",
              articleId,
              (draft) => {
                if (draft && draft.stats) {
                  return {
                    ...draft,
                    stats: {
                      ...draft.stats,
                      isFavorited: !action,
                      favoriteCount: action
                        ? Math.max(0, (draft.stats.favoriteCount || 0) - 1)
                        : (draft.stats.favoriteCount || 0) + 1,
                    },
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
     * Share an article.
     * @param articleId - Article ID
     * @returns void
     */
    shareArticle: build.mutation<void, string>({
      query: (articleId) => ({
        url: `/${articleId}/share`,
        method: "POST",
      }),
      transformErrorResponse,
      invalidatesTags: (result, error, articleId) => [
        { type: "ArticleDetail", id: articleId },
      ],
      // Optimistic update for share count
      onQueryStarted: async (articleId, { dispatch, queryFulfilled }) => {
        // Update the article in cache optimistically
        dispatch(
          articleApi.util.updateQueryData(
            "getArticleById",
            articleId,
            (draft) => {
              if (draft && draft.stats) {
                return {
                  ...draft,
                  stats: {
                    ...draft.stats,
                    shareCount: (draft.stats.shareCount || 0) + 1,
                  },
                };
              }

              return draft;
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error
          dispatch(
            articleApi.util.updateQueryData(
              "getArticleById",
              articleId,
              (draft) => {
                if (draft && draft.stats) {
                  return {
                    ...draft,
                    stats: {
                      ...draft.stats,
                      shareCount: Math.max(
                        0,
                        (draft.stats.shareCount || 0) - 1,
                      ),
                    },
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
     * Record reading progress.
     * @param readingData - Reading progress data
     * @returns void
     */
    recordReading: build.mutation<void, RecordReadingRequest>({
      query: (readingData) => ({
        url: `/${readingData.articleId}/reading`,
        method: "POST",
        body: readingData,
      }),
      transformErrorResponse,
      invalidatesTags: (result, error, { articleId }) => [
        { type: "ArticleDetail", id: articleId },
      ],
      // Optimistic update for view count
      onQueryStarted: async ({ articleId }, { dispatch, queryFulfilled }) => {
        // Update the article in cache optimistically
        dispatch(
          articleApi.util.updateQueryData(
            "getArticleById",
            articleId,
            (draft) => {
              if (draft) {
                return {
                  ...draft,
                  viewCount: (draft.viewCount || 0) + 1,
                };
              }

              return draft;
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error
          dispatch(
            articleApi.util.updateQueryData(
              "getArticleById",
              articleId,
              (draft) => {
                if (draft) {
                  return {
                    ...draft,
                    viewCount: Math.max(0, (draft.viewCount || 0) - 1),
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
     * Get reading history for user.
     * @param params - User ID and pagination parameters
     * @returns Paginated article list
     */
    getReadingHistory: build.query<
      Page<Article>,
      { userId?: string; page?: number; size?: number }
    >({
      query: ({ userId, page = 0, size = 10 }) => ({
        url: "/reading-history",
        params: { userId, page, size },
      }),
      transformResponse: (response: ResultResponse<Page<Article>>) =>
        transformPaginatedResponse(response),
      transformErrorResponse,
      providesTags: ["Articles"],
    }),

    /**
     * Publish an article (admin function).
     * @param articleId - Article ID
     * @returns Updated article entity
     */
    publishArticle: build.mutation<Article, string>({
      query: (articleId) => ({
        url: `/${articleId}/publish`,
        method: "POST",
      }),
      transformResponse: (response: ResultResponse<Article>) =>
        transformResponse(response),
      transformErrorResponse,
      invalidatesTags: (result, error, articleId) => [
        { type: "Article", id: articleId },
        { type: "ArticleDetail", id: articleId },
        "Articles",
      ],
    }),

    /**
     * Archive an article (admin function).
     * @param articleId - Article ID
     * @returns Updated article entity
     */
    archiveArticle: build.mutation<Article, string>({
      query: (articleId) => ({
        url: `/${articleId}/archive`,
        method: "POST",
      }),
      transformResponse: (response: ResultResponse<Article>) =>
        transformResponse(response),
      transformErrorResponse,
      invalidatesTags: (result, error, articleId) => [
        { type: "Article", id: articleId },
        { type: "ArticleDetail", id: articleId },
        "Articles",
      ],
    }),

    /**
     * Feature or unfeature an article (admin function).
     * @param params - Article ID and featured status
     * @returns Updated article entity
     */
    featureArticle: build.mutation<
      Article,
      { articleId: string; featured: boolean }
    >({
      query: ({ articleId, featured }) => ({
        url: `/${articleId}/feature`,
        method: "POST",
        body: { featured },
      }),
      transformResponse: (response: ResultResponse<Article>) =>
        transformResponse(response),
      transformErrorResponse,
      invalidatesTags: (result, error, { articleId }) => [
        { type: "Article", id: articleId },
        { type: "ArticleDetail", id: articleId },
        "Articles",
        "FeaturedArticles",
      ],
      // Optimistic update for featured status
      onQueryStarted: async (
        { articleId, featured },
        { dispatch, queryFulfilled },
      ) => {
        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error - refetch data
          dispatch(
            articleApi.util.invalidateTags([
              "ArticleDetail",
              "Articles",
              "FeaturedArticles",
            ]),
          );
        }
      },
    }),
  }),
});

// Export hooks for all endpoints
export const {
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useGetArticleByIdQuery,
  useDeleteArticleMutation,
  useGetAllArticlesQuery,
  useGetTrendingArticlesQuery,
  useGetFeaturedArticlesQuery,
  useGetArticlesByAuthorQuery,
  useGetArticlesByCategoryQuery,
  useGetArticlesByTagQuery,
  useGetArticlesBySeriesQuery,
  useLikeArticleMutation,
  useFavoriteArticleMutation,
  useShareArticleMutation,
  useRecordReadingMutation,
  useGetReadingHistoryQuery,
  usePublishArticleMutation,
  useArchiveArticleMutation,
  useFeatureArticleMutation,
} = articleApi;

// Export the API slice itself for usage in other slices
export { articleApi };

// Types are already exported above


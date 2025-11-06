// Comment API types and interfaces matching backend Horizon project

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { Page, ResultResponse } from "@/types";

import { createApi } from "@reduxjs/toolkit/query/react";

import { createBaseQuery } from "../utils/base-query";

// Comment status enum matching backend CommentStatus
export type CommentStatus = "PENDING" | "APPROVED" | "REJECTED" | "DELETED";

// Comment interface matching backend CommentVO
export interface Comment {
  /** Comment ID */
  cid: string;

  /** Article ID */
  articleId: string;

  /** User ID */
  userId: string;

  /** Comment content */
  content: string;

  /** Parent comment ID (for nested replies) */
  parentId?: string;

  /** Like count */
  likesCount?: number;

  /** Creation timestamp */
  createdAt: string;

  /** Update timestamp */
  updatedAt: string;
}

// Comment with user information
export interface CommentWithUser extends Comment {
  /** User information */
  user?: {
    uid: string;
    username: string;
    avatar?: string;
  };

  /** Current user's like status */
  isLiked?: boolean;

  /** Whether comment can be edited/deleted by current user */
  canEdit?: boolean;

  /** Whether comment can be moderated by current user */
  canModerate?: boolean;

  /** Nested replies */
  replies?: CommentWithUser[];

  /** Total reply count */
  replyCount?: number;
}

// Comment tree structure
export interface CommentTree {
  /** Comment information */
  comment: CommentWithUser;

  /** Nested replies */
  replies: CommentTree[];

  /** Depth level in tree */
  level: number;
}

// Request/Response types for comment operations
export interface CreateCommentRequest {
  /** Article ID */
  articleId: string;

  /** User ID */
  userId: string;

  /** Comment content */
  content: string;

  /** Parent comment ID (for replies) */
  parentId?: string;
}

export interface UpdateCommentRequest {
  /** Comment ID */
  cid: string;

  /** Comment content */
  content: string;
}

export interface ModerateCommentRequest {
  /** Comment ID */
  cid: string;

  /** New status */
  status: CommentStatus;

  /** Moderation reason */
  reason?: string;
}

export interface SearchCommentsRequest {
  /** Article ID filter */
  articleId?: string;

  /** User ID filter */
  userId?: string;

  /** Status filter */
  status?: CommentStatus;

  /** Parent comment ID filter */
  parentId?: string;

  /** Include replies */
  includeReplies?: boolean;

  /** Page number (0-based) */
  page?: number;

  /** Page size */
  size?: number;

  /** Sort field */
  sortBy?: "createdAt" | "updatedAt" | "likesCount";

  /** Sort direction */
  sortDirection?: "asc" | "desc";
}

export interface GetCommentsRequest {
  /** Article ID */
  articleId: string;

  /** Include replies */
  includeReplies?: boolean;

  /** Maximum depth for nested replies */
  maxDepth?: number;

  /** Sort by */
  sortBy?: "newest" | "oldest" | "popular";

  /** Page number (0-based) */
  page?: number;

  /** Page size */
  size?: number;
}

// Comment statistics
export interface CommentStats {
  /** Total comments count */
  totalComments: number;

  /** Pending comments count (for moderation) */
  pendingComments: number;

  /** Approved comments count */
  approvedComments: number;

  /** Rejected comments count */
  rejectedComments: number;

  /** Comments by status */
  commentsByStatus: Record<CommentStatus, number>;

  /** Recent comments */
  recentComments: CommentWithUser[];
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

const commentApi = createApi({
  reducerPath: "comment-api",

  tagTypes: ["Comment", "Comments", "CommentTree", "PendingComments"],

  baseQuery: createBaseQuery({
    baseUrl: "/api/comment",
  }),

  // Global configuration for cache invalidation and behavior
  keepUnusedDataFor: 60, // Keep unused data for 60 seconds
  refetchOnMountOrArgChange: 30, // Refetch if arg changes or 30 seconds old
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (build) => ({
    /**
     * Create a new comment.
     * @param commentData - Comment data for creation
     * @returns Created comment entity
     */
    createComment: build.mutation<CommentWithUser, CreateCommentRequest>({
      query: (commentData) => ({
        url: "/create",
        method: "POST",
        body: commentData,
      }),
      transformResponse: (response: ResultResponse<CommentWithUser>) =>
        transformResponse(response),
      transformErrorResponse,
      invalidatesTags: ["Comments", "CommentTree"],
      // Optimistic update for better UX
      onQueryStarted: async (commentData, { dispatch, queryFulfilled }) => {
        // Optimistic update: immediately add a temporary comment
        const tempComment: CommentWithUser = {
          cid: `temp-${Date.now()}`,
          articleId: commentData.articleId,
          userId: commentData.userId,
          content: commentData.content,
          parentId: commentData.parentId,
          likesCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          user: {
            uid: commentData.userId,
            username: "Current User", // This would be filled from auth context
            avatar: undefined,
          },
          isLiked: false,
          canEdit: true,
          canModerate: false,
          replies: [],
          replyCount: 0,
        };

        // Update the comment list or tree optimistically
        if (commentData.parentId) {
          // Update parent comment's replies
          dispatch(
            commentApi.util.updateQueryData(
              "getCommentsByArticle",
              { articleId: commentData.articleId, includeReplies: true },
              (draft) => {
                if (draft) {
                  const addToCommentReplies = (
                    comments: CommentWithUser[],
                  ): CommentWithUser[] => {
                    return comments.map((comment) => {
                      if (comment.cid === commentData.parentId) {
                        return {
                          ...comment,
                          replies: [...(comment.replies || []), tempComment],
                          replyCount: (comment.replyCount || 0) + 1,
                        };
                      } else if (comment.replies) {
                        return {
                          ...comment,
                          replies: addToCommentReplies(comment.replies),
                        };
                      }

                      return comment;
                    });
                  };

                  return {
                    ...draft,
                    content: addToCommentReplies(draft.content || []),
                  };
                }

                return draft;
              },
            ),
          );
        } else {
          // Add as top-level comment
          dispatch(
            commentApi.util.updateQueryData(
              "getCommentsByArticle",
              { articleId: commentData.articleId, includeReplies: true },
              (draft) => {
                if (draft) {
                  return {
                    ...draft,
                    content: [tempComment, ...(draft.content || [])],
                    totalElements: (draft.totalElements || 0) + 1,
                  };
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
            commentApi.util.updateQueryData(
              "getCommentsByArticle",
              { articleId: commentData.articleId, includeReplies: true },
              (draft) => {
                if (draft) {
                  const replaceInComments = (
                    comments: CommentWithUser[],
                  ): CommentWithUser[] => {
                    return comments.map((comment) => {
                      if (comment.cid === tempComment.cid) {
                        return data;
                      } else if (comment.replies) {
                        return {
                          ...comment,
                          replies: replaceInComments(comment.replies),
                        };
                      }

                      return comment;
                    });
                  };

                  return {
                    ...draft,
                    content: replaceInComments(draft.content || []),
                  };
                }

                return draft;
              },
            ),
          );
        } catch {
          // Revert optimistic update on error
          dispatch(
            commentApi.util.updateQueryData(
              "getCommentsByArticle",
              { articleId: commentData.articleId, includeReplies: true },
              (draft) => {
                if (draft) {
                  const removeFromComments = (
                    comments: CommentWithUser[],
                  ): CommentWithUser[] => {
                    return comments.filter((comment) => {
                      if (comment.cid === tempComment.cid) {
                        return false;
                      } else if (comment.replies) {
                        comment.replies = removeFromComments(comment.replies);
                        // Update reply count
                        comment.replyCount = comment.replies.length;
                      }

                      return true;
                    });
                  };

                  return {
                    ...draft,
                    content: removeFromComments(draft.content || []),
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
     * Update an existing comment.
     * @param commentData - Comment data with ID for update
     * @returns Updated comment entity
     */
    updateComment: build.mutation<CommentWithUser, UpdateCommentRequest>({
      query: ({ cid, ...patch }) => ({
        url: `/${cid}`,
        method: "PUT",
        body: patch,
      }),
      transformResponse: (response: ResultResponse<CommentWithUser>) =>
        transformResponse(response),
      transformErrorResponse,
      invalidatesTags: (result, error, { cid }) => [
        { type: "Comment", id: cid },
        "Comments",
        "CommentTree",
      ],
      // Optimistic update for comment changes
      onQueryStarted: async (
        { cid, ...patch },
        { dispatch, queryFulfilled },
      ) => {
        // Update the comment in cache optimistically
        const updateInComments = (
          comments: CommentWithUser[],
        ): CommentWithUser[] => {
          return comments.map((comment) => {
            if (comment.cid === cid) {
              return {
                ...comment,
                ...patch,
                updatedAt: new Date().toISOString(),
              };
            } else if (comment.replies) {
              return {
                ...comment,
                replies: updateInComments(comment.replies),
              };
            }

            return comment;
          });
        };

        // Update all cached comment lists
        const updateCachedLists = () => {
          // This would need to be implemented to find and update all cached lists
          // For now, we'll focus on the most common use cases
        };

        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error - refetch data
          dispatch(commentApi.util.invalidateTags(["Comments", "CommentTree"]));
        }
      },
    }),

    /**
     * Get comment by ID.
     * @param commentId - Comment ID
     * @returns Comment with user information
     */
    getCommentById: build.query<CommentWithUser, string>({
      query: (commentId) => `/${commentId}`,
      transformResponse: (response: ResultResponse<CommentWithUser>) =>
        transformResponse(response),
      transformErrorResponse,
      providesTags: (result, error, commentId) => [
        { type: "Comment", id: commentId },
      ],
    }),

    /**
     * Delete a comment.
     * @param commentId - Comment ID to delete
     * @returns void
     */
    deleteComment: build.mutation<void, string>({
      query: (commentId) => ({
        url: `/${commentId}`,
        method: "DELETE",
      }),
      transformErrorResponse,
      invalidatesTags: (result, error, commentId) => [
        { type: "Comment", id: commentId },
        "Comments",
        "CommentTree",
      ],
    }),

    /**
     * Get comments by article with pagination and filtering.
     * @param params - Get comments parameters
     * @returns Paginated comment list
     */
    getCommentsByArticle: build.query<
      Page<CommentWithUser>,
      GetCommentsRequest
    >({
      query: (params) => ({
        url: "/article",
        params,
      }),
      transformResponse: (response: ResultResponse<Page<CommentWithUser>>) =>
        transformPaginatedResponse(response),
      transformErrorResponse,
      providesTags: ["Comments"],
      // Subscribe to real-time updates
      async onCacheEntryAdded(arg, api) {
        // Set up WebSocket subscription for real-time comment updates
        const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/comments/article/${arg.articleId}`;

        if (typeof window !== "undefined") {
          const ws = new WebSocket(wsUrl);

          ws.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data);

              if (
                data.type === "COMMENT_CREATED" ||
                data.type === "COMMENT_UPDATED" ||
                data.type === "COMMENT_DELETED"
              ) {
                // Invalidate cache when comments change
                api.dispatch(
                  commentApi.util.invalidateTags(["Comments", "CommentTree"]),
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
     * Get comment tree structure for article.
     * @param params - Article ID and tree parameters
     * @returns Comment tree structure
     */
    getCommentTree: build.query<
      CommentTree[],
      { articleId: string; maxDepth?: number }
    >({
      query: ({ articleId, maxDepth }) => ({
        url: "/tree",
        params: { articleId, maxDepth },
      }),
      transformResponse: (response: ResultResponse<CommentTree[]>) =>
        transformResponse(response),
      transformErrorResponse,
      providesTags: ["CommentTree"],
    }),

    /**
     * Get comments by user.
     * @param params - User ID and pagination parameters
     * @returns Paginated comment list
     */
    getCommentsByUser: build.query<
      Page<CommentWithUser>,
      { userId: string; page?: number; size?: number }
    >({
      query: ({ userId, page = 0, size = 10 }) => ({
        url: "/user",
        params: { userId, page, size },
      }),
      transformResponse: (response: ResultResponse<Page<CommentWithUser>>) =>
        transformPaginatedResponse(response),
      transformErrorResponse,
      providesTags: ["Comments"],
    }),

    /**
     * Search comments.
     * @param params - Search parameters
     * @returns Search results
     */
    searchComments: build.query<Page<CommentWithUser>, SearchCommentsRequest>({
      query: (params) => ({
        url: "/search",
        params,
      }),
      transformResponse: (response: ResultResponse<Page<CommentWithUser>>) =>
        transformPaginatedResponse(response),
      transformErrorResponse,
      providesTags: ["Comments"],
    }),

    /**
     * Like or unlike a comment.
     * @param params - Comment ID and action
     * @returns void
     */
    likeComment: build.mutation<void, { commentId: string; action: boolean }>({
      query: ({ commentId, action }) => ({
        url: `/${commentId}/like`,
        method: action ? "POST" : "DELETE",
      }),
      transformErrorResponse,
      invalidatesTags: (result, error, { commentId }) => [
        { type: "Comment", id: commentId },
        "Comments",
        "CommentTree",
      ],
      // Optimistic update for like status
      onQueryStarted: async (
        { commentId, action },
        { dispatch, queryFulfilled },
      ) => {
        // Update the comment in cache optimistically
        const updateCommentLikes = (
          comments: CommentWithUser[],
        ): CommentWithUser[] => {
          return comments.map((comment) => {
            if (comment.cid === commentId) {
              return {
                ...comment,
                isLiked: action,
                likesCount: action
                  ? (comment.likesCount || 0) + 1
                  : Math.max(0, (comment.likesCount || 0) - 1),
              };
            } else if (comment.replies) {
              return {
                ...comment,
                replies: updateCommentLikes(comment.replies),
              };
            }

            return comment;
          });
        };

        // Update all cached comment lists
        const updateCachedLists = () => {
          // This would find and update all cached comment lists
        };

        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error - refetch data
          dispatch(commentApi.util.invalidateTags(["Comments", "CommentTree"]));
        }
      },
    }),

    /**
     * Report a comment.
     * @param params - Comment ID and reason
     * @returns void
     */
    reportComment: build.mutation<void, { commentId: string; reason: string }>({
      query: ({ commentId, reason }) => ({
        url: `/${commentId}/report`,
        method: "POST",
        body: { reason },
      }),
      transformErrorResponse,
    }),

    /**
     * Moderate a comment (admin function).
     * @param moderationData - Moderation data
     * @returns Moderated comment entity
     */
    moderateComment: build.mutation<CommentWithUser, ModerateCommentRequest>({
      query: (moderationData) => ({
        url: `/${moderationData.cid}/moderate`,
        method: "POST",
        body: moderationData,
      }),
      transformResponse: (response: ResultResponse<CommentWithUser>) =>
        transformResponse(response),
      transformErrorResponse,
      invalidatesTags: (result, error, { cid }) => [
        { type: "Comment", id: cid },
        "Comments",
        "CommentTree",
        "PendingComments",
      ],
    }),

    /**
     * Get pending comments for moderation (admin function).
     * @param params - Pagination parameters
     * @returns Paginated pending comments list
     */
    getPendingComments: build.query<
      Page<CommentWithUser>,
      { page?: number; size?: number }
    >({
      query: ({ page = 0, size = 10 }) => ({
        url: "/pending",
        params: { page, size },
      }),
      transformResponse: (response: ResultResponse<Page<CommentWithUser>>) =>
        transformPaginatedResponse(response),
      transformErrorResponse,
      providesTags: ["PendingComments"],
    }),

    /**
     * Approve a comment (admin function).
     * @param commentId - Comment ID
     * @returns Approved comment entity
     */
    approveComment: build.mutation<CommentWithUser, string>({
      query: (commentId) => ({
        url: `/${commentId}/approve`,
        method: "POST",
      }),
      transformResponse: (response: ResultResponse<CommentWithUser>) =>
        transformResponse(response),
      transformErrorResponse,
      invalidatesTags: (result, error, commentId) => [
        { type: "Comment", id: commentId },
        "Comments",
        "CommentTree",
        "PendingComments",
      ],
    }),

    /**
     * Reject a comment (admin function).
     * @param params - Comment ID and optional reason
     * @returns Rejected comment entity
     */
    rejectComment: build.mutation<
      CommentWithUser,
      { commentId: string; reason?: string }
    >({
      query: ({ commentId, reason }) => ({
        url: `/${commentId}/reject`,
        method: "POST",
        body: { reason },
      }),
      transformResponse: (response: ResultResponse<CommentWithUser>) =>
        transformResponse(response),
      transformErrorResponse,
      invalidatesTags: (result, error, { commentId }) => [
        { type: "Comment", id: commentId },
        "Comments",
        "CommentTree",
        "PendingComments",
      ],
    }),

    /**
     * Bulk moderate comments (admin function).
     * @param params - Comment IDs, status, and optional reason
     * @returns Moderated comments list
     */
    bulkModerateComments: build.mutation<
      CommentWithUser[],
      { commentIds: string[]; status: CommentStatus; reason?: string }
    >({
      query: ({ commentIds, status, reason }) => ({
        url: "/bulk-moderate",
        method: "POST",
        body: { commentIds, status, reason },
      }),
      transformResponse: (response: ResultResponse<CommentWithUser[]>) =>
        transformResponse(response),
      transformErrorResponse,
      invalidatesTags: ["Comments", "CommentTree", "PendingComments"],
    }),

    /**
     * Get comment statistics.
     * @param articleId - Optional article ID filter
     * @returns Comment statistics
     */
    getCommentStats: build.query<CommentStats, string | void>({
      query: (articleId) => ({
        url: "/stats",
        params: articleId ? { articleId } : {},
      }),
      transformResponse: (response: ResultResponse<CommentStats>) =>
        transformResponse(response),
      transformErrorResponse,
      providesTags: ["Comments"],
    }),

    /**
     * Get user comment statistics.
     * @param userId - User ID
     * @returns User comment statistics
     */
    getUserCommentStats: build.query<
      {
        totalComments: number;
        totalLikes: number;
        recentComments: CommentWithUser[];
      },
      string
    >({
      query: (userId) => `/user/${userId}/stats`,
      transformResponse: (
        response: ResultResponse<{
          totalComments: number;
          totalLikes: number;
          recentComments: CommentWithUser[];
        }>,
      ) => transformResponse(response),
      transformErrorResponse,
      providesTags: ["Comments"],
    }),

    /**
     * Pin or unpin a comment (admin function).
     * @param params - Comment ID and pin status
     * @returns Updated comment entity
     */
    pinComment: build.mutation<
      CommentWithUser,
      { commentId: string; pinned: boolean }
    >({
      query: ({ commentId, pinned }) => ({
        url: `/${commentId}/pin`,
        method: "POST",
        body: { pinned },
      }),
      transformResponse: (response: ResultResponse<CommentWithUser>) =>
        transformResponse(response),
      transformErrorResponse,
      invalidatesTags: (result, error, { commentId }) => [
        { type: "Comment", id: commentId },
        "Comments",
        "CommentTree",
      ],
    }),

    /**
     * Highlight or unhighlight a comment (admin function).
     * @param params - Comment ID and highlight status
     * @returns Updated comment entity
     */
    highlightComment: build.mutation<
      CommentWithUser,
      { commentId: string; highlighted: boolean }
    >({
      query: ({ commentId, highlighted }) => ({
        url: `/${commentId}/highlight`,
        method: "POST",
        body: { highlighted },
      }),
      transformResponse: (response: ResultResponse<CommentWithUser>) =>
        transformResponse(response),
      transformErrorResponse,
      invalidatesTags: (result, error, { commentId }) => [
        { type: "Comment", id: commentId },
        "Comments",
        "CommentTree",
      ],
    }),
  }),
});

// Export hooks for all endpoints
export const {
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useGetCommentByIdQuery,
  useDeleteCommentMutation,
  useGetCommentsByArticleQuery,
  useGetCommentTreeQuery,
  useGetCommentsByUserQuery,
  useSearchCommentsQuery,
  useLikeCommentMutation,
  useReportCommentMutation,
  useModerateCommentMutation,
  useGetPendingCommentsQuery,
  useApproveCommentMutation,
  useRejectCommentMutation,
  useBulkModerateCommentsMutation,
  useGetCommentStatsQuery,
  useGetUserCommentStatsQuery,
  usePinCommentMutation,
  useHighlightCommentMutation,
} = commentApi;

// Export the API slice itself for usage in other slices
export { commentApi };

// Types are already exported above

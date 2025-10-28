// Notification API types and interfaces matching backend Horizon project

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { Page, ResultResponse } from "@/types";

import { createApi } from "@reduxjs/toolkit/query/react";

import { createBaseQuery } from "../utils/base-query";

// Notification type enum matching backend NotificationType
export type NotificationType =
  | "COMMENT"
  | "LIKE"
  | "FOLLOW"
  | "FAVORITE"
  | "SYSTEM";

// Notification interface matching backend NotificationVO
export interface Notification {
  /** Notification ID */
  nid: string;

  /** User ID who receives this notification */
  userId: string;

  /** Notification type */
  type: NotificationType;

  /** Notification title */
  title: string;

  /** Notification content */
  content: string;

  /** Whether notification is read */
  isRead: boolean;

  /** Related entity ID (article, comment, etc.) */
  relatedId?: string;

  /** Sender user ID */
  senderId?: string;

  /** Sender username for display */
  senderUsername?: string;

  /** Sender avatar URL */
  senderAvatar?: string;

  /** Creation timestamp */
  createdAt: string;
}

// Notification with additional metadata
export interface NotificationWithMeta extends Notification {
  /** Action URL for navigation */
  actionUrl?: string;

  /** Related entity information */
  relatedEntity?: {
    type: "article" | "comment" | "user";
    id: string;
    title?: string;
    slug?: string;
  };

  /** Whether notification is actionable */
  isActionable?: boolean;

  /** Notification priority */
  priority?: "low" | "normal" | "high";

  /** Notification category */
  category?: "social" | "content" | "system" | "moderation";
}

// Request/Response types for notification operations
export interface CreateNotificationRequest {
  /** User ID who receives the notification */
  userId: string;

  /** Notification type */
  type: NotificationType;

  /** Notification title */
  title: string;

  /** Notification content */
  content: string;

  /** Related entity ID */
  relatedId?: string;

  /** Sender user ID */
  senderId?: string;

  /** Action URL */
  actionUrl?: string;

  /** Priority */
  priority?: "low" | "normal" | "high";
}

export interface SearchNotificationsRequest {
  /** User ID filter (if not provided, uses current user) */
  userId?: string;

  /** Notification type filter */
  type?: NotificationType;

  /** Read status filter */
  isRead?: boolean;

  /** Category filter */
  category?: "social" | "content" | "system" | "moderation";

  /** Date range filter */
  dateFrom?: string;

  /** Date to filter */
  dateTo?: string;

  /** Page number (0-based) */
  page?: number;

  /** Page size */
  size?: number;

  /** Sort field */
  sortBy?: "createdAt" | "priority";

  /** Sort direction */
  sortDirection?: "asc" | "desc";
}

export interface NotificationStats {
  /** Total unread notifications */
  unreadCount: number;

  /** Total notifications */
  totalCount: number;

  /** Notifications by type */
  notificationsByType: Record<NotificationType, number>;

  /** Notifications by category */
  notificationsByCategory: Record<string, number>;

  /** Recent notifications count (last 24 hours) */
  recentCount: number;
}

export interface NotificationSettings {
  /** Email notifications enabled */
  emailEnabled: boolean;

  /** Push notifications enabled */
  pushEnabled: boolean;

  /** Notification preferences by type */
  typePreferences: Record<
    NotificationType,
    {
      enabled: boolean;
      email: boolean;
      push: boolean;
    }
  >;

  /** Quiet hours (do not disturb) */
  quietHours?: {
    enabled: boolean;
    startTime: string; // HH:mm format
    endTime: string; // HH:mm format
    timezone?: string;
  };

  /** Frequency settings */
  frequency: {
    immediate: NotificationType[];
    hourly: NotificationType[];
    daily: NotificationType[];
    weekly: NotificationType[];
  };
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

const notificationApi = createApi({
  reducerPath: "notification-api",

  tagTypes: [
    "Notification",
    "Notifications",
    "UnreadCount",
    "NotificationStats",
    "NotificationSettings",
  ],

  baseQuery: createBaseQuery({
    baseUrl: "/api/notification",
  }),

  // Global configuration for cache invalidation and behavior
  keepUnusedDataFor: 30, // Keep unused data for 30 seconds (shorter for notifications)
  refetchOnMountOrArgChange: 15, // Refetch if arg changes or 15 seconds old
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (build) => ({
    /**
     * Create a new notification.
     * @param notificationData - Notification data for creation
     * @returns Created notification entity
     */
    createNotification: build.mutation<Notification, CreateNotificationRequest>(
      {
        query: (notificationData) => ({
          url: "/create",
          method: "POST",
          body: notificationData,
        }),
        transformResponse: (response: ResultResponse<Notification>) =>
          transformResponse(response),
        transformErrorResponse,
        invalidatesTags: ["Notifications", "NotificationStats"],
      },
    ),

    /**
     * Get notification by ID.
     * @param notificationId - Notification ID
     * @returns Notification with metadata
     */
    getNotificationById: build.query<NotificationWithMeta, string>({
      query: (notificationId) => `/${notificationId}`,
      transformResponse: (response: ResultResponse<NotificationWithMeta>) =>
        transformResponse(response),
      transformErrorResponse,
      providesTags: (result, error, notificationId) => [
        { type: "Notification", id: notificationId },
      ],
    }),

    /**
     * Mark notification as read.
     * @param notificationId - Notification ID
     * @returns void
     */
    markAsRead: build.mutation<void, string>({
      query: (notificationId) => ({
        url: `/${notificationId}/read`,
        method: "POST",
      }),
      transformErrorResponse,
      invalidatesTags: (result, error, notificationId) => [
        { type: "Notification", id: notificationId },
        "Notifications",
        "UnreadCount",
        "NotificationStats",
      ],
      // Optimistic update for read status
      onQueryStarted: async (notificationId, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error - refetch data
          dispatch(
            notificationApi.util.invalidateTags([
              "Notifications",
              "UnreadCount",
              "NotificationStats",
            ]),
          );
        }
      },
    }),

    /**
     * Mark notification as unread.
     * @param notificationId - Notification ID
     * @returns void
     */
    markAsUnread: build.mutation<void, string>({
      query: (notificationId) => ({
        url: `/${notificationId}/unread`,
        method: "POST",
      }),
      transformErrorResponse,
      invalidatesTags: (result, error, notificationId) => [
        { type: "Notification", id: notificationId },
        "Notifications",
        "UnreadCount",
        "NotificationStats",
      ],
      // Optimistic update for unread status
      onQueryStarted: async (notificationId, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error - refetch data
          dispatch(
            notificationApi.util.invalidateTags([
              "Notifications",
              "UnreadCount",
              "NotificationStats",
            ]),
          );
        }
      },
    }),

    /**
     * Delete a notification.
     * @param notificationId - Notification ID to delete
     * @returns void
     */
    deleteNotification: build.mutation<void, string>({
      query: (notificationId) => ({
        url: `/${notificationId}`,
        method: "DELETE",
      }),
      transformErrorResponse,
      invalidatesTags: (result, error, notificationId) => [
        { type: "Notification", id: notificationId },
        "Notifications",
        "NotificationStats",
      ],
    }),

    /**
     * Get user notifications with pagination and filtering.
     * @param params - Search and pagination parameters
     * @returns Paginated notification list
     */
    getUserNotifications: build.query<
      Page<NotificationWithMeta>,
      SearchNotificationsRequest | void
    >({
      query: (params) => ({
        url: "/user",
        params: params || {},
      }),
      transformResponse: (
        response: ResultResponse<Page<NotificationWithMeta>>,
      ) => transformPaginatedResponse(response),
      transformErrorResponse,
      providesTags: ["Notifications"],
      // Subscribe to real-time updates
      async onCacheEntryAdded(arg, api) {
        // Set up WebSocket subscription for real-time notifications
        const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/notifications`;

        if (typeof window !== "undefined") {
          const ws = new WebSocket(wsUrl);

          ws.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data);

              if (data.type === "NEW_NOTIFICATION") {
                // Invalidate cache when new notification arrives
                api.dispatch(
                  notificationApi.util.invalidateTags([
                    "Notifications",
                    "UnreadCount",
                    "NotificationStats",
                  ]),
                );
              } else if (
                data.type === "NOTIFICATION_READ" ||
                data.type === "NOTIFICATION_DELETED"
              ) {
                // Update specific notification counts
                api.dispatch(
                  notificationApi.util.invalidateTags([
                    "UnreadCount",
                    "NotificationStats",
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
     * Get unread notifications.
     * @param limit - Optional limit count
     * @returns Unread notifications list
     */
    getUnreadNotifications: build.query<NotificationWithMeta[], number | void>({
      query: (limit) => ({
        url: "/unread",
        params: limit ? { limit } : {},
      }),
      transformResponse: (response: ResultResponse<NotificationWithMeta[]>) =>
        transformResponse(response),
      transformErrorResponse,
      providesTags: ["Notifications"],
    }),

    /**
     * Mark all notifications as read.
     * @param userId - Optional user ID
     * @returns void
     */
    markAllAsRead: build.mutation<void, string | void>({
      query: (userId) => ({
        url: "/mark-all-read",
        method: "POST",
        params: userId ? { userId } : {},
      }),
      transformErrorResponse,
      invalidatesTags: ["Notifications", "UnreadCount", "NotificationStats"],
      // Optimistic update for mark all as read
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error - refetch data
          dispatch(
            notificationApi.util.invalidateTags([
              "Notifications",
              "UnreadCount",
              "NotificationStats",
            ]),
          );
        }
      },
    }),

    /**
     * Delete read notifications.
     * @param userId - Optional user ID
     * @returns void
     */
    deleteReadNotifications: build.mutation<void, string | void>({
      query: (userId) => ({
        url: "/delete-read",
        method: "DELETE",
        params: userId ? { userId } : {},
      }),
      transformErrorResponse,
      invalidatesTags: ["Notifications", "NotificationStats"],
    }),

    /**
     * Delete all notifications.
     * @param userId - Optional user ID
     * @returns void
     */
    deleteAllNotifications: build.mutation<void, string | void>({
      query: (userId) => ({
        url: "/delete-all",
        method: "DELETE",
        params: userId ? { userId } : {},
      }),
      transformErrorResponse,
      invalidatesTags: ["Notifications", "UnreadCount", "NotificationStats"],
      // Optimistic update for delete all
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        // Clear all notifications in cache optimistically
        dispatch(
          notificationApi.util.updateQueryData(
            "getUserNotifications",
            undefined,
            (draft) => {
              if (draft) {
                return {
                  ...draft,
                  content: [],
                  totalElements: 0,
                };
              }

              return draft;
            },
          ),
        );

        // Set unread count to 0 optimistically
        dispatch(
          notificationApi.util.updateQueryData(
            "getUnreadCount",
            undefined,
            () => 0,
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error - refetch data
          dispatch(
            notificationApi.util.invalidateTags([
              "Notifications",
              "UnreadCount",
            ]),
          );
        }
      },
    }),

    /**
     * Mark multiple notifications as read.
     * @param notificationIds - Array of notification IDs
     * @returns void
     */
    markMultipleAsRead: build.mutation<void, string[]>({
      query: (notificationIds) => ({
        url: "/mark-multiple-read",
        method: "POST",
        body: { notificationIds },
      }),
      transformErrorResponse,
      invalidatesTags: ["Notifications", "UnreadCount", "NotificationStats"],
      // Optimistic update for multiple read
      onQueryStarted: async (notificationIds, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error - refetch data
          dispatch(
            notificationApi.util.invalidateTags([
              "Notifications",
              "UnreadCount",
              "NotificationStats",
            ]),
          );
        }
      },
    }),

    /**
     * Mark multiple notifications as unread.
     * @param notificationIds - Array of notification IDs
     * @returns void
     */
    markMultipleAsUnread: build.mutation<void, string[]>({
      query: (notificationIds) => ({
        url: "/mark-multiple-unread",
        method: "POST",
        body: { notificationIds },
      }),
      transformErrorResponse,
      invalidatesTags: ["Notifications", "UnreadCount", "NotificationStats"],
      // Optimistic update for multiple unread
      onQueryStarted: async (notificationIds, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error - refetch data
          dispatch(
            notificationApi.util.invalidateTags([
              "Notifications",
              "UnreadCount",
              "NotificationStats",
            ]),
          );
        }
      },
    }),

    /**
     * Delete multiple notifications.
     * @param notificationIds - Array of notification IDs
     * @returns void
     */
    deleteMultipleNotifications: build.mutation<void, string[]>({
      query: (notificationIds) => ({
        url: "/delete-multiple",
        method: "DELETE",
        body: { notificationIds },
      }),
      transformErrorResponse,
      invalidatesTags: ["Notifications", "NotificationStats"],
      // Optimistic update for multiple delete
      onQueryStarted: async (notificationIds, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error - refetch data
          dispatch(
            notificationApi.util.invalidateTags([
              "Notifications",
              "NotificationStats",
            ]),
          );
        }
      },
    }),

    /**
     * Get notification statistics.
     * @param userId - Optional user ID
     * @returns Notification statistics
     */
    getNotificationStats: build.query<NotificationStats, string | void>({
      query: (userId) => ({
        url: "/stats",
        params: userId ? { userId } : {},
      }),
      transformResponse: (response: ResultResponse<NotificationStats>) =>
        transformResponse(response),
      transformErrorResponse,
      providesTags: ["NotificationStats"],
    }),

    /**
     * Get unread count.
     * @param userId - Optional user ID
     * @returns Unread notifications count
     */
    getUnreadCount: build.query<number, string | void>({
      query: (userId) => ({
        url: "/unread-count",
        params: userId ? { userId } : {},
      }),
      transformResponse: (response: ResultResponse<number>) =>
        transformResponse(response),
      transformErrorResponse,
      providesTags: ["UnreadCount"],
    }),

    /**
     * Get notification settings.
     * @param userId - User ID
     * @returns Notification settings
     */
    getNotificationSettings: build.query<NotificationSettings, string>({
      query: (userId) => `/settings/${userId}`,
      transformResponse: (response: ResultResponse<NotificationSettings>) =>
        transformResponse(response),
      transformErrorResponse,
      providesTags: ["NotificationSettings"],
    }),

    /**
     * Update notification settings.
     * @param params - User ID and settings data
     * @returns Updated notification settings
     */
    updateNotificationSettings: build.mutation<
      NotificationSettings,
      { userId: string; settings: Partial<NotificationSettings> }
    >({
      query: ({ userId, settings }) => ({
        url: `/settings/${userId}`,
        method: "PUT",
        body: settings,
      }),
      transformResponse: (response: ResultResponse<NotificationSettings>) =>
        transformResponse(response),
      transformErrorResponse,
      invalidatesTags: ["NotificationSettings"],
      // Optimistic update for settings
      onQueryStarted: async (
        { userId, settings },
        { dispatch, queryFulfilled },
      ) => {
        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error - refetch data
          dispatch(
            notificationApi.util.invalidateTags(["NotificationSettings"]),
          );
        }
      },
    }),

    /**
     * Broadcast system notification (admin function).
     * @param notificationData - Broadcast notification data
     * @returns void
     */
    broadcastSystemNotification: build.mutation<
      void,
      Omit<CreateNotificationRequest, "userId"> & {
        targetUsers?: string[];
        targetRoles?: string[];
      }
    >({
      query: (notificationData) => ({
        url: "/broadcast",
        method: "POST",
        body: notificationData,
      }),
      transformErrorResponse,
      invalidatesTags: ["Notifications", "NotificationStats"],
    }),

    /**
     * Get notification templates (admin function).
     * @returns Notification templates list
     */
    getNotificationTemplates: build.query<
      Array<{
        type: NotificationType;
        template: string;
        variables: string[];
      }>,
      void
    >({
      query: () => "/templates",
      transformResponse: (
        response: ResultResponse<
          Array<{
            type: NotificationType;
            template: string;
            variables: string[];
          }>
        >,
      ) => transformResponse(response),
      transformErrorResponse,
    }),
  }),
});

// Export hooks for all endpoints
export const {
  useCreateNotificationMutation,
  useGetNotificationByIdQuery,
  useMarkAsReadMutation,
  useMarkAsUnreadMutation,
  useDeleteNotificationMutation,
  useGetUserNotificationsQuery,
  useGetUnreadNotificationsQuery,
  useMarkAllAsReadMutation,
  useDeleteReadNotificationsMutation,
  useDeleteAllNotificationsMutation,
  useMarkMultipleAsReadMutation,
  useMarkMultipleAsUnreadMutation,
  useDeleteMultipleNotificationsMutation,
  useGetNotificationStatsQuery,
  useGetUnreadCountQuery,
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
  useBroadcastSystemNotificationMutation,
  useGetNotificationTemplatesQuery,
} = notificationApi;

// Custom hooks for better notification management
export const useRealTimeNotifications = (userId?: string) => {
  const getUnreadCount = notificationApi.endpoints.getUnreadCount.useQuery(
    userId,
    {
      // Poll for new notifications every 30 seconds
      pollingInterval: 30000,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  );

  const getUserNotifications =
    notificationApi.endpoints.getUserNotifications.useQuery(
      { userId, isRead: false, size: 10 },
      {
        // Poll for new unread notifications every 30 seconds
        pollingInterval: 30000,
        refetchOnFocus: true,
        refetchOnReconnect: true,
      },
    );

  return {
    unreadCount: getUnreadCount.data || 0,
    unreadNotifications: getUserNotifications.data?.content || [],
    isLoading: getUnreadCount.isLoading || getUserNotifications.isLoading,
    error: getUnreadCount.error || getUserNotifications.error,
    refetch: () => {
      getUnreadCount.refetch();
      getUserNotifications.refetch();
    },
  };
};

// Export the API slice itself for usage in other slices
export { notificationApi };

// Types are already exported above


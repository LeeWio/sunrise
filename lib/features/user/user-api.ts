// User API types and interfaces matching backend Horizon project

import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { createBaseQuery } from "../utils/base-query";
import type { Page, ResultResponse } from "@/types";

// User status enum matching backend UserStatus
export type UserStatus = 'PENDING' | 'ACTIVE' | 'INACTIVE' | 'BANNED' | 'DELETED';

// Role interface matching backend RoleVO
export interface Role {
  /** Unique ID of the role */
  rid: string;

  /** Name of the role */
  name: string;

  /** Description of the role */
  description?: string;

  /** Time when the role was created */
  createdAt?: string;

  /** Time when the role was last updated */
  updatedAt?: string;
}

// User interface matching backend UserVO
export interface User {
  /** User ID */
  uid: string;

  /** Username */
  username: string;

  /** Email */
  email: string;

  /** Avatar URL or path */
  avatar?: string;

  /** Set of role names assigned to the user */
  roles?: Role[];

  /** User account status */
  status: UserStatus;

  /** Creation timestamp */
  createdAt?: string;

  /** Update timestamp */
  updatedAt?: string;

  /** Last login timestamp */
  lastLoginAt?: string;
}

// User with additional metadata
export interface UserWithStats extends User {
  /** Number of articles created by user */
  articleCount?: number;

  /** Number of followers */
  followerCount?: number;

  /** Number of following */
  followingCount?: number;

  /** Whether current user follows this user */
  isFollowed?: boolean;

  /** User's current online status */
  isOnline?: boolean;
}

// Authentication request/response types
export interface LoginRequest {
  /** Username of the user (can be email or username) */
  username: string;

  /** Password of the user */
  password: string;

  /** Email of the user */
  email: string;
}

export interface RegisterRequest {
  /** Username of the new user */
  username: string;

  /** Email address of the new user */
  email: string;

  /** Password of the new user */
  password: string;

  /** Optional set of role IDs to assign to the new user */
  roleIds?: string[];
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

// Profile management types
export interface UpdateProfileRequest {
  username?: string;
  email?: string;
  avatar?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// User management types (for admin functions)
export interface AuditUserRequest {
  /** User ID to audit */
  uid: string;

  /** New status to assign */
  status: UserStatus;

  /** Optional reason for the status change */
  reason?: string;
}

export interface UpdateUserRequest {
  /** User ID to update */
  uid: string;

  /** New username */
  username?: string;

  /** New email */
  email?: string;

  /** New avatar */
  avatar?: string;

  /** New roles */
  roleIds?: string[];
}

// Search and pagination types
export interface SearchUsersRequest {
  /** Search keyword */
  keyword?: string;

  /** Status filter */
  status?: UserStatus;

  /** Role filter */
  roleId?: string;

  /** Online status filter */
  isOnline?: boolean;

  /** Page number (0-based) */
  page?: number;

  /** Page size */
  size?: number;

  /** Sort field */
  sortBy?: 'username' | 'createdAt' | 'lastLoginAt' | 'articleCount';

  /** Sort direction */
  sortDirection?: 'asc' | 'desc';
}

// OTP verification types
export interface SendOTPRequest {
  email: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

// Password reset types
export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

// User statistics
export interface UserStats {
  /** Total users count */
  totalUsers: number;

  /** Active users count */
  activeUsers: number;

  /** Pending users count */
  pendingUsers: number;

  /** Users by status */
  usersByStatus: Record<UserStatus, number>;

  /** Recent registrations */
  recentRegistrations: User[];

  /** Online users count */
  onlineUsers: number;
}

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

const userApi = createApi({
  reducerPath: 'user-api',

  tagTypes: ['User', 'Users', 'CurrentUser', 'UserStats'],

  baseQuery: createBaseQuery({
    baseUrl: '/api/user',
  }),

  // Global configuration for cache invalidation and behavior
  keepUnusedDataFor: 60, // Keep unused data for 60 seconds
  refetchOnMountOrArgChange: 30, // Refetch if arg changes or 30 seconds old
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: build => ({
    /**
     * User login authentication.
     * @param credentials - Login credentials
     * @returns Login response with user and tokens
     */
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/authenticate',
        method: 'POST',
        body: credentials
      }),
      transformResponse: (response: ResultResponse<LoginResponse>) => transformResponse(response),
      transformErrorResponse,
      invalidatesTags: ['CurrentUser'],
    }),

    /**
     * User registration.
     * @param userData - Registration data
     * @returns Created user entity
     */
    register: build.mutation<User, RegisterRequest>({
      query: (userData) => ({
        url: '/create',
        method: 'POST',
        body: userData
      }),
      transformResponse: (response: ResultResponse<User>) => transformResponse(response),
      transformErrorResponse,
      invalidatesTags: ['Users'],
    }),

    /**
     * User logout.
     * @returns void
     */
    logout: build.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST'
      }),
      transformErrorResponse,
      invalidatesTags: ['CurrentUser'],
    }),

    /**
     * Get current authenticated user.
     * @returns Current user entity
     */
    getCurrentUser: build.query<User, void>({
      query: () => '/profile',
      transformResponse: (response: ResultResponse<User>) => transformResponse(response),
      transformErrorResponse,
      providesTags: ['CurrentUser'],
      // Subscribe to real-time updates
      async onCacheEntryAdded(arg, api) {
        // Set up WebSocket subscription for real-time user updates
        const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/user/profile`;

        if (typeof window !== 'undefined') {
          const ws = new WebSocket(wsUrl);

          ws.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data);
              if (data.type === 'USER_UPDATED' || data.type === 'USER_STATUS_CHANGED') {
                // Invalidate cache when user data changes
                api.dispatch(userApi.util.invalidateTags(['CurrentUser']));
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
     * Update user profile.
     * @param profileData - Profile update data
     * @returns Updated user entity
     */
    updateProfile: build.mutation<User, UpdateProfileRequest>({
      query: (profileData) => ({
        url: '/profile',
        method: 'PUT',
        body: profileData
      }),
      transformResponse: (response: ResultResponse<User>) => transformResponse(response),
      transformErrorResponse,
      invalidatesTags: ['CurrentUser'],
      // Optimistic update for profile changes
      onQueryStarted: async (profileData, { dispatch, queryFulfilled }) => {
        // Get current user data for optimistic update
        const currentData = dispatch(userApi.endpoints.getCurrentUser.select());

        if (currentData.data) {
          // Optimistic update
          dispatch(
            userApi.util.updateQueryData('getCurrentUser', undefined, (draft) => {
              if (draft) {
                return { ...draft, ...profileData };
              }
              return draft;
            })
          );

          try {
            await queryFulfilled;
          } catch {
            // Revert optimistic update on error
            dispatch(
              userApi.util.updateQueryData('getCurrentUser', undefined, (draft) => {
                if (draft) {
                  return currentData.data;
                }
                return draft;
              })
            );
          }
        }
      },
    }),

    /**
     * Change user password.
     * @param passwordData - Password change data
     * @returns void
     */
    changePassword: build.mutation<void, ChangePasswordRequest>({
      query: (passwordData) => ({
        url: '/password',
        method: 'PUT',
        body: passwordData
      }),
      transformErrorResponse,
    }),

    /**
     * Upload user avatar.
     * @param file - Avatar file
     * @returns Avatar URL
     */
    uploadAvatar: build.mutation<{ avatarUrl: string }, FormData>({
      query: (file) => ({
        url: '/avatar',
        method: 'POST',
        body: file
      }),
      transformResponse: (response: ResultResponse<{ avatarUrl: string }>) => transformResponse(response),
      transformErrorResponse,
      invalidatesTags: ['CurrentUser'],
      // Optimistic update for avatar
      onQueryStarted: async (file, { dispatch, queryFulfilled }) => {
        const currentData = dispatch(userApi.endpoints.getCurrentUser.select());

        if (currentData.data) {
          // Create temporary avatar URL for immediate update
          const tempAvatarUrl = URL.createObjectURL(file.get('avatar') as File);

          dispatch(
            userApi.util.updateQueryData('getCurrentUser', undefined, (draft) => {
              if (draft) {
                return { ...draft, avatar: tempAvatarUrl };
              }
              return draft;
            })
          );

          try {
            const { data } = await queryFulfilled;
            // Replace with real avatar URL
            dispatch(
              userApi.util.updateQueryData('getCurrentUser', undefined, (draft) => {
                if (draft) {
                  return { ...draft, avatar: data.avatarUrl };
                }
                return draft;
              })
            );
          } catch {
            // Revert to original avatar on error
            dispatch(
              userApi.util.updateQueryData('getCurrentUser', undefined, (draft) => {
                if (draft) {
                  return { ...draft, avatar: currentData.data.avatar };
                }
                return draft;
              })
            );
          } finally {
            // Clean up temporary URL
            URL.revokeObjectURL(tempAvatarUrl);
          }
        }
      },
    }),

    /**
     * Get all users with pagination and search.
     * @param params - Search and pagination parameters
     * @returns Paginated user list
     */
    getAllUsers: build.query<Page<User>, SearchUsersRequest | void>({
      query: (params) => ({
        url: '/all',
        params: params || {}
      }),
      transformResponse: (response: ResultResponse<Page<User>>) => transformPaginatedResponse(response),
      transformErrorResponse,
      providesTags: ['Users'],
    }),

    /**
     * Get user by ID.
     * @param userId - User ID
     * @returns User entity
     */
    getUserById: build.query<UserWithStats, string>({
      query: (userId) => `/${userId}`,
      transformResponse: (response: ResultResponse<UserWithStats>) => transformResponse(response),
      transformErrorResponse,
      providesTags: (result, error, userId) => [{ type: 'User', id: userId }],
    }),

    /**
     * Update user (admin function).
     * @param userData - User update data with ID
     * @returns Updated user entity
     */
    updateUser: build.mutation<User, UpdateUserRequest>({
      query: ({ uid, ...patch }) => ({
        url: `/${uid}`,
        method: 'PUT',
        body: patch
      }),
      transformResponse: (response: ResultResponse<User>) => transformResponse(response),
      transformErrorResponse,
      invalidatesTags: (result, error, { uid }) => [
        { type: 'User', id: uid },
        'Users'
      ],
    }),

    /**
     * Audit user status (admin function).
     * @param auditData - Audit data with user ID and new status
     * @returns Updated user entity
     */
    auditUser: build.mutation<User, AuditUserRequest>({
      query: (auditData) => ({
        url: `/${auditData.uid}/status`,
        method: 'PUT',
        body: auditData
      }),
      transformResponse: (response: ResultResponse<User>) => transformResponse(response),
      transformErrorResponse,
      invalidatesTags: (result, error, { uid }) => [
        { type: 'User', id: uid },
        'Users'
      ],
    }),

    /**
     * Delete user (admin function).
     * @param userId - User ID to delete
     * @returns void
     */
    deleteUser: build.mutation<void, string>({
      query: (userId) => ({
        url: `/${userId}`,
        method: 'DELETE'
      }),
      transformErrorResponse,
      invalidatesTags: (result, error, userId) => [
        { type: 'User', id: userId },
        'Users'
      ],
    }),

    /**
     * Send OTP verification code.
     * @param email - Email address
     * @returns void
     */
    sendOTP: build.mutation<void, string>({
      query: (email) => ({
        url: '/send-otp',
        method: 'POST',
        body: { email }
      }),
      transformErrorResponse,
    }),

    /**
     * Verify OTP code.
     * @param verificationData - Email and OTP code
     * @returns void
     */
    verifyOTP: build.mutation<void, { email: string; otp: string }>({
      query: ({ email, otp }) => ({
        url: '/verify-otp',
        method: 'POST',
        body: { email, otp }
      }),
      transformErrorResponse,
    }),

    /**
     * Request password reset.
     * @param email - Email address
     * @returns void
     */
    forgotPassword: build.mutation<void, string>({
      query: (email) => ({
        url: '/forgot-password',
        method: 'POST',
        body: { email }
      }),
      transformErrorResponse,
    }),

    /**
     * Reset password with token.
     * @param resetData - Token and new password
     * @returns void
     */
    resetPassword: build.mutation<void, { token: string; newPassword: string }>({
      query: ({ token, newPassword }) => ({
        url: '/reset-password',
        method: 'POST',
        body: { token, newPassword }
      }),
      transformErrorResponse,
    }),

    /**
     * Get user statistics (admin function).
     * @returns User statistics overview
     */
    getUserStats: build.query<UserStats, void>({
      query: () => '/stats',
      transformResponse: (response: ResultResponse<UserStats>) => transformResponse(response),
      transformErrorResponse,
      providesTags: ['UserStats'],
    }),
  }),
})

// Export hooks for all endpoints
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUploadAvatarMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useAuditUserMutation,
  useDeleteUserMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserStatsQuery,
} = userApi

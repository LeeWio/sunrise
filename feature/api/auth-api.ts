import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { addToast } from '@heroui/react'

import { AuthUser, setAuthUser } from '../slice/auth-slice'

import { ResultResponse } from '@/types'

/**
 * Data Transfer Object for user authentication credentials.
 * Contains required fields for login.
 */
export interface AuthenticateUserDto {
  /** Email address of the user */
  email: string
  /** Password for authentication */
  password: string
}

/**
 * Data Transfer Object for creating a new user account.
 * Contains required and optional fields for user registration.
 */
export interface CreateUserDto {
  /** Email address (required) */
  email: string
  /** Password (required) */
  password: string
  /** Username (optional) */
  username?: string
  /** Avatar URL (optional) */
  avatar?: string
  /** Account status (optional) */
  status?: string
}

/**
 * Data Transfer Object for updating user profile.
 * All fields except uid are optional for partial updates.
 */
export interface UpdateUserDto {
  /** Unique identifier of the user */
  uid: string
  /** Username */
  username?: string
  /** Email address */
  email?: string
  /** Avatar URL */
  avatar?: string
  /** Account status */
  status?: string
  /** User roles */
  roles?: string[]
}

/**
 * Entity representing a complete user profile returned from the server.
 * Contains all user data including metadata and timestamps.
 */
export interface UserEntity {
  /** Unique identifier */
  uid: string
  /** Username */
  username: string
  /** Email address */
  email: string
  /** Avatar URL */
  avatar: string
  /** Account status */
  status: string
  /** ISO 8601 timestamp */
  createdAt: string
  /** ISO 8601 timestamp */
  updatedAt: string
  /** Assigned roles */
  roles: string[]
}

// Define base query with retry logic
const baseQueryWithRetry = retry(
  fetchBaseQuery({
    baseUrl: '/api/user',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as any

      // Add authorization token to headers if user is authenticated
      if (
        state?.auth?.isAuthenticated &&
        state?.auth?.userDetail?.authorization
      ) {
        headers.set('Authorization', state.auth.userDetail.authorization)
      }

      return headers
    },
  }),
  {
    maxRetries: 3,
  }
)

/**
 * Authentication API service.
 * Handles all auth-related API operations including authentication and user management.
 */
export const authApi = createApi({
  reducerPath: 'auth-api',
  tagTypes: ['User', 'Users', 'Auth'],
  baseQuery: baseQueryWithRetry,

  // Global configuration
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: true,

  endpoints: build => ({
    /**
     * Authenticate user with email and password.
     * @param credentials - User authentication credentials
     * @returns Authenticated user with authorization token
     */
    authenticateUser: build.mutation<AuthUser, AuthenticateUserDto>({
      query: credentials => ({
        url: '/authenticate',
        method: 'POST',
        body: credentials,
      }),

      invalidatesTags: ['Auth'],

      transformResponse(response: ResultResponse<AuthUser>) {
        if (response.code === 10012 || response.code === 200) {
          const { data } = response

          if (!data || !data.authorization) {
            addToast({
              title: 'Invalid login response',
              color: 'danger',
            })
            throw new Error('Invalid response')
          }

          addToast({
            title: 'Login successful',
            color: 'success',
          })

          return data
        }

        const errorMessage = response.message || 'Login failed'

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
            errorMessage = 'Invalid credentials provided'
            break
          case 401:
            errorMessage = 'Authentication failed - incorrect email or password'
            break
          case 403:
            errorMessage = 'Access denied - account may be locked'
            break
          case 404:
            errorMessage = 'User not found'
            break
          case 500:
            errorMessage = 'Internal server error - please try again'
            break
          default:
            errorMessage = 'Failed to authenticate'
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

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled

          if (data && data.authorization) {
            dispatch(setAuthUser({ isAuthenticated: true, userDetail: data }))
          }
        } catch (error) {
          // Error already handled in transformErrorResponse
        }
      },
    }),

    /**
     * Create a new user account.
     * @param userData - User registration data
     * @returns Created user (without sensitive data)
     */
    createUserAccount: build.mutation<AuthUser, CreateUserDto>({
      query: userData => ({
        url: '/create',
        method: 'POST',
        body: userData,
      }),

      invalidatesTags: ['Users'],

      transformResponse(response: ResultResponse<AuthUser>) {
        if (response.status === 10010 || response.status === 201) {
          const { data } = response

          if (!data) {
            addToast({
              title: 'Invalid account creation response',
              color: 'danger',
            })
            throw new Error('Invalid response')
          }

          addToast({
            title: 'Account created successfully',
            color: 'success',
          })

          return data
        }

        const errorMessage = response.message || 'Account creation failed'

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
            errorMessage = 'Invalid account data provided'
            break
          case 401:
            errorMessage = 'Authentication required'
            break
          case 403:
            errorMessage = 'Access denied - insufficient permissions'
            break
          case 409:
            errorMessage = 'Conflict - account with this email already exists'
            break
          case 422:
            errorMessage = 'Validation failed - please check your input'
            break
          case 500:
            errorMessage = 'Internal server error - please try again'
            break
          default:
            errorMessage = 'Failed to create account'
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
     * Get all users.
     * @returns Array of user entities
     */
    getAllUsers: build.query<UserEntity[], void>({
      query: () => ({
        url: '/all',
        method: 'GET',
      }),

      providesTags: result =>
        result
          ? [
            ...result.map(({ uid }) => ({ type: 'User' as const, id: uid })),
            { type: 'Users' as const, id: 'ALL' },
          ]
          : [{ type: 'Users' as const, id: 'ALL' }],

      transformResponse(response: ResultResponse<UserEntity[]>) {
        if (response.status === 200 || response.status === 10000) {
          const { data } = response

          if (!data || !Array.isArray(data)) {
            addToast({
              title: 'Invalid users response',
              color: 'danger',
            })

            return []
          }

          return data
        }

        const errorMessage = response.message || 'Failed to fetch users'

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
            errorMessage = 'Users not found'
            break
          case 500:
            errorMessage = 'Internal server error - please try again'
            break
          default:
            errorMessage = 'Failed to fetch users'
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
     * Get user by ID.
     * @param uid - User unique identifier
     * @returns User entity
     */
    getUserById: build.query<UserEntity, string>({
      query: uid => ({
        url: `/${uid}`,
        method: 'GET',
      }),

      providesTags: (result, error, uid) => [{ type: 'User', id: uid }],

      transformResponse(response: ResultResponse<UserEntity>) {
        if (response.status === 200 || response.status === 10000) {
          const { data } = response

          if (!data) {
            addToast({
              title: 'Invalid user response',
              color: 'danger',
            })

            return [] as any
          }

          return data
        }

        const errorMessage = response.message || 'Failed to fetch user'

        addToast({
          title: errorMessage,
          color: 'danger',
        })

        return [] as any
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
            errorMessage = 'User not found'
            break
          case 500:
            errorMessage = 'Internal server error - please try again'
            break
          default:
            errorMessage = 'Failed to fetch user'
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
     * Update user profile.
     * @param user - Partial user data with uid
     * @returns Updated user entity
     */
    updateUser: build.mutation<UserEntity, UpdateUserDto>({
      query: ({ uid, ...userData }) => ({
        url: `/${uid}`,
        method: 'PATCH',
        body: userData,
      }),

      invalidatesTags: (result, error, { uid }) => [
        { type: 'User', id: uid },
        { type: 'Users', id: 'ALL' },
      ],

      transformResponse(response: ResultResponse<UserEntity>) {
        if (response.status === 10000 || response.status === 200) {
          const { data } = response

          if (!data) {
            addToast({
              title: 'Invalid user update response',
              color: 'danger',
            })
            throw new Error('Invalid response')
          }

          addToast({
            title: 'User updated successfully',
            color: 'success',
          })

          return data
        }

        const errorMessage = response.message || 'User update failed'

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
            errorMessage = 'Invalid user data provided'
            break
          case 401:
            errorMessage = 'Authentication required - please sign in'
            break
          case 403:
            errorMessage = 'Access denied - insufficient permissions'
            break
          case 404:
            errorMessage = 'User not found'
            break
          case 409:
            errorMessage = 'Conflict - email already in use'
            break
          case 500:
            errorMessage = 'Internal server error - please try again'
            break
          default:
            errorMessage = 'Failed to update user'
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
     * Delete user account.
     * @param uid - User unique identifier
     * @returns void
     */
    deleteUser: build.mutation<void, string>({
      query: uid => ({
        url: `/${uid}`,
        method: 'DELETE',
      }),

      invalidatesTags: (result, error, uid) => [
        { type: 'User', id: uid },
        { type: 'Users', id: 'ALL' },
      ],

      transformResponse(response: ResultResponse<void>) {
        if (response.status === 10000 || response.status === 204) {
          addToast({
            title: 'User deleted successfully',
            color: 'success',
          })

          return
        }

        const errorMessage = response.message || 'User deletion failed'

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
            errorMessage = 'Invalid request parameters'
            break
          case 401:
            errorMessage = 'Authentication required - please sign in'
            break
          case 403:
            errorMessage = 'Access denied - insufficient permissions'
            break
          case 404:
            errorMessage = 'User not found'
            break
          case 500:
            errorMessage = 'Internal server error - please try again'
            break
          default:
            errorMessage = 'Failed to delete user'
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
  useAuthenticateUserMutation,
  useCreateUserAccountMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = authApi

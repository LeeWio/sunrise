import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { addToast } from '@heroui/react'

import { AuthUser, setAuthUser } from '../slice/auth-slice'

import { RootState } from '@/app/store'
import { ResultResponse } from '@/types'

export type UserAuthPayload = {
  /** Unique identifier for the user */
  uid?: string
  /** Username chosen by the user */
  username?: string
  /** Password for authentication */
  password: string
  /** Email address of the user */
  email: string
  /** URL to the user's avatar image */
  avatar?: string
  /** Current status of the user account */
  status?: string
  /** Timestamp when the user account was created */
  createdAt?: string
  /** Timestamp when the user account was last updated */
  updatedAt?: string
  /** Roles assigned to this user */
  roles?: string[]
}

export const authApi = createApi({
  reducerPath: 'auth-api',
  tagTypes: ['auth'],

  baseQuery: fetchBaseQuery({
    baseUrl: '/user',
    prepareHeaders: (headers, { getState }) => {
      const { auth } = getState() as RootState

      // Add authorization token to headers if user is authenticated
      if (auth.isAuthenticated && auth.userDetail?.authorization) {
        headers.set('Authorization', auth.userDetail.authorization)
      }

      return headers
    },
  }),

  endpoints: build => ({
    authenticateUser: build.mutation<AuthUser, UserAuthPayload>({
      query: credential => ({
        url: '/authenticate',
        method: 'POST',
        body: credential,
      }),
      transformResponse: (response: ResultResponse<AuthUser>) => {
        // Check if the response indicates success (assuming 10012 means success in your API)
        if (response.status === 10012) {
          const { data } = response

          if (!data || !data.authorization) {
            addToast({
              title: 'Invalid login response',
              color: 'danger',
            })

            // Throw error because response indicates success but data is invalid
            return {} as AuthUser
          }

          // Success case - return user data without throwing an error
          return data
        } else {
          // API indicates failure with non-success custom status
          addToast({
            title: response.message || 'Login failed',
            color: 'danger',
          })

          // Throw error to propagate failure to the client
          return {} as AuthUser
        }
      },
      transformErrorResponse: error => {
        // Return appropriate error messages based on different status codes
        const getErrorMessage = (status: number | string): string => {
          switch (status) {
            case 400:
              return 'Bad request'
            case 401:
              return 'Authentication failed'
            case 403:
              return 'Insufficient permissions'
            case 404:
              return 'Requested resource not found'
            case 500:
              return 'Internal server error'
            default:
              return 'An error occurred'
          }
        }

        return {
          message: getErrorMessage(error.status),
          status: error.status,
        }
      },

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          // Wait for the query to complete
          const { data } = await queryFulfilled

          // At this point, if we reach here, the response has been transformed
          // successfully by transformResponse and validation passed
          if (data && data.authorization) {
            // Set user authentication information
            dispatch(setAuthUser({ isAuthenticated: true, userDetail: data }))

            // Success login notification
            addToast({
              title: 'Login successful',
              color: 'success',
            })
          } else {
            // This case should not normally happen if transformResponse handles validation properly
          }
        } catch (error) {
          // This will catch errors thrown by transformResponse or network errors
          // Error toast is already shown in transformResponse, so we could
          // optionally just log or handle cleanup here
          addToast({
            title: 'Login error' + error,
            color: 'danger',
          })
        }
      },
    }),
    createAccount: build.mutation<AuthUser, UserAuthPayload>({
      query: credential => ({
        url: '/create',
        method: 'POST',
        body: credential,
      }),

      transformResponse(response: ResultResponse<AuthUser>) {
        // Check if the response indicates success (assuming 10010 means success in your API for account creation)
        if (response.status === 10010) {
          const { data } = response

          if (!data) {
            addToast({
              title: 'Invalid account creation response',
              color: 'danger',
            })

            // Return empty AuthUser object to indicate failure
            return {} as AuthUser
          }

          // Success case - return user data
          return data
        } else {
          // API indicates failure with non-success custom status
          addToast({
            title: response.message || 'Account creation failed',
            color: 'danger',
          })

          // Return empty AuthUser object to indicate failure
          return {} as AuthUser
        }
      },

      transformErrorResponse(error) {
        const getErrorMessage = (status: number | string): string => {
          switch (status) {
            case 400:
              return 'Invalid account data provided'
            case 401:
              return 'Authentication failed'
            case 403:
              return 'Insufficient permissions'
            case 404:
              return 'Requested resource not found'
            case 409: // Conflict - likely email/username already exists
              return 'Account with this email or username already exists'
            case 500:
              return 'Internal server error'
            default:
              return 'An error occurred during account creation'
          }
        }

        const errorMessage = getErrorMessage(error.status)

        // Show error toast for network or server errors
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
          // Wait for the query to complete
          await queryFulfilled

          // At this point, if we reach here, the response has been transformed
          // successfully by transformResponse and validation passed
          // if (data && data.authorization) {
          //   // Set user authentication information
          //   dispatch(setAuthUser({ isAuthenticated: true, userDetail: data }))
          //
          //   // Success account creation notification
          //   addToast({
          //     title: 'Account created successfully',
          //     color: 'success',
          //   })
          // } else {
          //   // This case should not normally happen if transformResponse handles validation properly
          //   addToast({
          //     title: 'Account creation succeeded but authentication failed',
          //     color: 'warning',
          //   })
          // }
        } catch (error) {
          // This will catch errors thrown by transformResponse or network errors
          // Error toast is already shown in transformResponse and transformErrorResponse,
          // so we could optionally just log or handle cleanup here
          addToast({
            title: 'Account creation error' + error,
            color: 'danger',
          })
        }
      },
    }),
  }),
})

export const { useAuthenticateUserMutation, useCreateAccountMutation } = authApi

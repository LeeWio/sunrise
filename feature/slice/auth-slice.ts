import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/**
 * Authenticated user entity.
 * Represents the authenticated user's information with authorization token.
 */
export interface AuthUser {
  /** Unique user identifier */
  uid?: string
  /** Username */
  username: string
  /** Email address */
  email: string
  /** Avatar image URL */
  avatar?: string
  /** JWT authorization token */
  authorization?: string
}

/**
 * Authentication state interface.
 * Manages user authentication status and details.
 */
interface AuthState {
  /** Authenticated user details (null if not authenticated) */
  userDetail: AuthUser | null
  /** Whether user is currently authenticated */
  isAuthenticated: boolean
}

/**
 * Initial authentication state.
 * Default values for unauthenticated state.
 */
const initialState: AuthState = {
  userDetail: null,
  isAuthenticated: false,
}

/**
 * Authentication Redux slice.
 * Manages authentication-related state including user details and login status.
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Set authenticated user data and mark as logged in.
     * @param state - Current authentication state
     * @param action - Payload containing auth state with user details
     */
    setAuthUser: (state, action: PayloadAction<AuthState>) => {
      state.userDetail = action.payload.userDetail
      state.isAuthenticated = true
    },

    /**
     * Clear authentication data and mark as logged out.
     * @param state - Current authentication state
     */
    removeAuthUser: state => {
      state.isAuthenticated = false
      state.userDetail = null
    },
  },
})

export const { setAuthUser, removeAuthUser } = authSlice.actions

export default authSlice.reducer

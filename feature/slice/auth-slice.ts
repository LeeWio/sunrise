import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/**
 * User profile type for frontend applications.
 * Represents the authenticated user's information as transferred from the backend.
 */
export interface AuthUser {
  uid?: string
  /** Username chosen by the user */
  username: string
  /** Email address of the user */
  email: string
  /** URL to the user's avatar image */
  avatar?: string
  authorization?: string
}

/**
 * Authentication state interface.
 * Defines the structure of authentication-related state in the Redux store.
 */
interface AuthState {
  /** The authenticated user's details */
  userDetail: AuthUser | null
  /** Authorization token for API requests */
  isAuthenticated: boolean
}

/**
 * Initial authentication state.
 * Sets up the default values for user authentication state.
 */
const initialState: AuthState = {
  userDetail: null,
  isAuthenticated: false,
}

/**
 * Authentication Redux slice.
 * Manages authentication-related state including user details and authorization tokens.
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Action to set the authenticated user and authorization token.
     * Updates both the user details and authorization token in the state.
     * @param state - Current authentication state
     * @param action - Payload containing user details and authorization token
     */
    setAuthUser: (state, action: PayloadAction<AuthState>) => {
      state.userDetail = action.payload.userDetail
      state.isAuthenticated = true
    },

    /**
     * Action to remove authentication data.
     * Clears the authorization token, effectively logging the user out.
     * @param state - Current authentication state
     */
    removeAuthuser: state => {
      state.isAuthenticated = false
    },
  },
})

export const { setAuthUser, removeAuthuser } = authSlice.actions

export default authSlice.reducer

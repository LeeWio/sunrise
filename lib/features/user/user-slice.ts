import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "../create-slice";

import {
  User,
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  UpdateProfileRequest,
  ChangePasswordRequest,
  AuditUserRequest,
  UpdateUserRequest,
  Page,
} from "./user-api";

export interface UserSliceState {
  // User data
  currentUser: User | null;
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;

  // Status flags
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;

  // Operation-specific status
  loginStatus: "idle" | "loading" | "succeeded" | "failed";
  registerStatus: "idle" | "loading" | "succeeded" | "failed";
  profileUpdateStatus: "idle" | "loading" | "succeeded" | "failed";
  passwordChangeStatus: "idle" | "loading" | "succeeded" | "failed";
  avatarUploadStatus: "idle" | "loading" | "succeeded" | "failed";
  userManagementStatus: "idle" | "loading" | "succeeded" | "failed";

  // Admin data
  allUsers: User[] | null;
  totalUsers: number;
  currentPage: number;
  pageSize: number;
}

const initialState: UserSliceState = {
  currentUser: null,
  isAuthenticated: false,
  token:
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null,
  refreshToken:
    typeof window !== "undefined"
      ? localStorage.getItem("refresh_token")
      : null,
  status: "idle",
  error: null,
  loginStatus: "idle",
  registerStatus: "idle",
  profileUpdateStatus: "idle",
  passwordChangeStatus: "idle",
  avatarUploadStatus: "idle",
  userManagementStatus: "idle",
  allUsers: null,
  totalUsers: 0,
  currentPage: 0,
  pageSize: 10,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: (create) => ({
    // Clear error
    clearError: create.reducer((state) => {
      state.error = null;
    }),

    // Reset status
    resetStatus: create.reducer((state) => {
      state.status = "idle";
      state.loginStatus = "idle";
      state.registerStatus = "idle";
      state.profileUpdateStatus = "idle";
      state.passwordChangeStatus = "idle";
      state.avatarUploadStatus = "idle";
      state.userManagementStatus = "idle";
    }),

    // Authentication actions (no implementations)
    login: create.asyncThunk(
      async (credentials: LoginRequest) => {
        // Implementation should be injected from outside
        throw new Error("UserAPI implementation not provided");
      },
      {
        pending: (state) => {
          state.loginStatus = "loading";
          state.error = null;
        },
        fulfilled: (state, action: PayloadAction<LoginResponse>) => {
          state.loginStatus = "succeeded";
          state.currentUser = action.payload.user;
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.refreshToken = action.payload.refreshToken;
          state.error = null;

          // Store tokens in localStorage
          if (typeof window !== "undefined") {
            localStorage.setItem("access_token", action.payload.token);
            localStorage.setItem("refresh_token", action.payload.refreshToken);
          }
        },
        rejected: (state, action) => {
          state.loginStatus = "failed";
          state.error = action.error.message || "Login failed";
          state.isAuthenticated = false;
          state.currentUser = null;
          state.token = null;
          state.refreshToken = null;
        },
      },
    ),

    register: create.asyncThunk(
      async (userData: RegisterRequest) => {
        throw new Error("UserAPI implementation not provided");
      },
      {
        pending: (state) => {
          state.registerStatus = "loading";
          state.error = null;
        },
        fulfilled: (state, action: PayloadAction<User>) => {
          state.registerStatus = "succeeded";
          state.error = null;
        },
        rejected: (state, action) => {
          state.registerStatus = "failed";
          state.error = action.error.message || "Registration failed";
        },
      },
    ),

    logout: create.asyncThunk(
      async () => {
        throw new Error("UserAPI implementation not provided");
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state) => {
          state.status = "succeeded";
          state.currentUser = null;
          state.isAuthenticated = false;
          state.token = null;
          state.refreshToken = null;
          state.error = null;

          // Clear localStorage
          if (typeof window !== "undefined") {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
          }
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error.message || "Logout failed";
        },
      },
    ),

    // Profile management actions
    fetchCurrentUser: create.asyncThunk(
      async () => {
        throw new Error("UserAPI implementation not provided");
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action: PayloadAction<User>) => {
          state.status = "succeeded";
          state.currentUser = action.payload;
          state.isAuthenticated = true;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error.message || "Failed to fetch user";
          state.isAuthenticated = false;
          state.currentUser = null;
        },
      },
    ),

    updateProfile: create.asyncThunk(
      async (profileData: UpdateProfileRequest) => {
        throw new Error("UserAPI implementation not provided");
      },
      {
        pending: (state) => {
          state.profileUpdateStatus = "loading";
          state.error = null;
        },
        fulfilled: (state, action: PayloadAction<User>) => {
          state.profileUpdateStatus = "succeeded";
          state.currentUser = action.payload;
        },
        rejected: (state, action) => {
          state.profileUpdateStatus = "failed";
          state.error = action.error.message || "Profile update failed";
        },
      },
    ),

    changePassword: create.asyncThunk(
      async (passwordData: ChangePasswordRequest) => {
        throw new Error("UserAPI implementation not provided");
      },
      {
        pending: (state) => {
          state.passwordChangeStatus = "loading";
          state.error = null;
        },
        fulfilled: (state) => {
          state.passwordChangeStatus = "succeeded";
        },
        rejected: (state, action) => {
          state.passwordChangeStatus = "failed";
          state.error = action.error.message || "Password change failed";
        },
      },
    ),

    // User management actions (admin)
    getAllUsers: create.asyncThunk(
      async (params: { page?: number; size?: number }) => {
        throw new Error("UserAPI implementation not provided");
      },
      {
        pending: (state) => {
          state.userManagementStatus = "loading";
        },
        fulfilled: (state, action: PayloadAction<Page<User>>) => {
          state.userManagementStatus = "succeeded";
          state.allUsers = action.payload.content;
          state.totalUsers = action.payload.totalElements;
          state.currentPage = action.payload.number;
          state.pageSize = action.payload.size;
        },
        rejected: (state, action) => {
          state.userManagementStatus = "failed";
          state.error = action.error.message || "Failed to fetch users";
        },
      },
    ),

    updateUser: create.asyncThunk(
      async (userData: UpdateUserRequest) => {
        throw new Error("UserAPI implementation not provided");
      },
      {
        pending: (state) => {
          state.userManagementStatus = "loading";
        },
        fulfilled: (state, action: PayloadAction<User>) => {
          state.userManagementStatus = "succeeded";
          // Update user in allUsers list if present
          if (state.allUsers) {
            const index = state.allUsers.findIndex(
              (user) => user.uid === action.payload.uid,
            );

            if (index !== -1) {
              state.allUsers[index] = action.payload;
            }
          }
          // Update current user if it's the same user
          if (state.currentUser?.uid === action.payload.uid) {
            state.currentUser = action.payload;
          }
        },
        rejected: (state, action) => {
          state.userManagementStatus = "failed";
          state.error = action.error.message || "Failed to update user";
        },
      },
    ),

    auditUser: create.asyncThunk(
      async (auditData: AuditUserRequest) => {
        throw new Error("UserAPI implementation not provided");
      },
      {
        pending: (state) => {
          state.userManagementStatus = "loading";
        },
        fulfilled: (state, action: PayloadAction<User>) => {
          state.userManagementStatus = "succeeded";
          // Update user in allUsers list if present
          if (state.allUsers) {
            const index = state.allUsers.findIndex(
              (user) => user.uid === action.payload.uid,
            );

            if (index !== -1) {
              state.allUsers[index] = action.payload;
            }
          }
          // Update current user if it's the same user
          if (state.currentUser?.uid === action.payload.uid) {
            state.currentUser = action.payload;
          }
        },
        rejected: (state, action) => {
          state.userManagementStatus = "failed";
          state.error = action.error.message || "Failed to audit user";
        },
      },
    ),

    deleteUser: create.asyncThunk(
      async (uid: string) => {
        throw new Error("UserAPI implementation not provided");
      },
      {
        pending: (state) => {
          state.userManagementStatus = "loading";
        },
        fulfilled: (state, action: PayloadAction<string>) => {
          state.userManagementStatus = "succeeded";
          // Remove user from allUsers list if present
          if (state.allUsers) {
            state.allUsers = state.allUsers.filter(
              (user) => user.uid !== action.payload,
            );
          }
          // If current user is deleted, logout
          if (state.currentUser?.uid === action.payload) {
            state.currentUser = null;
            state.isAuthenticated = false;
            state.token = null;
            state.refreshToken = null;
          }
        },
        rejected: (state, action) => {
          state.userManagementStatus = "failed";
          state.error = action.error.message || "Failed to delete user";
        },
      },
    ),
  }),
  selectors: {
    // Basic selectors
    selectCurrentUser: (user) => user.currentUser,
    selectIsAuthenticated: (user) => user.isAuthenticated,
    selectToken: (user) => user.token,
    selectCurrentUserStatus: (user) => user.status,
    selectError: (user) => user.error,

    // Status selectors
    selectLoginStatus: (user) => user.loginStatus,
    selectRegisterStatus: (user) => user.registerStatus,
    selectProfileUpdateStatus: (user) => user.profileUpdateStatus,
    selectPasswordChangeStatus: (user) => user.passwordChangeStatus,
    selectUserManagementStatus: (user) => user.userManagementStatus,

    // Admin selectors
    selectAllUsers: (user) => user.allUsers,
    selectTotalUsers: (user) => user.totalUsers,
    selectCurrentPage: (user) => user.currentPage,
    selectPageSize: (user) => user.pageSize,

    // Derived selectors
    selectIsAdmin: (user) =>
      user.currentUser?.roles?.some((role) => role.name === "ADMIN") ?? false,
    selectIsModerator: (user) =>
      user.currentUser?.roles?.some(
        (role) => role.name === "ADMIN" || role.name === "MODERATOR",
      ) ?? false,
    selectIsActiveUser: (user) => user.currentUser?.status === "ACTIVE",
    selectIsPendingUser: (user) => user.currentUser?.status === "PENDING",
    selectIsBannedUser: (user) => user.currentUser?.status === "BANNED",
  },
});

// Export actions
export const {
  clearError,
  resetStatus,
  login,
  register,
  logout,
  fetchCurrentUser,
  updateProfile,
  changePassword,
  getAllUsers,
  updateUser,
  auditUser,
  deleteUser,
} = userSlice.actions;

// Export selectors
export const {
  selectCurrentUser,
  selectIsAuthenticated,
  selectToken,
  selectCurrentUserStatus,
  selectError,
  selectLoginStatus,
  selectRegisterStatus,
  selectProfileUpdateStatus,
  selectPasswordChangeStatus,
  selectUserManagementStatus,
  selectAllUsers,
  selectTotalUsers,
  selectCurrentPage,
  selectPageSize,
  selectIsAdmin,
  selectIsModerator,
  selectIsActiveUser,
  selectIsPendingUser,
  selectIsBannedUser,
} = userSlice.selectors;

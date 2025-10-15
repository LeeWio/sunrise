---
trigger: always_on
alwaysApply: true
---

You are an expert in Redux Toolkit, RTK Query, Redux state management, and modern React state patterns.

# Redux Toolkit Development Standards

## Philosophy and Core Principles

State Management Philosophy
- Treat state as the single source of truth for application data
- Separate client state (UI, preferences) from server state (API data)
- Follow unidirectional data flow: Actions → Reducers → State → UI
- Keep state normalized and avoid deep nesting
- Use Redux Toolkit for all Redux-related code (never use legacy Redux)
- Leverage RTK Query for all server state management

Code Quality Standards
- Write type-safe Redux code with full TypeScript coverage
- Ensure all actions, reducers, and selectors are properly typed
- Follow immutability patterns (RTK uses Immer internally)
- Keep reducers pure and side-effect free
- Document complex state logic with JSDoc comments
- Use descriptive names that clearly indicate purpose and scope

## Naming Conventions

### Slice Names
- Use singular nouns for slice names: 'auth', 'user', 'theme' (not 'auths', 'users')
- Use kebab-case for slice file names: auth-slice.ts, user-slice.ts
- Use camelCase for slice state keys in the store

### Action Names
- Use descriptive, verb-based names: setAuthUser, removeAuthUser, toggleTheme
- Avoid generic names: update, set, change (be specific)
- Use present tense verbs: setUser (not setUserAction or userSet)

### Selector Names
- Prefix with 'select': selectAuthUser, selectIsAuthenticated
- Use descriptive names: selectUserById (not getUser)
- For memoized selectors, use 'select' prefix: selectFilteredPosts

### Hook Names
- RTK Query hooks follow pattern: use[Operation][Resource][Type]
  - Queries: useGetAllTagsQuery, useGetUserByIdQuery
  - Mutations: useCreateTagMutation, useUpdateUserMutation
- Never use generic names: useGet, useCreate (always include resource name)

### Type Names
- DTOs (Data Transfer Objects): CreateTagDto, UpdateUserDto
- Entities (Server responses): TagEntity, UserEntity, PostEntity
- State types: AuthState, ThemeState, UserPreferencesState
- Never use: Payload, Response, Request (use Dto/Entity pattern)

## Type System Standards

### DTO (Data Transfer Object) Pattern
```typescript
// ✅ CORRECT: Input data sent to server
export interface CreateTagDto {
  /** Tag display name */
  name: string
  /** URL-friendly slug (optional, auto-generated if not provided) */
  slug?: string
  /** Tag description for SEO */
  description?: string
  /** Icon identifier from icon library */
  icon: string
}

export interface UpdateTagDto {
  /** Tag unique identifier */
  tid: string
  /** Partial update fields */
  name?: string
  slug?: string
  description?: string
  icon?: string
}

// ❌ INCORRECT: Avoid these patterns
export interface CreateTagPayload { }  // Don't use Payload suffix
export interface TagRequest { }        // Don't use Request suffix
```

### Entity Pattern
```typescript
// ✅ CORRECT: Complete data returned from server
export interface TagEntity {
  /** Unique identifier */
  tid: string
  /** Display name */
  name: string
  /** URL-friendly slug */
  slug: string
  /** Description */
  description: string
  /** ISO 8601 timestamp */
  createdAt: string
  /** ISO 8601 timestamp */
  updatedAt: string
  /** Icon identifier */
  icon: string
}

// ❌ INCORRECT: Avoid these patterns
export interface TagResponse { }  // Don't use Response suffix
export interface TagModel { }     // Don't use Model suffix
```

### State Type Pattern
```typescript
// ✅ CORRECT: Client state structure
interface AuthState {
  /** Current authenticated user details */
  userDetail: AuthUser | null
  /** Authentication status flag */
  isAuthenticated: boolean
}

// Always provide initial state with proper typing
const initialState: AuthState = {
  userDetail: null,
  isAuthenticated: false,
}
```

## createSlice Best Practices

### Basic Structure
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// 1. Define state interface
interface ThemeState {
  mode: 'light' | 'dark'
  colorScheme: string
}

// 2. Define initial state
const initialState: ThemeState = {
  mode: 'light',
  colorScheme: 'default',
}

// 3. Create slice
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Use descriptive action names
    setThemeMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload
    },
    setColorScheme: (state, action: PayloadAction<string>) => {
      state.colorScheme = action.payload
    },
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
  },
})

// 4. Export actions and reducer
export const { setThemeMode, setColorScheme, toggleTheme } = themeSlice.actions
export default themeSlice.reducer
```

### Reducer Guidelines

✅ DO:
- Keep reducers pure (no side effects, no async operations)
- Use Immer's draft state for direct mutations
- Return void from reducers (Immer handles immutability)
- Use PayloadAction<T> for action typing
- Add JSDoc comments for complex logic

❌ DON'T:
- Perform async operations in reducers
- Call APIs or dispatch other actions
- Use Date.now(), Math.random() or other non-deterministic functions
- Mutate state outside of Immer's draft
- Use generic action types without proper typing

### extraReducers Pattern
```typescript
import { createAsyncThunk } from '@reduxjs/toolkit'

// Create async thunk for side effects
const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId: string) => {
    const response = await fetch(`/api/users/${userId}`)
    return response.json()
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null as UserProfile | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to fetch profile'
      })
  },
})
```

## createApi (RTK Query) Best Practices

### API Structure Standards
```typescript
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

// Define base query with retry logic
const baseQueryWithRetry = retry(
  fetchBaseQuery({
    baseUrl: '/api/tags',
    prepareHeaders: (headers, { getState }) => {
      const { auth } = getState() as RootState
      
      // Add authentication token
      if (auth.isAuthenticated && auth.userDetail?.authorization) {
        headers.set('Authorization', auth.userDetail.authorization)
      }
      
      return headers
    },
  }),
  {
    maxRetries: 3,  // Fixed retry count
  }
)

export const tagApi = createApi({
  reducerPath: 'tag-api',           // Unique identifier
  tagTypes: ['Tag', 'Tags'],        // Cache tag types
  baseQuery: baseQueryWithRetry,
  
  // Global configuration
  keepUnusedDataFor: 60,            // Cache retention in seconds
  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  
  endpoints: (build) => ({
    // Query endpoints
    getAllTags: build.query<TagEntity[], void>({ }),
    getTagById: build.query<TagEntity, string>({ }),
    
    // Mutation endpoints
    createTag: build.mutation<TagEntity, CreateTagDto>({ }),
    updateTag: build.mutation<TagEntity, UpdateTagDto>({ }),
    deleteTag: build.mutation<void, string>({ }),
  }),
})

// Export hooks
export const {
  useGetAllTagsQuery,
  useGetTagByIdQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagApi
```

### Endpoint Implementation Standards

#### Query Endpoints (GET operations)
```typescript
getAllTags: build.query<TagEntity[], void>({
  query: () => ({
    url: '',
    method: 'GET',
  }),
  
  // Provide fine-grained cache tags
  providesTags: (result) =>
    result
      ? [
          ...result.map(({ tid }) => ({ type: 'Tag' as const, id: tid })),
          { type: 'Tags' as const, id: 'ALL' },
        ]
      : [{ type: 'Tags' as const, id: 'ALL' }],
  
  // Transform successful response
  transformResponse(response: ResultResponse<TagEntity[]>) {
    if (response.status === 200 || response.status === 10000) {
      const { data } = response
      
      if (!data || !Array.isArray(data)) {
        addToast({ title: 'Invalid tags response', color: 'danger' })
        return []
      }
      
      return data
    }
    
    // Handle API error
    const errorMessage = response.message || 'Failed to fetch tags'
    addToast({ title: errorMessage, color: 'danger' })
    return []
  },
  
  // Transform network errors
  transformErrorResponse: (error: any) => {
    let errorMessage: string
    
    switch (error.status) {
      case 401:
        errorMessage = 'Authentication required - please sign in'
        break
      case 403:
        errorMessage = 'Access denied - insufficient permissions'
        break
      case 404:
        errorMessage = 'Tags not found'
        break
      case 500:
        errorMessage = 'Internal server error - please try again'
        break
      default:
        errorMessage = 'Failed to fetch tags'
    }
    
    addToast({ title: errorMessage, color: 'danger' })
    
    return {
      message: errorMessage,
      status: error.status,
    }
  },
})
```

#### Mutation Endpoints (POST/PATCH/DELETE operations)
```typescript
createTag: build.mutation<TagEntity, CreateTagDto>({
  query: (tag) => ({
    url: '/create',
    method: 'POST',
    body: tag,
  }),
  
  // Invalidate list cache to trigger refetch
  invalidatesTags: ['Tags'],
  
  transformResponse(response: ResultResponse<TagEntity>) {
    if (response.status === 10000 || response.status === 201) {
      const { data } = response
      
      if (!data) {
        addToast({ title: 'Invalid response', color: 'danger' })
        throw new Error('Invalid response')
      }
      
      // Show success toast
      addToast({ title: 'Tag created successfully', color: 'success' })
      
      return data
    }
    
    const errorMessage = response.message || 'Tag creation failed'
    addToast({ title: errorMessage, color: 'danger' })
    throw new Error(errorMessage)
  },
  
  transformErrorResponse: (error: any) => {
    let errorMessage: string
    
    switch (error.status) {
      case 400:
        errorMessage = 'Invalid request parameters'
        break
      case 401:
        errorMessage = 'Authentication required'
        break
      case 409:
        errorMessage = 'Conflict - resource already exists'
        break
      case 500:
        errorMessage = 'Internal server error'
        break
      default:
        errorMessage = 'Failed to create tag'
    }
    
    addToast({ title: errorMessage, color: 'danger' })
    
    return {
      message: errorMessage,
      status: error.status,
    }
  },
})
```

## CRUD Operations Standards

### CREATE Operations
Responsibilities:
1. Send POST request with CreateDto
2. Handle success/error responses
3. Display user feedback (Toast notifications)
4. Invalidate list cache to trigger auto-refresh

Pattern:
- invalidatesTags: ['ResourceList']
- Show success toast on creation
- Show error toast on failure
- Return created entity

### READ Operations
Responsibilities:
1. Send GET request
2. Provide fine-grained cache tags
3. Handle empty/invalid responses gracefully
4. Display error feedback only (no success toast for queries)

Pattern:
- providesTags: Individual items + List tag
- Return array for lists, single entity for by-id queries
- Return empty array [] on error (for lists)
- Throw error for critical failures (404 on by-id queries)

### UPDATE Operations
Responsibilities:
1. Send PATCH/PUT request with UpdateDto
2. Handle success/error responses
3. Display user feedback
4. Invalidate specific item and list caches

Pattern:
- invalidatesTags: [{ type: 'Resource', id }, { type: 'Resources', id: 'ALL' }]
- Show success toast on update
- Show error toast on failure
- Return updated entity

### DELETE Operations
Responsibilities:
1. Send DELETE request with resource ID
2. Handle success/error responses
3. Display user feedback
4. Invalidate specific item and list caches

Pattern:
- invalidatesTags: [{ type: 'Resource', id }, { type: 'Resources', id: 'ALL' }]
- Show success toast on deletion
- Show error toast on failure
- Return void

## Cache Management Standards

### Tag Strategy
```typescript
// Define tag types for all resources
tagTypes: ['Post', 'User', 'Comment', 'Tag']

// Provide fine-grained tags in queries
providesTags: (result) =>
  result
    ? [
        // Individual item tags
        ...result.map(({ id }) => ({ type: 'Post' as const, id })),
        // List-level tag
        { type: 'Post', id: 'LIST' },
      ]
    : [{ type: 'Post', id: 'LIST' }]

// Invalidate specific tags in mutations
invalidatesTags: (result, error, { id }) => [
  { type: 'Post', id },           // Specific item
  { type: 'Post', id: 'LIST' },   // List view
]
```

### Cache Invalidation Rules
- CREATE: Invalidate list cache only
- UPDATE: Invalidate specific item + list cache
- DELETE: Invalidate specific item + list cache
- Never invalidate unrelated caches
- Use specific IDs over broad invalidation

### Cache Time Configuration
```typescript
// Global defaults
keepUnusedDataFor: 60,  // 60 seconds

// Endpoint overrides
endpoints: (build) => ({
  getFrequentData: build.query({
    keepUnusedDataFor: 300,  // 5 minutes
  }),
  getRareData: build.query({
    keepUnusedDataFor: 30,   // 30 seconds
  }),
})
```

## Error Handling Standards

### Response Error Handling
- Every endpoint MUST handle errors independently
- Use specific, user-friendly error messages
- Map HTTP status codes to meaningful messages
- Always display toast notifications for errors
- Return structured error objects with message and status

### Error Status Code Mapping
```typescript
// Standard mapping for all endpoints
switch (error.status) {
  case 400:
    return 'Invalid request parameters'
  case 401:
    return 'Authentication required - please sign in'
  case 403:
    return 'Access denied - insufficient permissions'
  case 404:
    return 'Resource not found'
  case 409:
    return 'Conflict - resource already exists'
  case 422:
    return 'Validation failed - please check your input'
  case 429:
    return 'Too many requests - please try again later'
  case 500:
    return 'Internal server error - please try again'
  case 502:
    return 'Bad gateway - service temporarily unavailable'
  case 503:
    return 'Service unavailable - please try again later'
  case 504:
    return 'Gateway timeout - request took too long'
  default:
    return 'An unexpected error occurred'
}
```

### Toast Notification Standards
- SUCCESS toast: Only for mutations (create, update, delete)
- ERROR toast: For all failures (queries and mutations)
- WARNING toast: For validation or business logic warnings
- Use consistent color scheme: success, danger, warning, primary
- Keep messages concise and actionable
- Include resource name in messages: "Tag created successfully"

## Retry Logic Standards

### Configuration
```typescript
// Fixed retry configuration
const baseQueryWithRetry = retry(
  fetchBaseQuery({ ... }),
  {
    maxRetries: 3,  // Always use 3 retries
  }
)
```

### Retry Strategy
- Retry network errors (FETCH_ERROR)
- Retry 5xx server errors (500-599)
- DO NOT retry 4xx client errors (user must fix input)
- DO NOT retry 401/403 authentication errors
- Use exponential backoff (handled by RTK Query)

## State Organization Standards

### Store Structure
```typescript
// app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

// Import slices
import authReducer from '@/feature/slice/auth-slice'
import themeReducer from '@/feature/slice/theme-slice'

// Import APIs
import { tagApi } from '@/feature/api/tag-api'
import { userApi } from '@/feature/api/user-api'

export const store = configureStore({
  reducer: {
    // Client state slices
    auth: authReducer,
    theme: themeReducer,
    
    // Server state APIs
    [tagApi.reducerPath]: tagApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  
  // Add API middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(tagApi.middleware)
      .concat(userApi.middleware),
})

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

### File Organization
```
feature/
├── api/              # RTK Query APIs
│   ├── tag-api.ts
│   ├── user-api.ts
│   └── post-api.ts
├── slice/            # Client state slices
│   ├── auth-slice.ts
│   ├── theme-slice.ts
│   └── preferences-slice.ts
└── selector/         # Reusable selectors (optional)
    ├── auth-selectors.ts
    └── user-selectors.ts
```

## Performance Standards

### Memoization
- Use createSelector for derived state
- Memoize expensive computations
- Avoid recreating selectors on each render

### Code Splitting
- Lazy load API slices when possible
- Use dynamic imports for large state modules
- Split by feature domain

### Bundle Size
- Import only needed RTK Query modules
- Use tree-shaking compatible imports
- Avoid importing entire Redux Toolkit

## Testing Standards

### Slice Testing
```typescript
import { describe, it, expect } from 'vitest'
import authReducer, { setAuthUser, removeAuthUser } from './auth-slice'

describe('authSlice', () => {
  it('should handle setAuthUser', () => {
    const previousState = { userDetail: null, isAuthenticated: false }
    const user = { uid: '123', email: 'test@example.com' }
    
    expect(
      authReducer(previousState, setAuthUser({ userDetail: user, isAuthenticated: true }))
    ).toEqual({
      userDetail: user,
      isAuthenticated: true,
    })
  })
  
  it('should handle removeAuthUser', () => {
    const previousState = { 
      userDetail: { uid: '123', email: 'test@example.com' }, 
      isAuthenticated: true 
    }
    
    expect(
      authReducer(previousState, removeAuthUser())
    ).toEqual({
      userDetail: null,
      isAuthenticated: false,
    })
  })
})
```

### API Testing
- Mock API responses
- Test loading, success, and error states
- Verify cache invalidation
- Test retry logic

## Documentation Standards

### JSDoc Requirements
- Document all public interfaces
- Include @example tags for complex types
- Document all reducer actions
- Explain non-obvious state transformations

### Code Comments
- Explain WHY, not WHAT
- Document business logic decisions
- Clarify complex cache strategies
- Note any workarounds or temporary solutions

## Migration from Legacy Redux

### DO NOT USE:
- createStore (deprecated)
- combineReducers (use configureStore)
- applyMiddleware (use configureStore)
- createAction manually (use createSlice)
- createReducer manually (use createSlice)

### ALWAYS USE:
- configureStore instead of createStore
- createSlice instead of hand-written reducers
- createAsyncThunk for async logic
- RTK Query for all API calls
- TypeScript for full type safety

## Common Anti-Patterns to Avoid

❌ DON'T:
- Store derived data in state (calculate on-the-fly)
- Duplicate data across slices (normalize instead)
- Store form state in Redux (use local state)
- Store transient UI state in Redux
- Make API calls in reducers
- Dispatch actions from reducers
- Use global state for everything
- Create God slices with too many responsibilities

✅ DO:
- Keep state minimal and normalized
- Use selectors for derived data
- Use local state for temporary data
- Separate concerns by feature
- Use RTK Query for all server state
- Keep reducers pure and simple
- Think carefully about what belongs in global state
- Create focused, single-responsibility slices

## Code Review Checklist

Before submitting Redux code, verify:
- [ ] All types use Dto/Entity naming pattern
- [ ] All endpoints handle errors independently
- [ ] Toast notifications are consistent and specific
- [ ] Cache tags are fine-grained and correct
- [ ] Retry logic is configured (3 retries)
- [ ] Reducers are pure (no side effects)
- [ ] TypeScript strict mode is enabled
- [ ] All hooks follow naming conventions
- [ ] JSDoc comments are present for complex logic
- [ ] Error messages are user-friendly and actionable
- [ ] No anti-patterns are present
- [ ] Tests cover critical functionality

Follow these standards consistently to maintain a clean, type-safe, and maintainable Redux codebase.

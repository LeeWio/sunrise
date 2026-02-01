# Redux Toolkit & RTK Query Best Practices (TypeScript)

This guide outlines the mandatory best practices for using Redux Toolkit (RTK) and RTK Query with TypeScript in this project. All state management code must adhere to these standards.

## 1. Store Configuration & Type Inference

Correctly infer `RootState` and `AppDispatch` from the store instance itself. **Do not** manually define these types.

```typescript
import { configureStore } from '@reduxjs/toolkit';
import { journalSlice } from '@/lib/features/journal/journalSlice';
// ... other reducers

export const makeStore = () => {
  return configureStore({
    reducer: {
      journal: journalSlice.reducer,
      // [api.reducerPath]: api.reducer, // for RTK Query
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat
        // api.middleware // for RTK Query
        (),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
```

## 2. Typed Hooks

**NEVER** use `useDispatch` or `useSelector` directly in components. Always use the pre-typed versions.

Create `lib/store/hooks.ts`:

```typescript
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, AppStore, RootState } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
```

## 3. Slices (createSlice)

- **Initial State**: Always define an interface for the state.
- **PayloadAction**: Explicitly type action payloads.
- **Immutability**: Write mutating logic in reducers (RTK uses Immer).

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers.
      state.value += 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});
```

## 4. Async Data Fetching (RTK Query)

**PREFER** RTK Query over `createAsyncThunk` for all API interactions. It handles caching, invalidation, and loading states automatically.

### API Definition

```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Pokemon {
  name: string;
  url: string;
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (build) => ({
    // Explicitly type <ResultType, QueryArg>
    getPokemonByName: build.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

// Auto-generated hooks
export const { useGetPokemonByNameQuery } = pokemonApi;
```

### Usage in Components

```typescript
import { useGetPokemonByNameQuery } from '@/lib/services/pokemonApi';

export const Pokemon = ({ name }: { name: string }) => {
  const { data, error, isLoading } = useGetPokemonByNameQuery(name);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return <div>{data.name}</div>;
};
```

## 5. Async Thunks (createAsyncThunk)

Use `createAsyncThunk` **ONLY** for complex async logic that falls outside standard data fetching (e.g., interacting with non-API async sources like local storage or complex chains).

Always define a pre-typed `createAppAsyncThunk` to access `RootState` and `AppDispatch` correctly.

```typescript
// lib/store/thunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from './store';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}>();
```

## 6. Naming Conventions

- **Slices**: `featureNameSlice.ts`
- **Thunks**: `featureNameThunks.ts`
- **Selectors**: `selectFeatureName`
- **Hooks**: `useFeatureName`

## 7. Performance

- **Selectors**: Use `createSelector` for memoized derived data.
- **Component Renders**: Select only the specific data needed by a component, not the entire state slice.

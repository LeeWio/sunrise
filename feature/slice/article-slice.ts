import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CreateTagDto } from '../api/tag-api'

/**
 * Draft state interface for article creation.
 * Represents the temporary state of an article being composed.
 */
interface DraftState {
  /** Article title */
  title: string
  /** Article content in markdown or HTML format */
  content: string
  /** Brief summary/excerpt */
  summary: string
  /** Cover image URL */
  coverImage: string
  /** URL-friendly slug */
  slug: string
  /** Associated tags */
  tags: CreateTagDto[]
  /** Author user ID */
  authorId: string
  /** Category ID */
  categoryId: string
}

/**
 * Initial draft state.
 * Default values for a new article draft.
 */
const initialDraftState: DraftState = {
  title: '',
  content: '',
  summary: '',
  coverImage: '',
  slug: '',
  tags: [],
  authorId: '',
  categoryId: '',
}

/**
 * Article slice state interface.
 * Manages article-related client state.
 */
interface ArticleState {
  /** Current article draft being edited */
  draft: DraftState
}

/**
 * Initial article state.
 */
const initialState: ArticleState = {
  draft: initialDraftState,
}

/**
 * Article Redux slice.
 * Manages article draft state for creation and editing.
 */
const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    /**
     * Update article draft with partial data.
     * @param state - Current state
     * @param action - Payload containing partial draft data
     */
    updateDraft(state, action: PayloadAction<Partial<DraftState>>) {
      state.draft = { ...state.draft, ...action.payload }
    },

    /**
     * Clear article draft and reset to initial state.
     * @param state - Current state
     */
    removeDraft(state) {
      state.draft = initialDraftState
    },
  },
})

export const { updateDraft, removeDraft } = articleSlice.actions

export default articleSlice.reducer

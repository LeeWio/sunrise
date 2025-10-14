import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CreateTagPayload } from '../api/tag-api'

interface DraftState {
  title: string
  content: string
  summary: string
  coverImage: string
  slug: string
  tags: CreateTagPayload[]
  authorId: string
  categoryId: string
}

const initialDraftState = {
  title: '',
  content: '',
  summary: '',
  coverImage: '',
  slug: '',
  tags: [],
  authorId: '',
  categoryId: '',
}

interface ArticleState {
  draft: DraftState
}

const initialState: ArticleState = {
  draft: initialDraftState,
}

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    updateDraft(state, action: PayloadAction<Partial<DraftState>>) {
      // Update multiple fields at once using the payload
      state.draft = { ...state.draft, ...action.payload }
    },

    removeDraft(state) {
      state.draft = initialDraftState
    },
  },
})

export const { updateDraft, removeDraft } = articleSlice.actions

export default articleSlice.reducer

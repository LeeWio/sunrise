import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DraftState {
  title: string
  content: string
  summary: string
  coverImage: string
}

const initialDraftState = {
  title: '',
  content: '',
  summary: '',
  coverImage: '',
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
    updateDraft(state, action: PayloadAction<ArticleState>) {
      state.draft = action.payload.draft
    },

    removeDraft(state) {
      state.draft = initialDraftState
    },
  },
})

export const { updateDraft, removeDraft } = articleSlice.actions

export default articleSlice.reducer

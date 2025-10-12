import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TElement } from 'platejs'

interface DraftState {
  title: string
  content: Array<TElement>
  summary: string
  coverImage: string
  slug: string
  tagIds: string[]
  authorId: string
  categoryId: string
}

const initialDraftState = {
  title: '',
  content: [],
  summary: '',
  coverImage: '',
  slug: '',
  tagIds: [],
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

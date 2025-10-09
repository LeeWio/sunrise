import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TElement } from 'platejs'

interface DraftState {
  title: string
  content: Array<TElement>
  summary: string
  coverImage: string
}

const initialDraftState = {
  title: '',
  content: [],
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
    updateDraft(state, action: PayloadAction<Array<TElement>>) {
      console.log('aritcle-slice', action.payload)
      state.draft.content = action.payload
    },

    removeDraft(state) {
      state.draft = initialDraftState
    },
  },
})

export const { updateDraft, removeDraft } = articleSlice.actions

export default articleSlice.reducer

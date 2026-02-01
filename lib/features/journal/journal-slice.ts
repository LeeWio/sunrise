import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface JournalEntry {
  id: string;
  title: string;
  content: string; // HTML or JSON from Tiptap
  createdAt: string;
  updatedAt: string;
}

interface JournalState {
  entries: JournalEntry[];
  selectedEntryId: string | null;
  isSaving: boolean;
}

const initialState: JournalState = {
  entries: [],
  selectedEntryId: null,
  isSaving: false,
};

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    setEntries: (state, action: PayloadAction<JournalEntry[]>) => {
      state.entries = action.payload;
    },
    selectEntry: (state, action: PayloadAction<string | null>) => {
      state.selectedEntryId = action.payload;
    },
    updateEntry: (state, action: PayloadAction<JournalEntry>) => {
      const index = state.entries.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.entries[index] = action.payload;
      }
    },
    addEntry: (state, action: PayloadAction<JournalEntry>) => {
      state.entries.unshift(action.payload);
      state.selectedEntryId = action.payload.id;
    },
    setIsSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
    },
  },
});

export const { setEntries, selectEntry, updateEntry, addEntry, setIsSaving } = journalSlice.actions;

export default journalSlice.reducer;

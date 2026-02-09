import { Editor } from '@tiptap/react';
import { EditorView } from '@tiptap/pm/view';
import { EditorState } from '@tiptap/pm/state';

export interface MenuProps {
  editor: Editor;
  isEditable?: boolean;
}

export interface ShouldShowProps {
  editor?: Editor;
  view: EditorView;
  state?: EditorState;
  oldState?: EditorState;
  from?: number;
  to?: number;
}

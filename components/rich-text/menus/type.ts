import React from "react";
import { Editor } from "@tiptap/react";
import { EditorState } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";

export interface MenuProps {
  editor: Editor;
  appendTo?: React.RefObject<HTMLDivElement>;
  shouldHide?: boolean;
}

export interface ShouldShowProps {
  editor?: Editor;
  view: EditorView;
  state?: EditorState;
  oldState?: EditorState;
  from?: number;
  to?: number;
}

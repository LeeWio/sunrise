"use client";

import { Provider } from "react-redux";
import { store } from "../store";
import { useEditorShortcut } from "../hooks/use-editor-shortcut";
import { EditorModal } from "../components/rich-text/editor-modal";

function GlobalHooks() {
  useEditorShortcut();
  return <EditorModal />;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <GlobalHooks />
    </Provider>
  );
}
"use client";

import { HeroUIProvider } from "@heroui/react";
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
      <HeroUIProvider>
        {children}
        <GlobalHooks />
      </HeroUIProvider>
    </Provider>
  );
}
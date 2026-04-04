"use client";

import { Provider } from "react-redux";
import { store } from "../store";
import { useRichTextShortcut } from "../hooks/use-rich-text-shortcut";
import { RichTextModal } from "../components/rich-text/rich-text-modal";

function GlobalHooks() {
  useRichTextShortcut();
  return <RichTextModal />;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <GlobalHooks />
    </Provider>
  );
}

import { useEditor, UseEditorOptions } from "@tiptap/react";
import { ExtensionKit } from "../components/rich-text/extensions/extension-kit";

export function useRichText(options?: Partial<UseEditorOptions>) {
  const editor = useEditor({
    extensions: [...ExtensionKit],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "focus:outline-none selection:bg-foreground/20 selection:text-foreground",
      },
    },
    ...options,
  });

  return editor;
}

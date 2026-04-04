import { useEditor, UseEditorOptions } from "@tiptap/react";
import { ExtensionKit } from "../components/rich-text/extensions/extension-kit";

export function useRichText(options?: Partial<UseEditorOptions>) {
  const editor = useEditor({
    extensions: [...ExtensionKit],
    immediatelyRender: false,
    ...options,
  });

  return editor;
}

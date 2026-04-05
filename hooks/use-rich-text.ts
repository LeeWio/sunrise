import { useEditor, UseEditorOptions } from "@tiptap/react";
import { ExtensionKit } from "../components/rich-text/extensions/extension-kit";

export function useRichText(options?: Partial<UseEditorOptions>) {
  const editor = useEditor({
    extensions: [...ExtensionKit],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "focus:outline-none selection:bg-foreground/20 selection:text-foreground [&_.is-empty::before]:content-[attr(data-placeholder)] [&_.is-empty::before]:pointer-events-none [&_.is-empty::before]:float-left [&_.is-empty::before]:h-0 [&_.is-empty::before]:text-default-400",
      },
    },
    ...options,
  });

  return editor;
}

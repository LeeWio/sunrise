import { useEditor, UseEditorOptions } from "@tiptap/react";
import { ExtensionKit } from "../components/rich-text/extensions/extension-kit";

export function useRichText(options?: Partial<UseEditorOptions>) {
  const editor = useEditor({
    extensions: [...ExtensionKit],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "px-6 focus:outline-none selection:bg-foreground/20 selection:text-foreground",
        // class: "px-4 py-2 focus:outline-none selection:bg-foreground/20 selection:text-foreground [&_.is-empty::before]:content-[attr(data-placeholder)] [&_.is-empty::before]:pointer-events-none [&_.is-empty::before]:float-left [&_.is-empty::before]:h-0 [&_.is-empty::before]:text-default-400 [&_table]:border-collapse [&_table]:m-0 [&_table]:overflow-hidden [&_table]:table-fixed [&_table]:w-full [&_td]:border [&_td]:border-divider [&_td]:box-border [&_td]:min-w-[1em] [&_td]:px-2 [&_td]:py-1.5 [&_td]:relative [&_td]:align-top [&_td>*]:mb-0 [&_th]:border [&_th]:border-divider [&_th]:box-border [&_th]:min-w-[1em] [&_th]:px-2 [&_th]:py-1.5 [&_th]:relative [&_th]:align-top [&_th>*]:mb-0 [&_th]:bg-default-100 [&_th]:font-bold [&_th]:text-left [&_.selectedCell]:relative [&_.selectedCell:after]:bg-default-200 [&_.selectedCell:after]:content-[''] [&_.selectedCell:after]:inset-0 [&_.selectedCell:after]:pointer-events-none [&_.selectedCell:after]:absolute [&_.selectedCell:after]:z-[2] [&_.column-resize-handle]:bg-primary [&_.column-resize-handle]:-bottom-[2px] [&_.column-resize-handle]:pointer-events-none [&_.column-resize-handle]:absolute [&_.column-resize-handle]:-right-[2px] [&_.column-resize-handle]:top-0 [&_.column-resize-handle]:w-[4px] [&_.tableWrapper]:my-6 [&_.tableWrapper]:overflow-x-auto [&.resize-cursor]:cursor-col-resize",
      },
    },
    ...options,
  });

  return editor;
}

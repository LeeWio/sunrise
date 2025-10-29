import { Editor, useEditorState } from "@tiptap/react";

import { ContentPickerOptions } from "../components/content-type-picker";

export const useTextMenuContentTypes = (editor: Editor) => {
  return useEditorState({
    editor,
    selector(ctx): ContentPickerOptions {
      return [
        {
          type: "category",
          label: "Hierarchy",
          id: "hierarchy",
        },
        {
          icon: "Pilcrow",
          onClick: () =>
            ctx.editor
              .chain()
              .focus()
              .lift("taskItem")
              .liftListItem("listItem")
              .setParagraph()
              .run(),
          id: "paragraph",
          disabled: () => !ctx.editor.can().setParagraph(),
          isActive: () =>
            ctx.editor.isActive("paragraph") &&
            !ctx.editor.isActive("orderedList") &&
            !ctx.editor.isActive("bulletList") &&
            !ctx.editor.isActive("taskList"),
          label: "Paragraph",
          type: "option",
        },
        {
          icon: "Heading1",
          onClick: () =>
            ctx.editor
              .chain()
              .focus()
              .lift("taskItem")
              .liftListItem("listItem")
              .setHeading({ level: 1 })
              .run(),
          id: "heading1",
          disabled: () => !ctx.editor.can().setHeading({ level: 1 }),
          isActive: () => ctx.editor.isActive("heading", { level: 1 }),
          label: "Heading 1",
          type: "option",
        },
      ];
    },
  });
};

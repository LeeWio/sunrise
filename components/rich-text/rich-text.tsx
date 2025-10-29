"use client";

import { EditorContent, useEditorState } from "@tiptap/react";
import "./styles/index.css";
import { Button } from "@heroui/react";
import { useRef } from "react";

import { TextMenu } from "./menus/text-menu";
import { ContentItemMenu } from "./menus/content-item-menu";

import { useRichText } from "@/hooks/use-rich-text";

export const RichText = () => {
  const { editor } = useRichText();

  const menuContainerRef = useRef<HTMLDivElement>(null);

  const { characters, words } = useEditorState({
    editor,
    selector: (ctx) => {
      const { characters, words } = ctx.editor?.storage.characterCount || {
        characters: () => 0,
        words: () => 0,
      };

      return { characters: characters(), words: words() };
    },
  }) ?? { characters: 0, words: 0 };

  if (!editor) {
    return null;
  }

  return (
    <>
      <Button
        onPress={() =>
          editor
            .chain()
            .focus()
            .setColumns()
            .focus(editor.state.selection.head - 1)
            .run()
        }
      >
        add columns
      </Button>
      <div ref={menuContainerRef}>
        {editor && editor.isEditable && (
          <>
            <ContentItemMenu editor={editor} isEditable={editor.isEditable} />
            <EditorContent
              className="w-full h-full overflow-y-auto scrollbar-hide min-h-dvh"
              editor={editor}
            />

            <TextMenu appendTo={menuContainerRef} editor={editor} />
          </>
        )}
      </div>
    </>
  );
};

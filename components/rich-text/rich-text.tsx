"use client";

import "./styles/index.css";
import "katex/dist/katex.min.css";
import { EditorContent, useEditorState } from "@tiptap/react";
import { Button } from "@heroui/react";
import { useRef } from "react";

import { TextMenu } from "./menus/text-menu";
import { ContentItemMenu } from "./menus/content-item-menu";
import { LinkMenu } from "./menus/link-menu";
import { ImageBlockMenu } from "./extensions/image-block/views/image-block-menu";
import { AudioMenu } from "./extensions/audio/views/audio-menu";
import { ColumnsMenu } from "./extensions/multi-column/menus/columns-menu";

import { useRichText } from "@/hooks/use-rich-text";

export const RichText = () => {
  const { editor } = useRichText();

  const menuContainerRef = useRef<HTMLDivElement>(null);

  const { charactersCount, wordsCount } = useEditorState({
    editor,
    selector: (context) => ({
      charactersCount: context.editor?.storage.characterCount.characters(),
      wordsCount: context.editor?.storage.characterCount.words(),
    }),
  });

  const { canUndo, canRedo } = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        canUndo: ctx.editor?.can().chain().focus().undo().run(),
        canRedo: ctx.editor?.can().chain().focus().redo().run(),
      };
    },
  });

  if (!editor) {
    return (
      <div className="p-4 bg-blue-100 text-blue-800 rounded">
        编辑器正在加载中...
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-2 p-4">
        <Button onPress={() => editor.chain().focus().setImageUpload().run()}>
          add Image
        </Button>
        <Button onPress={() => editor.chain().focus().setAudioUpload().run()}>
          add Audio
        </Button>
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
          add Columns
        </Button>
      </div>

      <div ref={menuContainerRef}>
        {editor && editor.isEditable && (
          <>
            <EditorContent
              className="w-[720px] h-full overflow-y-auto scrollbar-hide min-h-dvh"
              editor={editor}
            />

            <ColumnsMenu appendTo={menuContainerRef} editor={editor} />

            <ContentItemMenu editor={editor} isEditable={editor.isEditable} />

            <ImageBlockMenu appendTo={menuContainerRef} editor={editor} />

            <LinkMenu appendTo={menuContainerRef} editor={editor} />

            <TextMenu appendTo={menuContainerRef} editor={editor} />

            <AudioMenu appendTo={menuContainerRef} editor={editor} />
          </>
        )}
      </div>
    </>
  );
};

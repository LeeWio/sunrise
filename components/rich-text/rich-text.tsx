"use client";

import "./styles/index.css";
import { EditorContent, useEditorState } from "@tiptap/react";
import { Button } from "@heroui/react";
import { useRef } from "react";

import { TextMenu } from "./menus/text-menu";
import { ContentItemMenu } from "./menus/content-item-menu";
import { LinkMenu } from "./menus/link-menu";
import { ImageBlockMenu } from "./extensions/image-block/views/image-block-menu";

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
    return (
      <div className="p-4 bg-blue-100 text-blue-800 rounded">
        编辑器正在加载中...
      </div>
    );
  }

  return (
    <>
      <Button onPress={() => editor.chain().focus().setImageUpload().run()}>
        add Image
      </Button>

      <div ref={menuContainerRef}>
        {editor && editor.isEditable && (
          <>
            <EditorContent
              className="w-full h-full overflow-y-auto scrollbar-hide min-h-dvh"
              editor={editor}
            />

            <ContentItemMenu editor={editor} isEditable={editor.isEditable} />

            <ImageBlockMenu appendTo={menuContainerRef} editor={editor} />

            <LinkMenu appendTo={menuContainerRef} editor={editor} />

            <TextMenu appendTo={menuContainerRef} editor={editor} />
          </>
        )}
      </div>
    </>
  );
};

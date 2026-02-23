'use client';

import { useRef } from 'react';
import { Modal, ScrollShadow } from '@heroui/react';
import { Editor, EditorContent } from '@tiptap/react';
import { ColumnsMenu } from './menus/columns-menu';
import { ContentItemMenu } from './menus/content-item-menu';
import { TextMenu } from './menus/text-menu/text-menu';

interface RichTextBodyProps {
  editor: Editor | null;
}

export const RichTextBody = ({ editor }: RichTextBodyProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <Modal.Body className="p-0 z-50">
      <ScrollShadow hideScrollBar className="relative h-full w-full" size={60} ref={menuRef}>
        <EditorContent
          editor={editor}
          className="prose prose-lg dark:prose-invert w-full max-w-none flex-1 [&_.ProseMirror]:focus:outline-none"
        />
        {editor && (
          <>
            <ColumnsMenu editor={editor} appendTo={menuRef} />
            <ContentItemMenu editor={editor} appendTo={menuRef} />
            <TextMenu editor={editor} appendTo={menuRef} />
          </>
        )}
      </ScrollShadow>
    </Modal.Body>
  );
};

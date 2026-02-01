'use client';

import { Modal, Button } from '@heroui/react';
import { Editor } from '@tiptap/react';

interface RichTextHeaderProps {
  editor: Editor | null;
}

export const RichTextHeader = ({ editor }: RichTextHeaderProps) => {
  const addColumns = () => {
    if (!editor) return;

    editor.chain().focus().setColumns(4).run();
  };

  return (
    <Modal.Header className="border-default-100 flex flex-col gap-2 border-b">
      <div className="flex w-full items-center justify-between">
        <Modal.Heading>Write Journal</Modal.Heading>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onPress={addColumns} isDisabled={!editor}>
            Add Columns
          </Button>
        </div>
      </div>
      {/* Additional toolbar items can be added here */}
    </Modal.Header>
  );
};

'use client';

import { Modal, Button } from '@heroui/react';
import { Editor, useEditorState } from '@tiptap/react';

interface RichTextFooterProps {
  editor: Editor | null;
  onClose: () => void;
}

export const RichTextFooter = ({ editor, onClose }: RichTextFooterProps) => {
  const { charactersCount, wordsCount } = useEditorState({
    editor,
    selector: (ctx) => ({
      charactersCount: ctx.editor?.storage.characterCount.characters() || 0,
      wordsCount: ctx.editor?.storage.characterCount.words() || 0,
    }),
  }) ?? { charactersCount: 0, wordsCount: 0 };

  return (
    <Modal.Footer className="border-default-100 bg-background/50 flex justify-between border-t backdrop-blur-md">
      <div className="text-default-400 flex gap-4 text-xs">
        <span>{charactersCount} characters</span>
        <span>{wordsCount} words</span>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" onPress={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onPress={onClose}>
          Save & Finish
        </Button>
      </div>
    </Modal.Footer>
  );
};

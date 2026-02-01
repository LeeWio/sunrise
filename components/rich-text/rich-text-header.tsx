'use client';

import { Modal, Button } from '@heroui/react';
import { Editor } from '@tiptap/react';
import { useCallback } from 'react';

interface RichTextHeaderProps {
  editor: Editor | null;
}

export const RichTextHeader = ({ editor }: RichTextHeaderProps) => {
  const onSetLink = useCallback(
    (url: string, openInNewTab?: boolean) => {
      if (!editor) return;
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url, target: openInNewTab ? '_blank' : '' })
        .run();
    },
    [editor]
  );

  return (
    <Modal.Header className="flex flex-col gap-2 ">
      <div className="flex w-full items-center justify-between">
        <Modal.Heading className="text-xl font-black tracking-tight text-foreground">
          Write Journal
        </Modal.Heading>
        <div className="flex gap-2">
          {/* 
            Optimized HeroUI v3 Button Style:
            - variant="primary" for the main action
            - Added font weight and shadow for better Vibe
          */}
          <Button
            size="sm"
            variant="primary"
            onPress={() => onSetLink('https://www.baidu.com', true)}
            isDisabled={!editor}
            className="font-semibold shadow-sm"
          >
            Add Link
          </Button>
        </div>
      </div>
    </Modal.Header>
  );
};

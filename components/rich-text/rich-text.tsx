'use client';

import { EditorContent } from '@tiptap/react';
import { Modal, Button, useOverlayState } from '@heroui/react';
import { useRichText } from '@/hooks/use-rich-text';
import { RichTextHeader } from './rich-text-header';
import { RichTextBody } from './rich-text-body';
import { RichTextFooter } from './rich-text-footer';
import './styles/index.css';

export interface RichTextProps {
  /**
   * Whether the modal is open (controlled).
   */
  isOpen?: boolean;
  /**
   * Handler called when the open state changes (controlled).
   */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * Default open state (uncontrolled).
   */
  defaultOpen?: boolean;
}

export const RichText = (props: RichTextProps) => {
  const { editor } = useRichText();

  const state = useOverlayState({
    isOpen: props.isOpen,
    defaultOpen: props.defaultOpen,
    onOpenChange: props.onOpenChange,
  });

  if (!editor) {
    return null;
  }

  return (
    <Modal>
      <Modal.Backdrop variant="blur" isOpen={state.isOpen} onOpenChange={state.setOpen}>
        <Modal.Container size="cover" scroll="inside">
          <Modal.Dialog className="mx-auto flex h-full w-full max-w-5xl flex-col overflow-visible">
            <Modal.CloseTrigger />

            <RichTextHeader editor={editor} />

            <RichTextBody editor={editor} />

            <RichTextFooter editor={editor} onClose={state.close} />
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

'use client';

import { Modal, Spinner, Chip } from '@heroui/react';
import { Editor, useEditorState } from '@tiptap/react';
import { useAppSelector } from '@/lib/store/hooks';
import { Check, CircleExclamation } from '@gravity-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface RichTextFooterProps {
  editor: Editor;
  onClose: () => void;
}

/**
 * High-quality scrolling counter animation
 */
const AnimatedNumber = ({ value }: { value: number }) => (
  <div className="relative h-5 overflow-hidden flex items-center">
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={value}
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '-100%', opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
        className="text-sm font-black text-default-600 tabular-nums block"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  </div>
);

export const RichTextFooter = ({ editor, onClose }: RichTextFooterProps) => {
  const saveStatus = useAppSelector((state) => state.draft.saveStatus);
  const [showSuccess, setShowSuccess] = useState(false);
  const prevStatusRef = useRef(saveStatus);

  const { characters, words } = useEditorState({
    editor,
    selector: (ctx) => ({
      characters: ctx.editor.storage.characterCount.characters(),
      words: ctx.editor.storage.characterCount.words(),
    }),
  }) ?? { characters: 0, words: 0 };

  useEffect(() => {
    const wasSaving = prevStatusRef.current === 'saving';
    prevStatusRef.current = saveStatus;

    let showTimer: NodeJS.Timeout;
    let hideTimer: NodeJS.Timeout;

    if (wasSaving && saveStatus === 'idle') {
      showTimer = setTimeout(() => setShowSuccess(true), 0);
      hideTimer = setTimeout(() => setShowSuccess(false), 3000);
    } else if (saveStatus === 'saving') {
      showTimer = setTimeout(() => setShowSuccess(false), 0);
    }

    return () => {
      if (showTimer) clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [saveStatus]);

  return (
    <Modal.Footer>
      <div className="flex items-center gap-6">
        {/* 1. Stats Section with Mechanical Scrolling Numbers */}
        <div className="flex items-baseline gap-5 text-default-400">
          <div className="flex items-baseline gap-1.5 min-w-[50px]">
            <AnimatedNumber value={words} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Words</span>
          </div>
          <div className="flex items-baseline gap-1.5 min-w-[50px]">
            <AnimatedNumber value={characters} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Chars</span>
          </div>
        </div>

        {/* 2. Status Indicator */}
        <AnimatePresence mode="wait">
          {saveStatus === 'saving' ? (
            <motion.div
              key="saving"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
            >
              <Chip
                variant="soft"
                color="accent"
                size="sm"
                className="h-6 gap-1.5 border-none bg-transparent font-bold uppercase tracking-wider"
              >
                <Spinner size="sm" color="current" className="size-3" />
                <span className="text-[10px] opacity-70">Syncing</span>
              </Chip>
            </motion.div>
          ) : saveStatus === 'error' ? (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Chip
                variant="soft"
                color="danger"
                size="sm"
                className="h-6 gap-1.5 font-bold uppercase tracking-wider"
              >
                <CircleExclamation width={12} height={12} />
                <span className="text-[10px]">Error</span>
              </Chip>
            </motion.div>
          ) : showSuccess ? (
            <motion.div
              key="saved"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
            >
              <Chip
                variant="soft"
                color="success"
                size="sm"
                className="h-6 gap-1.5 border-none font-bold uppercase tracking-widest"
              >
                <Check width={12} height={12} />
                <span className="text-[10px]">Saved</span>
              </Chip>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </Modal.Footer>
  );
};
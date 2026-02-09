'use client';

import { Modal, Spinner, Chip } from '@heroui/react';
import { Editor, useEditorState } from '@tiptap/react';
import { useAppSelector } from '@/lib/store/hooks';
import { Check, CircleExclamation } from '@gravity-ui/icons';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import { useIsSSR } from '@react-aria/ssr';

// Define a motion-enhanced HeroUI Chip for direct animation
const MotionChip = motion(Chip);

interface RichTextFooterProps {
  editor: Editor;
}

/**
 * High-quality scrolling counter animation with spring physics
 */
const AnimatedNumber = ({ value, label }: { value: number; label: string }) => (
  <div className="flex min-w-[50px] items-baseline gap-1.5">
    <div className="relative flex h-5 items-center overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
            mass: 0.8,
          }}
          className="text-default-600 block text-sm font-black tabular-nums"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
    <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40 select-none">
      {label}
    </span>
  </div>
);

export const RichTextFooter = ({ editor }: RichTextFooterProps) => {
  const saveStatus = useAppSelector((state) => state.draft.saveStatus);
  const [showSuccess, setShowSuccess] = useState(false);
  const prevStatusRef = useRef(saveStatus);
  const isSSR = useIsSSR();

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

  if (isSSR) return <Modal.Footer className="flex flex-row justify-between" />;

  return (
    <Modal.Footer className="flex flex-row justify-between">
      {/* 1. Stats Section with scrolling numbers */}
      <div className="text-default-400 flex items-baseline gap-5">
        <AnimatedNumber value={words} label="Words" />
        <AnimatedNumber value={characters} label="Chars" />
      </div>

      {/* 2. Status Indicator - Using MotionChip for direct component animation */}
      <div className="flex items-center">
        <AnimatePresence mode="wait">
          {saveStatus === 'saving' ? (
            <MotionChip
              key="saving"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              color="accent"
              size="sm"
              className="gap-1.5 font-bold tracking-wider uppercase"
            >
              <Spinner size="sm" color="current" className="size-3" />
              <span className="text-[10px] opacity-70">Syncing</span>
            </MotionChip>
          ) : saveStatus === 'error' ? (
            <MotionChip
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              color="danger"
              size="sm"
              className="gap-1.5 font-bold tracking-wider uppercase"
            >
              <CircleExclamation width={12} height={12} />
              <span className="text-[10px]">Error</span>
            </MotionChip>
          ) : showSuccess ? (
            <MotionChip
              key="saved"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              color="success"
              size="sm"
              className="gap-1.5 font-bold tracking-widest uppercase"
            >
              <Check width={12} height={12} />
              <span className="text-[10px]">Saved</span>
            </MotionChip>
          ) : null}
        </AnimatePresence>
      </div>
    </Modal.Footer>
  );
};

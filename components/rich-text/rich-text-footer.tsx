'use client';

import { Modal, Spinner, Tooltip, Separator, Kbd, Skeleton } from '@heroui/react';
import { Editor, useEditorState } from '@tiptap/react';
import { useAppSelector } from '@/lib/store/hooks';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import { useIsSSR } from '@react-aria/ssr';

interface RichTextFooterProps {
  editor: Editor;
}

/**
 * High-quality scrolling counter animation with spring physics
 */
const AnimatedNumber = ({
  value,
  label,
  subValue,
  tooltip,
}: {
  value: number;
  label: string;
  subValue?: number;
  tooltip: string;
}) => (
  <Tooltip delay={0} closeDelay={0}>
    <Tooltip.Trigger aria-label={label}>
      <div className="flex cursor-help items-center gap-1.5 transition-opacity hover:opacity-80">
        <div className="relative flex h-5 items-center overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={value + (subValue || 0)}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
                mass: 0.8,
              }}
              className="text-default-600 flex items-baseline gap-0.5 text-xs font-black tabular-nums"
            >
              {subValue !== undefined && subValue > 0 && (
                <span className="text-primary mr-0.5">{subValue} /</span>
              )}
              <span>{value}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        <span className="text-[9px] font-bold tracking-[0.1em] uppercase opacity-30 select-none">
          {label}
        </span>
      </div>
    </Tooltip.Trigger>
    <Tooltip.Content showArrow placement="top" className="px-2 py-1 text-[10px] font-medium">
      <Tooltip.Arrow />
      {tooltip}
    </Tooltip.Content>
  </Tooltip>
);

export const RichTextFooter = ({ editor }: RichTextFooterProps) => {
  const saveStatus = useAppSelector((state) => state.draft.saveStatus);
  const [showSuccess, setShowSuccess] = useState(false);
  const prevStatusRef = useRef(saveStatus);
  const isSSR = useIsSSR();

  const { characters, words, selectedChars } = useEditorState({
    editor,
    selector: (ctx) => {
      const { from, to } = ctx.editor.state.selection;
      return {
        characters: ctx.editor.storage.characterCount.characters(),
        words: ctx.editor.storage.characterCount.words(),
        selectedChars: to - from,
      };
    },
  }) ?? { characters: 0, words: 0, selectedChars: 0 };

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

  if (isSSR) {
    return (
      <Modal.Footer className="flex h-10 flex-row items-center justify-between border-t border-default-100 px-4 py-0">
        <div className="flex gap-4">
          <Skeleton className="h-4 w-16 rounded-md opacity-20" />
          <Skeleton className="h-4 w-20 rounded-md opacity-20" />
        </div>
        <Skeleton className="h-4 w-24 rounded-md opacity-20" />
      </Modal.Footer>
    );
  }

  return (
    <Modal.Footer className="flex h-10 flex-row items-center justify-between border-t border-default-100 px-4 py-0">
      {/* 1. Left: Stats Section with Tooltips */}
      <div className="flex items-center gap-6">
        <AnimatedNumber
          value={words}
          label="Words"
          tooltip={`${words} total words in this document`}
        />
        <AnimatedNumber
          value={characters}
          label="Chars"
          subValue={selectedChars}
          tooltip={
            selectedChars > 0
              ? `${selectedChars} selected / ${characters} total characters`
              : `${characters} total characters`
          }
        />
      </div>

      {/* 2. Middle: Technical Metadata (Pro Branding) */}
      <div className="hidden items-center sm:flex h-5">
        <Separator orientation="vertical" className="h-3" />
        <Tooltip delay={200}>
          <Tooltip.Trigger aria-label="Markdown status">
            <div className="flex cursor-help items-center px-4 transition-opacity hover:opacity-80">
              <Icon
                className="text-default-400 dark:text-default-300 opacity-60"
                icon="gravity-ui:logo-markdown"
                width={18}
              />
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content showArrow placement="top" className="px-3 py-2">
            <Tooltip.Arrow />
            <div className="flex flex-col gap-1.5">
              <p className="text-[10px] font-bold tracking-tight uppercase">Markdown Support Active</p>
              <div className="flex items-center gap-2 text-[9px] text-default-400">
                <Kbd variant="light" className="scale-75 origin-left">
                  <Kbd.Abbr keyValue="command" />
                  <Kbd.Content>B</Kbd.Content>
                </Kbd>
                <span>Bold</span>
              </div>
            </div>
          </Tooltip.Content>
        </Tooltip>
        <Separator orientation="vertical" className="h-3" />
        <Tooltip delay={400}>
          <Tooltip.Trigger aria-label="Encoding status">
            <div className="flex cursor-help items-center px-4 transition-opacity hover:opacity-80">
              <span className="text-default-300 text-[9px] font-bold tracking-widest uppercase select-none">
                UTF-8
              </span>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content showArrow placement="top" className="text-[10px]">
            <Tooltip.Arrow />
            Encoding: Universal Coded Character Set
          </Tooltip.Content>
        </Tooltip>
      </div>

      {/* 3. Right: Status Indicator */}
      <div className="flex items-center justify-end min-w-[80px]">
        <AnimatePresence mode="popLayout" initial={false}>
          {saveStatus === 'saving' ? (
            <motion.div
              key="saving"
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              className="flex items-center gap-2"
            >
              <div className="relative flex h-2 w-2 items-center justify-center">
                <Spinner size="sm" color="primary" className="absolute size-3" />
              </div>
              <span className="text-default-400 text-[10px] font-bold tracking-widest uppercase select-none">
                Syncing
              </span>
            </motion.div>
          ) : saveStatus === 'error' ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-2"
            >
              <div className="bg-danger h-1.5 w-1.5 rounded-full ring-4 ring-danger/20 shadow-[0_0_8px_rgba(243,18,96,0.4)]" />
              <span className="text-danger text-[10px] font-bold tracking-widest uppercase select-none">
                Connection Error
              </span>
            </motion.div>
          ) : (
            <Tooltip delay={1000} isDisabled={!showSuccess}>
              <Tooltip.Trigger aria-label="Save status">
                <motion.div
                  key="saved"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showSuccess ? 1 : 0.4 }}
                  exit={{ opacity: 0 }}
                  className="flex cursor-help items-center gap-2 transition-opacity duration-500"
                >
                  <motion.div
                    animate={showSuccess ? { scale: [1, 1.3, 1] } : {}}
                    className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                      showSuccess ? 'bg-success ring-4 ring-success/20' : 'bg-default-300'
                    }`}
                  />
                  <span className="text-default-400 text-[10px] font-bold tracking-widest uppercase select-none">
                    {showSuccess ? 'Saved' : 'Cloud Synced'}
                  </span>
                </motion.div>
              </Tooltip.Trigger>
              <Tooltip.Content showArrow placement="top" className="flex items-center gap-2 px-2 py-1">
                <Tooltip.Arrow />
                <span className="text-[10px]">Changes secured</span>
                <Kbd variant="light" className="scale-75">
                  <Kbd.Abbr keyValue="command" />
                  <Kbd.Content>S</Kbd.Content>
                </Kbd>
              </Tooltip.Content>
            </Tooltip>
          )}
        </AnimatePresence>
      </div>
    </Modal.Footer>
  );
};

'use client';

import { Editor, useEditorState } from '@tiptap/react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuProps } from '../types';
import { useTextMenuCommands } from './hooks/use-text-menu-commands';
import { useTextMenuStates } from './hooks/use-text-menu-states';
import { MemoButton } from '../../components/memo-button';
import { Bold, Italic, Underline, Strikethrough, Code } from 'lucide-react';
import { BubbleMenu } from '@tiptap/react/menus';
import { useCallback } from 'react';

export const TextMenu = ({ editor,appendTo }: MenuProps) => {
  const commands = useTextMenuCommands(editor);
  const states = useTextMenuStates(editor);

  // 1. Selection validity state for internal animation control
  const isSelectionValid = useEditorState({
    editor,
    selector: (ctx) => {
      const { selection } = ctx.editor.state;
      return ctx.editor.isEditable && !selection.empty && !ctx.editor.isActive('image');
    },
  });

  // 2. Functional shouldShow logic strictly following the BubbleMenu interface
  const shouldShow = useCallback(({ editor: currentEditor }: { editor: Editor }) => {
    if (!currentEditor) return false;
    const { selection } = currentEditor.state;
    return (
      currentEditor.isEditable &&
      !selection.empty &&
      !currentEditor.isActive('image')
    );
  }, []);

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="textMenu"
      updateDelay={0}
      shouldShow={shouldShow}
      // CRITICAL: Must use document.body to escape ScrollShadow's mask-image which kills backdrop-filter
      appendTo={appendTo?.current || undefined}
      // Fixed z-index to 10001 to stay above HeroUI Modal (z-1000)
      className="bg-background/80 dark:bg-default-50/85 z-[10001] flex items-center gap-0.5 rounded-2xl border border-white/10 px-1 py-0.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] backdrop-blur-2xl [transform:translateZ(0)] dark:border-white/5"
      options={{
        offset: 14,
        placement: 'top',
        strategy: 'fixed',
        flip: true,
        shift: true,
      }}
    >
      <AnimatePresence>
        {isSelectionValid && (
          <motion.div
            key="text-menu-content"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              mass: 1,
            }}
            className="flex items-center"
          >
            <MemoButton
              icon={<Bold size={15} strokeWidth={2.5} />}
              isActive={states.isBold}
              onPress={commands.onBold}
              tooltip="Bold"
            />
            <MemoButton
              icon={<Italic size={15} strokeWidth={2.5} />}
              isActive={states.isItalic}
              onPress={commands.onItalic}
              tooltip="Italic"
            />
            <MemoButton
              icon={<Underline size={15} strokeWidth={2.5} />}
              isActive={states.isUnderline}
              onPress={commands.onUnderline}
              tooltip="Underline"
            />
            <MemoButton
              icon={<Strikethrough size={15} strokeWidth={2.5} />}
              isActive={states.isStrike}
              onPress={commands.onStrike}
              tooltip="Strikethrough"
            />
            <MemoButton
              icon={<Code size={15} strokeWidth={2.5} />}
              isActive={states.isCode}
              onPress={commands.onCode}
              tooltip="Code"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </BubbleMenu>
  );
};

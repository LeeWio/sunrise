'use client';

import { Editor, useEditorState } from '@tiptap/react';
import { motion, AnimatePresence } from 'motion/react';
import { useCallback, useState, useEffect } from 'react';
import { MenuProps } from '../types';
import { useTextMenuCommands } from './hooks/use-text-menu-commands';
import { useTextMenuStates } from './hooks/use-text-menu-states';
import { MemoButton } from '../../components/memo-button';
import { Bold, Italic, Underline, Strikethrough, Code } from 'lucide-react';
import { BubbleMenu } from '@tiptap/react/menus';

export const TextMenu = ({ editor }: MenuProps) => {
  const commands = useTextMenuCommands(editor);
  const states = useTextMenuStates(editor);

  // 1. Real selection validity state
  const isSelectionValid = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isEditable && !ctx.editor.state.selection.empty,
  });

  // 2. State to keep the BubbleMenu alive during exit animation
  const [isEffectivelyVisible, setIsEffectivelyVisible] = useState(false);

  useEffect(() => {
    if (isSelectionValid) {
      setIsEffectivelyVisible(true);
    }
  }, [isSelectionValid]);

  const handleExitComplete = useCallback(() => {
    setIsEffectivelyVisible(false);
  }, []);

  // 3. shouldShow prop for BubbleMenu plugin
  // We stay shown as long as selection is valid OR we're animating out
  const shouldShow = useCallback(() => {
    return isSelectionValid || isEffectivelyVisible;
  }, [isSelectionValid, isEffectivelyVisible]);

  return (
    <BubbleMenu
      editor={editor}
      // Use 'options' for Floating UI configuration (offset, etc.)
      options={{ offset: 8 }}
      shouldShow={shouldShow}
      className="!border-none !bg-transparent !shadow-none"
    >
      <AnimatePresence onExitComplete={handleExitComplete}>
        {isSelectionValid && (
          <motion.div
            key="text-menu-bubble"
            initial={{ opacity: 0, scale: 0.95, y: 10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, y: 10, filter: 'blur(10px)' }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25,
              mass: 0.8,
            }}
            className="bg-background/80 flex items-center gap-0.5 rounded-xl border border-white/10 p-1 shadow-2xl backdrop-blur-2xl dark:border-white/5"
          >
            <MemoButton
              icon={<Bold size={16} />}
              isActive={states.isBold}
              onPress={commands.onBold}
              tooltip="Bold"
            />
            <MemoButton
              icon={<Italic size={16} />}
              isActive={states.isItalic}
              onPress={commands.onItalic}
              tooltip="Italic"
            />
            <MemoButton
              icon={<Underline size={16} />}
              isActive={states.isUnderline}
              onPress={commands.onUnderline}
              tooltip="Underline"
            />
            <MemoButton
              icon={<Strikethrough size={16} />}
              isActive={states.isStrike}
              onPress={commands.onStrike}
              tooltip="Strikethrough"
            />
            <MemoButton
              icon={<Code size={16} />}
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
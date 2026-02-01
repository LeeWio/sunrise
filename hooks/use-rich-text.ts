'use client';

import { useEditor } from '@tiptap/react';
import { ExtensionKit } from '@/components/rich-text/extensions/extension-kit';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setContent, setSaveStatus } from '@/lib/features/draft/draft-slice';
import { useRef } from 'react';

export const useRichText = () => {
  const dispatch = useAppDispatch();
  const initialContent = useAppSelector((state) => state.draft.content);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    autofocus: true,
    extensions: [...ExtensionKit()],
    content: initialContent,
    onUpdate({ editor, transaction }) {
      if (!transaction.docChanged || !editor.isFocused) return;

      dispatch(setSaveStatus('saving'));

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        dispatch(setContent(editor.getHTML()));
        dispatch(setSaveStatus('idle'));
      }, 1000);
    },
  });

  return { editor };
};

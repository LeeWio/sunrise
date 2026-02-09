'use client';

import { Button } from '@heroui/react';
import { useRichTextContext } from '@/lib/context/rich-text-context';
import { useAppSelector } from '@/lib/store/hooks';

export default function ContentPage() {
  const { open } = useRichTextContext();
  const content = useAppSelector((state) => state.draft.content);

  const wordCount = content
    ? content
        .replace(/<[^>]*>/g, ' ')
        .split(/\s+/)
        .filter(Boolean).length
    : 0;

  return (
    <div className="flex h-[calc(100vh-160px)] flex-col items-center justify-center p-8 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Drafts</h1>
        <p className="text-default-500 mx-auto max-w-sm">
          Currently you have written <strong suppressHydrationWarning>{wordCount}</strong> words in
          your active draft.
        </p>
        <div className="pt-4">
          <Button variant="primary" size="lg" onPress={open}>
            Edit Draft
          </Button>
        </div>
      </div>
    </div>
  );
}

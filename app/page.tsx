'use client';

import { Button } from '@heroui/react';
import { useRichTextContext } from '@/lib/context/rich-text-context';
import { SiteSettings } from '@/components/site-settings';

export default function Home() {
  const { open } = useRichTextContext();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 p-8 font-[family-name:var(--font-geist-sans)] sm:p-20">
      {/* Settings in the top right */}
      <div className="absolute top-8 right-8">
        <SiteSettings />
      </div>

      <main className="row-start-2 flex flex-col items-center gap-8 text-center sm:text-left">
        <h1 className="text-6xl font-bold tracking-tighter">Sunrise</h1>
        <p className="text-default-500 max-w-md text-xl">
          A personal space to record, reflect, and remember.
        </p>
        <p className="text-default-400 text-sm">
          Press <kbd className="font-sans">⌘J</kbd> to start writing anytime.
        </p>
        <div className="flex gap-4">
          <Button variant="primary" size="lg" onPress={open}>
            Start Writing
          </Button>
          <Button size="lg">Explore</Button>
        </div>
      </main>
    </div>
  );
}

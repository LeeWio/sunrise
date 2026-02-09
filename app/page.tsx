'use client';

import { Button, parseColor } from '@heroui/react';
import { useRichTextContext } from '@/lib/context/rich-text-context';
import { useRouter } from 'next/navigation';
import { ColorPicker } from '@/components/color-picker';
import { useState } from 'react';

export default function Home() {
  const { open } = useRichTextContext();
  const router = useRouter();
  const [color, setColor] = useState(parseColor('#3b82f6'));

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 p-8 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 text-center sm:items-start sm:text-left">
        <h1 className="text-6xl font-bold tracking-tighter">Sunrise</h1>
        <p className="text-default-500 max-w-md text-xl">
          A personal space to record, reflect, and remember.
        </p>
        <p className="text-default-400 text-sm">
          Press <kbd className="font-sans">⌘J</kbd> to start writing anytime.
        </p>

        {/* Color Picker Integration */}
        <div className="flex flex-col gap-2">
          <ColorPicker
            value={color}
            onChange={setColor}
          >
            adf
            </ColorPicker>
          <p className="text-default-400 text-xs font-mono tabular-nums">
            Hex: {color.toString('hex')}
          </p>
        </div>

        <div className="flex gap-4">
          <Button variant="primary" size="lg" onPress={open}>
            Start Writing
          </Button>
          <Button size="lg" onPress={() => router.push('/about')}>
            Explore
          </Button>
        </div>
      </main>
    </div>
  );
}


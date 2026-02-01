'use client';

import { Provider } from 'react-redux';
import { useState, useMemo } from 'react';
import { makeStore } from '@/lib/store/store';
import { RichTextProvider } from '@/lib/context/rich-text-context';
import { ThemeProvider } from 'next-themes';
import { useAppSelector } from '@/lib/store/hooks';

/**
 * A wrapper to bridge Redux theme state to next-themes.
 * This ensures Redux is the source of truth while next-themes handles the DOM injection.
 */
function ThemeBridge({ children }: { children: React.ReactNode }) {
  const theme = useAppSelector((state) => state.theme.theme);

  // We use the 'value' prop of ThemeProvider to map our custom themes to standard classes
  // but since we want [data-theme="..."] to match exactly, we rely on forcedTheme.
  return (
    <ThemeProvider
      attribute="data-theme"
      forcedTheme={theme}
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [store] = useState(() => makeStore());

  return (
    <Provider store={store}>
      <ThemeBridge>
        <RichTextProvider>{children}</RichTextProvider>
      </ThemeBridge>
    </Provider>
  );
}

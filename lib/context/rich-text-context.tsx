'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { RichText } from '@/components/rich-text/rich-text';

interface RichTextContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const RichTextContext = createContext<RichTextContextType | undefined>(undefined);

export function RichTextProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on Cmd+J or Ctrl+J
      if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
        e.preventDefault();
        toggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <RichTextContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
      {/* Global Rich Text Editor Instance */}
      <RichText isOpen={isOpen} onOpenChange={setIsOpen} />
    </RichTextContext.Provider>
  );
}

export const useRichTextContext = () => {
  const context = useContext(RichTextContext);
  if (!context) {
    throw new Error('useRichTextContext must be used within a RichTextProvider');
  }
  return context;
};

'use client';

import { Button, Card, ListBox, Label, Description, Selection } from '@heroui/react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { addEntry, selectEntry } from '@/lib/features/journal/journal-slice';
import { useRichTextContext } from '@/lib/context/rich-text-context';
import { useMemo } from 'react';

export default function JournalPage() {
  const dispatch = useAppDispatch();
  const { open } = useRichTextContext();
  const { entries, selectedEntryId } = useAppSelector((state) => state.journal);

  const selectedEntry = useMemo(
    () => entries.find((e) => e.id === selectedEntryId),
    [entries, selectedEntryId]
  );

  const handleNewEntry = () => {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    dispatch(
      addEntry({
        id,
        title: 'Untitled Entry',
        content: '<h1>Untitled Entry</h1><p>Start writing...</p>',
        createdAt: now,
        updatedAt: now,
      })
    );
    open();
  };

  const handleSelectionChange = (keys: Selection) => {
    if (keys instanceof Set) {
      const first = Array.from(keys)[0];
      dispatch(selectEntry(first ? String(first) : null));
    }
  };

  return (
    <div className="flex h-[calc(100vh-160px)] gap-8 p-8">
      {/* Sidebar */}
      <div className="flex w-64 flex-col gap-4">
        <Button variant="primary" onPress={handleNewEntry}>
          New Entry
        </Button>
        <div className="border-divider flex-1 overflow-auto rounded-lg border">
          <ListBox
            aria-label="Journal entries"
            selectionMode="single"
            selectedKeys={selectedEntryId ? new Set([selectedEntryId]) : new Set()}
            onSelectionChange={handleSelectionChange}
          >
            {entries.map((entry) => (
              <ListBox.Item id={entry.id} key={entry.id} textValue={entry.title}>
                <div className="flex flex-col py-1">
                  <span className="truncate font-medium">{entry.title}</span>
                  <span className="text-xs opacity-50">
                    {new Date(entry.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </ListBox.Item>
            ))}
          </ListBox>
        </div>
      </div>

      {/* Main Area */}
      <div className="border-divider flex flex-1 items-center justify-center rounded-lg border">
        {selectedEntry ? (
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold">{selectedEntry.title}</h2>
            <Button onPress={open}>Open Editor</Button>
          </div>
        ) : (
          <div className="text-default-400 text-sm">Select an entry to begin</div>
        )}
      </div>
    </div>
  );
}

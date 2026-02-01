import { StarterKit, CharacterCount, Document, Columns, Column } from '.';

export const ExtensionKit = () => [
  Document,
  Columns,
  Column,
  StarterKit.configure({
    document: false,
  }),
  CharacterCount.configure(),
];

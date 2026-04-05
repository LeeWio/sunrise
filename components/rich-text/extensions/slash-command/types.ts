import { Editor, Range } from "@tiptap/core";
import { ReactNode } from "react";

export interface Group {
  name: string;
  title: string;
  commands: Command[];
}

export interface Command {
  name: string;
  label: string;
  description: string;
  aliases?: string[];
  iconName: string;
  action: (editor: Editor, range: Range) => void;
  shouldBeHidden?: (editor: Editor) => boolean;
}

export interface MenuListProps {
  items: Group[];
  command: (command: Command) => void;
  editor: Editor;
  range: Range;
  query: string;
}

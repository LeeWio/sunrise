import type { AutoformatRule } from '@platejs/autoformat'

import {
  autoformatArrow,
  autoformatLegal,
  autoformatLegalHtml,
  autoformatMath,
  AutoformatPlugin,
  autoformatPunctuation,
  autoformatSmartQuotes,
} from '@platejs/autoformat'
import { KEYS } from 'platejs'
import { insertEmptyCodeBlock } from '@platejs/code-block'
import { toggleList } from '@platejs/list'

/**
 * autoformatMarks
 *
 * This array defines inline formatting rules (marks) for the editor.
 * Each rule applies when the user types a specific pattern, such as `**` for bold.
 */
const autoformatMarks: AutoformatRule[] = [
  { match: '***', mode: 'mark', type: [KEYS.bold, KEYS.italic] },
  { match: '__*', mode: 'mark', type: [KEYS.underline, KEYS.italic] },
  { match: '__**', mode: 'mark', type: [KEYS.underline, KEYS.bold] },
  { match: '___***', mode: 'mark', type: [KEYS.underline, KEYS.bold, KEYS.italic] },
  { match: '**', mode: 'mark', type: KEYS.bold },
  { match: '__', mode: 'mark', type: KEYS.underline },
  { match: '*', mode: 'mark', type: KEYS.italic },
  { match: '_', mode: 'mark', type: KEYS.italic },
  { match: '~~', mode: 'mark', type: KEYS.strikethrough },
  { match: '^', mode: 'mark', type: KEYS.sup },
  { match: '~', mode: 'mark', type: KEYS.sub },
  { match: '==', mode: 'mark', type: KEYS.highlight },
  { match: '≡', mode: 'mark', type: KEYS.highlight },
  { match: '`', mode: 'mark', type: KEYS.code },
]

/**
 * autoformatBlocks
 *
 * Defines block-level formatting rules.
 * These rules are triggered when typing certain patterns at the start of a line.
 * Examples: headings, blockquotes, code blocks, horizontal rules.
 */
const autoformatBlocks: AutoformatRule[] = [
  { match: '# ', mode: 'block', type: KEYS.h1 },
  { match: '## ', mode: 'block', type: KEYS.h2 },
  { match: '### ', mode: 'block', type: KEYS.h3 },
  { match: '#### ', mode: 'block', type: KEYS.h4 },
  { match: '##### ', mode: 'block', type: KEYS.h5 },
  { match: '###### ', mode: 'block', type: KEYS.h6 },
  { match: '> ', mode: 'block', type: KEYS.blockquote },
  {
    match: '```',
    mode: 'block',
    type: KEYS.codeBlock,
    format: (editor) => {
      // Inserts an empty code block with a default paragraph inside
      insertEmptyCodeBlock(editor, {
        defaultType: KEYS.p,
        insertNodesOptions: { select: true },
      })
    },
  },
  {
    match: ['---', '—-', '___ '],
    mode: 'block',
    type: KEYS.hr,
    format: (editor) => {
      // Insert horizontal rule and a paragraph afterwards
      editor.tf.setNodes({ type: KEYS.hr })
      editor.tf.insertNodes({ children: [{ text: '' }], type: KEYS.p })
    },
  },
]

/**
 * autoformatLists
 *
 * Defines autoformatting rules for lists.
 * Supports unordered (*, -), ordered (1., 1)) and todo lists ([] or [x]).
 */
const autoformatLists: AutoformatRule[] = [
  {
    match: ['* ', '- '],
    mode: 'block',
    type: 'list',
    format: (editor) => {
      toggleList(editor, { listStyleType: KEYS.ul })
    },
  },
  {
    match: [String.raw`^\d+\.$ `, String.raw`^\d+\)$ `],
    matchByRegex: true,
    mode: 'block',
    type: 'list',
    format: (editor, { matchString }) => {
      toggleList(editor, {
        listRestartPolite: Number(matchString) || 1,
        listStyleType: KEYS.ol,
      })
    },
  },
  {
    match: ['[] '],
    mode: 'block',
    type: 'list',
    format: (editor) => {
      toggleList(editor, { listStyleType: KEYS.listTodo })
      editor.tf.setNodes({ checked: false, listStyleType: KEYS.listTodo })
    },
  },
  {
    match: ['[x] '],
    mode: 'block',
    type: 'list',
    format: (editor) => {
      toggleList(editor, { listStyleType: KEYS.listTodo })
      editor.tf.setNodes({ checked: true, listStyleType: KEYS.listTodo })
    },
  },
]

/**
 * AutoformatKit
 *
 * The main plugin configuration that combines all autoformat rules.
 * Includes:
 * - Inline marks
 * - Block elements
 * - Smart quotes, punctuation, legal symbols, arrows, math symbols
 * - Lists
 *
 * It also disables autoformatting inside code blocks.
 */
export const AutoformatKit = [
  AutoformatPlugin.configure({
    options: {
      enableUndoOnDelete: true, // Allow undo when autoformat deletes text
      rules: [
        ...autoformatBlocks,
        ...autoformatMarks,
        ...autoformatSmartQuotes,
        ...autoformatPunctuation,
        ...autoformatLegal,
        ...autoformatLegalHtml,
        ...autoformatArrow,
        ...autoformatMath,
        ...autoformatLists,
      ].map(
        (rule): AutoformatRule => ({
          ...rule,
          query: (editor) => !editor.api.some({ match: { type: editor.getType(KEYS.codeBlock) } }),
          // Prevent autoformat inside code blocks
        }),
      ),
    },
  }),
]

import { CodeBlockLowlight as TiptapCodeBlock, CodeBlockLowlightOptions as TiptapCodeBlockOptions } from '@tiptap/extension-code-block-lowlight'
import { mergeAttributes, ReactNodeViewRenderer } from '@tiptap/react';
import { CodeBlockView } from './views/code-block-view';
import { all, createLowlight } from 'lowlight'

const lowlight = createLowlight(all)

export interface CodeBlockOptions extends TiptapCodeBlockOptions {
  /**
   * Enable or disable automatic code formatting inside the code block.
   * @default true
   */
  formatter: boolean;

  /**
   * Enable or disable code folding (collapse and expand sections of code).
   * @default false
   * @example true - to enable code folding
   */
  enableFolding: boolean;

  /**
   * Show line numbers next to the code block.
   * @default false
   * @example true - to show line numbers
   */
  showLineNumbers: boolean;

  /**
   * Define the default syntax highlighting theme.
   * @default 'default'
   * @example 'dark', 'light'
   */
  theme: 'default' | 'dark' | 'light';

  surface: "default" | "secondary" | "tertiary" | "quaternary";

  /**
   * Enable syntax highlighting inside the code block.
   * @default true
   */
  highlightSyntax: boolean;
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    "code-block": {
      setCodeBlockSurface: (surface: 'secondary' | 'default' | 'tertiary' | 'quaternary') => ReturnType
    }
  }
}

export const CodeBlock = TiptapCodeBlock.extend<CodeBlockOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      lowlight: {},
      theme: "default",
      highlightSyntax: true,
      showLineNumbers: false,
      formatter: false,
      enableFolding: false,
      languageClassPrefix: 'language-',
      exitOnTripleEnter: true,
      exitOnArrowDown: true,
      defaultLanguage: null,
      enableTabIndentation: false,
      tabSize: 4,
      HTMLAttributes: {},
      surface: "default"
    }
  },

  addAttributes() {
    return {
      language: {
        default: this.options.defaultLanguage,
        parseHTML: element => {
          const { languageClassPrefix } = this.options
          if (!languageClassPrefix) {
            return null
          }

          const classNames = [...(element.firstElementChild?.classList || [])]
          const languages = classNames
            .filter(className => className.startsWith(languageClassPrefix))
            .map(className => className.replace(languageClassPrefix, ''))
          const language = languages[0]

          if (!language) {
            return null
          }

          return language
        },
        rendered: false
      },
      showLineNumbers: {
        default: this.options.showLineNumbers,
        parseHTML: element => element.getAttribute('data-line-numbers') === 'true',
        renderHTML: attributes => ({
          'data-line-numbers': String(attributes.showLineNumbers),
        }),
      },
      theme: {
        default: this.options.theme,
        parseHTML: element => element.getAttribute('data-theme'),
        renderHTML: attributes => ({
          'data-theme': attributes.theme,
        }),
      },
      surface: {
        default: this.options.surface,
        parseHTML: element => element.getAttribute('data-surface'),
        renderHTML: attributes => ({ 'data-surface': attributes.surface })
      }
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockView);
  },

  addCommands() {
    return {
      setCodeBlockSurface: (surface) => ({ commands }) => {
        return commands.updateAttributes(this.name, { surface })
      }
    }
  },
}).configure({ lowlight })




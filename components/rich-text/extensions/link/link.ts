import { mergeAttributes } from "@tiptap/react";
import TiptapLink from "@tiptap/extension-link";

/**
 * Optimized Link extension that extends the default Tiptap Link extension.
 * 
 * Improvements:
 * 1. Uses idiomatic `addKeyboardShortcuts` instead of manual ProseMirror plugins.
 * 2. Adds `data-type` attribute support to the schema.
 * 3. Ensures `inclusive` is explicitly false.
 * 4. Customizes `parseHTML` to exclude buttons and sanitizes `javascript:` URIs.
 */
export const Link = TiptapLink.extend({
  /**
   * We override inclusive to false to ensure that typing after a link 
   * doesn't continue the link, regardless of autolink settings.
   */
  inclusive() {
    return false;
  },

  /**
   * Add custom attributes to the link schema.
   */
  addAttributes() {
    return {
      ...this.parent?.(),
      "data-type": {
        default: null,
      },
    };
  },

  /**
   * Customize the HTML parsing logic.
   * We exclude elements with data-type="button" and sanitize javascript: URIs.
   */
  parseHTML() {
    return [
      {
        tag: 'a[href]:not([data-type="button"]):not([href *= "javascript:" i])',
        getAttrs: (element: HTMLElement) => {
          const href = element.getAttribute("href");

          if (href?.toLowerCase().startsWith("javascript:")) {
            return false;
          }

          return null;
        },
      },
    ];
  },

  /**
   * Customize the HTML rendering logic.
   * We add a security check for javascript: URIs while preserving parent logic.
   */
  renderHTML(args) {
    const { HTMLAttributes } = args;

    // Security check: ensure javascript: URIs are cleared
    if (HTMLAttributes.href?.toLowerCase().startsWith("javascript:")) {
      return [
        "a",
        mergeAttributes(this.options.HTMLAttributes, {
          ...HTMLAttributes,
          href: "",
        }),
        0,
      ];
    }

    return (
      this.parent?.(args) || [
        "a",
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        0,
      ]
    );
  },

  /**
   * Use keyboard shortcuts for improved UX.
   * Pressing Escape when a link is active moves the cursor to the end of the selection.
   */
  addKeyboardShortcuts() {
    return {
      Escape: () => {
        const { selection } = this.editor.state;

        if (selection.empty || !this.editor.isActive("link")) {
          return false;
        }

        return this.editor.commands.focus(selection.to, {
          scrollIntoView: false,
        });
      },
    };
  },
});

export default Link;

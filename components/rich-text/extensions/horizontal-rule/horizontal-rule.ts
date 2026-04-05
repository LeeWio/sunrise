import { HorizontalRule as TiptapHorizontalRule } from "@tiptap/extension-horizontal-rule";
import { mergeAttributes } from "@tiptap/core";

/**
 * Custom HorizontalRule extension - Enhanced with HeroUI Separator visual style.
 * Uses BEM classes to leverage the design system's default animations and variables.
 */
export const HorizontalRule = TiptapHorizontalRule.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      "hr",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: "separator",
      }),
    ];
  },
});

export default HorizontalRule;

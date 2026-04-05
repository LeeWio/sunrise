import { Mathematics as TiptapMathematics } from "@tiptap/extension-mathematics";
import "katex/dist/katex.min.css";

/**
 * Custom Mathematics extension using KaTeX.
 * Supports inline and block math with standard BEM classes.
 */
export const Mathematics = TiptapMathematics.configure({
  katexOptions: {
    throwOnError: false,
  },
});

export default Mathematics;

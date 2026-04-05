import { Audio as TiptapAudio } from "@tiptap/extension-audio";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { AudioPlayerNode } from "./audio-view";

/**
 * Custom Audio extension.
 * Extending the official Tiptap extension to use a custom HeroUI-based React NodeView.
 */
export const Audio = TiptapAudio.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      allowBase64: true,
      HTMLAttributes: {},
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(AudioPlayerNode);
  },
});

export default Audio;

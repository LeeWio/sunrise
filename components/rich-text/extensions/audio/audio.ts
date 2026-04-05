import { Audio as TiptapAudio, AudioOptions } from "@tiptap/extension-audio";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { AudioPlayerNode } from "./audio-view";

/**
 * Custom Audio extension.
 * Extending the official Tiptap extension to use a custom HeroUI-based React NodeView.
 */
export const Audio = TiptapAudio.extend<AudioOptions>({
  addOptions() {
    return {
      addPasteHandler: true,
      allowBase64: true,
      autoplay: false,
      controls: true,
      loop: false,
      muted: false,
      preload: "metadata",
      controlslist: undefined,
      crossorigin: undefined,
      disableRemotePlayback: false,
      HTMLAttributes: {},
      inline: false,
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(AudioPlayerNode);
  },
});

export default Audio;

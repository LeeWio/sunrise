import {
  mergeAttributes,
  Node,
  Range,
  ReactNodeViewRenderer,
} from "@tiptap/react";

import { AudioView } from "./views";

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    audio: {
      setAudio: (attributes: { src: string }) => ReturnType;

      setAudioAt: (attributes: {
        src: string;
        pos: number | Range;
      }) => ReturnType;
    };
  }
}

export const Audio = Node.create({
  name: "audio",

  group: "block",

  defining: true,

  isolating: true,

  draggable: true,

  selectable: true,

  /**
   * Should be set to true for inline nodes. (Implied for text nodes.)
   */
  inline: false,

  addAttributes() {
    return {
      src: {
        default: "",
        parseHTML: (element) => element.getAttribute("src"),
        renderHTML: (attributes) => ({ src: attributes.src }),
      },

      title: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-title"),
        renderHTML: (attributes) => ({ "data-title": attributes.title }),
      },

      artist: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-artist"),
        renderHTML: (attributes) => ({ "data-artist": attributes.artist }),
      },

      album: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-album"),
        renderHTML: (attributes) => ({ "data-album": attributes.album }),
      },

      autoplay: {
        default: false,
        parseHTML: (element) => element.getAttribute("autoplay"),
        renderHTML: (attributes) => ({ autoplay: attributes.autoplay }),
      },

      controls: {
        default: true,
        parseHTML: (element) => element.getAttribute("controls"),
        renderHTML: (attributes) => ({ controls: attributes.controls }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "audio[src]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(
        { "data-type": this.name, class: "audio-wrapper" },
        {
          "data-width": HTMLAttributes["data-width"],
          "data-aligh": HTMLAttributes["data-aligh"],
        },
      ),
      [
        "audio",
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          controls: HTMLAttributes.controls ? "" : null,
          autoplay: HTMLAttributes.autoplay ? "" : null,
        }),
      ],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(AudioView);
  },

  addCommands() {
    return {
      setAudio:
        (attrs) =>
          ({ commands }) => {
            return commands.insertContent({
              type: this.name,
              attrs: { src: attrs.src },
            });
          },
    };
  },
});

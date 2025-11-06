import { Node, ReactNodeViewRenderer } from "@tiptap/react";

import { AudioUploadView } from "./views";

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    audioUpload: {
      setAudioUpload: () => ReturnType;
    };
  }
}

export const AudioUpload = Node.create({
  name: "audio-upload",

  isolating: true,

  defining: true,

  group: "block",

  draggable: true,

  selectable: true,

  parseHTML() {
    return [
      {
        tag: `div[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML() {
    return ["div", { "data-type": this.name }];
  },

  addCommands() {
    return {
      setAudioUpload:
        () =>
        ({ commands }) =>
          commands.insertContent(`<div data-type="${this.name}"></div>`),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(AudioUploadView);
  },
});

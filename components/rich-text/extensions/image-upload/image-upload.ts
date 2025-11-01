import { Node, ReactNodeViewRenderer } from "@tiptap/react";

import { ImageUpload as ImageUploadComponent } from "./views";

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    imageUpload: {
      setImageUpload: () => ReturnType;
    };
  }
}

export const ImageUpload = Node.create({
  name: "image-upload",

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
      setImageUpload:
        () =>
        ({ commands }) =>
          commands.insertContent(`<div data-type="${this.name}"></div>`),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageUploadComponent);
  },
});

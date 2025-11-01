import {
  Range,
  ChainedCommands,
  mergeAttributes,
  ReactNodeViewRenderer,
} from "@tiptap/react";

import Image from "../image/image";

import { ImageBlockView } from "./views/image-block-view";

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    imageBlock: {
      /**
       * Add or update an image block.
       * This method allows you to set the image's `src` attribute.
       * @param attributes The image attributes, specifically the `src` (image URL).
       * @example
       * editor.commands.setImageBlock({ src: 'https://example.com/image.png' })
       */
      setImageBlock: (attributes: { src: string }) => ReturnType;

      /**
       * Set an image block at a specific position in the document.
       * This method allows you to set the image's `src` attribute and position.
       * @param attributes The image attributes (`src` and `pos`), where `pos` is the position in the document.
       * @example
       * editor.commands.setImageBlockAt({ src: 'https://example.com/image.png', pos: 5 })
       */
      setImageBlockAt: (attributes: {
        src: string;
        pos: number | Range;
      }) => ReturnType;

      /**
       * Align the image block to left, center, or right.
       * This method allows you to align the image block within the document.
       * @param align The alignment value (`'left'`, `'center'`, or `'right'`).
       * @example
       * editor.commands.setImageBlockAlign('center')
       */
      setImageBlockAlign: (align: "left" | "center" | "right") => ReturnType;

      /**
       * Set the width of the image block.
       * This method allows you to specify the width of the image block in pixels.
       * @param width The width of the image in pixels.
       * @example
       * editor.commands.setImageBlockWidth(500)
       */
      setImageBlockWidth: (width: number) => ReturnType;
    };
  }
}

export const ImageBlock = Image.extend({
  name: "image-block",

  group: "block",

  defining: true,

  isolating: true,

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: "",
        parseHTML: (element: Element) => element.getAttribute("src"),
        renderHTML: (attributes: any) => ({
          src: attributes.src,
        }),
      },
      width: {
        default: "100%",
        parseHTML: (element: Element) => element.getAttribute("data-width"),
        renderHTML: (attributes: any) => ({
          "data-width": attributes.width,
        }),
      },
      align: {
        default: "center",
        parseHTML: (element: Element) => element.getAttribute("data-align"),
        renderHTML: (attributes: any) => ({
          "data-align": attributes.align,
        }),
      },
      alt: {
        default: undefined,
        parseHTML: (element: Element) => element.getAttribute("alt"),
        renderHTML: (attributes: any) => ({
          alt: attributes.alt,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[src*="tiptap.dev"]:not([src^="data:"]), img[src*="windows.net"]:not([src^="data:"])',
      },
    ];
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, any> }) {
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageBlockView);
  },

  addCommands() {
    return {
      setImageBlock:
        (attrs: { src: string }) =>
        ({ commands }: { commands: ChainedCommands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { src: attrs.src },
          });
        },

      setImageBlockAt:
        (attrs: { src: string; pos: number | Range }) =>
        ({ commands }: { commands: ChainedCommands }) => {
          return commands.insertContentAt(attrs.pos, {
            type: this.name,
            attrs: { src: attrs.src },
          });
        },

      setImageBlockAlign:
        (align: "left" | "center" | "right") =>
        ({ commands }: { commands: ChainedCommands }) =>
          commands.updateAttributes(this.name, { align }),

      setImageBlockWidth:
        (width: number) =>
        ({ commands }: { commands: ChainedCommands }) =>
          commands.updateAttributes(this.name, {
            width: `${Math.max(0, Math.min(100, width))}%`,
          }),
    };
  },
});

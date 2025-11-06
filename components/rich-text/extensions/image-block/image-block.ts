import type { ImageOptions, SetImageOptions } from "@tiptap/extension-image";

import { Image } from "@tiptap/extension-image";
import { Range, ReactNodeViewRenderer } from "@tiptap/react";

import { ImageBlockView } from "./views/image-block-view";

export type ImageAlign = "left" | "center" | "right" | "justify";

interface ImageBlockOptions extends ImageOptions {
  /**
   * Controls if the image should be flipped horizontally.
   * @default false
   * @example true
   */
  allowFlip: boolean;
}

interface SetImageBlockOptions extends SetImageOptions {
  flipX?: boolean;
  flipY?: boolean;
}

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    imageBlock: {
      /**
       * Add an image
       * @param options The image attributes
       * @example
       * editor
       *   .commands
       *   .setImageBlock({ src: 'https://tiptap.dev/logo.png', alt: 'tiptap', title: 'tiptap logo' })
       */
      setImageBlock: (options: SetImageBlockOptions) => ReturnType;

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
       * Set the alignment of an image block (left, center, right, justify).
       * @param align The alignment type for the image block.
       * @example
       * editor.commands.setImageBlockAlign("center");
       */
      setImageBlockAlign: (align: ImageAlign) => ReturnType;

      /**
       * Set the width of the image block.
       * This method allows you to specify the width of the image block in pixels.
       * @param width The width of the image in pixels.
       * @example
       * editor.commands.setImageBlockWidth(500)
       */
      setImageBlockWidth: (width: number) => ReturnType;

      /**
       * Set the horizontal flip (flipX) of an image block.
       * @param flip The flipX state (true for flip, false for no flip).
       * @example
       * editor.commands.setImageBlockFlipX(true);
       */
      setImageBlockFlipX: (flip: boolean) => ReturnType;

      /**
       * Set the vertical flip (flipY) of an image block.
       * @param flip The flipY state (true for flip, false for no flip).
       * @example
       * editor.commands.setImageBlockFlipY(true);
       */
      setImageBlockFlipY: (flip: boolean) => ReturnType;
    };
  }
}

export const ImageBlock = Image.extend<ImageBlockOptions>({
  name: "image-block",

  addAttributes() {
    return {
      src: {
        default: "",
        parseHTML: (element) => element.getAttribute("src"),
        renderHTML: (attributes) => ({
          src: attributes.src,
        }),
      },

      width: {
        default: "100%",
        parseHTML: (element) => element.getAttribute("width"),
        renderHTML: (attributes) => ({
          width: attributes.width,
        }),
      },

      align: {
        default: "left",
        parseHTML: (element) => element.getAttribute("align"),
        renderHTML: (attributes) => ({
          align: attributes.align,
        }),
      },

      alt: {
        default: undefined,
        parseHTML: (element) => element.getAttribute("alt"),
        renderHTML: (attributes) => ({
          alt: attributes.alt,
        }),
      },

      flipX: {
        default: false,
        parseHTML: (element: Element) => element.getAttribute("flipX"),
        renderHTML: (attributes: any) => ({
          flipX: attributes.flipX,
        }),
      },

      flipY: {
        default: false,
        parseHTML: (element: Element) => element.getAttribute("flipY"),
        renderHTML: (attributes: any) => ({
          flipY: attributes.flipY,
        }),
      },
    };
  },

  // parseHTML() {
  //   return [
  //     {
  //       tag: 'img[src*="tiptap.dev"]:not([src^="data:"]), img[src*="windows.net"]:not([src^="data:"])',
  //     },
  //   ];
  // },
  //
  // renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, any> }) {
  //   return [
  //     "img",
  //     mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
  //   ];
  // },

  addNodeView() {
    return ReactNodeViewRenderer(ImageBlockView);
  },

  addCommands() {
    return {
      setImageBlock:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { src: options.src },
          });
        },

      setImageBlockAlign:
        (align: ImageAlign) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { align });
        },

      setImageBlockWidth:
        (width: number) =>
        ({ commands }) =>
          commands.updateAttributes(this.name, {
            width: `${Math.max(0, Math.min(100, width))}%`,
          }),

      setImageBlockFlipX:
        (flip: boolean) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, {
            flipX: flip,
          });
        },

      setImageBlockFlipY:
        (flip: boolean) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, {
            flipY: flip,
          });
        },
    };
  },
});

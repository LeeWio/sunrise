import {
  mergeAttributes,
  Node,
  nodeInputRule,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { ImageView } from "./views/image-view";

/**
 * Directions where resize handles can be placed
 *
 * @example
 * - `'top'` - Top edge handle
 * - `'bottom-right'` - Bottom-right corner handle
 */
type ResizableNodeViewDirection =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "top-right"
  | "top-left"
  | "bottom-right";

interface ImageOptions {
  /**
   * Controls if the image node should be inline or not.
   * @default false
   * @example true
   */
  inline: boolean;
  /**
   * Controls if base64 images are allowed. Enable this if you want to allow
   * base64 image urls in the `src` attribute.
   * @default false
   * @example true
   */
  allowBase64: boolean;
  /**
   * HTML attributes to add to the image element.
   * @default {}
   * @example { class: 'foo' }
   */
  HTMLAttributes: Record<string, string>;
  /**
   * Controls if the image should be resizable and how the resize is configured.
   * @default false
   * @example { directions: { top: true, right: true, bottom: true, left: true, topLeft: true, topRight: true, bottomLeft: true, bottomRight: true }, minWidth: 100, minHeight: 100 }
   */
  resize:
    | {
        enabled: boolean;
        directions?: ResizableNodeViewDirection[];
        minWidth?: number;
        minHeight?: number;
        alwaysPreserveAspectRatio?: boolean;
      }
    | false;
}

export interface SetImageOptions {
  src: string;
  alt?: string;
  title?: string;
  size?: "25%" | "50%" | "75%" | "100%";
  radius?: "none" | "md" | "xl" | "3xl";
  aspect?: "auto" | "square" | "video" | "[4/3]" | "[3/2]";
  align?: "left" | "center" | "right" | "justify";
  flip?: "none" | "horizontal" | "vertical" | "both";
  rotate?: "0" | "90" | "180" | "270";
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  border?: "none" | "sm" | "md" | "lg" | "xl";
  brightness?: number;
  contrast?: number;
  saturate?: number;
}

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    image: {
      /**
       * Add an image
       * @param options The image attributes
       * @example
       * editor
       *   .commands
       *   .setImage({ src: 'https://tiptap.dev/logo.png', alt: 'tiptap', title: 'tiptap logo' })
       */
      setImage: (options: SetImageOptions) => ReturnType;

      /**
       * Update the size of the currently selected image
       * @param size The size value (supports percentages like '50%')
       * @example
       * editor
       *   .commands
       *   .setImageSize('75%')
       */
      setImageSize: (size: SetImageOptions["size"]) => ReturnType;

      /**
       * Update the border radius of the currently selected image
       * @param radius The radius value ('none' | 'md' | 'xl' | '3xl')
       * @example
       * editor
       *   .commands
       *   .setImageRadius('xl')
       */
      setImageRadius: (radius: SetImageOptions["radius"]) => ReturnType;

      /**
       * Update the aspect ratio of the currently selected image
       * @param aspect The aspect ratio value
       * @example
       * editor
       *   .commands
       *   .setImageAspect('square')
       */
      setImageAspect: (aspect: SetImageOptions["aspect"]) => ReturnType;

      /**
       * Update the alignment of the currently selected image
       * @param align The alignment value ('left' | 'center' | 'right' | 'justify')
       * @example
       * editor
       *   .commands
       *   .setImageAlign('center')
       */
      setImageAlign: (align: SetImageOptions["align"]) => ReturnType;

      /**
       * Flip the currently selected image
       * @param flip The flip direction ('none' | 'horizontal' | 'vertical' | 'both')
       * @example
       * editor
       *   .commands
       *   .setImageFlip('horizontal')
       */
      setImageFlip: (flip: SetImageOptions["flip"]) => ReturnType;

      /**
       * Rotate the currently selected image
       * @param rotate The rotation angle ('0' | '90' | '180' | '270')
       * @example
       * editor
       *   .commands
       *   .setImageRotate('90')
       */
      setImageRotate: (rotate: SetImageOptions["rotate"]) => ReturnType;

      /**
       * Update the shadow of the currently selected image
       * @param shadow The shadow value ('none' | 'sm' | 'md' | 'lg' | 'xl')
       * @example
       * editor
       *   .commands
       *   .setImageShadow('lg')
       */
      setImageShadow: (shadow: SetImageOptions["shadow"]) => ReturnType;

      /**
       * Update the border of the currently selected image
       * @param border The border width ('none' | 'sm' | 'md' | 'lg' | 'xl')
       * @example
       * editor
       *   .commands
       *   .setImageBorder('md')
       */
      setImageBorder: (border: SetImageOptions["border"]) => ReturnType;

      /**
       * Update the brightness of the currently selected image
       * @param brightness The brightness value (0-200, default 100)
       * @example
       * editor
       *   .commands
       *   .setImageBrightness(125)
       */
      setImageBrightness: (
        brightness: SetImageOptions["brightness"]
      ) => ReturnType;

      /**
       * Update the contrast of the currently selected image
       * @param contrast The contrast value (0-200, default 100)
       * @example
       * editor
       *   .commands
       *   .setImageContrast(125)
       */
      setImageContrast: (contrast: SetImageOptions["contrast"]) => ReturnType;

      /**
       * Update the saturation of the currently selected image
       * @param saturate The saturation value (0-200, default 100)
       * @example
       * editor
       *   .commands
       *   .setImageSaturate(125)
       */
      setImageSaturate: (saturate: SetImageOptions["saturate"]) => ReturnType;
    };
  }
}

/**
 * Matches an image to a ![image](src "title") on input.
 */
export const inputRegex =
  /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

export const Image = Node.create<ImageOptions>({
  name: "image",

  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
      resize: false,
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? "inline" : "block";
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },

      size: {
        default: "50%",
        parseHTML: (element) => element.getAttribute("data-size"),
        renderHTML: (attributes) => ({
          "data-size": attributes.size,
        }),
      },

      radius: {
        default: "md",
        parseHTML: (element) => element.getAttribute("data-radius"),
        renderHTML: (attributes) => ({
          "data-radius": attributes.radius,
        }),
      },

      aspect: {
        default: "auto",
        parseHTML: (element) => element.getAttribute("data-aspect"),
        renderHTML: (attributes) => ({
          "data-aspect": attributes.aspect,
        }),
      },

      align: {
        default: "center",
        parseHTML: (element) => element.getAttribute("data-align"),
        renderHTML: (attributes) => ({ "data-align": attributes.align }),
      },

      flip: {
        default: "none",
        parseHTML: (element) => element.getAttribute("data-flip"),
        renderHTML: (attributes) => ({ "data-flip": attributes.flip }),
      },
      rotate: {
        default: "0",
        parseHTML: (element) => element.getAttribute("data-rotate"),
        renderHTML: (attributes) => ({ "data-rotate": attributes.rotate }),
      },

      shadow: {
        default: "none",
        parseHTML: (element) => element.getAttribute("data-shadow"),
        renderHTML: (attributes) => ({ "data-shadow": attributes.shadow }),
      },

      border: {
        default: "none",
        parseHTML: (element) => element.getAttribute("data-border"),
        renderHTML: (attributes) => ({ "data-border": attributes.border }),
      },

      brightness: {
        default: 100,
        parseHTML: (element) => {
          const value = element.getAttribute("data-brightness");
          const parsed = value ? parseInt(value) : 100;
          return isNaN(parsed) ? 100 : parsed;
        },
        renderHTML: (attributes) => ({
          "data-brightness": attributes.brightness,
        }),
      },

      contrast: {
        default: 100,
        parseHTML: (element) => {
          const value = element.getAttribute("data-contrast");
          const parsed = value ? parseInt(value) : 100;
          return isNaN(parsed) ? 100 : parsed;
        },
        renderHTML: (attributes) => ({ "data-contrast": attributes.contrast }),
      },

      saturate: {
        default: 100,
        parseHTML: (element) => {
          const value = element.getAttribute("data-saturate");
          const parsed = value ? parseInt(value) : 100;
          return isNaN(parsed) ? 100 : parsed;
        },
        renderHTML: (attributes) => ({ "data-saturate": attributes.saturate }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: this.options.allowBase64
          ? "img[src]"
          : 'img[src]:not([src^="data:"])',
      },
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageView);
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  parseMarkdown: (token, helpers) => {
    return helpers.createNode("image", {
      src: token.href,
      title: token.title,
      alt: token.text,
    });
  },

  renderMarkdown: (node) => {
    const src = node.attrs?.src ?? "";
    const alt = node.attrs?.alt ?? "";
    const title = node.attrs?.title ?? "";

    return title ? `![${alt}](${src} "${title}")` : `![${alt}](${src})`;
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },

      setImageSize:
        (size) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { size });
        },

      setImageRadius:
        (radius) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { radius });
        },

      setImageAspect:
        (aspect) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { aspect });
        },

      setImageAlign:
        (align) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { align });
        },

      setImageFlip:
        (flip) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { flip });
        },

      setImageRotate:
        (rotate) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { rotate });
        },

      setImageShadow:
        (shadow) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { shadow });
        },

      setImageBorder:
        (border) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { border });
        },

      setImageBrightness:
        (brightness) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { brightness });
        },

      setImageContrast:
        (contrast) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { contrast });
        },

      setImageSaturate:
        (saturate) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { saturate });
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, , alt, src, title] = match;

          return { src, alt, title };
        },
      }),
    ];
  },
});

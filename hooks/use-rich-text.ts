import { ExtensionKit } from "@/components/rich-text/extensions/extension-kit";
import { Content, useEditor } from "@tiptap/react";

export interface UseRichTextOptions {
  /**
   * The content of the editor (HTML, JSON, or a JSON array)
   */
  content?: Content;

  /**
   * Whether the editor is editable
   */
  editable?: boolean;
}

export const useRichText = ({
  content,
  editable = true,
}: UseRichTextOptions = {}) => {
  const editor = useEditor({
    /**
     * Whether to render the editor on the first render.
     * If client-side rendering, set this to `true`.
     * If server-side rendering, set this to `false`.
     * @default true
     */
    immediatelyRender: false,

    /**
     * Whether to re-render the editor on each transaction.
     * This is legacy behavior that will be removed in future versions.
     * @default false
     */
    shouldRerenderOnTransaction: false,

    /**
     * The editor's initial focus position
     */
    autofocus: true,

    /**
     * The content of the editor (HTML, JSON, or a JSON array)
     */
    content: content,

    /**
     * Called after the editor is constructed.
     */
    onCreate: (ctx) => {},

    /**
     * Called when the editor's content is updated.
     */
    onUpdate(props) {
      // console.log(props.editor.getHTML());
    },

    extensions: [...ExtensionKit()],

    /**
     * Whether the editor is editable
     */
    editable: editable,

    /**
     * Whether to inject base CSS styles
     */
    injectCSS: false,
  });

  return { editor };
};

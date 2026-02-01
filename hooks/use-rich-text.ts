import { useEditor } from '@tiptap/react';

import { ExtensionKit } from '@/components/rich-text/extensions/extension-kit';

export const useRichText = () => {
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
     * Called after the editor is constructed.
     */
    onCreate(props) {},

    /**
     * Called when the editor's content is updated.
     */
    onUpdate(props) {
      console.log(props.editor.getHTML());
    },

    content: `
<img src="http://localhost:8080/uploads/fd8da13a4dea4e679007f1f7474beb40.jpg" width="100%" align="left" flipx="false" flipy="false"><p></p>
    `,

    /**
     * Called before the editor is constructed.
     */
    onBeforeCreate(props) {},

    /**
     * Called when the editor is unmounted.
     */
    onMount(props) {},

    /**
     * Called when the editor is unmounted.
     */
    onUnmount(props) {},

    /**
     * Called when the editor encounters an error while parsing the content.
     * Only enabled if `enableContentCheck` is `true`.
     */
    onContentError(props) {},

    /**
     * Called on blur events.
     */
    onBlur(props) {},

    /**
     * Called when content is deleted from the editor.
     */
    onDelete(props) {},

    /**
     * Called when the editor is destroyed.
     */
    onDestroy(props) {},

    /**
     * The extensions to use
     */
    extensions: [...ExtensionKit()],

    /**
     * Whether the editor is editable
     */
    editable: true,

    /**
     * Whether to inject base CSS styles
     */
    injectCSS: false,
  });

  return { editor };
};

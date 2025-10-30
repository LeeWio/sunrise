import { useCallback, useState } from "react";
import { useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";

import { MenuProps } from "../type";
import { LinkEditorPanel } from "../../panels/link-editor-panel";
import { LinkPreviewPanel } from "../../panels/link-preview-panel";

export const LinkMenu = ({ editor, appendTo }: MenuProps) => {
  const [showEdit, setShowEdit] = useState(false);
  const { link, target } = useEditorState({
    editor,
    selector: (ctx) => {
      const attrs = ctx.editor.getAttributes("link");

      return { link: attrs.href, target: attrs.target };
    },
  });

  const shouldShow = useCallback(() => {
    const isActive = editor.isActive("link");

    return isActive;
  }, [editor]);

  const handleEdit = useCallback(() => {
    setShowEdit(true);
  }, []);

  const onSetLink = useCallback(
    (url: string, openInNewTab?: boolean) => {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: openInNewTab ? "_blank" : "" })
        .run();
      setShowEdit(false);
    },
    [editor],
  );

  const onUnsetLink = useCallback(() => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setShowEdit(false);

    return null;
  }, [editor]);

  return (
    <BubbleMenu
      appendTo={appendTo?.current || undefined}
      editor={editor}
      pluginKey="linkMenu"
      shouldShow={shouldShow}
      updateDelay={0}
    >
      {showEdit ? (
        <div className="tooltip flex justify-center items-center">
          <LinkEditorPanel
            initialOpenInNewTab={target === "_blank"}
            initialUrl={link}
            onSetLink={onSetLink}
          />
        </div>
      ) : (
        <LinkPreviewPanel
          url={link}
          onClear={onUnsetLink}
          onEdit={handleEdit}
        />
      )}
    </BubbleMenu>
  );
};

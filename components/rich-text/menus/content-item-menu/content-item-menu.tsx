import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";
import DragHandle from "@tiptap/extension-drag-handle-react";
import { Button } from "@heroui/react";

import { useData } from "./hooks/use-data";
import useContentItemActions from "./hooks/use-content-item-actions";

import { EllipsisVerticalIcon } from "@/components/icons";

export type ContentItemMenuProps = {
  editor: Editor;
  isEditable?: boolean;
};

export const ContentItemMenu = ({
  editor,
  isEditable = true,
}: ContentItemMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const data = useData();
  const actions = useContentItemActions(
    editor,
    data.currentNode,
    data.currentNodePos,
  );

  const items = [
    {
      key: "clear formatting",
      label: "Clear formatting",
      icon: "lucide:remove-formatting",
      onPress: actions.resetTextFormatting,
    },
    {
      key: "copy to clipboard",
      label: "Copy to clipboard",
      icon: "lucide:clipboard",
      onPress: actions.copyNodeToClipboard,
    },
    {
      key: "duplicate",
      label: "Duplicate",
      icon: "lucide:copy",
      onPress: actions.duplicateNode,
    },
    {
      key: "delete",
      label: "Delete",
      icon: "lucide:trash-2",
      onPress: actions.deleteNode,
    },
  ];

  useEffect(() => {
    editor.commands.setMeta("lockDragHandle", menuOpen);
  }, [editor, menuOpen]);

  return (
    <DragHandle
      editor={editor}
      pluginKey="ContentItemMenu"
      onNodeChange={data.handleNodeChange}
    >
      {isEditable && (
        <Button isIconOnly size="sm" variant="ghost">
          <EllipsisVerticalIcon />
        </Button>
      )}
    </DragHandle>
  );
};

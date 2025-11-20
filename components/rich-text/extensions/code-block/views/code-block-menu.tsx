import { BubbleMenu } from "@tiptap/react/menus";
import { Select, ListBox } from "@heroui/react";
import { useCallback } from "react";

import { CodeBlock } from "../code-block";

import { MenuProps } from "@/components/rich-text/menus/type";
import { getRenderContainer } from "@/components/rich-text/libs/utils";

export const CodeBlockMenu = ({ editor, appendTo }: MenuProps) => {
  const getReferencedVirtualElement = useCallback(() => {
    const renderContainer = getRenderContainer(editor, CodeBlock.name);

    if (!renderContainer) return null;

    return {
      getBoundingClientRect: () => renderContainer.getBoundingClientRect(),
    };
  }, [editor]);

  const shouldShow = useCallback(() => {
    return editor.isActive(CodeBlock.name);
  }, [editor]);

  return (
    <BubbleMenu
      appendTo={appendTo?.current || undefined}
      className="surface surface--default rounded-lg flex items-center justify-center gap-0.5 z-50 p-1"
      editor={editor}
      getReferencedVirtualElement={getReferencedVirtualElement}
      pluginKey="code-block-menu"
      shouldShow={shouldShow}
    >
      <Select placeholder="Select one">
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Content>
          <ListBox>
            <ListBox.Item id="florida" textValue="Florida">
              Florida
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="delaware" textValue="Delaware">
              Delaware
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="california" textValue="California">
              California
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="texas" textValue="Texas">
              Texas
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="new-york" textValue="New York">
              New York
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="washington" textValue="Washington">
              Washington
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Content>
      </Select>
    </BubbleMenu>
  );
};

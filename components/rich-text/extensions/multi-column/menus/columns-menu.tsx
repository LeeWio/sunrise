import { BubbleMenu } from "@tiptap/react/menus";
import { useCallback } from "react";
import { useEditorState } from "@tiptap/react";

import Columns, { ColumnLayout } from "../columns";

import { MenuProps } from "@/components/rich-text/menus/type";
import { getRenderContainer } from "@/components/rich-text/libs/utils";
import TextMenuItem from "@/components/rich-text/menus/text-menu/components/text-menu-item";
import {
  AlignCenterFillIcon,
  AlignLeftFillIcon,
  AlignRightFillIcon,
} from "@/components/icons";

export const ColumnsMenu = ({ editor, appendTo }: MenuProps) => {
  const getReferencedVirtualElement = useCallback(() => {
    const renderContainer = getRenderContainer(editor, Columns.name);

    if (!renderContainer) return null;

    return {
      getBoundingClientRect: () => renderContainer.getBoundingClientRect(),
    };
  }, [editor]);

  const shouldShow = useCallback(() => {
    const isColumns = editor.isActive(Columns.name);

    return isColumns;
  }, [editor]);

  const onColumnLeft = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarLeft).run();
  }, [editor]);

  const onColumnTwo = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.TwoColumn).run();
  }, [editor]);

  const onColumnRight = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarRight).run();
  }, [editor]);

  const { isColumnLeft, isColumnTwo, isColumnRight } = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isColumnLeft: ctx.editor.isActive(Columns.name, {
          layout: ColumnLayout.SidebarLeft,
        }),

        isColumnRight: ctx.editor.isActive(Columns.name, {
          layout: ColumnLayout.SidebarRight,
        }),

        isColumnTwo: ctx.editor.isActive(Columns.name, {
          layout: ColumnLayout.TwoColumn,
        }),
      };
    },
  });

  return (
    <BubbleMenu
      appendTo={appendTo?.current || undefined}
      className="tooltip flex items-center justify-center gap-0.5 z-50"
      editor={editor}
      getReferencedVirtualElement={getReferencedVirtualElement}
      pluginKey="columns-menu"
      shouldShow={shouldShow}
    >
      <TextMenuItem
        icon={<AlignLeftFillIcon />}
        isSelected={isColumnLeft}
        onPress={onColumnLeft}
      />

      <TextMenuItem
        icon={<AlignCenterFillIcon />}
        isSelected={isColumnTwo}
        onPress={onColumnTwo}
      />

      <TextMenuItem
        icon={<AlignRightFillIcon />}
        isSelected={isColumnRight}
        onPress={onColumnRight}
      />
    </BubbleMenu>
  );
};

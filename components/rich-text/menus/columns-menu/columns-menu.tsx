'use client';

import { useEditorState } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import { useCallback } from 'react';
import {
  LayoutSideContentLeft,
  LayoutColumns,
  LayoutSideContentRight,
  TrashBin,
} from '@gravity-ui/icons';
import { MenuButton } from '../../components/menu-button';
import { getRenderContainer } from '../../utils/get-render-container';
import { ColumnLayout } from '../../extensions/multi-column/columns';
import { Editor } from '@tiptap/react';

interface ColumnsMenuProps {
  editor: Editor;
  appendTo?: React.RefObject<HTMLElement | null>;
}

export const ColumnsMenu = ({ editor, appendTo }: ColumnsMenuProps) => {
  const getReferencedVirtualElement = useCallback(() => {
    return {
      getBoundingClientRect: () => {
        const renderContainer = getRenderContainer(editor, 'columns');
        return renderContainer?.getBoundingClientRect() || new DOMRect(0, 0, 0, 0);
      },
    };
  }, [editor]);

  const shouldShow = useCallback(({ editor }: { editor: Editor }) => {
    return editor.isActive('columns');
  }, []);

  const onColumnLeft = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarLeft).run();
  }, [editor]);

  const onColumnTwo = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.TwoColumn).run();
  }, [editor]);

  const onColumnRight = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarRight).run();
  }, [editor]);

  const onDelete = useCallback(() => {
    editor.chain().focus().deleteNode('columns').run();
  }, [editor]);

  const { isColumnLeft, isColumnTwo, isColumnRight } = useEditorState({
    editor,
    selector: (ctx) => ({
      isColumnLeft: ctx.editor.isActive('columns', {
        layout: ColumnLayout.SidebarLeft,
      }),
      isColumnRight: ctx.editor.isActive('columns', {
        layout: ColumnLayout.SidebarRight,
      }),
      isColumnTwo: ctx.editor.isActive('columns', {
        layout: ColumnLayout.TwoColumn,
      }),
    }),
  }) ?? { isColumnLeft: false, isColumnTwo: false, isColumnRight: false };

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="columns-menu"
      shouldShow={shouldShow}
      appendTo={appendTo?.current || undefined}
      getReferencedVirtualElement={getReferencedVirtualElement}
      className="tooltip z-50 flex items-center justify-center gap-0.5"
    >
      <MenuButton
        onPress={onColumnLeft}
        isActive={isColumnLeft}
        tooltip="Sidebar Left"
        tabIndex={-1}
      >
        <LayoutSideContentLeft className="size-4" />
      </MenuButton>

      <MenuButton onPress={onColumnTwo} isActive={isColumnTwo} tooltip="Two Columns" tabIndex={-1}>
        <LayoutColumns className="size-4" />
      </MenuButton>

      <MenuButton
        onPress={onColumnRight}
        isActive={isColumnRight}
        tooltip="Sidebar Right"
        tabIndex={-1}
      >
        <LayoutSideContentRight className="size-4" />
      </MenuButton>

      <div className="bg-default-200 mx-1 h-4 w-px" />

      <MenuButton onPress={onDelete} tooltip="Delete Columns" tabIndex={-1}>
        <TrashBin className="text-danger size-4" />
      </MenuButton>
    </BubbleMenu>
  );
};

'use client';

import { Checkbox } from '@heroui/react';
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from '@tiptap/react';

export const CheckboxView = ({ node, editor, getPos }: NodeViewProps) => {
  const handleCheckboxChange = (checked: boolean) => {
    if (!editor.isEditable) {
      return;
    }

    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .command(({ tr }) => {
        const position = getPos();

        if (typeof position !== 'number') return false;

        const currentNode = tr.doc.nodeAt(position);

        tr.setNodeMarkup(position, undefined, {
          ...currentNode?.attrs,
          checked,
        });

        return true;
      })
      .run();
  };

  return (
    <NodeViewWrapper as="li" className="my-1 flex list-none items-start gap-2">
      <div className="group flex w-full items-center gap-2">
        <div className="pt-0.5" contentEditable={false}>
          <Checkbox isSelected={node.attrs.checked} onChange={handleCheckboxChange}>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
          </Checkbox>
        </div>

        <NodeViewContent className="min-w-0 flex-1" />
      </div>
    </NodeViewWrapper>
  );
};

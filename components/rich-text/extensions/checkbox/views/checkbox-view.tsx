import { Checkbox } from "@heroui/react";
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";

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

        if (typeof position != "number") return false;

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
    <NodeViewWrapper as="li">
      <div className="flex items-center gap-2">
        <Checkbox
          isSelected={node.attrs.checked}
          onChange={handleCheckboxChange}
        >
          <Checkbox.Control contentEditable={false}>
            <Checkbox.Indicator />
          </Checkbox.Control>
        </Checkbox>

        <NodeViewContent />
      </div>
    </NodeViewWrapper>
  );
};

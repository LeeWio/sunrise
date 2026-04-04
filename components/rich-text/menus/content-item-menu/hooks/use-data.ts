import { Node } from "@tiptap/pm/model";
import { Editor } from "@tiptap/react";
import { useCallback, useState } from "react";

/**
 * Hook to manage the state of the current node being interacted with in the ContentItemMenu.
 */
export const useData = () => {
  const [currentNode, setCurrentNode] = useState<Node | null>(null);
  const [currentNodePos, setCurrentNodePos] = useState<number>(-1);

  const handleNodeChange = useCallback(
    (data: { node: Node | null; editor: Editor; pos: number }) => {
      if (data.node) {
        setCurrentNode(data.node);
      }
      setCurrentNodePos(data.pos);
    },
    [],
  );

  return {
    currentNode,
    currentNodePos,
    setCurrentNode,
    setCurrentNodePos,
    handleNodeChange,
  };
};

"use client";

import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import React from "react";
import { motion } from "motion/react";

/**
 * DropPlaceholder with smooth expansion animation using motion.
 * Standard Tiptap React NodeView implementation using NodeViewWrapper.
 */
const DropPlaceholderComponent = ({ node }: { node: any }) => {
  return (
    <NodeViewWrapper className="drop-placeholder-wrapper">
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: node.attrs.height || 40, 
          opacity: 1 
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 35
        }}
        className="drop-placeholder-node relative w-full rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 my-2 overflow-hidden pointer-events-none"
      >
        {/* Visual center line for extra guidance */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary/40 shadow-[0_0_8px_rgba(var(--heroui-primary),0.5)]" />
      </motion.div>
    </NodeViewWrapper>
  );
};

export const DropPlaceholder = Node.create({
  name: "dropPlaceholder",
  group: "block",
  selectable: false,
  atom: true,

  addAttributes() {
    return {
      height: {
        default: 40,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="drop-placeholder"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-type": "drop-placeholder" })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(DropPlaceholderComponent);
  },
});

"use client";

import React, { useCallback, useState } from "react";
import { useTiptap, useTiptapState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { Input } from "@heroui/react";
import { motion } from "motion/react";
import { Check, TrashBin } from "@gravity-ui/icons";
import { MenuContainer } from "../menu-container";
import { ToolbarButton } from "../components";

/**
 * MathMenu - Interactive popover for editing LaTeX formulas.
 * Appears when an inlineMath or blockMath node is selected or active.
 *
 * Performance & Animation optimized by following LinkMenu patterns.
 */
export function MathMenu() {
  const { editor } = useTiptap();
  const [latex, setLatex] = useState("");
  const [prevMathAttr, setPrevMathAttr] = useState<string | undefined>(undefined);

  // Reactively get active node attributes
  const mathAttributes = useTiptapState((state) => {
    const inlineAttrs = state.editor.getAttributes("inlineMath");
    const blockAttrs = state.editor.getAttributes("blockMath");
    return inlineAttrs.latex !== undefined ? inlineAttrs : blockAttrs;
  });

  // Sync state when attributes change (selection moves) without effects
  if (mathAttributes?.latex !== prevMathAttr) {
    setPrevMathAttr(mathAttributes?.latex);
    if (mathAttributes?.latex !== undefined) {
      setLatex(mathAttributes.latex);
    }
  }

  const shouldShow = useCallback(() => {
    if (!editor) return false;
    return (editor.isActive("inlineMath") || editor.isActive("blockMath")) && editor.isEditable;
  }, [editor]);

  const handleSave = useCallback(() => {
    if (!editor || latex === undefined) return;
    const isBlock = editor.isActive("blockMath");

    if (isBlock) {
      editor.chain().focus().updateBlockMath({ latex }).run();
    } else {
      editor.chain().focus().updateInlineMath({ latex }).run();
    }
  }, [editor, latex]);

  const handleDelete = useCallback(() => {
    if (!editor) return;
    const isBlock = editor.isActive("blockMath");
    if (isBlock) {
      editor.chain().focus().deleteBlockMath().run();
    } else {
      editor.chain().focus().deleteInlineMath().run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="mathMenu"
      shouldShow={shouldShow}
      options={{
        placement: "bottom",
        offset: 12,
      }}
    >
      <MenuContainer key="math-menu-shell" className="flex items-center overflow-hidden">
        {/* Internal content animation matched with LinkMenu's edit mode */}
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          className="flex items-center gap-1.5 px-1 py-1"
        >
          <Input
            variant="secondary"
            placeholder="LaTeX..."
            value={latex}
            onChange={(e) => setLatex(e.target.value)}
            className="h-8 min-h-0 w-[240px] py-0"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") editor.commands.focus();
            }}
          />

          <div className="flex items-center gap-0.5 pr-0.5">
            <ToolbarButton
              icon={<Check className="size-4" />}
              tooltip="Update formula"
              onPress={handleSave}
              className="text-success hover:bg-success/10"
            />
            <ToolbarButton
              icon={<TrashBin className="size-4" />}
              tooltip="Delete"
              onPress={handleDelete}
              className="hover:text-danger hover:bg-danger/10"
            />
          </div>
        </motion.div>
      </MenuContainer>
    </BubbleMenu>
  );
}

export default MathMenu;

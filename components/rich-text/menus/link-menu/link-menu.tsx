"use client";

import React, { useCallback, useState, useMemo } from "react";
import { useTiptap, useTiptapState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { Separator, Link as HeroLink, Input } from "@heroui/react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LinkSlash, 
  Check, 
  Xmark, 
  ArrowUpRightFromSquare 
} from "@gravity-ui/icons";
import { MenuContainer } from "../menu-container";
import { ToolbarButton } from "../components";

interface LinkMenuProps {
  /**
   * The element to which the bubble menu should be appended to.
   */
  appendTo?: React.RefObject<HTMLElement | null> | HTMLElement | (() => HTMLElement);
}

/**
 * High-performance Silky LinkMenu.
 * Optimized for 60fps transitions by avoiding expensive filters and over-complex layouts.
 */
export function LinkMenu({ appendTo }: LinkMenuProps) {
  const { editor } = useTiptap();
  const [mode, setMode] = useState<"preview" | "edit">("preview");
  const [url, setUrl] = useState("");

  // Reactively get link attributes
  const linkAttributes = useTiptapState((state) => state.editor.getAttributes("link"));

  const handleEdit = useCallback(() => {
    setUrl(linkAttributes.href || "");
    setMode("edit");
  }, [linkAttributes.href]);

  const shouldShow = useCallback(() => {
    if (!editor) return false;
    return editor.isActive("link") && editor.isEditable;
  }, [editor]);

  const handleUnsetLink = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
  }, [editor]);

  const handleSave = useCallback(() => {
    if (!editor) return;
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    setMode("preview");
  }, [editor, url]);

  const handleCancel = useCallback(() => {
    setMode("preview");
  }, []);

  const container = useMemo(() => {
    if (typeof appendTo === 'function') return appendTo();
    if (appendTo && 'current' in appendTo) return appendTo.current || undefined;
    return appendTo || undefined;
  }, [appendTo]);

  if (!editor) return null;

  const springConfig = { type: "spring", stiffness: 500, damping: 30, mass: 1 };

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="linkMenu"
      shouldShow={shouldShow}
      appendTo={container}
      options={{
        placement: "bottom-start",
        offset: 8,
        onHide: () => setMode("preview"),
      }}
    >
      <AnimatePresence mode="wait">
        <MenuContainer
          key="link-menu-shell"
          layout
          initial={{ opacity: 0, scale: 0.95, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 5 }}
          transition={springConfig}
          className="overflow-hidden flex items-center"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mode === "preview" ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                className="flex items-center gap-0.5"
              >
                <HeroLink 
                  onPress={handleEdit}
                  className="px-2 max-w-[200px] truncate cursor-pointer font-medium hover:text-primary transition-colors"
                >
                  {linkAttributes.href}
                </HeroLink>
                
                <Separator orientation="vertical" className="h-4 mx-1" />
                
                <div className="flex items-center gap-0.5 pr-0.5">
                  <ToolbarButton
                    as={HeroLink}
                    href={linkAttributes.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={<ArrowUpRightFromSquare className="size-3.5" />}
                    tooltip="Open in new tab"
                  />

                  <ToolbarButton
                    icon={<LinkSlash className="size-3.5" />}
                    tooltip="Remove link"
                    onPress={handleUnsetLink}
                    className="hover:text-danger hover:bg-danger/10"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="edit"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                className="flex items-center gap-1.5 px-1"
              >
                <Input
                  variant="secondary"
                  placeholder="Enter link URL..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-[220px] h-8 min-h-0 py-0"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave();
                    if (e.key === "Escape") handleCancel();
                  }}
                />
                <div className="flex items-center gap-0.5 pr-0.5">
                  <ToolbarButton
                    icon={<Check className="size-4" />}
                    tooltip="Save link"
                    onPress={handleSave}
                    className="text-success hover:bg-success/10"
                  />
                  <ToolbarButton
                    icon={<Xmark className="size-4" />}
                    tooltip="Cancel editing"
                    onPress={handleCancel}
                    className="hover:bg-default-100"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </MenuContainer>
      </AnimatePresence>
    </BubbleMenu>
  );
}

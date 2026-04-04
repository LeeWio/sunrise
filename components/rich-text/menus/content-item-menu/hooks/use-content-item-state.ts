"use client";

import { useMemo, useCallback } from "react";
import { useTiptapState, Editor } from "@tiptap/react";
import { Node } from "@tiptap/pm/model";

/**
 * Hook to manage all UI-related states for ContentItemMenu.
 */
export const useContentItemState = (editor: Editor | null, currentNode: Node | null, searchQuery: string) => {
  const state = useTiptapState((ctx) => {
    if (!ctx.editor) return { nodeType: "paragraph", alignment: "left" };
    
    let nodeType = "paragraph";
    if (ctx.editor.isActive("heading", { level: 1 })) nodeType = "h1";
    else if (ctx.editor.isActive("heading", { level: 2 })) nodeType = "h2";
    else if (ctx.editor.isActive("heading", { level: 3 })) nodeType = "h3";
    else if (ctx.editor.isActive("bulletList")) nodeType = "bulletList";
    else if (ctx.editor.isActive("orderedList")) nodeType = "orderedList";

    let alignment = "left";
    if (ctx.editor.isActive({ textAlign: "center" })) alignment = "center";
    else if (ctx.editor.isActive({ textAlign: "right" })) alignment = "right";

    return { nodeType, alignment };
  });

  const blockStats = useMemo(() => {
    if (!currentNode) return { characters: 0, words: 0 };
    const text = currentNode.textContent || "";
    return {
      characters: text.length,
      words: text.trim() ? text.trim().split(/\s+/).length : 0
    };
  }, [currentNode]);

  const isMatch = useCallback((text: string) => 
    text.toLowerCase().includes(searchQuery.toLowerCase()), [searchQuery]);

  return {
    nodeType: new Set([state.nodeType]),
    alignment: new Set([state.alignment]),
    blockStats,
    isMatch
  };
};

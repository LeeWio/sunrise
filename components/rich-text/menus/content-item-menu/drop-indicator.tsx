"use client";

import React, { useEffect, useRef } from "react";
import { useTiptap } from "@tiptap/react";

/**
 * Advanced DropIndicator with Custom Drag Image and high-precision logic.
 */
export function DropIndicator() {
  const { editor } = useTiptap();
  const lastUpdateRef = useRef<number>(0);
  const dragSourceHeightRef = useRef<number>(40);

  useEffect(() => {
    if (!editor || !editor.view || editor.isDestroyed) return;

    const handleDragStart = (event: DragEvent) => {
      const view = editor.view;
      const selected = view.dom.querySelector('.ProseMirror-selectednode') as HTMLElement;
      
      if (!selected || !event.dataTransfer) return;

      // 1. Capture height for the placeholder
      dragSourceHeightRef.current = selected.offsetHeight;

      // 2. Create a custom Drag Image
      // We clone the selected element to make it look "picked up"
      const dragImage = selected.cloneNode(true) as HTMLElement;
      
      // Apply professional styling to the ghost image
      dragImage.style.position = 'absolute';
      dragImage.style.top = '-1000px';
      dragImage.style.width = `${selected.offsetWidth}px`;
      dragImage.style.opacity = '0.8';
      dragImage.style.backgroundColor = 'var(--heroui-background, white)';
      dragImage.style.border = '1px solid var(--heroui-primary-200, #006fee33)';
      dragImage.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
      dragImage.style.borderRadius = '12px';
      dragImage.style.padding = '8px 12px';
      dragImage.style.zIndex = '1000';
      dragImage.style.pointerEvents = 'none';
      
      document.body.appendChild(dragImage);
      
      // Set the center of the element as the drag handle point
      event.dataTransfer.setDragImage(dragImage, selected.offsetWidth / 2, selected.offsetHeight / 2);
      
      // Cleanup the ghost DOM after the browser has captured it
      setTimeout(() => {
        if (dragImage.parentNode) {
          document.body.removeChild(dragImage);
        }
      }, 0);
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
      
      const now = Date.now();
      if (now - lastUpdateRef.current < 32) return;
      lastUpdateRef.current = now;

      const view = editor.view;
      if (!view || !view.state) return;

      try {
        const pos = view.posAtCoords({ left: event.clientX, top: event.clientY });
        if (!pos || pos.pos < 0) return;

        const { state } = view;
        const $pos = state.doc.resolve(pos.pos);
        
        // Block-level detection
        const startPos = $pos.before(1);
        const endPos = $pos.after(1);

        const coords = view.coordsAtPos(startPos);
        const nextCoords = view.coordsAtPos(endPos - 1);
        
        // Use a 25% deadzone to prevent jitter
        const nodeHeight = nextCoords.bottom - coords.top;
        const threshold = 0.25; // 25% area around middle
        const relativePos = (event.clientY - coords.top) / nodeHeight;
        
        let insertPos;
        if (relativePos < 0.5 - threshold / 2) {
          insertPos = startPos;
        } else if (relativePos > 0.5 + threshold / 2) {
          insertPos = endPos;
        } else {
          // In the deadzone, keep the previous position to avoid jumpy behavior
          return;
        }

        const { tr } = state;
        let existingPos = -1;
        
        state.doc.descendants((n, p) => {
          if (n.type.name === "dropPlaceholder") {
            existingPos = p;
            return false;
          }
        });

        if (existingPos === insertPos) return;

        if (existingPos !== -1) {
          tr.delete(existingPos, existingPos + 1);
        }

        const finalInsertPos = (existingPos !== -1 && existingPos < insertPos) 
          ? insertPos - 1 
          : insertPos;

        tr.insert(
          Math.min(finalInsertPos, state.doc.content.size), 
          editor.schema.nodes.dropPlaceholder.create({ height: dragSourceHeightRef.current })
        );
        tr.setMeta("addToHistory", false);
        tr.setMeta("preventUpdate", true);
        view.dispatch(tr);
      } catch (err) {
        // Range safety
      }
    };

    const cleanup = () => {
      if (!editor || editor.isDestroyed || !editor.view) return;
      try {
        const { tr, doc } = editor.state;
        let found = false;
        doc.descendants((node, p) => {
          if (node.type.name === "dropPlaceholder") {
            tr.delete(p, p + node.nodeSize);
            found = true;
            return false;
          }
        });
        if (found) {
          tr.setMeta("addToHistory", false);
          editor.view.dispatch(tr);
        }
      } catch (e) {}
    };

    const dom = editor.view.dom;
    if (dom) {
      dom.addEventListener("dragstart", handleDragStart);
      dom.addEventListener("dragover", handleDragOver);
      dom.addEventListener("dragleave", cleanup);
      dom.addEventListener("drop", () => setTimeout(cleanup, 30));
    }

    return () => {
      if (dom) {
        dom.removeEventListener("dragstart", handleDragStart);
        dom.removeEventListener("dragover", handleDragOver);
        dom.removeEventListener("dragleave", cleanup);
      }
    };
  }, [editor]);

  return null;
}

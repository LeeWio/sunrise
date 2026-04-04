"use client";

import React, { useEffect, useRef } from "react";
import { useTiptap } from "@tiptap/react";

/**
 * DropIndicator - Logic controller for the DragAndDrop extension.
 * Handles coordinates, placeholders, and edge scrolling.
 */
export function DropIndicator() {
  const { editor } = useTiptap();
  const lastUpdateRef = useRef<number>(0);
  const dragSourceHeightRef = useRef<number>(40);
  
  const scrollRafRef = useRef<number | null>(null);
  const scrollSpeedRef = useRef<number>(0);

  useEffect(() => {
    if (!editor || !editor.view || editor.isDestroyed) return;

    const view = editor.view;
    const scrollContainer = view.dom.parentElement as HTMLElement;

    const stopScrolling = () => {
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = null;
      scrollSpeedRef.current = 0;
    };

    const startScrolling = () => {
      if (scrollRafRef.current) return;
      const scrollLoop = () => {
        if (scrollSpeedRef.current !== 0 && scrollContainer) {
          scrollContainer.scrollTop += scrollSpeedRef.current;
          scrollRafRef.current = requestAnimationFrame(scrollLoop);
        } else stopScrolling();
      };
      scrollRafRef.current = requestAnimationFrame(scrollLoop);
    };

    const handleDragStart = (event: DragEvent) => {
      const selected = view.dom.querySelector('.ProseMirror-selectednode') as HTMLElement;
      if (!selected) return;

      dragSourceHeightRef.current = selected.offsetHeight;

      if (event.dataTransfer) {
        const dragImage = selected.cloneNode(true) as HTMLElement;
        dragImage.style.position = 'absolute';
        dragImage.style.top = '-1000px';
        dragImage.style.opacity = '0.4';
        document.body.appendChild(dragImage);
        event.dataTransfer.setDragImage(dragImage, 0, 0);
        setTimeout(() => { if (dragImage.parentNode) document.body.removeChild(dragImage); }, 0);
      }
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
      
      if (scrollContainer) {
        const rect = scrollContainer.getBoundingClientRect();
        const buffer = 60;
        const topDist = event.clientY - rect.top;
        const bottomDist = rect.bottom - event.clientY;
        if (topDist < buffer && topDist > 0) {
          scrollSpeedRef.current = -((buffer - topDist) / 4);
          startScrolling();
        } else if (bottomDist < buffer && bottomDist > 0) {
          scrollSpeedRef.current = (buffer - bottomDist) / 4;
          startScrolling();
        } else stopScrolling();
      }

      const now = Date.now();
      if (now - lastUpdateRef.current < 25) return;
      lastUpdateRef.current = now;

      try {
        const pos = view.posAtCoords({ left: event.clientX, top: event.clientY });
        const { state } = view;
        const { doc } = state;

        let insertPos = -1;

        if (!pos || pos.pos < 0) {
          const editorRect = view.dom.getBoundingClientRect();
          if (event.clientY > editorRect.bottom - 50) {
            insertPos = doc.content.size;
          } else return;
        } else {
          const $pos = doc.resolve(pos.pos);
          const startPos = $pos.before(1);
          const endPos = $pos.after(1);
          const coords = view.coordsAtPos(startPos);
          const nextCoords = view.coordsAtPos(endPos - 1);
          
          const middleY = (coords.top + nextCoords.bottom) / 2;
          insertPos = event.clientY > middleY ? endPos : startPos;
        }

        const { tr } = state;
        let existingPos = -1;
        doc.descendants((n, p) => {
          if (n.type.name === "dropPlaceholder") { existingPos = p; return false; }
        });

        if (existingPos === insertPos) return;
        if (existingPos !== -1) tr.delete(existingPos, existingPos + 1);

        const finalInsertPos = (existingPos !== -1 && existingPos < insertPos) ? insertPos - 1 : insertPos;

        tr.insert(
          Math.min(finalInsertPos, doc.content.size), 
          editor.schema.nodes.dropPlaceholder.create({ height: dragSourceHeightRef.current })
        );
        tr.setMeta("addToHistory", false);
        tr.setMeta("preventUpdate", true);
        view.dispatch(tr);
      } catch (err) {}
    };

    const cleanup = () => {
      stopScrolling();
      if (!editor || editor.isDestroyed || !editor.view) return;
      try {
        const { tr, doc } = editor.state;
        let found = false;
        doc.descendants((node, p) => {
          if (node.type.name === "dropPlaceholder") { tr.delete(p, p + node.nodeSize); found = true; return false; }
        });
        if (found) {
          tr.setMeta("addToHistory", false);
          editor.view.dispatch(tr);
        }
      } catch (e) {}
    };

    const dom = editor.view.dom;
    dom.addEventListener("dragstart", handleDragStart);
    dom.addEventListener("dragover", handleDragOver);
    dom.addEventListener("dragleave", cleanup);
    dom.addEventListener("drop", () => setTimeout(cleanup, 10));

    return () => {
      stopScrolling();
      dom.removeEventListener("dragstart", handleDragStart);
      dom.removeEventListener("dragover", handleDragOver);
      dom.removeEventListener("dragleave", cleanup);
    };
  }, [editor]);

  return null;
}

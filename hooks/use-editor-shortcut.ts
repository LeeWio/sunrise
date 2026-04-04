"use client";

import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { toggleEditor } from "../store/slices/editor-slice";

export function useEditorShortcut() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD + K (Mac) or CTRL + K (Windows)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        dispatch(toggleEditor());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);
}
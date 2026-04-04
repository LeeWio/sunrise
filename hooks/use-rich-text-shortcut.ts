"use client";

import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { toggleRichText } from "../store/slices/rich-text-slice";

export function useRichTextShortcut() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD + K (Mac) or CTRL + K (Windows)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        dispatch(toggleRichText());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);
}

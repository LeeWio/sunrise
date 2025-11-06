"use client";

import React, { useCallback, useRef, useEffect } from "react";
import { NodeViewWrapper, NodeViewProps, NodeViewContent } from "@tiptap/react";
import { Button } from "@heroui/react";

import { AccordionAttributes } from "../accordion";

import { PencilIcon, TrashIcon } from "@/components/icons";

// React component for rendering the accordion node view
export const AccordionView: React.FC<NodeViewProps<AccordionAttributes>> = ({
  node,
  updateAttributes,
  deleteNode,
  selected,
  getPos,
  editor,
}) => {
  // Extract node attributes
  const { title, expanded } = node.attrs;

  // Title editing state
  const [isEditingTitle, setIsEditingTitle] = React.useState(false);
  const [tempTitle, setTempTitle] = React.useState(title);

  // Ref for title input
  const titleInputRef = useRef<HTMLInputElement>(null);

  // Handle title editing
  const handleTitleEdit = useCallback(() => {
    setIsEditingTitle(true);
    setTempTitle(title);
  }, [title]);

  const handleTitleSave = useCallback(() => {
    if (tempTitle.trim()) {
      updateAttributes({ title: tempTitle.trim() });
    }
    setIsEditingTitle(false);
  }, [tempTitle, updateAttributes]);

  const handleTitleCancel = useCallback(() => {
    setTempTitle(title);
    setIsEditingTitle(false);
  }, [title]);

  // Toggle accordion expanded state
  const handleToggleExpanded = useCallback(() => {
    updateAttributes({ expanded: !expanded });
  }, [expanded, updateAttributes]);

  // Delete accordion node
  const handleDelete = useCallback(() => {
    deleteNode();
  }, [deleteNode]);

  // Select node
  const handleSelect = useCallback(() => {
    const pos = getPos();

    if (pos !== undefined) {
      editor.commands.setNodeSelection(pos);
    }
  }, [getPos, editor]);

  // Handle key events for title input
  const handleTitleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        handleTitleSave();
      } else if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        handleTitleCancel();
      }
    },
    [handleTitleSave, handleTitleCancel],
  );

  // Auto-focus title input when editing starts
  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  // Handle title input change
  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTempTitle(e.target.value);
    },
    [],
  );

  return (
    <NodeViewWrapper
      data-drag-handle
      className="accordion-node-wrapper"
      data-selected={selected}
    >
      <div
        className="accordion-node-container group relative my-4"
        onClick={handleSelect}
      >
        {/* Custom Accordion Component */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          {/* Accordion Header */}
          <div
            className={`
              flex items-center justify-between p-4 cursor-pointer bg-white dark:bg-gray-800
              hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors
              ${selected ? "ring-2 ring-offset-2 ring-blue-500" : ""}
            `}
            onClick={handleToggleExpanded}
          >
            <div className="flex items-center gap-3 flex-1">
              {/* Chevron indicator */}
              <div className="transition-transform duration-200">
                {expanded ? (
                  <svg
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 15l7-7 7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="m19 9-7 7 7m-7 7v10a2 2 0 0 0 2 2H6a2 2 0 0 0 2-2V5a2 2 0 0 1 2-2h7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                )}
              </div>

              {/* Title */}
              {isEditingTitle ? (
                <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                  <input
                    ref={titleInputRef}
                    className="w-full px-3 py-2 text-lg font-medium bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter title..."
                    type="text"
                    value={tempTitle}
                    onBlur={handleTitleSave}
                    onChange={handleTitleChange}
                    onKeyDown={handleTitleKeyDown}
                  />
                </div>
              ) : (
                <div
                  className="flex-1 text-lg font-medium text-gray-900 dark:text-white cursor-text"
                  onClick={handleTitleEdit}
                >
                  {title || "Click to edit title"}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Edit title button */}
              <Button
                isIconOnly
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                size="sm"
                variant="light"
                onPress={handleTitleEdit}
              >
                <PencilIcon className="h-4 w-4" />
              </Button>

              {/* Delete button */}
              <Button
                isIconOnly
                className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                color="danger"
                size="sm"
                variant="light"
                onPress={handleDelete}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Accordion Content with TipTap Editor */}
          {expanded && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/50">
              <div className="min-h-[60px]">
                {/* TipTap Editor Content */}
                <NodeViewContent className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300" />
              </div>
            </div>
          )}
        </div>

        {/* Drag handle for reordering */}
        <div className="absolute left-0 top-0 bottom-0 w-1 cursor-move opacity-0 group-hover:opacity-100 transition-opacity bg-gray-300 dark:bg-gray-600 rounded-l" />
      </div>
    </NodeViewWrapper>
  );
};

AccordionView.displayName = "AccordionView";

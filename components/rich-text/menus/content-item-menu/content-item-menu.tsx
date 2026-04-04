"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useTiptap } from "@tiptap/react";
import DragHandle from "@tiptap/extension-drag-handle-react";
import { Button, Dropdown, Header, Kbd, Label, Separator, SearchField } from "@heroui/react";
import { 
  Grip, 
  TrashBin, 
  Copy, 
  CopyPlus,
  Plus, 
  TextAlignLeft, 
  TextAlignCenter, 
  TextAlignRight,
  Heading1,
  Heading2,
  Heading3,
  Text as TextIcon,
  ListUl,
  ListOl,
  ArrowRotateLeft,
  CircleInfo,
  ArrowUp,
  ArrowDown
} from "@gravity-ui/icons";

import { useData } from "./hooks/use-data";
import { useContentItemActions } from "./hooks/use-content-item-actions";
import { useContentItemState } from "./hooks/use-content-item-state";

import { motion } from "motion/react";
const MotionButton = motion.create(Button);

/**
 * Advanced ContentItemMenu with precise separator logic and auto-focus search.
 */
export function ContentItemMenu() {
  const { editor } = useTiptap();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const { currentNode, currentNodePos, handleNodeChange } = useData();
  const actions = useContentItemActions(editor, currentNode, currentNodePos);
  const { nodeType, alignment, blockStats, isMatch } = useContentItemState(editor, currentNode, searchQuery);

  // Focus management and handle lock
  useEffect(() => {
    if (editor?.commands?.setMeta) {
      editor.commands.setMeta("lockDragHandle", menuOpen);
    }
    
    if (menuOpen) {
      // Use a micro-task to ensure Popover is fully rendered and accessible in DOM
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setSearchQuery("");
    }
  }, [editor, menuOpen]);

  const handleAction = useCallback(async (key: React.Key) => {
    switch (key) {
      case "reset": actions.resetTextFormatting(); break;
      case "copy": await actions.copyNodeToClipboard(); break;
      case "delete": actions.deleteNode(); break;
      case "duplicate": actions.duplicateNode(); break;
      case "add-before": actions.addBefore(); break;
      case "add-below": actions.addBelow(); break;
      case "left": case "center": case "right": actions.setTextAlign(key as string); break;
      case "paragraph": actions.toggleNodeType("paragraph"); break;
      case "h1": actions.toggleNodeType("heading", { level: 1 }); break;
      case "h2": actions.toggleNodeType("heading", { level: 2 }); break;
      case "h3": actions.toggleNodeType("heading", { level: 3 }); break;
      case "bulletList": actions.toggleNodeType("bulletList"); break;
      case "orderedList": actions.toggleNodeType("orderedList"); break;
    }
  }, [actions]);

  // Section visibility checks
  const isGeneralVisible = isMatch("Reset Formatting") || isMatch("Copy to Clipboard") || isMatch("Insert Block") || isMatch("Duplicate");
  const isTurnIntoVisible = isMatch("Text") || isMatch("Heading 1") || isMatch("Heading 2") || isMatch("Heading 3") || isMatch("Bullet List") || isMatch("Ordered List");
  const isAlignmentVisible = isMatch("Align Left") || isMatch("Align Center") || isMatch("Align Right");
  const isDangerVisible = isMatch("Delete");
  const isInfoVisible = !searchQuery;

  if (!editor) return null;

  return (
    <DragHandle
      editor={editor}
      pluginKey="contentItemMenu"
      nested={true}
      onNodeChange={handleNodeChange}
      className="flex items-center"
    >
      <Dropdown trigger="longPress" onOpenChange={setMenuOpen}>
        <MotionButton
          isIconOnly size="sm" variant="ghost"
          aria-label="Drag to move, long press for actions"
          className="text-default-400 hover:text-default-600 hover:bg-default-100 transition-all cursor-grab active:cursor-grabbing rounded-md"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 600, damping: 20 }}
        >
          <Grip className="size-4" />
        </MotionButton>
        
        <Dropdown.Popover placement="bottom start" className="min-w-[260px] max-h-[80vh] overflow-y-auto scrollbar-hide flex flex-col">
          <SearchField 
            aria-label="Search actions" variant="secondary" value={searchQuery}
            className="p-2 sticky" onChange={setSearchQuery}
          >
            <SearchField.Group className="h-8">
              <SearchField.SearchIcon className="size-3.5" />
              <SearchField.Input 
                ref={searchInputRef}
                placeholder="Search actions..." 
                className="text-xs" 
              />
              <SearchField.ClearButton className="size-3.5" />
            </SearchField.Group>
          </SearchField>

          <Dropdown.Menu onAction={handleAction} aria-label="Block actions" className="p-1">
            {/* General Section */}
            {isGeneralVisible && (
              <Dropdown.Section>
                <Header>General</Header>
                {isMatch("Reset Formatting") && (
                  <Dropdown.Item id="reset" textValue="Reset Formatting">
                    <div className="flex items-center gap-2"><ArrowRotateLeft className="size-4 text-default-500" /><Label>Reset Formatting</Label></div>
                  </Dropdown.Item>
                )}
                {isMatch("Copy to Clipboard") && (
                  <Dropdown.Item id="copy" textValue="Copy to Clipboard">
                    <div className="flex items-center w-full gap-2"><Copy className="size-4 text-default-500" /><Label>Copy to Clipboard</Label><Kbd className="ms-auto" slot="keyboard" variant="light"><Kbd.Abbr keyValue="command" /><Kbd.Content>C</Kbd.Content></Kbd></div>
                  </Dropdown.Item>
                )}
                {isMatch("Insert Block") && (
                  <Dropdown.SubmenuTrigger>
                    <Dropdown.Item id="insert-submenu" textValue="Insert Block">
                      <div className="flex items-center gap-2"><Plus className="size-4 text-default-500" /><Label>Insert Block</Label></div>
                      <Dropdown.SubmenuIndicator />
                    </Dropdown.Item>
                    <Dropdown.Popover>
                      <Dropdown.Menu onAction={handleAction}>
                        <Dropdown.Item id="add-before" textValue="Add Above"><div className="flex items-center gap-2"><ArrowUp className="size-4 text-default-500" /><Label>Add Above</Label></div></Dropdown.Item>
                        <Dropdown.Item id="add-below" textValue="Add Below"><div className="flex items-center gap-2"><ArrowDown className="size-4 text-default-500" /><Label>Add Below</Label></div></Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Popover>
                  </Dropdown.SubmenuTrigger>
                )}
                {isMatch("Duplicate") && (
                  <Dropdown.Item id="duplicate" textValue="Duplicate">
                    <div className="flex items-center w-full gap-2"><CopyPlus className="size-4 text-default-500" /><Label>Duplicate</Label><Kbd className="ms-auto" slot="keyboard" variant="light"><Kbd.Abbr keyValue="command" /><Kbd.Content>D</Kbd.Content></Kbd></div>
                  </Dropdown.Item>
                )}
              </Dropdown.Section>
            )}

            {isGeneralVisible && (isTurnIntoVisible || isAlignmentVisible || isDangerVisible) && <Separator />}

            {/* Turn Into Section */}
            {isTurnIntoVisible && (
              <Dropdown.Section title="Turn into" selectionMode="single" selectedKeys={nodeType}>
                <Header>Turn into</Header>
                {isMatch("Text") && <Dropdown.Item id="paragraph" textValue="Text"><Dropdown.ItemIndicator /><div className="flex items-center gap-2"><TextIcon className="size-4 text-default-500" /><Label>Text</Label></div></Dropdown.Item>}
                {isMatch("Heading 1") && <Dropdown.Item id="h1" textValue="Heading 1"><Dropdown.ItemIndicator /><div className="flex items-center gap-2"><Heading1 className="size-4 text-default-500" /><Label>Heading 1</Label></div></Dropdown.Item>}
                {isMatch("Heading 2") && <Dropdown.Item id="h2" textValue="Heading 2"><Dropdown.ItemIndicator /><div className="flex items-center gap-2"><Heading2 className="size-4 text-default-500" /><Label>Heading 2</Label></div></Dropdown.Item>}
                {isMatch("Heading 3") && <Dropdown.Item id="h3" textValue="Heading 3"><Dropdown.ItemIndicator /><div className="flex items-center gap-2"><Heading3 className="size-4 text-default-500" /><Label>Heading 3</Label></div></Dropdown.Item>}
                {isMatch("Bullet List") && <Dropdown.Item id="bulletList" textValue="Bullet List"><Dropdown.ItemIndicator /><div className="flex items-center gap-2"><ListUl className="size-4 text-default-500" /><Label>Bullet List</Label></div></Dropdown.Item>}
                {isMatch("Ordered List") && <Dropdown.Item id="orderedList" textValue="Ordered List"><Dropdown.ItemIndicator /><div className="flex items-center gap-2"><ListOl className="size-4 text-default-500" /><Label>Ordered List</Label></div></Dropdown.Item>}
              </Dropdown.Section>
            )}

            {isTurnIntoVisible && (isAlignmentVisible || isDangerVisible) && <Separator />}

            {/* Alignment Section */}
            {isAlignmentVisible && (
              <Dropdown.Section title="Alignment" selectionMode="single" selectedKeys={alignment}>
                <Header>Alignment</Header>
                {isMatch("Align Left") && <Dropdown.Item id="left" textValue="Align Left"><Dropdown.ItemIndicator type="dot" /><div className="flex items-center gap-2"><TextAlignLeft className="size-4 text-default-500" /><Label>Align Left</Label></div></Dropdown.Item>}
                {isMatch("Align Center") && <Dropdown.Item id="center" textValue="Align Center"><Dropdown.ItemIndicator type="dot" /><div className="flex items-center gap-2"><TextAlignCenter className="size-4 text-default-500" /><Label>Align Center</Label></div></Dropdown.Item>}
                {isMatch("Align Right") && <Dropdown.Item id="right" textValue="Align Right"><Dropdown.ItemIndicator type="dot" /><div className="flex items-center gap-2"><TextAlignRight className="size-4 text-default-500" /><Label>Align Right</Label></div></Dropdown.Item>}
              </Dropdown.Section>
            )}

            {/* Info Section */}
            {isInfoVisible && <><Separator /><Dropdown.Section><Header>Block Info</Header><Dropdown.Item id="stats" textValue="Block stats" isDisabled className="opacity-100 cursor-default"><div className="flex flex-col gap-1"><div className="flex items-center gap-2 text-default-400"><CircleInfo className="size-3.5" /><span className="text-[10px] uppercase tracking-wider font-bold">Metadata</span></div><div className="flex gap-3 text-xs text-default-500 ml-5"><span>{blockStats.characters} chars</span><span>{blockStats.words} words</span></div></div></Dropdown.Item></Dropdown.Section></>}

            {isDangerVisible && (isGeneralVisible || isTurnIntoVisible || isAlignmentVisible || isInfoVisible) && <Separator />}

            {/* Danger Zone */}
            {isDangerVisible && (
              <Dropdown.Section>
                <Dropdown.Item id="delete" textValue="Delete" variant="danger" className="text-danger">
                  <div className="flex items-center w-full gap-2">
                    <TrashBin className="size-4" />
                    <Label>Delete</Label>
                    <Kbd className="ms-auto" slot="keyboard" variant="light">
                      <Kbd.Content>Del</Kbd.Content>
                    </Kbd>
                  </div>
                </Dropdown.Item>
              </Dropdown.Section>
            )}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </DragHandle>
  );
}

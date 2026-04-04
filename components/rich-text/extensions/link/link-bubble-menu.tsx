"use client";

import React from "react";
import { useTiptap, useTiptapState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { Button, Separator, Link as HeroLink } from "@heroui/react";
import { PencilToSquare, LinkSlash } from "@gravity-ui/icons";
import { LinkEditPopover } from "./link-edit-popover";

export function LinkBubbleMenu() {
  const { editor } = useTiptap();
  
  const linkAttributes = useTiptapState((state) => state.editor.getAttributes("link"));

  if (!editor) return null;

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor }) => editor.isActive("link")}
      tippyOptions={{ duration: 100, placement: "bottom-start" }}
    >
      <div className="flex items-center gap-1 rounded-xl border border-border/50 bg-background p-1 shadow-lg">
        <div className="flex items-center px-2 max-w-[200px]">
          <HeroLink 
            href={linkAttributes.href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs truncate"
          >
            {linkAttributes.href}
          </HeroLink>
        </div>
        
        <Separator orientation="vertical" className="h-4" />
        
        <LinkEditPopover>
          <Button isIconOnly size="sm" variant="ghost" aria-label="Edit link" className="border-none">
            <PencilToSquare className="size-3.5" />
          </Button>
        </LinkEditPopover>

        <Button 
          isIconOnly 
          size="sm" 
          variant="ghost" 
          color="danger" 
          aria-label="Remove link"
          className="border-none"
          onPress={() => editor.chain().focus().unsetLink().run()}
        >
          <LinkSlash className="size-3.5" />
        </Button>
      </div>
    </BubbleMenu>
  );
}

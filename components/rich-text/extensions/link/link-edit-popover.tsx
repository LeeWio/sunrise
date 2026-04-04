"use client";

import React, { useState } from "react";
import { Popover, Button, Input, Form, TextField, Label } from "@heroui/react";
import { LinkSlash } from "@gravity-ui/icons";
import { useTiptap } from "@tiptap/react";

interface LinkEditPopoverProps {
  children: React.ReactNode;
}

export function LinkEditPopover({ children }: LinkEditPopoverProps) {
  const { editor } = useTiptap();
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && editor) {
      const currentUrl = editor.getAttributes("link").href || "";
      setUrl(currentUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    } else {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    setIsOpen(false);
  };

  const handleRemove = () => {
    editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    setIsOpen(false);
  };

  return (
    <Popover isOpen={isOpen} onOpenChange={handleOpenChange} placement="bottom">
      <Popover.Trigger>
        {children}
      </Popover.Trigger>
      <Popover.Content className="w-[320px]">
        <Popover.Dialog aria-label="Edit Link">
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
            <TextField value={url} onChange={setUrl} autoFocus>
              <Label className="text-sm font-medium">URL</Label>
              <Input
                placeholder="https://example.com"
                variant="primary"
              />
            </TextField>
            <div className="flex justify-between gap-2">
              <Button 
                size="sm" 
                variant="ghost" 
                color="danger" 
                onPress={handleRemove}
                className="border-none"
              >
                <LinkSlash className="size-4 mr-2" />
                Remove
              </Button>
              <Button 
                size="sm" 
                color="primary" 
                type="submit"
              >
                Apply
              </Button>
            </div>
          </Form>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}

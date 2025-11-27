"use client";

import { RichText } from "@/components/rich-text/rich-text";
import { Button, useOverlayState } from "@heroui/react";

export default function Home() {
  const state = useOverlayState();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Button size="sm" variant="secondary" onPress={state.open}>
        Open Modal
      </Button>
      <RichText isOpen={state.isOpen} setIsOpen={state.setOpen} />
    </div>
  );
}

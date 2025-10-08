'use client'

import { Button, useDisclosure } from '@heroui/react'

import { BlockEditor } from '@/components/block-editor/block-editor'

export default function BlogPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div>
      <Button onPress={onOpen}>Open Modal</Button>
      <BlockEditor
        isOpen={isOpen}
        readOnly={false}
        onOpenChange={onOpenChange}
      />
    </div>
  )
}

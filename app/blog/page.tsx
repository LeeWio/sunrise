'use client'

import { Button, useDisclosure } from '@heroui/react'

import { BlockEditor } from '@/components/block-editor/block-editor'
import { Icon } from '@iconify/react'

export default function BlogPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div>
      <Button onPress={onOpen} endContent={
        <Icon icon="lucide:plus" fontSize={20} />
      }>add article</Button>
      <BlockEditor
        isOpen={isOpen}
        readOnly={false}
        onOpenChange={onOpenChange}
      />
    </div>
  )
}

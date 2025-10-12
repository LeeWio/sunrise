'use client'

import { Button, useDisclosure } from '@heroui/react'
import { Icon } from '@iconify/react'

import { BlockEditor } from '@/components/block-editor/block-editor'

export default function BlogPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div>
      <Button
        endContent={<Icon fontSize={20} icon="lucide:plus" />}
        onPress={onOpen}
      >
        add article
      </Button>
      <BlockEditor
        isModalOpen={isOpen}
        readOnly={false}
        onModalOpenChange={onOpenChange}
      />
    </div>
  )
}

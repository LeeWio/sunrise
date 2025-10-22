'use client'

import { Button, useDisclosure } from '@heroui/react'

import { PlusIcon } from '@/components/icons'
import { CreateTag } from '@/components/tag/create-tag'

export default function AboutPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button endContent={<PlusIcon size={18} />} onPress={onOpen}>
        create tag
      </Button>

      <CreateTag isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  )
}

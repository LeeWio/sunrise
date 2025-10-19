'use client'

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
  ModalFooter,
  Input,
} from '@heroui/react'
import { ChangeEvent, useState } from 'react'

import { PlusIcon } from '@/components/icons'
import { CreateTagDto, useCreateTagMutation } from '@/feature/api/tag-api'
import { ColorPicker } from '@/components/color-picker'
import { IconPopover } from '@/components/icon-picker'

export default function AboutPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [tag, setTag] = useState<CreateTagDto>({
    name: '',
    slug: '',
    description: '',
    icon: 'github',
    color: '',
  })

  const [createTag, { isLoading }] = useCreateTagMutation()

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) =>
    setTag(pre => ({
      ...pre,
      [name]: value,
    }))

  return (
    <>
      <Button endContent={<PlusIcon size={18} />} onPress={onOpen}>
        create tag
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Tag
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-2">
                  <Input
                    isClearable
                    isRequired
                    maxLength={20}
                    name="name"
                    placeholder="Type a tag name"
                    size="sm"
                    type="text"
                    value={tag.name}
                    onChange={handleChange}
                    onClear={() =>
                      setTag(pre => ({
                        ...pre,
                        name: '',
                      }))
                    }
                  />
                  <ColorPicker
                    hexColor={tag.color}
                    onChange={(newColor: string) => {
                      setTag(prev => ({
                        ...prev,
                        color: newColor,
                      }))
                    }}
                    onClear={() => {
                      setTag(prev => ({
                        ...prev,
                        color: '',
                      }))
                    }}
                  >
                    <Button
                      isIconOnly
                      size="sm"
                      style={{ backgroundColor: tag.color || '#e5e7eb' }}
                      variant="light"
                    />
                  </ColorPicker>

                  <IconPopover
                    selectedIcon={tag.icon}
                    setSelectedIcon={name =>
                      setTag(prev => ({ ...prev, icon: name }))
                    }
                  >
                    <Button isIconOnly size="sm" variant="light" />
                  </IconPopover>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

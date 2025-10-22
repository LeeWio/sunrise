import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@heroui/react'
import { ChangeEvent, useState } from 'react'

import { ColorPicker } from '../color-picker'
import { IconPopover } from '../icon-picker'

import { CreateTagDto, useCreateTagMutation } from '@/feature/api/tag-api'

export const CreateTag = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean
  onOpenChange: () => void
}) => {
  const [createTag, { isLoading, data }] = useCreateTagMutation()

  const [tag, setTag] = useState<CreateTagDto>({
    name: '',
    slug: '',
    description: '',
    icon: 'github',
    color: '',
  })

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) =>
    setTag(pre => ({
      ...pre,
      [name]: value,
    }))

  const handleCreateTag = async (onClose: () => void) => {
    await createTag(tag).unwrap()
    onClose()
  }

  return (
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
                  <Button isIconOnly variant="light" />
                </IconPopover>
              </div>
              <Input
                isClearable
                isRequired
                name="slug"
                placeholder="Type a tag slug"
                value={tag.slug}
                onChange={handleChange}
                onClear={() =>
                  setTag(pre => ({
                    ...pre,
                    slug: '',
                  }))
                }
              />
              <Textarea
                isClearable
                required
                label="Description"
                name="description"
                placeholder="Enter your description"
                value={tag.description}
                onChange={handleChange}
                onClear={() =>
                  setTag(pre => ({
                    ...pre,
                    description: '',
                  }))
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                isLoading={isLoading}
                onPress={() => handleCreateTag(onClose)}
              >
                create
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

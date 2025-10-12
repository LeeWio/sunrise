import { Plate, PlateContent, PlateView } from 'platejs/react'
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  cn,
} from '@heroui/react'
import { useRef, useState } from 'react'
import { Icon } from '@iconify/react'

import { EditorFooter } from './block-footer'

import { useBlockEditor } from '@/hooks/use-block-editor'
import { useAppDispatch } from '@/hooks/store'
import { updateDraft } from '@/feature/slice/article-slice'

/**
 * Props for BlockEditor component.
 */
interface BlockEditorProps {
  /** Whether the editor is in read-only (preview) mode. */
  readOnly?: boolean
  isModalOpen: boolean
  onModalOpenChange: () => void
}

export const BlockEditor = ({
  readOnly,
  isModalOpen,
  onModalOpenChange,
}: BlockEditorProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const menuContainerRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const dispatch = useAppDispatch()

  const { editor } = useBlockEditor({
    readOnly,
    autoSelect: readOnly ? false : 'start',
  })

  return (
    <>
      <Modal
        ref={menuContainerRef}
        hideCloseButton
        aria-label="block-editor label"
        backdrop="blur"
        classNames={{
          base: 'min-h-5/6',
          body: 'scrollbar-hide py-0 min-h-40 ',
          footer: cn(
            'z-20 bg-content1 w-full rounded-lg transition-height absolute bottom-0 h-14 overflow-visible px-6 duration-300 ease-in-out',
            {
              'h-full': isOpen,
            }
          ),
        }}
        isOpen={isModalOpen}
        radius="sm"
        scrollBehavior="inside"
        size="5xl"
        onOpenChange={onModalOpenChange}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="relative w-full z-40">
                <Button
                  className="absolute top-8 right-4 z-10"
                  isIconOnly={isOpen}
                  radius="full"
                  size="sm"
                  onPress={() => setIsOpen(prev => !prev)}
                >
                  {isOpen ? <Icon icon="ci:close-sm" width={24} /> : 'Apply'}
                </Button>
                {/* <Button onPress={() => console.log(editor.children)}> */}
                {/*   print content */}
                {/* </Button> */}
                {/**/}
                {/**/}
                {/* <Button onPress={() => insertBlock(editor, KEYS.equation)}> */}
                {/*   add equation */}
                {/* </Button> */}
                {/**/}
                {/* <Button */}
                {/*   onPress={() => */}
                {/*     insertInlineEquation(editor, KEYS.inlineEquation) */}
                {/*   } */}
                {/* > */}
                {/*   add inline equation */}
                {/* </Button> */}
                {/* <Button onPress={() => insertCallout(editor, { select: true })}> */}
                {/*   Add Callout */}
                {/* </Button> */}
              </ModalHeader>
              <ModalBody>
                <Plate
                  editor={editor}
                  onChange={({ value }) => {
                    // 防抖
                    dispatch(updateDraft({ content: JSON.stringify(value) }))
                  }}
                >
                  {/* You would typically add a toolbar here to toggle marks */}
                  {readOnly ? (
                    <PlateView editor={editor} />
                  ) : (
                    <PlateContent className="focus:outline-none min-h-16" />
                  )}
                </Plate>
              </ModalBody>

              <ModalFooter>
                <EditorFooter characters={20} isOpen={isOpen} words={20} />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

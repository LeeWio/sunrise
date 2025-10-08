import { Plate, PlateContent, PlateView } from 'platejs/react'
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from '@heroui/react'
import { insertInlineEquation } from '@platejs/math'
import { insertCallout } from '@platejs/callout'
import { KEYS } from 'platejs'
import { useRef } from 'react'

import { useBlockEditor } from '@/hooks/use-block-editor'
import { insertBlock } from '@/extensions/plugins/transforms'

/**
 * Props for BlockEditor component.
 */
interface BlockEditorProps {
  /** Whether the editor is in read-only (preview) mode. */
  readOnly?: boolean
  isOpen: boolean
  onOpenChange: () => void
}

export const BlockEditor = ({
  readOnly,
  isOpen,
  onOpenChange,
}: BlockEditorProps) => {
  const menuContainerRef = useRef<HTMLDivElement>(null)

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
        isOpen={isOpen}
        radius="sm"
        scrollBehavior="inside"
        size="5xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-row gap-1">
                <Button onPress={() => console.log(editor.children)}>
                  print content
                </Button>

                <Button onPress={() => insertBlock(editor, KEYS.equation)}>
                  add equation
                </Button>

                <Button
                  onPress={() =>
                    insertInlineEquation(editor, KEYS.inlineEquation)
                  }
                >
                  add inline equation
                </Button>
                <Button onPress={() => insertCallout(editor, { select: true })}>
                  Add Callout
                </Button>
              </ModalHeader>
              <ModalBody>
                <Plate editor={editor}>
                  {/* You would typically add a toolbar here to toggle marks */}

                  {readOnly ? (
                    <PlateView editor={editor} />
                  ) : (
                    <PlateContent className="focus:outline-none" />
                  )}
                </Plate>
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

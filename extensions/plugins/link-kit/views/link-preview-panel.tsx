import { Button } from '@heroui/button'
import { Link } from '@heroui/link'
import { getLinkAttributes } from '@platejs/link'
import { KEYS, TLinkElement } from 'platejs'
import { useEditorRef, useEditorSelection } from 'platejs/react'
import { useMemo } from 'react'
import { Divider } from '@heroui/divider'

import { MemoButton } from './memo-button'

type LinkPreviewPanelProps = {
  onClear: () => void
  onEdit: () => void
}

export const LinkPreviewPanel = ({
  onClear,
  onEdit,
}: LinkPreviewPanelProps) => {
  const editor = useEditorRef()
  const selection = useEditorSelection()

  const attributes = useMemo(() => {
    const entry = editor.api.node<TLinkElement>({
      match: { type: editor.getType(KEYS.link) },
    })

    if (!entry) return

    const [element] = entry

    return getLinkAttributes(editor, element)
  }, [editor, selection])

  return (
    <div
      aria-label="Link preview panel"
      className="z-10 px-2.5 py-1 w-full items-center justify-center subpixel-antialiased outline-solid outline-transparent box-border text-small bg-content1 rounded-medium shadow-small flex flex-row gap-0.5"
    >
      <Button
        {...attributes}
        as={Link}
        color="default"
        size="sm"
        underline="hover"
        variant="light"
      >
        {attributes?.href}
      </Button>

      <Divider className="h-5 mx-1" orientation="vertical" />

      <MemoButton
        icon="lucide:pencil"
        tooltip="To Edit"
        value="Pencil"
        onPress={onEdit}
      />

      <MemoButton
        icon="lucide:trash-2"
        tooltip="Trash"
        value="Trash"
        onPress={onClear}
      />
    </div>
  )
}

import { Button, Chip, Link, Separator } from '@heroui/react'
import { getLinkAttributes } from '@platejs/link'
import { KEYS, TLinkElement } from 'platejs'
import { useEditorRef, useEditorSelection } from 'platejs/react'
import { useMemo } from 'react'

import { MemoButton } from './memo-button'

type LinkPreviewPanelProps = {
  onClear: () => void
  onEdit: () => void
}

export const LinkPreviewPanel = ({ onClear, onEdit }: LinkPreviewPanelProps) => {
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
    <Chip aria-label="Link preview panel" variant="primary">
      <Button size="sm" variant="ghost">
        <Link href={attributes?.href} target="_blank">
          {attributes?.href}
        </Link>
      </Button>

      <MemoButton icon="lucide:pencil" tooltip="Pencil" value="Pencil" onPress={onEdit} />

      <Separator className="mx-1 h-5" orientation="vertical" />

      <MemoButton icon="lucide:trash-2" tooltip="Trash" value="Trash" onPress={onClear} />
    </Chip>
  )
}

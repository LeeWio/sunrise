import { useEditorReadOnly } from 'platejs/react'
import { KEYS } from 'platejs'
import { Divider } from '@heroui/react'

import { LinkToolbarButton } from './link-toolbar-button'
import { MarkToolbarButton } from './mark-toolbar-button'
import { MoreToolbarButton } from './more-toolbar-button'
import { FontColorToolbarButton } from './font-color-toolbar-button'

export const FloatingToolbarButtons = () => {
  const readOnly = useEditorReadOnly()

  return (
    <>
      {!readOnly && (
        <div
          aria-label="Link preview panel"
          className="z-10 px-2.5 py-1 w-full items-center justify-center subpixel-antialiased outline-solid outline-transparent box-border text-small bg-content1 rounded-medium shadow-small flex flex-row gap-0.5"
        >
          <Divider className="mx-1 h-5" orientation="vertical" />

          <MarkToolbarButton
            icon="lucide:bold"
            nodeType={KEYS.bold}
            tooltip="⌘+B"
          />

          <MarkToolbarButton
            icon="lucide:italic"
            nodeType={KEYS.italic}
            tooltip="⌘+I"
          />

          <MarkToolbarButton
            icon="lucide:underline"
            nodeType={KEYS.underline}
            tooltip="⌘+U"
          />

          <MarkToolbarButton
            icon="lucide:strikethrough"
            nodeType={KEYS.strikethrough}
            tooltip="⌘+⇧+M"
          />

          <MarkToolbarButton
            icon="lucide:code"
            nodeType={KEYS.code}
            tooltip="⌘+E"
          />

          <Divider className="mx-1 h-5" orientation="vertical" />

          <LinkToolbarButton />

          <FontColorToolbarButton icon="lucide:palette" nodeType={KEYS.color} />

          <MoreToolbarButton />

        </div>

      )}
    </>
  )
}

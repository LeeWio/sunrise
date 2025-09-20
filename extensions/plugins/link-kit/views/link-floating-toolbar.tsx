import {
  LinkFloatingToolbarState,
  useFloatingLinkEdit,
  useFloatingLinkInsertState,
} from '@platejs/link/react'
import { useFormInputProps, usePluginOption } from 'platejs/react'
import { KEYS } from 'platejs'
import { useMemo } from 'react'
import { flip, offset } from '@platejs/floating'
import { type UseVirtualFloatingOptions } from '@platejs/floating'
import { useFloatingLinkEditState, useFloatingLinkInsert } from '@platejs/link/react'

import { LinkEditorPanel } from './link-editor-panel'
import { LinkPreviewPanel } from './link-preview-panel'

export const LinkFloatingToolbar = ({ state }: { state?: LinkFloatingToolbarState }) => {
  const activeCommandId = usePluginOption({ key: KEYS.comment }, 'activeId')
  const activeSuggestionId = usePluginOption({ key: KEYS.suggestion }, 'activeId')

  const floatingOptions: UseVirtualFloatingOptions = useMemo(() => {
    return {
      middleware: [
        offset(8),
        flip({
          fallbackPlacements: ['bottom-end', 'top-start', 'top-end'],
          padding: 12,
        }),
      ],

      placement: activeSuggestionId || activeCommandId ? 'top-start' : 'bottom-start',
    }
  }, [activeCommandId, activeSuggestionId])

  const insertState = useFloatingLinkInsertState({
    ...state,
    floatingOptions: {
      ...floatingOptions,
      ...state?.floatingOptions,
    },
  })

  const {
    hidden,
    props: insertProps,
    ref: insertRef,
    textInputProps,
  } = useFloatingLinkInsert(insertState)

  const editState = useFloatingLinkEditState({
    ...state,
    floatingOptions: {
      ...floatingOptions,
      ...state?.floatingOptions,
    },
  })

  const {
    editButtonProps,
    props: editProps,
    ref: editRef,
    unlinkButtonProps,
  } = useFloatingLinkEdit(editState)

  const inputProps = useFormInputProps({
    preventDefaultOnEnterKeydown: true,
  })

  if (hidden) return null

  const input = <LinkEditorPanel {...textInputProps} />

  const editContent = editState.isEditing ? (
    input
  ) : (
    <LinkPreviewPanel onClear={unlinkButtonProps.onClick} onEdit={editButtonProps.onClick} />
  )

  return (
    <>
      <div ref={insertRef} {...insertProps}>
        {input}
      </div>
      <div ref={editRef} {...editProps}>
        {editContent}
      </div>
    </>
  )
}

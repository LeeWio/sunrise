import type { Value } from 'platejs'

import { usePlateEditor } from 'platejs/react'
import { useMemo } from 'react'

import { initialValue } from './value'
import { useDraft } from './use-draft'

import { ExtensionKit } from '@/extensions/plugins/Extension-kit'

export interface UseBlockEditorOptions {
  /**
   * Editor read-only initial state. For dynamic read-only control, use the
   * `Plate.readOnly` prop instead.
   *
   * @default false
   */
  readOnly?: boolean

  /** Initial value for the editor */
  value?: Value

  /**
   * Select the editor after initialization.
   *
   * @default false
   *
   * - `true` | 'end': Select the end of the editor
   * - `false`: Do not select anything
   * - `'start'`: Select the start of the editor
   */
  autoSelect?: boolean | 'end' | 'start'

  /**
   * Specifies the maximum number of characters allowed in the editor. When the
   * limit is reached, further input will be prevented.
   */
  maxLength?: number
}

export const useBlockEditor = ({
  readOnly = false,
  value = initialValue,
  autoSelect = 'start',
  maxLength = 10000,
}: UseBlockEditorOptions) => {
  const draft = useDraft()

  const plugins = useMemo(() => ExtensionKit, [])

  const editorValue = useMemo(() => {
    if (readOnly) {
      return value
    }

    if (draft.content && draft.content.length > 0) {
      return JSON.parse(draft.content)
    }

    return initialValue
  }, [readOnly, value, draft])

  const editor = usePlateEditor({
    value: editorValue,
    plugins,
    readOnly,
    maxLength,
    autoSelect,
    options() { },
    onReady(ctx) { },
  })

  return { editor }
}

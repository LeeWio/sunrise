import { usePlateEditor } from 'platejs/react'
import { useEffect } from 'react'

import { initialValue } from './value'

import { Extensionkit } from '@/extensions/plugins/Extension-kit'

export const useBlockEditor = () => {
  const editor = usePlateEditor({
    value: initialValue,

    /**
     * Array of plugins to be loaded into the editor. Plugins extend the editor's
     * functionality and define custom behavior.
     */
    plugins: Extensionkit,
    /**
     * Editor read-only initial state. For dynamic read-only control, use the
     * `Plate.readOnly` prop instead.
     *
     * @default false
     */
    readOnly: false,

    /**
     * Specifies the maximum number of characters allowed in the editor. When the
     * limit is reached, further input will be prevented.
     */
    maxLength: 10000,

    /**
     * Select the editor after initialization.
     *
     * @default false
     *
     * - `true` | 'end': Select the end of the editor
     * - `false`: Do not select anything
     * - `'start'`: Select the start of the editor
     */
    autoSelect: 'start',
  })

  useEffect(() => {
    // 当 editor 的 value 更新时打印它
    console.log(editor.value)
  }, [editor.value]) // 当 editor.value 改变时，重新打印

  return { editor }
}

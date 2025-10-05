import {
  PlateEditor,
  useEditorSelector,
  useFocusedLast,
  useReadOnly,
  useSelected,
} from 'platejs/react'
import { Tooltip } from '@heroui/tooltip'
import { Snippet } from '@heroui/snippet'
import { addToast } from '@heroui/toast'
import { NodeApi } from 'platejs'
import { Select, SelectItem } from '@heroui/select'
import React, { useMemo, useState } from 'react'

import { CodeBlockElement } from '../type/CodeBlockElement'
import { languages } from '../type/languages'

interface CodeBlockFloatingToolbarProps {
  editor: PlateEditor
  element: CodeBlockElement
  children: React.ReactNode
}

const FloatingContent = ({
  element,
  editor,
}: {
  element: CodeBlockElement
  editor: PlateEditor
}) => {
  const readOnly = useReadOnly()
  const value = element.lang || 'plaintext'

  const [searchValue, setSearchValue] = useState('')

  const items = useMemo(
    () =>
      languages.filter(
        language =>
          !searchValue ||
          language.label.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [searchValue]
  )

  const getFirstValue = (value: Set<string>) => {
    return value.values().next().value ?? undefined
  }

  if (readOnly) return null

  return (
    <div
      aria-label="CodeBlock floating toolbar"
      className="flex flex-row gap-2 p-2 min-w-2xl"
    >
      <Select
        aria-label="Color"
        className="min-w-32 max-w-40"
        placeholder="Select color"
        selectedKeys={new Set([element.color ?? 'default'])}
        onSelectionChange={keys => {
          const value = getFirstValue(keys as Set<string>)

          if (value) {
            editor.tf.setNodes<CodeBlockElement>(
              { color: value },
              { at: element }
            )
          }
        }}
      >
        <SelectItem key="default">default</SelectItem>
        <SelectItem key="primary">primary</SelectItem>
        <SelectItem key="secondary">secondary</SelectItem>
        <SelectItem key="success">success</SelectItem>
        <SelectItem key="warning">warning</SelectItem>
        <SelectItem key="danger">danger</SelectItem>
      </Select>

      <Select
        aria-label="Size"
        className="min-w-20 max-w-28"
        placeholder="Select size"
        selectedKeys={new Set([element.size ?? 'md'])}
        onSelectionChange={keys => {
          const value = getFirstValue(keys as Set<string>)

          if (value) {
            editor.tf.setNodes<CodeBlockElement>(
              { size: value },
              { at: element }
            )
          }
        }}
      >
        <SelectItem key="sm">sm</SelectItem>
        <SelectItem key="md">md</SelectItem>
        <SelectItem key="lg">lg</SelectItem>
      </Select>

      {/* Select for Variant */}
      <Select
        aria-label="Variant"
        className="min-w-32 max-w-40"
        placeholder="Select variant"
        selectedKeys={new Set([element.variant ?? 'bordered'])}
        onSelectionChange={keys => {
          const value = getFirstValue(keys as Set<string>)

          if (value) {
            editor.tf.setNodes<CodeBlockElement>(
              { variant: value },
              { at: element }
            )
          }
        }}
      >
        <SelectItem key="bordered">bordered</SelectItem>
        <SelectItem key="flat">flat</SelectItem>
        <SelectItem key="solid">solid</SelectItem>
        <SelectItem key="shadow">shadow</SelectItem>
      </Select>

      <Select
        aria-label="Language"
        className="min-w-40 max-w-52"
        defaultSelectedKeys={[
          languages.find(language => language.value === value)?.label ??
            'Plain Text',
        ]}
        items={items}
      >
        {language => (
          <SelectItem
            key={language.label}
            onPress={() => {
              editor.tf.setNodes<CodeBlockElement>(
                { lang: language.value },
                { at: element }
              )
            }}
          >
            {language.label}
          </SelectItem>
        )}
      </Select>
    </div>
  )
}

export const CodeBlockFloatingToolbar = ({
  editor,
  element,
  children,
}: CodeBlockFloatingToolbarProps) => {
  const readOnly = useReadOnly()
  const selected = useSelected()
  const isCollapsed = useEditorSelector(editor => editor.api.isCollapsed(), [])
  const isFocusedLast = useFocusedLast()

  const open = isFocusedLast && !readOnly && selected && isCollapsed

  return (
    <Tooltip
      content={<FloatingContent editor={editor} element={element} />}
      isOpen={open}
      offset={8}
      placement="bottom"
    >
      <Snippet
        fullWidth
        hideSymbol
        classNames={{
          pre: 'overflow-x-auto whitespace-pre leading-[normal] [tab-size:2] print:break-inside-avoid',
        }}
        color={element.color}
        size={element.size}
        variant={element.variant}
        onCopy={() => {
          void navigator.clipboard.writeText(NodeApi.string(element))

          addToast({
            title: 'Copied',
            description: 'The content has been copied to your clipboard',
            color: 'success',
            variant: 'solid',
            radius: 'md',
            timeout: 2000,
          })
        }}
      >
        {children}
      </Snippet>
    </Tooltip>
  )
}

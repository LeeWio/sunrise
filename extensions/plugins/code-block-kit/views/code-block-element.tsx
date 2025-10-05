import { PlateElement, PlateElementProps } from 'platejs/react'

import { CodeBlockElement as TCodeBlockElement } from '../type/CodeBlockElement'

import { CodeBlockFloatingToolbar } from './code-block-floating-toolbar'

export const CodeBlockElement = (
  props: PlateElementProps<TCodeBlockElement>
) => {
  const { editor, element, children } = props

  return (
    <PlateElement
      className="py-1 **:[.hljs-addition]:bg-[#f0fff4] **:[.hljs-addition]:text-[#22863a] dark:**:[.hljs-addition]:bg-[#3c5743] dark:**:[.hljs-addition]:text-[#ceead5] **:[.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable]:text-[#005cc5] dark:**:[.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable]:text-[#6596cf] **:[.hljs-built\\\\_in,.hljs-symbol]:text-[#e36209] dark:**:[.hljs-built\\\\_in,.hljs-symbol]:text-[#c3854e] **:[.hljs-bullet]:text-[#735c0f] **:[.hljs-comment,.hljs-code,.hljs-formula]:text-[#6a737d] dark:**:[.hljs-comment,.hljs-code,.hljs-formula]:text-[#6a737d] **:[.hljs-deletion]:bg-[#ffeef0] **:[.hljs-deletion]:text-[#b31d28] dark:**:[.hljs-deletion]:bg-[#473235] dark:**:[.hljs-deletion]:text-[#e7c7cb] **:[.hljs-emphasis]:italic **:[.hljs-keyword,.hljs-doctag,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language\\\\_]:text-[#d73a49] dark:**:[.hljs-keyword,.hljs-doctag,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language\\\\_]:text-[#ee6960] **:[.hljs-name,.hljs-quote,.hljs-selector-tag,.hljs-selector-pseudo]:text-[#22863a] dark:**:[.hljs-name,.hljs-quote,.hljs-selector-tag,.hljs-selector-pseudo]:text-[#36a84f] **:[.hljs-regexp,.hljs-string,.hljs-meta_.hljs-string]:text-[#032f62] dark:**:[.hljs-regexp,.hljs-string,.hljs-meta_.hljs-string]:text-[#3593ff] **:[.hljs-section]:font-bold **:[.hljs-section]:text-[#005cc5] dark:**:[.hljs-section]:text-[#61a5f2] **:[.hljs-strong]:font-bold **:[.hljs-title,.hljs-title.class\\\\_,.hljs-title.class\\\\_.inherited\\\\_\\\\_,.hljs-title.function\\\\_]:text-[#6f42c1] dark:**:[.hljs-title,.hljs-title.class\\\\_,.hljs-title.class\\\\_.inherited\\\\_\\\\_,.hljs-title.function\\\\_]:text-[#a77bfa]"
      {...props}
    >
      <CodeBlockFloatingToolbar editor={editor} element={element}>
        {children}
      </CodeBlockFloatingToolbar>
    </PlateElement>
  )
}

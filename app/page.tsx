'use client'

import { Plate } from 'platejs/react'

import { useBlockEditor } from '@/hooks/use-block-editor'
import { BlockEditor, EditorContainer } from '@/components/block-editor/block-editor'

export default function Home() {
  const { editor } = useBlockEditor()

  if (!editor) return null

  return (
    <Plate editor={editor}>
      <EditorContainer>
        <BlockEditor variant="demo" />
      </EditorContainer>
    </Plate>
  )
}

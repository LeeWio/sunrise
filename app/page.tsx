'use client'

import { Plate } from 'platejs/react'
import { Button } from '@heroui/react'
import { insertColumnGroup } from '@platejs/layout'

import { useBlockEditor } from '@/hooks/use-block-editor'
import { BlockEditor, EditorContainer } from '@/components/block-editor/block-editor'

export default function Home() {
  const { editor } = useBlockEditor()

  if (!editor) return null

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Button onPress={() => insertColumnGroup(editor, { columns: 3, select: true })}>
        Add Column
      </Button>
      <Plate editor={editor}>
        <EditorContainer>
          <BlockEditor variant="demo" />
        </EditorContainer>
      </Plate>
    </section>
  )
}

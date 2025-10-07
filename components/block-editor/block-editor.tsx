'use client'

import { Plate, PlateContent } from 'platejs/react'
import { Button } from '@heroui/button'
import { KEYS } from 'platejs'
import { insertInlineEquation } from '@platejs/math'
import { insertCallout } from '@platejs/callout'

import { useBlockEditor } from '@/hooks/use-block-editor'
import { insertBlock } from '@/extensions/plugins/transforms'

export const BlockEditor = () => {
  const { editor } = useBlockEditor()

  return (
    <>
      <Button onPress={() => console.log(editor.children)}>
        print content
      </Button>
      <Button onPress={() => insertBlock(editor, KEYS.equation)}>
        add equation
      </Button>

      <Button onPress={() => insertInlineEquation(editor, KEYS.inlineEquation)}>
        add inline equation
      </Button>
      <Button onPress={() => insertCallout(editor, { select: true })}>
        Add Callout
      </Button>
      <Plate editor={editor}>
        {/* You would typically add a toolbar here to toggle marks */}

        {/* 编辑时使用的 api */}
        <PlateContent style={{ padding: '16px 64px', minHeight: '100px' }} />

        {/* 当处于显示文章时，用下面 api 可以提供效率 */}
        {/* <PlateView editor={editor} /> */}
      </Plate>
    </>
  )
}

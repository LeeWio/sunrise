'use client'

import { Plate, PlateContent } from 'platejs/react'

import { useBlockEditor } from '@/hooks/use-block-editor'

export const BlockEditor = () => {
  const { editor } = useBlockEditor()

  return (
    <>
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

import { ImagePlugin } from '@platejs/media/react'

export const MediaKit = [
  ImagePlugin.configure({
    options: { disableUploadInsert: true },
    render: { afterEditable: null, node: null },
  }),
]

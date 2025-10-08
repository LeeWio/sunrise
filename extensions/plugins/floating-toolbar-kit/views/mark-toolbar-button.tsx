import { ComponentProps } from 'react'
import { useMarkToolbarButton, useMarkToolbarButtonState } from 'platejs/react'

import { MemoButton } from '../../link-kit/views/memo-button'

export const MarkToolbarButton = ({
  clear,
  nodeType,
  ...props
}: ComponentProps<typeof MemoButton> & {
  nodeType?: string
  clear?: string[] | string
}) => {
  const state = useMarkToolbarButtonState({ clear, nodeType })
  const { props: buttonProps } = useMarkToolbarButton(state)

  return <MemoButton {...buttonProps} {...props} nodeType={nodeType} />
}

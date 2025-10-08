import {
  useLinkToolbarButton,
  useLinkToolbarButtonState,
} from '@platejs/link/react'
import { ComponentProps } from 'react'

import { MemoButton } from '../../link-kit/views/memo-button'

export const LinkToolbarButton = (props: ComponentProps<typeof MemoButton>) => {
  const state = useLinkToolbarButtonState()

  const { props: buttonProps } = useLinkToolbarButton(state)

  return (
    <MemoButton
      {...buttonProps}
      {...props}
      data-plate-focus
      nodeType={'Link'}
    />
  )
}

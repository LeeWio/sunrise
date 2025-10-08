import { ReactNode, Ref } from 'react'
import { KEYS } from 'platejs'
import {
  useEditorId,
  useEventEditorValue,
  usePluginOption,
} from 'platejs/react'
import { useComposedRef } from '@udecode/cn'
import {
  type FloatingToolbarState,
  flip,
  offset,
  useFloatingToolbar,
  useFloatingToolbarState,
} from '@platejs/floating'

interface FloatingToolbarProps {
  children?: ReactNode
  className?: string
  state?: FloatingToolbarState
  ref?: Ref<HTMLDivElement>
}

export function FloatingToolbar({
  children,
  className,
  state,
  ...props
}: FloatingToolbarProps) {
  const editorId = useEditorId()
  const focusedEditorId = useEventEditorValue('focus')
  const isFloatingLinkOpen = !!usePluginOption({ key: KEYS.link }, 'mode')
  const isAIChatOpen = usePluginOption({ key: KEYS.aiChat }, 'open')

  const floatingToolbarState = useFloatingToolbarState({
    editorId,
    focusedEditorId,
    hideToolbar: isFloatingLinkOpen || isAIChatOpen,
    ...state,
    floatingOptions: {
      middleware: [
        offset(12),
        flip({
          fallbackPlacements: [
            'top-start',
            'top-end',
            'bottom-start',
            'bottom-end',
          ],
          padding: 12,
        }),
      ],
      placement: 'top',
      ...state?.floatingOptions,
    },
  })

  const {
    clickOutsideRef,
    hidden,
    props: rootProps,
    ref: floatingRef,
  } = useFloatingToolbar(floatingToolbarState)

  const ref = useComposedRef<HTMLDivElement>(props.ref, floatingRef)

  if (hidden) return null

  return (
    <div ref={clickOutsideRef} className={className}>
      <div {...rootProps} {...props} ref={ref}>
        {children}
      </div>
    </div>
  )
}

import { TLinkElement } from 'platejs'
import { getLinkAttributes } from '@platejs/link'
import { PlateElement, PlateElementProps, useReadOnly } from 'platejs/react'
import { Link } from '@heroui/link'

export const LinkElement = (props: PlateElementProps<TLinkElement>) => {
  const { editor, element, attributes, children } = props
  const linkAttrs = getLinkAttributes(editor, element)
  const readOnly = useReadOnly()

  return (
    <PlateElement
      {...props}
      as="span"
      attributes={{
        ...attributes,
        onMouseOver: e => e.stopPropagation(),
      }}
    >
      <Link
        isExternal
        showAnchorIcon
        href={readOnly ? linkAttrs.href : undefined}
        target={readOnly ? linkAttrs.target : undefined}
        underline="hover"
      >
        {children}
      </Link>
    </PlateElement>
  )
}

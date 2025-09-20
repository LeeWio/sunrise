import { type TLinkElement } from 'platejs'
import { PlateElement, useReadOnly, type PlateElementProps } from 'platejs/react'
import { getLinkAttributes } from '@platejs/link'
import { Link } from '@heroui/react'

export const LinkElement = (props: PlateElementProps<TLinkElement>) => {
  const { editor, element, attributes, children } = props
  const linkAttrs = getLinkAttributes(editor, element)
  const readOnly = useReadOnly()

  return (
    <PlateElement
      as="span"
      {...props}
      attributes={{
        ...attributes,
        onMouseOver: (e) => e.stopPropagation(),
      }}
    >
      <Link
        href={readOnly ? linkAttrs.href : undefined}
        target={readOnly ? linkAttrs.target : undefined}
      >
        {children}
        <Link.Icon />
      </Link>
    </PlateElement>
  )
}

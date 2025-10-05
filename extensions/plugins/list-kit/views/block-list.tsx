import { TListElement } from 'platejs'
import { PlateElementProps, RenderNodeWrapper } from 'platejs/react'
import { isOrderedList } from '@platejs/list'

import { config } from './config'

export const BlockList: RenderNodeWrapper = props => {
  if (!props.element.listStyleType) return undefined

  const renderList = (innerProps: PlateElementProps): JSX.Element => (
    <List {...innerProps} />
  )

  return renderList
}

const List: React.FC<PlateElementProps> = props => {
  const { listStart, listStyleType } = props.element as TListElement

  const { Li, Marker } = config[listStyleType] ?? {}

  const ListTag = isOrderedList(props.element) ? 'ol' : 'ul'

  return (
    <ListTag
      className="relative p-0 ml-2"
      start={listStart}
      style={{ listStyleType }}
    >
      {Marker && <Marker {...props} />}

      {Li ? <Li {...props} /> : <li>{props.children}</li>}
    </ListTag>
  )
}

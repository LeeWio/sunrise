'use client'

import type { TListElement } from 'platejs'

import React from 'react'
import { isOrderedList } from '@platejs/list'
import { type PlateElementProps, type RenderNodeWrapper } from 'platejs/react'

import { config } from './config'

/**
 * BlockList — matches Plate's RenderNodeWrapper type:
 * - return `undefined` when not handling this node
 * - otherwise return a function (RenderNodeWrapperFunction) that renders JSX
 */
export const BlockList: RenderNodeWrapper = (props) => {
  if (!props.element.listStyleType) return undefined

  const renderList = (innerProps: PlateElementProps): JSX.Element => <List {...innerProps} />

  return renderList
}

/** List component — arrow function style */
const List: React.FC<PlateElementProps> = (props) => {
  const { listStart, listStyleType } = props.element as TListElement
  const { Li, Marker } = config[listStyleType] ?? {}
  const ListTag = isOrderedList(props.element) ? 'ol' : 'ul'

  return (
    <ListTag className="relative m-0 p-0" start={listStart} style={{ listStyleType }}>
      {Marker && <Marker {...props} />}
      {Li ? <Li {...props} /> : <li>{props.children}</li>}
    </ListTag>
  )
}

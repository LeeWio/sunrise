import { ColumnItemPlugin, ColumnPlugin } from '@platejs/layout/react'

import { ColumnElement, ColumnGroupElement } from './views'

export const ColumnKit = [
  ColumnItemPlugin.withComponent(ColumnElement),
  ColumnPlugin.withComponent(ColumnGroupElement),
]

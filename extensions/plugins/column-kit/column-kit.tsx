import { ColumnItemPlugin, ColumnPlugin } from '@platejs/layout/react'

export const ColumnKit = [
  ColumnPlugin.withComponent(ColumnGroupElement),
  ColumnItemPlugin.withComponent(ColumnElement),
]

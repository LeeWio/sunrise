import { ColumnItemPlugin, ColumnPlugin } from '@platejs/layout/react'

import { ColumnElement } from './views/column-element'
import { ColumnGroupElement } from './views/column-group-element'

/**
 * ColumnKit
 *
 * Preconfigured set of Plate.js plugins for column layout support.
 *
 * - ColumnPlugin: Represents a group of columns.
 *   - Rendered using the custom `ColumnGroupElement` component.
 *
 * - ColumnItemPlugin: Represents an individual column within a group.
 *   - Rendered using the custom `ColumnElement` component.
 *
 * Usage:
 * - Spread `ColumnKit` into the editor's `plugins` array to enable
 *   column layouts with custom rendering and behavior.
 */
export const ColumnKit = [
  ColumnPlugin.withComponent(ColumnGroupElement), // Group-level column component
  ColumnItemPlugin.withComponent(ColumnElement), // Individual column component
]

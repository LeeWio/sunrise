import { TocPlugin } from '@platejs/toc/react'

import { TocElement } from './views/toc-element'

/**
 * TocKit
 *
 * Configuration for the Table of Contents (TOC) plugin in Plate.js.
 *
 * Features:
 * - Integrates the TOC plugin with the editor.
 * - Sets a `topOffset` to adjust scroll positioning when navigating headings.
 * - Uses a custom `TocElement` component to render the TOC UI.
 *
 * Usage:
 * - Include `TocKit` in the editor's `plugins` array to enable TOC functionality.
 */
export const TocKit = [
  TocPlugin.configure({
    options: {
      topOffset: 80, // Offset from the top when scrolling to headings
    },
  }).withComponent(TocElement),
]

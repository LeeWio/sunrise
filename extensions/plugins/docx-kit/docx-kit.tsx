import { DocxPlugin } from '@platejs/docx'
import { JuicePlugin } from '@platejs/juice'

/**
 * DocxKit
 *
 * Provides support for working with DOCX documents in the editor.
 * - DocxPlugin: Adds export/import functionality for Microsoft Word (.docx) files.
 * - JuicePlugin: Inlines and preserves styles during export (using Juice).
 *
 * Usage:
 * - Include `DocxKit` in the editor `plugins` array to enable DOCX handling.
 */
export const DocxKit = [
  DocxPlugin, // DOCX file import/export support
  JuicePlugin, // Inline CSS/styles when exporting to DOCX
]

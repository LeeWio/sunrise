import { EmojiPlugin } from '@platejs/emoji/react'
import {
  PlateElement,
  PlateElementProps,
  usePluginOptions,
} from 'platejs/react'
import { useMemo, useState } from 'react'
import { EmojiInlineIndexSearch } from '@platejs/emoji'

import { useDebounce } from '@/hooks/use-debounce'

export const EmojiInputElement = (props: PlateElementProps) => {
  const { children, editor, element } = props

  const data = usePluginOptions(EmojiPlugin, 'data')!

  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 100)
  const isPending = value !== debouncedValue

  const filteredEmojis = useMemo(() => {
    if (debouncedValue.trim().length === 0) return []

    return EmojiInlineIndexSearch.getInstance(data)
      .search(debouncedValue.replace(/:$/, ''))
      .get()
  }, [data, debouncedValue])

  return (
    <PlateElement {...props} as="span">
      {children}
    </PlateElement>
  )
}

import { Icon } from '@iconify/react'

import { GlobeIcon } from '../icons'

import { IconSvgProps } from '@/types'

export const EmojiPicker = ({ }: { icons?: React.FC<IconSvgProps> }) => { }

const emojiSearchIcons = {
  delete: <Icon height="20" icon="lucide:x" width="20" />,
  loupe: <Icon height="20" icon="lucide:search" width="20" />,
}

type ReverseMap<T> = T[keyof T]

declare const EmojiCategory: {
  readonly Activity: 'activity'
  readonly Custom: 'custom'
  readonly Flags: 'flags'
  readonly Foods: 'foods'
  readonly Frequent: 'frequent'
  readonly Nature: 'nature'
  readonly Objects: 'objects'
  readonly People: 'people'
  readonly Brands: 'brands'
  readonly Symbols: 'symbols'
}

type EmojiCategoryList = ReverseMap<typeof EmojiCategory>

const emojiCategoryIcons: Record<
  EmojiCategoryList,
  {
    outline: React.ReactElement
    solid: React.ReactElement
  }
> = {
  brands: {
    outline: <GlobeIcon />,
    solid: <GlobeIcon />,
  },
}

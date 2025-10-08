import { Icon } from '@iconify/react'
import { EmojiCategoryList, EmojiIconList, EmojiSettings } from '@platejs/emoji'
import { UseEmojiPickerType } from '@platejs/emoji/react'

import { EmojiPickerSearchBar } from './emoji-picker-search-bar'
import { EmojiPickerContent } from './emoji-picker-content'
import { EmojiPickerPreview } from './emoji-picker-preview'
import { EmojiPickernavigation } from './emoji-picker-navigation'

export const EmojiPicker = ({
  clearSearch,
  emoji,
  emojiLibrary,
  focusedCategory,
  hasFound,
  i18n,
  icons = {
    categories: emojiCategoryIcons,
    search: emojiSearchIcons,
  },
  isSearching,
  refs,
  searchResult,
  searchValue,
  setSearch,
  settings = EmojiSettings,
  visibleCategories,
  handleCategoryClick,
  onMouseOver,
  onSelectEmoji,
}: Omit<UseEmojiPickerType, 'icons'> & {
  icons?: EmojiIconList<React.ReactElement>
}) => {
  return (
    <div className="flex flex-col w-72  gap-2 h-[25rem]">
      <EmojiPickernavigation
        emojiLibrary={emojiLibrary}
        focusedCategory={focusedCategory}
        i18n={i18n}
        icons={icons}
        onClick={handleCategoryClick}
      />

      <EmojiPickerSearchBar
        clearSearch={clearSearch}
        i18n={i18n}
        searchValue={searchValue}
        setSearch={setSearch}
      />

      <EmojiPickerContent
        emojiLibrary={emojiLibrary}
        i18n={i18n}
        isSearching={isSearching}
        refs={refs}
        searchResult={searchResult}
        settings={settings}
        visibleCategories={visibleCategories}
        onMouseOver={onMouseOver}
        onSelectEmoji={onSelectEmoji}
      />

      <EmojiPickerPreview
        emoji={emoji}
        hasFound={hasFound}
        i18n={i18n}
        isSearching={isSearching}
      />
    </div>
  )
}

const emojiCategoryIcons: Record<
  EmojiCategoryList,
  {
    outline: React.ReactElement
    solid: React.ReactElement // Needed to add another solid variant - outline will be used for now
  }
> = {
  activity: {
    outline: <Icon height="20" icon="lucide:globe" width="20" />,
    solid: <Icon height="20" icon="lucide:globe" width="20" />,
  },

  custom: {
    outline: <Icon height="20" icon="lucide:star" width="20" />,
    solid: <Icon height="20" icon="lucide:star" width="20" />,
  },

  flags: {
    outline: <Icon height="20" icon="lucide:flag" width="20" />,
    solid: <Icon height="20" icon="lucide:flag" width="20" />,
  },

  foods: {
    outline: <Icon height="20" icon="lucide:apple" width="20" />,
    solid: <Icon height="20" icon="lucide:apple" width="20" />,
  },

  frequent: {
    outline: <Icon height="20" icon="lucide:alarm-clock" width="20" />,
    solid: <Icon height="20" icon="lucide:alarm-clock" width="20" />,
  },

  nature: {
    outline: <Icon height="20" icon="lucide:leaf" width="20" />,
    solid: <Icon height="20" icon="lucide:leaf" width="20" />,
  },

  objects: {
    outline: <Icon height="20" icon="lucide:lightbulb" width="20" />,
    solid: <Icon height="20" icon="lucide:lightbulb" width="20" />,
  },

  people: {
    outline: <Icon height="20" icon="lucide:smile" width="20" />,
    solid: <Icon height="20" icon="lucide:smile" width="20" />,
  },

  places: {
    outline: <Icon height="20" icon="lucide:compass" width="20" />,
    solid: <Icon height="20" icon="lucide:compass" width="20" />,
  },

  symbols: {
    outline: <Icon height="20" icon="lucide:music" width="20" />,
    solid: <Icon height="20" icon="lucide:music" width="20" />,
  },
}

const emojiSearchIcons = {
  delete: <Icon height="20" icon="lucide:x" width="20" />,
  loupe: <Icon height="20" icon="lucide:search" width="20" />,
}

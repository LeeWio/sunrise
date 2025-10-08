import { Input } from '@heroui/react'
import { Icon } from '@iconify/react'
import { UseEmojiPickerType } from '@platejs/emoji/react'

export const EmojiPickerSearchBar = ({
  i18n,
  searchValue,
  setSearch,
  clearSearch,
}: Pick<
  UseEmojiPickerType,
  'i18n' | 'searchValue' | 'setSearch' | 'clearSearch'
>) => {
  return (
    <div className="w-full text-default-500">
      <Input
        fullWidth
        isClearable
        aria-label="Search"
        autoComplete="off"
        placeholder={i18n.search}
        size="sm"
        startContent={<Icon height="24" icon="lucide:search" width="24" />}
        value={searchValue}
        onChange={e => setSearch(e.target.value)}
        onClear={clearSearch}
      />
    </div>
  )
}

import type { Emoji } from '@emoji-mart/data'

import { EmojiSettings, GridRow } from '@platejs/emoji'
import { UseEmojiPickerType } from '@platejs/emoji/react'
import { useCallback } from 'react'
import { ScrollShadow, cn } from '@heroui/react'

import { RowOfButtons } from './row-of-buttons'
import { EmojiButton } from './emoji-button'

export const EmojiPickerContent = ({
  emojiLibrary,
  i18n,
  isSearching = false,
  refs,
  searchResult,
  settings = EmojiSettings,
  visibleCategories,
  onMouseOver,
  onSelectEmoji,
}: Pick<
  UseEmojiPickerType,
  | 'emojiLibrary'
  | 'i18n'
  | 'isSearching'
  | 'onMouseOver'
  | 'onSelectEmoji'
  | 'refs'
  | 'searchResult'
  | 'settings'
  | 'visibleCategories'
>) => {
  const getRowWidth = settings.perLine.value * settings.buttonSize.value

  const isCategoryVisible = useCallback(
    (categoryId: any) => {
      return visibleCategories.has(categoryId)
        ? visibleCategories.get(categoryId)
        : false
    },
    [visibleCategories]
  )

  const EmojiList = useCallback(() => {
    return emojiLibrary
      .getGrid()
      .sections()
      .map(({ id: categoryId }) => {
        const section = emojiLibrary.getGrid().section(categoryId)
        const { buttonSize } = settings

        return (
          <div
            key={categoryId}
            ref={section.root as any}
            data-id={categoryId}
            style={{ width: getRowWidth }}
          >
            <div className="sticky -top-px z-1 p-1 text-sm font-semibold text-default-500">
              {i18n.categories[categoryId]}
            </div>
            <div
              className="relative flex flex-wrap"
              style={{ height: section.getRows().length * buttonSize.value }}
            >
              {isCategoryVisible(categoryId) &&
                section
                  .getRows()
                  .map((row: GridRow) => (
                    <RowOfButtons
                      key={row.id}
                      emojiLibrary={emojiLibrary}
                      row={row}
                      onMouseOver={onMouseOver}
                      onSelectEmoji={onSelectEmoji}
                    />
                  ))}
            </div>
          </div>
        )
      })
  }, [
    emojiLibrary,
    getRowWidth,
    i18n.categories,
    isCategoryVisible,
    onSelectEmoji,
    onMouseOver,
    settings,
  ])

  const SearchList = useCallback(() => {
    return (
      <div data-id="search" style={{ width: getRowWidth }}>
        <div className="sticky -top-px z-1 p-1 text-sm font-semibold text-default-500">
          {i18n.searchResult}
        </div>
        <div className="relative flex flex-wrap">
          {searchResult.map((emoji: Emoji, index: number) => (
            <EmojiButton
              key={emoji.id}
              emoji={emojiLibrary.getEmoji(emoji.id)}
              index={index}
              onMouseOver={onMouseOver}
              onSelect={onSelectEmoji}
            />
          ))}
        </div>
      </div>
    )
  }, [
    emojiLibrary,
    getRowWidth,
    i18n.searchResult,
    searchResult,
    onSelectEmoji,
    onMouseOver,
  ])

  return (
    <ScrollShadow
      ref={refs.current.contentRoot}
      hideScrollBar
      className={cn(
        'h-full min-h-[50%] overflow-x-hidden overflow-y-auto',
        '[&::-webkit-scrollbar]:w-4',
        '[&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-button]:size-0',
        '[&::-webkit-scrollbar-thumb]:min-h-11 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar-thumb]:hover:bg-muted-foreground/25',
        '[&::-webkit-scrollbar-thumb]:border-4 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-popover [&::-webkit-scrollbar-thumb]:bg-clip-padding'
      )}
      data-id="scroll"
    >
      <div
        ref={refs.current.content as React.RefObject<HTMLDivElement>}
        className="h-full"
      >
        {isSearching ? SearchList() : EmojiList()}
      </div>
    </ScrollShadow>
  )
}

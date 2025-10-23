import { Icon } from '@iconify/react'
import { UseIconPickerType } from './type'

import { IconPickerSearch } from './icon-picker-search'
import { IconPickerContent } from './icon-picker-content'
import { IconPickerPreview } from './icon-picker-preview'
import { IconPickerNavigation } from './icon-picker-navigation'

// 图标分类图标定义，借鉴 emoji-picker 的做法
const iconCategoryIcons = {
  all: {
    outline: <Icon height="20" icon="lucide:grid" width="20" />,
    solid: <Icon height="20" icon="lucide:grid" width="20" />,
  },
  humanitarian: {
    outline: <Icon height="20" icon="lucide:heart" width="20" />,
    solid: <Icon height="20" icon="lucide:heart" width="20" />,
  },
  'science-fiction': {
    outline: <Icon height="20" icon="lucide:rocket" width="20" />,
    solid: <Icon height="20" icon="lucide:rocket" width="20" />,
  },
  accessibility: {
    outline: <Icon height="20" icon="lucide:accessibility" width="20" />,
    solid: <Icon height="20" icon="lucide:accessibility" width="20" />,
  },
  alert: {
    outline: <Icon height="20" icon="lucide:alert-triangle" width="20" />,
    solid: <Icon height="20" icon="lucide:alert-triangle" width="20" />,
  },
  alphabet: {
    outline: <Icon height="20" icon="lucide:abc" width="20" />,
    solid: <Icon height="20" icon="lucide:abc" width="20" />,
  },
  animals: {
    outline: <Icon height="20" icon="lucide:paw" width="20" />,
    solid: <Icon height="20" icon="lucide:paw" width="20" />,
  },
  arrows: {
    outline: <Icon height="20" icon="lucide:arrow-right" width="20" />,
    solid: <Icon height="20" icon="lucide:arrow-right" width="20" />,
  },
  astronomy: {
    outline: <Icon height="20" icon="lucide:star" width="20" />,
    solid: <Icon height="20" icon="lucide:star" width="20" />,
  },
  automotive: {
    outline: <Icon height="20" icon="lucide:car" width="20" />,
    solid: <Icon height="20" icon="lucide:car" width="20" />,
  },
  buildings: {
    outline: <Icon height="20" icon="lucide:building" width="20" />,
    solid: <Icon height="20" icon="lucide:building" width="20" />,
  },
  business: {
    outline: <Icon height="20" icon="lucide:briefcase" width="20" />,
    solid: <Icon height="20" icon="lucide:briefcase" width="20" />,
  },
  camping: {
    outline: <Icon height="20" icon="lucide:campfire" width="20" />,
    solid: <Icon height="20" icon="lucide:campfire" width="20" />,
  },
  charity: {
    outline: <Icon height="20" icon="lucide:heart-handshake" width="20" />,
    solid: <Icon height="20" icon="lucide:heart-handshake" width="20" />,
  },
  'charts-diagrams': {
    outline: <Icon height="20" icon="lucide:bar-chart" width="20" />,
    solid: <Icon height="20" icon="lucide:bar-chart" width="20" />,
  },
  childhood: {
    outline: <Icon height="20" icon="lucide:baby" width="20" />,
    solid: <Icon height="20" icon="lucide:baby" width="20" />,
  },
  'clothing-fashion': {
    outline: <Icon height="20" icon="lucide:t-shirt" width="20" />,
    solid: <Icon height="20" icon="lucide:t-shirt" width="20" />,
  },
  connectivity: {
    outline: <Icon height="20" icon="lucide:wifi" width="20" />,
    solid: <Icon height="20" icon="lucide:wifi" width="20" />,
  },
  construction: {
    outline: <Icon height="20" icon="lucide:hammer" width="20" />,
    solid: <Icon height="20" icon="lucide:hammer" width="20" />,
  },
  'devices-hardware': {
    outline: <Icon height="20" icon="lucide:cpu" width="20" />,
    solid: <Icon height="20" icon="lucide:cpu" width="20" />,
  },
  'disaster-crisis': {
    outline: <Icon height="20" icon="lucide:cloud-rain" width="20" />,
    solid: <Icon height="20" icon="lucide:cloud-rain" width="20" />,
  },
  editing: {
    outline: <Icon height="20" icon="lucide:edit" width="20" />,
    solid: <Icon height="20" icon="lucide:edit" width="20" />,
  },
  education: {
    outline: <Icon height="20" icon="lucide:book" width="20" />,
    solid: <Icon height="20" icon="lucide:book" width="20" />,
  },
  emoji: {
    outline: <Icon height="20" icon="lucide:smile" width="20" />,
    solid: <Icon height="20" icon="lucide:smile" width="20" />,
  },
  energy: {
    outline: <Icon height="20" icon="lucide:zap" width="20" />,
    solid: <Icon height="20" icon="lucide:zap" width="20" />,
  },
  files: {
    outline: <Icon height="20" icon="lucide:file" width="20" />,
    solid: <Icon height="20" icon="lucide:file" width="20" />,
  },
  'film-video': {
    outline: <Icon height="20" icon="lucide:film" width="20" />,
    solid: <Icon height="20" icon="lucide:film" width="20" />,
  },
  'food-beverage': {
    outline: <Icon height="20" icon="lucide:coffee" width="20" />,
    solid: <Icon height="20" icon="lucide:coffee" width="20" />,
  },
  'fruits-vegetables': {
    outline: <Icon height="20" icon="lucide:apple" width="20" />,
    solid: <Icon height="20" icon="lucide:apple" width="20" />,
  },
  gaming: {
    outline: <Icon height="20" icon="lucide:gamepad" width="20" />,
    solid: <Icon height="20" icon="lucide:gamepad" width="20" />,
  },
  genders: {
    outline: <Icon height="20" icon="lucide:venus" width="20" />,
    solid: <Icon height="20" icon="lucide:venus" width="20" />,
  },
  halloween: {
    outline: <Icon height="20" icon="lucide:ghost" width="20" />,
    solid: <Icon height="20" icon="lucide:ghost" width="20" />,
  },
  hands: {
    outline: <Icon height="20" icon="lucide:hand" width="20" />,
    solid: <Icon height="20" icon="lucide:hand" width="20" />,
  },
  holidays: {
    outline: <Icon height="20" icon="lucide:gift" width="20" />,
    solid: <Icon height="20" icon="lucide:gift" width="20" />,
  },
  household: {
    outline: <Icon height="20" icon="lucide:home" width="20" />,
    solid: <Icon height="20" icon="lucide:home" width="20" />,
  },
  logistics: {
    outline: <Icon height="20" icon="lucide:truck" width="20" />,
    solid: <Icon height="20" icon="lucide:truck" width="20" />,
  },
  maps: {
    outline: <Icon height="20" icon="lucide:map" width="20" />,
    solid: <Icon height="20" icon="lucide:map" width="20" />,
  },
  maritime: {
    outline: <Icon height="20" icon="lucide:anchor" width="20" />,
    solid: <Icon height="20" icon="lucide:anchor" width="20" />,
  },
  marketing: {
    outline: <Icon height="20" icon="lucide:presentation" width="20" />,
    solid: <Icon height="20" icon="lucide:presentation" width="20" />,
  },
  mathematics: {
    outline: <Icon height="20" icon="lucide:calculator" width="20" />,
    solid: <Icon height="20" icon="lucide:calculator" width="20" />,
  },
  'media-playback': {
    outline: <Icon height="20" icon="lucide:play" width="20" />,
    solid: <Icon height="20" icon="lucide:play" width="20" />,
  },
  'medical-health': {
    outline: <Icon height="20" icon="lucide:heart-pulse" width="20" />,
    solid: <Icon height="20" icon="lucide:heart-pulse" width="20" />,
  },
  money: {
    outline: <Icon height="20" icon="lucide:dollar-sign" width="20" />,
    solid: <Icon height="20" icon="lucide:dollar-sign" width="20" />,
  },
  moving: {
    outline: <Icon height="20" icon="lucide:move" width="20" />,
    solid: <Icon height="20" icon="lucide:move" width="20" />,
  },
  'music-audio': {
    outline: <Icon height="20" icon="lucide:music" width="20" />,
    solid: <Icon height="20" icon="lucide:music" width="20" />,
  },
  nature: {
    outline: <Icon height="20" icon="lucide:tree-pine" width="20" />,
    solid: <Icon height="20" icon="lucide:tree-pine" width="20" />,
  },
  numbers: {
    outline: <Icon height="20" icon="lucide:hash" width="20" />,
    solid: <Icon height="20" icon="lucide:hash" width="20" />,
  },
  'photos-images': {
    outline: <Icon height="20" icon="lucide:image" width="20" />,
    solid: <Icon height="20" icon="lucide:image" width="20" />,
  },
  political: {
    outline: <Icon height="20" icon="lucide:vote" width="20" />,
    solid: <Icon height="20" icon="lucide:vote" width="20" />,
  },
  'punctuation-symbols': {
    outline: <Icon height="20" icon="lucide:asterisk" width="20" />,
    solid: <Icon height="20" icon="lucide:asterisk" width="20" />,
  },
  religion: {
    outline: <Icon height="20" icon="lucide:church" width="20" />,
    solid: <Icon height="20" icon="lucide:church" width="20" />,
  },
  science: {
    outline: <Icon height="20" icon="lucide:flask-conical" width="20" />,
    solid: <Icon height="20" icon="lucide:flask-conical" width="20" />,
  },
  security: {
    outline: <Icon height="20" icon="lucide:shield" width="20" />,
    solid: <Icon height="20" icon="lucide:shield" width="20" />,
  },
  shapes: {
    outline: <Icon height="20" icon="lucide:square" width="20" />,
    solid: <Icon height="20" icon="lucide:square" width="20" />,
  },
  shopping: {
    outline: <Icon height="20" icon="lucide:shopping-cart" width="20" />,
    solid: <Icon height="20" icon="lucide:shopping-cart" width="20" />,
  },
  social: {
    outline: <Icon height="20" icon="lucide:users" width="20" />,
    solid: <Icon height="20" icon="lucide:users" width="20" />,
  },
  spinners: {
    outline: <Icon height="20" icon="lucide:loader" width="20" />,
    solid: <Icon height="20" icon="lucide:loader" width="20" />,
  },
  'sports-fitness': {
    outline: <Icon height="20" icon="lucide:dumbbell" width="20" />,
    solid: <Icon height="20" icon="lucide:dumbbell" width="20" />,
  },
  'text-formatting': {
    outline: <Icon height="20" icon="lucide:bold" width="20" />,
    solid: <Icon height="20" icon="lucide:bold" width="20" />,
  },
  time: {
    outline: <Icon height="20" icon="lucide:clock" width="20" />,
    solid: <Icon height="20" icon="lucide:clock" width="20" />,
  },
  toggle: {
    outline: <Icon height="20" icon="lucide:toggle-left" width="20" />,
    solid: <Icon height="20" icon="lucide:toggle-left" width="20" />,
  },
  transportation: {
    outline: <Icon height="20" icon="lucide:bus" width="20" />,
    solid: <Icon height="20" icon="lucide:bus" width="20" />,
  },
  'travel-hotel': {
    outline: <Icon height="20" icon="lucide:plane" width="20" />,
    solid: <Icon height="20" icon="lucide:plane" width="20" />,
  },
  'users-people': {
    outline: <Icon height="20" icon="lucide:user" width="20" />,
    solid: <Icon height="20" icon="lucide:user" width="20" />,
  },
  weather: {
    outline: <Icon height="20" icon="lucide:sun" width="20" />,
    solid: <Icon height="20" icon="lucide:sun" width="20" />,
  },
  writing: {
    outline: <Icon height="20" icon="lucide:pen-line" width="20" />,
    solid: <Icon height="20" icon="lucide:pen-line" width="20" />,
  },
}

const iconSearchIcons = {
  delete: <Icon height="20" icon="lucide:x" width="20" />,
  loupe: <Icon height="20" icon="lucide:search" width="20" />,
}

export const IconPicker = ({
  clearSearch,
  focusedCategory,
  hasFound,
  i18n,
  selectedIcon,
  iconLibrary,
  icons = {
    categories: iconCategoryIcons,
    search: iconSearchIcons,
  },
  isSearching,
  refs,
  displayedIcons,
  searchValue,
  setSearch,
  settings,
  onActiveCategoryChange,
  onSelectIcon,
}: UseIconPickerType) => {
  return (
    <div className="flex flex-col w-72 gap-2 h-[25rem]">
      <IconPickerNavigation
        focusedCategory={focusedCategory}
        i18n={i18n}
        iconLibrary={iconLibrary}
        icons={icons}
        onClick={onActiveCategoryChange}
      />

      <IconPickerSearch
        clearSearch={clearSearch}
        i18n={i18n}
        searchValue={searchValue}
        setSearch={setSearch}
      />

      <IconPickerContent
        displayedIcons={displayedIcons}
        i18n={i18n}
        refs={refs}
        settings={settings}
        onSelectIcon={onSelectIcon}
      />

      <IconPickerPreview
        hasFound={hasFound}
        i18n={i18n}
        isSearching={isSearching}
        selectedIcon={selectedIcon}
      />
    </div>
  )
}
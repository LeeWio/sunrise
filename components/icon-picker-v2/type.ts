import { IconSvgProps } from '@/types'

export const IconCategory = {
  Coding: 'coding',
  Design: 'design',
  // Humanitarian: 'humanitarian',
  // ScienceFiction: 'science-fiction',
  // Accessibility: 'accessibility',
  // Alert: 'alert',
  // Alphabet: 'alphabet',
  // Animals: 'animals',
  // Arrows: 'arrows',
  // Astronomy: 'astronomy',
  // Automotive: 'automotive',
  // Buildings: 'buildings',
  // Business: 'business',
  // Camping: 'camping',
  // Charity: 'charity',
  // ChartsDiagrams: 'charts-diagrams',
  // Childhood: 'childhood',
  // ClothingFashion: 'clothing-fashion',
  // Communication: 'communication',
  // Connectivity: 'connectivity',
  // Construction: 'construction',
  // DevicesHardware: 'devices-hardware',
  // DisasterCrisis: 'disaster-crisis',
  // Editing: 'editing',
  // Education: 'education',
  // Emoji: 'emoji',
  // Energy: 'energy',
  // Files: 'files',
  // FilmVideo: 'film-video',
  // FoodBeverage: 'food-beverage',
  // FruitsVegetables: 'fruits-vegetables',
  // Gaming: 'gaming',
  // Genders: 'genders',
  // Halloween: 'halloween',
  // Hands: 'hands',
  // Holidays: 'holidays',
  // Household: 'household',
  // Logistics: 'logistics',
  // Maps: 'maps',
  // Maritime: 'maritime',
  // Marketing: 'marketing',
  // Mathematics: 'mathematics',
  // MediaPlayback: 'media-playback',
  // MedicalHealth: 'medical-health',
  // Money: 'money',
  // Moving: 'moving',
  // MusicAudio: 'music-audio',
  // Nature: 'nature',
  // Numbers: 'numbers',
  // PhotosImages: 'photos-images',
  // Political: 'political',
  // PunctuationSymbols: 'punctuation-symbols',
  // Religion: 'religion',
  // Science: 'science',
  // Security: 'security',
  // Shapes: 'shapes',
  // Shopping: 'shopping',
  // Social: 'social',
  // Spinners: 'spinners',
  // SportsFitness: 'sports-fitness',
  // TextFormatting: 'text-formatting',
  // Time: 'time',
  // Toggle: 'toggle',
  // Transportation: 'transportation',
  // TravelHotel: 'travel-hotel',
  // UsersPeople: 'users-people',
  // Weather: 'weather',
  // Writing: 'writing',
} as const

type ValueOf<T> = T[keyof T]
export type IconCategoryList = ValueOf<typeof IconCategory>

export interface IconMeta {
  id: string
  name: string
  category: IconCategoryList
  keywords: string[]
  component: React.ComponentType<IconSvgProps>
}

export type IconList<T = string> = {
  categories: Record<
    IconCategoryList,
    {
      outline: T
      solid: T
    }
  >
  search: {
    delete: T
    loupe: T
  }
}

export type IconSettingsType = {
  buttonSize: {
    value: number
  }
  categories: {
    value?: IconCategoryList[]
  }
  perLine: {
    value: number
  }
  showFrequent: {
    value: boolean
    key?: string
    limit?: number
    prefix?: string
  }
}

export type UseIconPickerType<
  T extends React.ReactElement = React.ReactElement,
> = {
  iconLibrary: Record<string, IconMeta>
  hasFound: boolean // search has results
  i18n: Record<string, string>
  icons: IconList<T> // the icons used in the picker UI
  isOpen: boolean
  isSearching: boolean
  refs: Record<string, React.RefObject<HTMLDivElement>>
  searchResults: IconMeta[]
  searchValue: string
  visibleCategories: Map<IconCategoryList, boolean>
  clearSearch: () => void
  onOpenChange: () => void
  setSearch: (value: string) => void
  handleCategoryClick: (id: IconCategoryList) => void
  onMouseOver: (icon?: IconMeta) => void
  onSelectIcon: (icon: IconMeta) => void
  icon?: IconMeta
  focusedCategory?: IconCategoryList
  settings?: IconSettingsType
  styles?: React.CSSProperties
}

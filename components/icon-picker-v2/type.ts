import { IconSvgProps } from '@/types'

export const IconCategory = {
  All: 'all', // 添加All分类用于显示所有图标
  Humanitarian: 'humanitarian',
  ScienceFiction: 'science-fiction',
  Accessibility: 'accessibility',
  Alert: 'alert',
  Alphabet: 'alphabet',
  Animals: 'animals',
  Arrows: 'arrows',
  Astronomy: 'astronomy',
  Automotive: 'automotive',
  Buildings: 'buildings',
  Business: 'business',
  Camping: 'camping',
  Charity: 'charity',
  ChartsDiagrams: 'charts-diagrams',
  Childhood: 'childhood',
  ClothingFashion: 'clothing-fashion',
  Connectivity: 'connectivity',
  Construction: 'construction',
  DevicesHardware: 'devices-hardware',
  DisasterCrisis: 'disaster-crisis',
  Editing: 'editing',
  Education: 'education',
  Emoji: 'emoji',
  Energy: 'energy',
  Files: 'files',
  FilmVideo: 'film-video',
  FoodBeverage: 'food-beverage',
  FruitsVegetables: 'fruits-vegetables',
  Gaming: 'gaming',
  Genders: 'genders',
  Halloween: 'halloween',
  Hands: 'hands',
  Holidays: 'holidays',
  Household: 'household',
  Logistics: 'logistics',
  Maps: 'maps',
  Maritime: 'maritime',
  Marketing: 'marketing',
  Mathematics: 'mathematics',
  MediaPlayback: 'media-playback',
  MedicalHealth: 'medical-health',
  Money: 'money',
  Moving: 'moving',
  MusicAudio: 'music-audio',
  Nature: 'nature',
  Numbers: 'numbers',
  PhotosImages: 'photos-images',
  Political: 'political',
  PunctuationSymbols: 'punctuation-symbols',
  Religion: 'religion',
  Science: 'science',
  Security: 'security',
  Shapes: 'shapes',
  Shopping: 'shopping',
  Social: 'social',
  Spinners: 'spinners',
  SportsFitness: 'sports-fitness',
  TextFormatting: 'text-formatting',
  Time: 'time',
  Toggle: 'toggle',
  Transportation: 'transportation',
  TravelHotel: 'travel-hotel',
  UsersPeople: 'users-people',
  Weather: 'weather',
  Writing: 'writing',
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

// 图标选择器设置，借鉴 emoji-picker 的做法
export const IconSettings = {
  buttonSize: {
    value: 48, // 按钮大小
  },
  perLine: {
    value: 8, // 每行显示的图标数量
  },
  showFrequent: {
    value: false,
  },
}

export type IconSettingsType = typeof IconSettings

// 图标分类图标定义，借鉴 emoji-picker 的做法
export type IconCategoryIcons<T = React.ReactElement> = Record<
  IconCategoryList,
  {
    outline: T
    solid: T
  }
>

export type IconSearchIcons<T = React.ReactElement> = {
  delete: T
  loupe: T
}

export type IconIconList<T = React.ReactElement> = {
  categories: IconCategoryIcons<T>
  search: IconSearchIcons<T>
}

// 专业化的 UseIconPickerType，借鉴 emoji-picker 的设计
export type UseIconPickerType<
  T extends React.ReactElement = React.ReactElement,
> = {
  // 状态相关
  activeCategory: IconCategoryList
  categories: IconCategoryList[]
  displayedIcons: { category: string; icons: IconMeta[] }[]
  selectedIcon: IconMeta | null
  searchValue: string
  isSearching: boolean
  isOpen: boolean
  hasFound: boolean
  focusedCategory?: IconCategoryList
  focusedIconIndex?: number | null
  
  // 库相关
  iconLibrary: Record<string, IconMeta>
  icons?: IconIconList<T>
  
  // 国际化
  i18n: {
    categories: Record<string, string>
    search: string
    searchResult: string
    searchNoResultsTitle: string
    searchNoResultsSubtitle: string
    pick: string
  }
  
  // 配置
  settings: IconSettingsType
  refs: {
    contentRoot: React.RefObject<HTMLDivElement>
    content: React.RefObject<HTMLDivElement>
  }
  
  // 回调函数
  onActiveCategoryChange: (category: IconCategoryList) => void
  onSelectIcon: (icon: IconMeta) => void
  setSearch: (value: string) => void
  clearSearch: () => void
  onOpenChange: () => void
  onMouseOver?: (icon?: IconMeta) => void
  handleCategoryClick?: (id: IconCategoryList) => void
}
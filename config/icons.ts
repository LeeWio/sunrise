import {
  GithubIcon,
  TwitterIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  ReactIcon,
  StarIcon,
  ThumbsUpIcon,
  CommentIcon,
  EyeIcon,
  CalendarIcon,
  MoonFilledIcon,
  SunFilledIcon,
  HeartIcon,
} from '@/components/icons'
import { IconSvgProps } from '@/types'

/**
 * Icon category enumeration
 * Defines the classification system for organizing icons
 */
export enum IconCategory {
  SOCIAL = 'social', // Social media icons (Facebook, Twitter, Instagram, etc.)
  INTERACTION = 'interaction', // Interactive icons (like, comment, share, etc.)
  THEME = 'theme', // Theme-related icons (color, brightness, layout, etc.)
  UTILITY = 'utility', // Utility icons (search, download, settings, etc.)
  BRAND = 'brand', // Brand-specific icons (Apple, Google, GitHub logos, etc.)
  NAVIGATION = 'navigation', // Navigation icons (arrow, menu, close, etc.)
  CONTENT = 'content', // Content-related icons (document, image, video, etc.)
  STATUS = 'status', // Status indicators (success, error, warning, etc.)
}

/**
 * Icon configuration interface
 * Defines the structure for icon metadata
 */
export interface IconConfig {
  Icon: React.FC<IconSvgProps>
  id: string // Unique identifier for the icon
  label: string // Display name
  description?: string // Optional detailed description
  color: string // Tailwind CSS color classes
  category: IconCategory // Icon category
}

/**
 * Complete icon configuration list
 * Centralized management of all available icons with metadata
 */
export const iconList: IconConfig[] = [
  {
    Icon: GithubIcon,
    id: 'github',
    label: 'GitHub',
    description: 'GitHub social platform icon',
    color: 'text-gray-700 dark:text-gray-300',
    category: IconCategory.SOCIAL,
  },
  {
    Icon: TwitterIcon,
    id: 'twitter',
    label: 'Twitter',
    description: 'Twitter social media platform',
    color: 'text-blue-400',
    category: IconCategory.SOCIAL,
  },
  {
    Icon: DiscordIcon,
    id: 'discord',
    label: 'Discord',
    description: 'Discord communication platform',
    color: 'text-indigo-500',
    category: IconCategory.SOCIAL,
  },
  {
    Icon: HeartFilledIcon,
    id: 'heart-filled',
    label: 'Like',
    description: 'Like or favorite action',
    color: 'text-red-500',
    category: IconCategory.INTERACTION,
  },
  {
    Icon: SearchIcon,
    id: 'search',
    label: 'Search',
    description: 'Search functionality',
    color: 'text-gray-600 dark:text-gray-400',
    category: IconCategory.UTILITY,
  },
  {
    Icon: ReactIcon,
    id: 'react',
    label: 'React',
    description: 'React JavaScript library',
    color: 'text-cyan-400',
    category: IconCategory.BRAND,
  },
  {
    Icon: StarIcon,
    id: 'star',
    label: 'Bookmark',
    description: 'Bookmark or favorite item',
    color: 'text-yellow-500',
    category: IconCategory.INTERACTION,
  },
  {
    Icon: ThumbsUpIcon,
    id: 'thumbs-up',
    label: 'Thumbs Up',
    description: 'Thumbs up approval action',
    color: 'text-blue-500',
    category: IconCategory.INTERACTION,
  },
  {
    Icon: CommentIcon,
    id: 'comment',
    label: 'Comment',
    description: 'Comment or discussion',
    color: 'text-green-500',
    category: IconCategory.INTERACTION,
  },
  {
    Icon: EyeIcon,
    id: 'eye',
    label: 'View',
    description: 'View or visibility indicator',
    color: 'text-purple-500',
    category: IconCategory.INTERACTION,
  },
  {
    Icon: CalendarIcon,
    id: 'calendar',
    label: 'Calendar',
    description: 'Calendar or date picker',
    color: 'text-orange-500',
    category: IconCategory.UTILITY,
  },
  {
    Icon: MoonFilledIcon,
    id: 'moon',
    label: 'Dark Mode',
    description: 'Dark theme toggle',
    color: 'text-indigo-600',
    category: IconCategory.THEME,
  },
  {
    Icon: SunFilledIcon,
    id: 'sun',
    label: 'Light Mode',
    description: 'Light theme toggle',
    color: 'text-yellow-400',
    category: IconCategory.THEME,
  },
  {
    Icon: Logo,
    id: 'logo',
    label: 'Brand Logo',
    description: 'Application brand logo',
    color: 'text-primary',
    category: IconCategory.BRAND,
  },
  {
    Icon: HeartIcon,
    id: 'heart-outline',
    label: 'Heart',
    description: 'Heart outline icon',
    color: 'text-pink-500',
    category: IconCategory.INTERACTION,
  },
]

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get icons by category
 * @param category - The category to filter by
 * @returns Array of icons in the specified category
 */
export const getIconsByCategory = (category: IconCategory): IconConfig[] => {
  return iconList.filter(icon => icon.category === category)
}

/**
 * Search icons by label, description, or ID
 * @param query - Search query string
 * @returns Array of matching icons
 */
export const searchIcons = (query: string): IconConfig[] => {
  if (!query.trim()) return iconList

  const lowerQuery = query.toLowerCase()

  return iconList.filter(icon => {
    const matchLabel = icon.label.toLowerCase().includes(lowerQuery)
    const matchDescription = icon.description
      ?.toLowerCase()
      .includes(lowerQuery)
    const matchId = icon.id.toLowerCase().includes(lowerQuery)

    return matchLabel || matchDescription || matchId
  })
}

/**
 * Get icon by ID
 * @param id - Unique icon identifier
 * @returns Icon configuration or undefined
 */
export const getIconById = (id: string): IconConfig | undefined => {
  return iconList.find(icon => icon.id === id)
}

/**
 * Get icon statistics
 * @returns Object with icon counts by category and total
 */
export const getIconStats = () => ({
  total: iconList.length,
  byCategory: Object.fromEntries(
    Object.values(IconCategory).map(category => [
      category,
      getIconsByCategory(category).length,
    ])
  ),
})

/**
 * Pre-computed category mappings for performance
 */
export const iconsByCategory = {
  [IconCategory.SOCIAL]: getIconsByCategory(IconCategory.SOCIAL),
  [IconCategory.INTERACTION]: getIconsByCategory(IconCategory.INTERACTION),
  [IconCategory.THEME]: getIconsByCategory(IconCategory.THEME),
  [IconCategory.UTILITY]: getIconsByCategory(IconCategory.UTILITY),
  [IconCategory.BRAND]: getIconsByCategory(IconCategory.BRAND),
  [IconCategory.NAVIGATION]: getIconsByCategory(IconCategory.NAVIGATION),
  [IconCategory.CONTENT]: getIconsByCategory(IconCategory.CONTENT),
  [IconCategory.STATUS]: getIconsByCategory(IconCategory.STATUS),
}

/**
 * Category display labels (English)
 */
export const categoryLabels: Record<IconCategory, string> = {
  [IconCategory.SOCIAL]: 'Social Media',
  [IconCategory.INTERACTION]: 'Interactions',
  [IconCategory.THEME]: 'Theme',
  [IconCategory.UTILITY]: 'Utilities',
  [IconCategory.BRAND]: 'Brands',
  [IconCategory.NAVIGATION]: 'Navigation',
  [IconCategory.CONTENT]: 'Content',
  [IconCategory.STATUS]: 'Status',
}

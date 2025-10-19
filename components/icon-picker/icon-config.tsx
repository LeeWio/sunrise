import type { IconItem, IconCategory } from './types'

import * as Icons from '@/components/icons'

// ============================================
// 图标分类枚举常量（基于行业标准的专业分类）
// ============================================
export const ICON_CATEGORIES = {
  ALL: 'all',
  BRANDS: 'brands', // 品牌标识（Logo、Homebrew等）
  SOCIAL: 'social', // 社交媒体（Twitter、Discord、WeChat等）
  DEVELOPMENT: 'development', // 开发工具（语言、框架、工具）
  PLATFORMS: 'platforms', // 平台系统（OS、浏览器、游戏平台）
  UI: 'ui', // 用户界面（Search、Calendar、Globe等）
} as const

// 分类类型（从枚举中提取）
export type IconCategoryId =
  (typeof ICON_CATEGORIES)[keyof typeof ICON_CATEGORIES]

// 分类元数据映射（用于显示标签和描述）
export const CATEGORY_METADATA: Record<
  IconCategoryId,
  { name: string; label: string; description?: string }
> = {
  [ICON_CATEGORIES.ALL]: {
    name: 'All',
    label: 'All',
    description: 'All available icons',
  },
  [ICON_CATEGORIES.BRANDS]: {
    name: 'Brands',
    label: 'Brands',
    description: 'Brand logos and identities',
  },
  [ICON_CATEGORIES.SOCIAL]: {
    name: 'Social',
    label: 'Social',
    description: 'Social media platforms',
  },
  [ICON_CATEGORIES.DEVELOPMENT]: {
    name: 'Development',
    label: 'Development',
    description: 'Programming languages, frameworks, and dev tools',
  },
  [ICON_CATEGORIES.PLATFORMS]: {
    name: 'Platforms',
    label: 'Platforms',
    description: 'Operating systems, browsers, and platforms',
  },
  [ICON_CATEGORIES.UI]: {
    name: 'UI',
    label: 'UI',
    description: 'User interface elements',
  },
}

// ============================================
// 图标项配置（使用类型安全的分类常量，包含完整的描述和关键词）
// ============================================
export const iconItems: IconItem[] = [
  // ========== BRANDS ==========
  {
    name: 'Homebrew',
    component: Icons.HomebrewIcon,
    category: ICON_CATEGORIES.BRANDS,
    keywords: ['homebrew', 'package', 'manager', 'mac', 'brew', 'install'],
    displayName: 'Homebrew',
  },
  {
    name: 'Npm',
    component: Icons.NpmIcon,
    category: ICON_CATEGORIES.BRANDS,
    keywords: ['npm', 'node', 'package', 'manager', 'javascript'],
    displayName: 'NPM',
  },
  {
    name: 'Nodejs',
    component: Icons.NodejsIcon,
    category: ICON_CATEGORIES.BRANDS,
    keywords: ['nodejs', 'node', 'javascript', 'runtime', 'server'],
    displayName: 'Node.js',
  },
  {
    name: 'Youtube',
    component: Icons.YoutubeIcon,
    category: ICON_CATEGORIES.BRANDS,
    keywords: ['youtube', 'video', 'google', 'streaming', 'media'],
    displayName: 'YouTube',
  },
  {
    name: 'Spotify',
    component: Icons.SpotifyIcon,
    category: ICON_CATEGORIES.BRANDS,
    keywords: ['spotify', 'music', 'streaming', 'audio', 'podcast'],
    displayName: 'Spotify',
  },
  {
    name: 'Reddit',
    component: Icons.RedditIcon,
    category: ICON_CATEGORIES.BRANDS,
    keywords: ['reddit', 'social', 'community', 'forum', 'discussion'],
    displayName: 'Reddit',
  },

  // ========== SOCIAL MEDIA ==========
  {
    name: 'GithubIcon',
    component: Icons.GithubIcon,
    category: ICON_CATEGORIES.SOCIAL,
    keywords: [
      'github',
      'git',
      'code',
      'repository',
      'version',
      'control',
      'collaboration',
    ],
    displayName: 'GitHub',
  },
  {
    name: 'TwitterIcon',
    component: Icons.TwitterIcon,
    category: ICON_CATEGORIES.SOCIAL,
    keywords: ['twitter', 'x', 'social', 'tweet', 'microblog', 'news'],
    displayName: 'Twitter',
  },
  {
    name: 'DiscordIcon',
    component: Icons.DiscordIcon,
    category: ICON_CATEGORIES.SOCIAL,
    keywords: [
      'discord',
      'chat',
      'community',
      'voice',
      'communication',
      'gaming',
    ],
    displayName: 'Discord',
  },
  {
    name: 'WechatIcon',
    component: Icons.WechatIcon,
    category: ICON_CATEGORIES.SOCIAL,
    keywords: ['wechat', 'weixin', 'chat', 'messaging', 'china', 'tencent'],
    displayName: 'WeChat',
  },

  // ========== DEVELOPMENT ==========
  // Frameworks & Libraries
  {
    name: 'ReactIcon',
    component: Icons.ReactIcon,
    category: ICON_CATEGORIES.DEVELOPMENT,
    keywords: [
      'react',
      'framework',
      'library',
      'javascript',
      'ui',
      'component',
      'frontend',
    ],
    displayName: 'React',
  },
  {
    name: 'NextjsIcon',
    component: Icons.NextjsIcon,
    category: ICON_CATEGORIES.DEVELOPMENT,
    keywords: [
      'nextjs',
      'next',
      'react',
      'framework',
      'ssr',
      'vercel',
      'fullstack',
    ],
    displayName: 'Next.js',
  },
  {
    name: 'TailwindIcon',
    component: Icons.TailwindIcon,
    category: ICON_CATEGORIES.DEVELOPMENT,
    keywords: ['tailwind', 'css', 'styling', 'utility', 'frontend', 'design'],
    displayName: 'Tailwind CSS',
  },
  {
    name: 'SpringBootIcon',
    component: Icons.SpringBootIcon,
    category: ICON_CATEGORIES.DEVELOPMENT,
    keywords: [
      'spring',
      'boot',
      'java',
      'framework',
      'backend',
      'microservices',
    ],
    displayName: 'Spring Boot',
  },
  {
    name: 'TypescriptIcon',
    component: Icons.TypescriptIcon,
    category: ICON_CATEGORIES.DEVELOPMENT,
    keywords: ['typescript', 'ts', 'javascript', 'type', 'safety', 'microsoft'],
    displayName: 'TypeScript',
  },

  // Programming Languages
  {
    name: 'C',
    component: Icons.CIcon,
    category: ICON_CATEGORIES.DEVELOPMENT,
    keywords: ['c', 'language', 'programming', 'systems', 'low-level'],
    displayName: 'C',
  },
  {
    name: 'CPlusplus',
    component: Icons.CPlusplus,
    category: ICON_CATEGORIES.DEVELOPMENT,
    keywords: ['cpp', 'c++', 'cplusplus', 'programming', 'language', 'systems'],
    displayName: 'C++',
  },
  {
    name: 'CSharp',
    component: Icons.CSharpIcon,
    category: ICON_CATEGORIES.DEVELOPMENT,
    keywords: ['csharp', 'c#', 'dotnet', '.net', 'microsoft', 'language'],
    displayName: 'C#',
  },
  {
    name: 'Swift',
    component: Icons.SwiftIcon,
    category: ICON_CATEGORIES.DEVELOPMENT,
    keywords: ['swift', 'apple', 'ios', 'macos', 'mobile', 'language'],
    displayName: 'Swift',
  },
  {
    name: 'Python',
    component: Icons.PythonIcon,
    category: ICON_CATEGORIES.DEVELOPMENT,
    keywords: ['python', 'programming', 'language', 'scripting', 'ai', 'ml'],
    displayName: 'Python',
  },
  {
    name: 'JavaIcon',
    component: Icons.JavaIcon,
    category: ICON_CATEGORIES.DEVELOPMENT,
    keywords: [
      'java',
      'programming',
      'language',
      'jvm',
      'enterprise',
      'android',
    ],
    displayName: 'Java',
  },
  {
    name: 'JavascriptIcon',
    component: Icons.JavascriptIcon,
    category: ICON_CATEGORIES.DEVELOPMENT,
    keywords: [
      'javascript',
      'js',
      'programming',
      'language',
      'web',
      'frontend',
    ],
    displayName: 'JavaScript',
  },
  {
    name: 'PhpIcon',
    component: Icons.PhpIcon,
    category: ICON_CATEGORIES.DEVELOPMENT,
    keywords: ['php', 'programming', 'language', 'server', 'web', 'backend'],
    displayName: 'PHP',
  },
  {
    name: 'RubyIcon',
    component: Icons.RubyIcon,
    category: ICON_CATEGORIES.DEVELOPMENT,
    keywords: ['ruby', 'programming', 'language', 'rails', 'web'],
    displayName: 'Ruby',
  },
  {
    name: 'RustIcon',
    component: Icons.RustIcon,
    category: ICON_CATEGORIES.DEVELOPMENT,
    keywords: ['rust', 'programming', 'language', 'systems', 'memory', 'safe'],
    displayName: 'Rust',
  },
  {
    name: 'GopherIcon',
    component: Icons.GopherIcon,
    category: ICON_CATEGORIES.DEVELOPMENT,
    keywords: ['go', 'golang', 'gopher', 'programming', 'language', 'google'],
    displayName: 'Go',
  },
  {
    name: 'KotlinIcon',
    component: Icons.KotlinIcon,
    category: ICON_CATEGORIES.DEVELOPMENT,
    keywords: [
      'kotlin',
      'programming',
      'language',
      'android',
      'jvm',
      'jetbrains',
    ],
    displayName: 'Kotlin',
  },
  {
    name: 'DartIcon',
    component: Icons.DartIcon,
    category: ICON_CATEGORIES.DEVELOPMENT,
    keywords: [
      'dart',
      'programming',
      'language',
      'flutter',
      'google',
      'mobile',
    ],
    displayName: 'Dart',
  },

  // Databases & Tools
  {
    name: 'MysqlIcon',
    component: Icons.MysqlIcon,
    category: ICON_CATEGORIES.DEVELOPMENT,
    keywords: ['mysql', 'database', 'sql', 'relational', 'oracle', 'mariadb'],
    displayName: 'MySQL',
  },
  {
    name: 'RedisIcon',
    component: Icons.RedisIcon,
    category: ICON_CATEGORIES.DEVELOPMENT,
    keywords: ['redis', 'cache', 'database', 'nosql', 'memory', 'key-value'],
    displayName: 'Redis',
  },
  {
    name: 'GitIcon',
    component: Icons.GitIcon,
    category: ICON_CATEGORIES.DEVELOPMENT,
    keywords: ['git', 'version', 'control', 'source', 'repository', 'vcs'],
    displayName: 'Git',
  },
  {
    name: 'VimIcon',
    component: Icons.VimIcon,
    category: ICON_CATEGORIES.DEVELOPMENT,
    keywords: ['vim', 'editor', 'text', 'terminal', 'cli', 'neovim'],
    displayName: 'Vim',
  },

  // ========== PLATFORMS ==========
  {
    name: 'AppleIcon',
    component: Icons.AppleIcon,
    category: ICON_CATEGORIES.PLATFORMS,
    keywords: ['apple', 'mac', 'ios', 'macos', 'iphone', 'ipad', 'macbook'],
    displayName: 'Apple',
  },
  {
    name: 'GoogleIcon',
    component: Icons.GoogleIcon,
    category: ICON_CATEGORIES.PLATFORMS,
    keywords: ['google', 'search', 'platform', 'android', 'chrome', 'gmail'],
    displayName: 'Google',
  },
  {
    name: 'MicrosoftIcon',
    component: Icons.MicrosoftIcon,
    category: ICON_CATEGORIES.PLATFORMS,
    keywords: ['microsoft', 'windows', 'platform', 'office', 'azure', 'xbox'],
    displayName: 'Microsoft',
  },
  {
    name: 'LinuxIcon',
    component: Icons.LinuxIcon,
    category: ICON_CATEGORIES.PLATFORMS,
    keywords: ['linux', 'os', 'operating', 'system', 'unix', 'open-source'],
    displayName: 'Linux',
  },
  {
    name: 'ChromeIcon',
    component: Icons.ChromeIcon,
    category: ICON_CATEGORIES.PLATFORMS,
    keywords: ['chrome', 'browser', 'google', 'web', 'chromium'],
    displayName: 'Chrome',
  },
  {
    name: 'ArcIcon',
    component: Icons.ArcIcon,
    category: ICON_CATEGORIES.PLATFORMS,
    keywords: ['arc', 'browser', 'web', 'chromium', 'modern'],
    displayName: 'Arc Browser',
  },
  {
    name: 'PlayStationIcon',
    component: Icons.PlayStationIcon,
    category: ICON_CATEGORIES.PLATFORMS,
    keywords: ['playstation', 'ps', 'gaming', 'sony', 'console', 'ps5'],
    displayName: 'PlayStation',
  },
  {
    name: 'NintendoSwitchIcon',
    component: Icons.NintendoSwitchIcon,
    category: ICON_CATEGORIES.PLATFORMS,
    keywords: ['nintendo', 'switch', 'gaming', 'console', 'handheld'],
    displayName: 'Nintendo Switch',
  },
  {
    name: 'AwsIcon',
    component: Icons.AwsIcon,
    category: ICON_CATEGORIES.PLATFORMS,
    keywords: ['aws', 'amazon', 'cloud', 'hosting', 's3', 'ec2', 'lambda'],
    displayName: 'AWS',
  },
  {
    name: 'BitcoinIcon',
    component: Icons.BitcoinIcon,
    category: ICON_CATEGORIES.BRANDS,
    keywords: ['bitcoin', 'crypto', 'currency', 'btc', 'blockchain', 'payment'],
    displayName: 'Bitcoin',
  },

  // ========== USER INTERFACE ==========
  {
    name: 'SearchIcon',
    component: Icons.SearchIcon,
    category: ICON_CATEGORIES.UI,
    keywords: ['search', 'find', 'magnifier', 'lookup', 'query', 'filter'],
    displayName: 'Search',
  },
  {
    name: 'CalendarIcon',
    component: Icons.CalendarIcon,
    category: ICON_CATEGORIES.UI,
    keywords: ['calendar', 'date', 'schedule', 'time', 'event', 'appointment'],
    displayName: 'Calendar',
  },
  {
    name: 'EyeIcon',
    component: Icons.EyeIcon,
    category: ICON_CATEGORIES.UI,
    keywords: ['eye', 'view', 'visible', 'show', 'visibility', 'preview'],
    displayName: 'Eye',
  },
  {
    name: 'CommentIcon',
    component: Icons.CommentIcon,
    category: ICON_CATEGORIES.UI,
    keywords: ['comment', 'message', 'chat', 'feedback', 'discussion', 'reply'],
    displayName: 'Comment',
  },
  {
    name: 'GlobeIcon',
    component: Icons.GlobeIcon,
    category: ICON_CATEGORIES.UI,
    keywords: [
      'globe',
      'world',
      'internet',
      'web',
      'global',
      'international',
      'language',
    ],
    displayName: 'Globe',
  },

  // ========== ACTIONS ==========
  {
    name: 'HeartIcon',
    component: Icons.HeartIcon,
    category: ICON_CATEGORIES.UI,
    keywords: ['heart', 'like', 'favorite', 'love', 'wishlist', 'bookmark'],
    displayName: 'Heart',
  },
  {
    name: 'HeartFilledIcon',
    component: Icons.HeartFilledIcon,
    category: ICON_CATEGORIES.UI,
    keywords: ['heart', 'filled', 'loved', 'liked', 'favorite', 'saved'],
    displayName: 'Heart Filled',
  },
  {
    name: 'ThumbsUpIcon',
    component: Icons.ThumbsUpIcon,
    category: ICON_CATEGORIES.UI,
    keywords: ['thumbs', 'up', 'like', 'approve', 'agree', 'positive'],
    displayName: 'Thumbs Up',
  },
  {
    name: 'StarIcon',
    component: Icons.StarIcon,
    category: ICON_CATEGORIES.UI,
    keywords: [
      'star',
      'favorite',
      'rating',
      'bookmark',
      'featured',
      'important',
    ],
    displayName: 'Star',
  },
  {
    name: 'ShareIcon',
    component: Icons.ShareIcon,
    category: ICON_CATEGORIES.UI,
    keywords: ['share', 'forward', 'send', 'distribute', 'export', 'social'],
    displayName: 'Share',
  },

  // ========== LAYOUT ==========
  {
    name: 'DoubleColumnOutlined',
    component: Icons.DoubleColumnOutlined,
    category: ICON_CATEGORIES.UI,
    keywords: ['column', 'layout', 'grid', 'double', 'split', 'two-column'],
    displayName: 'Double Column',
  },
  {
    name: 'ThreeColumnOutlined',
    component: Icons.ThreeColumnOutlined,
    category: ICON_CATEGORIES.UI,
    keywords: ['column', 'layout', 'grid', 'three', 'triple', 'three-column'],
    displayName: 'Three Column',
  },
  {
    name: 'RightSideDoubleColumnOutlined',
    component: Icons.RightSideDoubleColumnOutlined,
    category: ICON_CATEGORIES.UI,
    keywords: ['column', 'right', 'sidebar', 'layout', 'panel', 'aside'],
    displayName: 'Right Sidebar',
  },
  {
    name: 'LeftSideDoubleColumnOutlined',
    component: Icons.LeftSideDoubleColumnOutlined,
    category: ICON_CATEGORIES.UI,
    keywords: ['column', 'left', 'sidebar', 'layout', 'panel', 'aside'],
    displayName: 'Left Sidebar',
  },

  // ========== THEME ==========
  {
    name: 'MoonFilledIcon',
    component: Icons.MoonFilledIcon,
    category: ICON_CATEGORIES.UI,
    keywords: ['moon', 'dark', 'night', 'theme', 'mode', 'appearance'],
    displayName: 'Dark Mode',
  },
  {
    name: 'SunFilledIcon',
    component: Icons.SunFilledIcon,
    category: ICON_CATEGORIES.UI,
    keywords: [
      'sun',
      'light',
      'day',
      'theme',
      'mode',
      'appearance',
      'brightness',
    ],
    displayName: 'Light Mode',
  },
]

export const categories: IconCategory[] = [
  // Always include 'all' category first
  {
    id: ICON_CATEGORIES.ALL,
    ...CATEGORY_METADATA[ICON_CATEGORIES.ALL],
  },
  // Extract unique categories from iconItems
  ...Array.from(new Set(iconItems.map(item => item.category)))
    .sort()
    .map(categoryId => ({
      id: categoryId,
      ...CATEGORY_METADATA[categoryId as IconCategoryId],
    })),
]

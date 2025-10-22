import * as ICONS from '@/components/icons'
import { IconCategory, IconMeta } from './type'

export const icons: IconMeta[] = [
  // Coding 分类
  {
    id: 'nodejs',
    name: 'Node.js',
    category: IconCategory.Humanitarian,
    component: ICONS.NodejsIcon,
    keywords: ['code', 'nodejs'],
  },
  {
    id: 'python',
    name: 'Python',
    category: IconCategory.Humanitarian,
    component: ICONS.PythonIcon,
    keywords: ['code', 'python'],
  },
  {
    id: 'java',
    name: 'Java',
    category: IconCategory.Humanitarian,
    component: ICONS.JavaIcon,
    keywords: ['code', 'java'],
  },
  {
    id: 'react',
    name: 'React',
    category: IconCategory.Humanitarian,
    component: ICONS.ReactIcon,
    keywords: ['code', 'react'],
  },
  {
    id: 'rust',
    name: 'Rust',
    category: IconCategory.Humanitarian,
    component: ICONS.RustIcon,
    keywords: ['code', 'rust'],
  },
  {
    id: 'swift',
    name: 'Swift',
    category: IconCategory.Humanitarian,
    component: ICONS.SwiftIcon,
    keywords: ['code', 'swift'],
  },
  {
    id: 'c',
    name: 'C',
    category: IconCategory.Humanitarian,
    component: ICONS.CIcon,
    keywords: ['code', 'c'],
  },
  {
    id: 'csharp',
    name: 'C#',
    category: IconCategory.Humanitarian,
    component: ICONS.CSharpIcon,
    keywords: ['code', 'csharp'],
  },
  
  // Brand 分类
  {
    id: 'apple',
    name: 'Apple',
    category: IconCategory.Business,
    component: ICONS.AppleIcon,
    keywords: ['brand', 'apple'],
  },
  {
    id: 'playstation',
    name: 'PlayStation',
    category: IconCategory.Gaming,
    component: ICONS.PlayStationIcon,
    keywords: ['brand', 'playstation'],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: IconCategory.Business,
    component: ICONS.NextjsIcon,
    keywords: ['brand', 'nextjs'],
  },
  {
    id: 'springboot',
    name: 'Spring Boot',
    category: IconCategory.Business,
    component: ICONS.SpringBootIcon,
    keywords: ['brand', 'springboot'],
  },
  {
    id: 'tailwind',
    name: 'Tailwind',
    category: IconCategory.Business,
    component: ICONS.TailwindIcon,
    keywords: ['brand', 'tailwind'],
  },
  {
    id: 'reddit',
    name: 'Reddit',
    category: IconCategory.Social,
    component: ICONS.RedditIcon,
    keywords: ['brand', 'reddit'],
  },
  {
    id: 'spotify',
    name: 'Spotify',
    category: IconCategory.MusicAudio,
    component: ICONS.SpotifyIcon,
    keywords: ['brand', 'spotify'],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    category: IconCategory.FilmVideo,
    component: ICONS.YoutubeIcon,
    keywords: ['brand', 'youtube'],
  },
  
  // Communication 分类 (使用Social分类替代)
  {
    id: 'comment',
    name: 'Comment',
    category: IconCategory.Social,
    component: ICONS.CommentIcon,
    keywords: ['communication', 'comment'],
  },
  {
    id: 'heart',
    name: 'Heart',
    category: IconCategory.Social,
    component: ICONS.HeartIcon,
    keywords: ['communication', 'heart'],
  },
  {
    id: 'heart-filled',
    name: 'Heart Filled',
    category: IconCategory.Social,
    component: ICONS.HeartFilledIcon,
    keywords: ['communication', 'heart'],
  },
  {
    id: 'thumbs-up',
    name: 'Thumbs Up',
    category: IconCategory.Social,
    component: ICONS.ThumbsUpIcon,
    keywords: ['communication', 'thumbs', 'up'],
  },
  
  // Navigation 分类 (使用Arrows分类替代)
  {
    id: 'search',
    name: 'Search',
    category: IconCategory.Arrows,
    component: ICONS.SearchIcon,
    keywords: ['navigation', 'search'],
  },
  {
    id: 'globe',
    name: 'Globe',
    category: IconCategory.Arrows,
    component: ICONS.GlobeIcon,
    keywords: ['navigation', 'globe'],
  },
  
  // System 分类
  {
    id: 'calendar',
    name: 'Calendar',
    category: IconCategory.Time,
    component: ICONS.CalendarIcon,
    keywords: ['system', 'calendar'],
  },
  {
    id: 'eye',
    name: 'Eye',
    category: IconCategory.Accessibility,
    component: ICONS.EyeIcon,
    keywords: ['system', 'eye'],
  },
  {
    id: 'plus',
    name: 'Plus',
    category: IconCategory.Editing,
    component: ICONS.PlusIcon,
    keywords: ['system', 'plus'],
  },
  {
    id: 'star',
    name: 'Star',
    category: IconCategory.Editing,
    component: ICONS.StarIcon,
    keywords: ['system', 'star'],
  },
  
  // 添加更多图标到相应的分类
  {
    id: 'homebrew',
    name: 'Homebrew',
    category: IconCategory.Business,
    component: ICONS.HomebrewIcon,
    keywords: ['brand', 'homebrew'],
  },
  
]
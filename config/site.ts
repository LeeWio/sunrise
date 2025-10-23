export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Sunrise Blog',
  description: '分享技术、记录生活、追逐光明的个人博客',
  author: {
    name: '博主姓名',
    avatar: '/images/avatar.svg',
    bio: '热爱技术，喜欢分享，专注于前端开发和用户体验设计。',
  },
  navItems: [
    {
      label: '首页',
      href: '/',
    },
    {
      label: '文章',
      href: '/blog',
    },
    {
      label: '分类',
      href: '/categories',
    },
    {
      label: '标签',
      href: '/tags',
    },
    {
      label: '关于',
      href: '/about',
    },
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Team',
      href: '/team',
    },
    {
      label: 'Calendar',
      href: '/calendar',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
    {
      label: 'Help & Feedback',
      href: '/help-feedback',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  links: {
    github: 'https://github.com/heroui-inc/heroui',
    twitter: 'https://twitter.com/hero_ui',
    docs: 'https://heroui.com',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
}

import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import { Link } from '@heroui/link'
import clsx from 'clsx'

import { Providers } from './providers'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/config/fonts'
import { Navbar } from '@/components/navbar'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['博客', '技术分享', '前端开发', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: siteConfig.author.name }],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: 'website',
    locale: 'zh_CN',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          'min-h-screen text-foreground bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="w-full mx-auto flex-grow">{children}</main>
            <footer className="w-full border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded flex items-center justify-center">
                      <span className="text-white font-bold text-xs">SR</span>
                    </div>
                    <p className="text-sm text-default-600">
                      © 2024 Sunrise Blog. Built with ❤️ using Next.js & HeroUI
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-default-600">
                    <Link href="/privacy" className="hover:text-primary transition-colors">
                      隐私政策
                    </Link>
                    <Link href="/terms" className="hover:text-primary transition-colors">
                      服务条款
                    </Link>
                    <Link href="/sitemap.xml" className="hover:text-primary transition-colors">
                      站点地图
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}

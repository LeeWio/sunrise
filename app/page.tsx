'use client'

import { useRef, useEffect } from 'react'
import { HeroSection } from '@/components/home/hero-section'
import { ArticleSection } from '@/components/home/article-section'
import { ColumnsSection } from '@/components/column/columns-section'
import { AboutSection } from '@/components/home/about-section'
import { NewsletterSection } from '@/components/home/newsletter-section'

export default function Home() {
  const articlesRef = useRef<HTMLDivElement>(null)

  const scrollToArticles = () => {
    articlesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    console.log('Home page loaded')
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <HeroSection scrollToArticles={scrollToArticles} />
      <div ref={articlesRef}>
        <ArticleSection />
      </div>
      <ColumnsSection />
      <AboutSection />
      <NewsletterSection />
    </div>
  )
}
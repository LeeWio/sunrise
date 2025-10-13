'use client'

import { use } from 'react'
import { Spinner } from '@heroui/react'

import { useGetQuery } from '@/feature/api/article-api'
import ArticleCard from '@/components/article/article-card'

export default function Page({ params }: { params: Promise<{ aid: string }> }) {
  const { aid } = use(params)

  const {
    data: article,
    isLoading,
    isFetching,
    error,
  } = useGetQuery(aid, {
    // pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
  })

  if (isLoading || isFetching) {
    return (
      <Spinner
        classNames={{ label: 'text-foreground mt-4' }}
        label="dots"
        variant="dots"
      />
    )
  }

  if (error || !article) return <div>加载失败</div>

  return <ArticleCard {...article} />
}

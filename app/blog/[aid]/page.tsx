'use client'

import { use } from 'react'
import { Spinner } from '@heroui/react'

import { ArticleDetail } from '@/components/article/article-detail'
import { useGetQuery } from '@/feature/api/article-api'

export default function Page({ params }: { params: Promise<{ aid: string }> }) {
  const { aid } = use(params)

  const {
    data: article,
    isLoading,
    isFetching,
    error,
  } = useGetQuery(aid, {
    pollingInterval: 3000,
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

  return <ArticleDetail article={article} />
}

'use client'

import { use } from 'react'
import { motion } from 'framer-motion'
import { Spinner, Button, Chip, Card, CardBody } from '@heroui/react'
import { ArrowUturnCcwLeft, CalendarIcon, EyeIcon } from '@/components/icons'
import Link from 'next/link'
import { useGetArticleByIdQuery } from '@/feature/api'

export default function Page({ params }: { params: Promise<{ aid: string }> }) {
  const { aid } = use(params)

  const {
    data: article,
    isLoading,
    isFetching,
    error,
  } = useGetArticleByIdQuery(aid, {
    refetchOnMountOrArgChange: true,
  })

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" label="加载文章中..." />
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-danger mb-4">文章不存在</h2>
          <p className="text-default-600 mb-6">无法找到您访问的文章</p>
          <Button as={Link} href="/blog" color="primary">
            返回博客列表
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 返回按钮 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Button
            as={Link}
            href="/blog"
            variant="flat"
            startContent={<ArrowUturnCcwLeft className="w-4 h-4" />}
          >
            返回博客
          </Button>
        </motion.div>

        {/* 文章内容 */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-lg">
            <CardBody className="p-8">
              {/* 文章头部 */}
              <header className="mb-8">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-3xl sm:text-4xl font-bold mb-6 leading-tight"
                >
                  {article.title}
                </motion.h1>

                {/* 文章元信息 */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap items-center gap-4 text-sm text-default-600 mb-6"
                >
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>
                      {new Date(article.createdAt).toLocaleDateString('zh-CN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <EyeIcon className="w-4 h-4" />
                    <span>{article.viewCount || 0} 次浏览</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>状态: {article.status === 'published' ? '已发布' : '草稿'}</span>
                  </div>
                </motion.div>

                {/* 文章摘要 */}
                {article.summary && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="p-4 bg-default-100 rounded-lg mb-6"
                  >
                    <p className="text-default-700 italic">{article.summary}</p>
                  </motion.div>
                )}
              </header>

              {/* 文章正文 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="prose prose-lg max-w-none"
              >
                <div
                  className="text-default-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </motion.div>

              {/* 文章标签 */}
              {article.tagIds && article.tagIds.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="mt-8 pt-8 border-t border-default-200"
                >
                  <h3 className="text-lg font-semibold mb-4">标签</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tagIds.map((tagId) => (
                      <Chip
                        key={tagId}
                        color="primary"
                        variant="flat"
                        size="sm"
                      >
                        {tagId}
                      </Chip>
                    ))}
                  </div>
                </motion.div>
              )}
            </CardBody>
          </Card>
        </motion.article>
      </div>
    </div>
  )
}

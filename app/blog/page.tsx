'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button, Card, CardBody, CardHeader, Chip, Pagination, Spinner } from '@heroui/react'
import { useGetArticlesQuery } from '@/feature/api'
import ArticleCard from '@/components/article/article-card'
import Link from 'next/link'

export default function BlogPage() {
  const [page, setPage] = useState(1)
  const pageSize = 9

  const { data: articlesData, isLoading, error } = useGetArticlesQuery({
    page,
    size: pageSize,
    status: 'published'
  })

  const articles = articlesData?.content || []
  const totalPages = articlesData?.totalPages || 1

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-danger mb-4">加载失败</h2>
          <p className="text-default-600">无法加载文章列表，请稍后重试</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            技术博客
          </h1>
          <p className="text-lg text-default-600 max-w-2xl mx-auto">
            分享最新的技术见解、项目经验和学习心得
          </p>
        </motion.div>

        {/* 文章网格 */}
        {articles.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              {articles.map((article, index) => (
                <motion.div
                  key={article.aid}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${article.aid}`} className="block">
                    <ArticleCard
                      id={article.aid}
                      title={article.title}
                      summary={article.summary}
                      tags={[]} // TODO: Fetch tag details
                      likes={0}
                      comments={0}
                      views={article.viewCount?.toString() || '0'}
                      date={new Date(article.createdAt).toLocaleDateString('zh-CN')}
                      featured={false}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* 分页 */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex justify-center"
              >
                <Pagination
                  total={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="lg"
                  showControls
                  boundaries={2}
                  siblings={1}
                />
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <h2 className="text-2xl font-bold text-default-600 mb-4">
              暂无文章
            </h2>
            <p className="text-default-500">
              还没有发布的文章，敬请期待！
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
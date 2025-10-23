'use client'

import { useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Chip,
  Tab,
  Tabs,
  Spinner,
} from '@heroui/react'
import { motion } from 'framer-motion'
import Link from 'next/link'

import {
  EyeIcon,
  ThumbsUpIcon,
  CalendarIcon,
  StarIcon,
  ArrowDownIcon,
} from '../icons'

const getCategoryGradient = (color: string) => {
  const gradients: { [key: string]: string } = {
    blue: 'from-blue-400 to-cyan-400',
    purple: 'from-purple-400 to-pink-400',
    pink: 'from-pink-400 to-red-400',
    cyan: 'from-cyan-400 to-blue-400',
    green: 'from-green-400 to-emerald-400',
  }

  return gradients[color] || 'from-purple-400 to-pink-400'
}

export function ArticleSection() {
  const [selectedTab, setSelectedTab] = useState('latest')

  const categories = [
    { name: 'Frontend Development', count: 15, color: 'blue' },
    { name: 'Backend Architecture', count: 12, color: 'purple' },
    { name: 'Artificial Intelligence', count: 8, color: 'pink' },
    { name: 'Cloud Native', count: 6, color: 'cyan' },
    { name: 'Database', count: 9, color: 'green' },
  ]

  const latestArticles = [
    {
      id: 1,
      title: '构建现代化的微服务架构：从零到一',
      summary:
        '深入探讨如何使用 Spring Boot 和 Docker 构建可扩展的微服务系统，包括服务发现、负载均衡、熔断器等核心概念的实际应用。',
      tags: ['微服务', 'Spring Boot', 'Docker'],
      likes: 245,
      comments: 42,
      views: '15.2k',
      date: '2024年10月15日',
      featured: true,
    },
    {
      id: 2,
      title: 'Next.js 15 的新特性解析：性能革命',
      summary:
        '全面解析 Next.js 15 带来的革命性变化，包括 Turbopack、App Router 优化、Server Components 等新技术的深度实践。',
      tags: ['Next.js', 'React', '性能优化'],
      likes: 189,
      comments: 28,
      views: '12.8k',
      date: '2024年10月12日',
      featured: false,
    },
    {
      id: 3,
      title: '大语言模型(LLM)在业务场景中的落地实践',
      summary:
        '分享将大语言模型集成到实际业务项目中的经验，包括提示工程、Fine-tuning、成本控制等关键技术要点。',
      tags: ['AI', 'LLM', '实践案例'],
      likes: 312,
      comments: 56,
      views: '18.5k',
      date: '2024年10月8日',
      featured: true,
    },
    {
      id: 4,
      title: 'Kubernetes 最佳实践：生产环境部署指南',
      summary:
        '详细介绍在 Kubernetes 生产环境中的最佳实践，包括资源配置、安全策略、监控告警、故障排查等重要主题。',
      tags: ['Kubernetes', 'DevOps', '容器编排'],
      likes: 167,
      comments: 31,
      views: '10.3k',
      date: '2024年10月5日',
      featured: false,
    },
    {
      id: 5,
      title: 'React 19 Hooks 深度解析：新特性与性能优化',
      summary:
        '深入分析 React 19 新增的 Hooks 特性，探讨如何通过优化 Hooks 使用来提升应用性能和开发体验。',
      tags: ['React', 'Hooks', '性能优化'],
      likes: 203,
      comments: 37,
      views: '13.7k',
      date: '2024年10月2日',
      featured: false,
    },
    {
      id: 6,
      title: '数据库查询优化：从慢查询到高性能',
      summary:
        '系统性地讲解数据库查询优化的方法论，包括索引设计、执行计划分析、分库分表等技术的实际应用。',
      tags: ['数据库', '性能优化', 'MySQL'],
      likes: 145,
      comments: 22,
      views: '8.9k',
      date: '2024年9月28日',
      featured: false,
    },
  ]

  const popularArticles = [
    {
      id: 7,
      title: 'TypeScript 高级类型系统完全指南',
      summary:
        '全面深入地介绍 TypeScript 的高级类型系统，包括泛型、条件类型、映射类型等概念的详细解析。',
      tags: ['TypeScript', '类型系统', '进阶'],
      likes: 425,
      comments: 78,
      views: '32.1k',
      date: '2024年9月20日',
      featured: true,
    },
    {
      id: 8,
      title: '系统架构设计：从单体到微服务的演进之路',
      summary:
        '分享大型系统架构设计的实战经验，详细解析从单体架构向微服务架构演进的完整过程和注意事项。',
      tags: ['架构设计', '微服务', '系统演进'],
      likes: 389,
      comments: 65,
      views: '28.7k',
      date: '2024年9月15日',
      featured: true,
    },
    {
      id: 9,
      title: '前端工程化：构建高效的工作流',
      summary:
        '深入探讨现代前端工程化的最佳实践，包括构建优化、代码规范、自动化测试、CI/CD 等核心话题。',
      tags: ['前端工程化', '构建工具', '自动化'],
      likes: 278,
      comments: 44,
      views: '19.6k',
      date: '2024年9月10日',
      featured: false,
    },
    {
      id: 10,
      title: 'Redis 深度应用：缓存设计与性能调优',
      summary:
        '详细介绍 Redis 在大型项目中的应用场景，包括缓存策略设计、数据结构选择、性能调优等实用技巧。',
      tags: ['Redis', '缓存', '性能调优'],
      likes: 356,
      comments: 59,
      views: '24.3k',
      date: '2024年9月5日',
      featured: false,
    },
    {
      id: 11,
      title: 'API 设计原则：构建优雅且可维护的接口',
      summary:
        '系统性地讲解 RESTful API 设计的核心原则，包括接口规范、版本管理、安全设计、文档维护等重要方面。',
      tags: ['API设计', 'RESTful', '接口规范'],
      likes: 267,
      comments: 38,
      views: '17.8k',
      date: '2024年8月30日',
      featured: false,
    },
    {
      id: 12,
      title: '云原生应用开发：现代化架构实践',
      summary:
        '全面介绍云原生应用开发的核心概念和技术栈，包括容器化、服务网格、DevOps 等关键技术的实践应用。',
      tags: ['云原生', '容器化', 'DevOps'],
      likes: 298,
      comments: 51,
      views: '21.4k',
      date: '2024年8月25日',
      featured: false,
    },
  ]

  const featuredArticles = [
    {
      id: 13,
      title: 'Vue 3 Composition API 完全指南',
      summary:
        '深入解析 Vue 3 Composition API 的核心概念和最佳实践，包括响应式系统、生命周期钩子和组合式函数的实用技巧。',
      tags: ['Vue.js', 'Composition API', '前端框架'],
      likes: 389,
      comments: 67,
      views: '25.4k',
      date: '2024年10月20日',
      featured: true,
    },
    {
      id: 14,
      title: '微前端架构实战：从理论到落地',
      summary:
        '分享大型企业级应用的微前端架构实践经验，包括模块联邦、样式隔离、状态管理等关键技术点的深度解析。',
      tags: ['微前端', '架构设计', '企业应用'],
      likes: 445,
      comments: 89,
      views: '31.2k',
      date: '2024年10月18日',
      featured: true,
    },
    {
      id: 15,
      title: 'GraphQL vs REST: API 设计的现代化选择',
      summary:
        '全面对比 GraphQL 和 REST API 设计模式，分析各自的优缺点和适用场景，帮助开发者做出更明智的技术选型。',
      tags: ['GraphQL', 'REST API', '后端开发'],
      likes: 312,
      comments: 54,
      views: '19.8k',
      date: '2024年10月16日',
      featured: true,
    },
  ]

  const isLoading = false
  const displayArticles =
    selectedTab === 'latest'
      ? latestArticles
      : selectedTab === 'popular'
        ? popularArticles
        : featuredArticles

  return (
    <section className="py-24" id="articles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Technical Articles
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-default-600 font-light max-w-2xl mx-auto">
            Code, Create, Inspire
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-20"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Chip
                className={`bg-gradient-to-r ${getCategoryGradient(category.color)} text-white font-medium px-4 py-2 shadow-md hover:shadow-lg transition-shadow`}
                variant="flat"
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                  <span>{category.name}</span>
                  <span className="text-white/90 text-sm">
                    ({category.count})
                  </span>
                </div>
              </Chip>
            </motion.div>
          ))}
        </motion.div>

        <div className="mb-16 relative">
          <div className="relative flex justify-between items-end mb-8 p-8">
            <Tabs
              color="primary"
              selectedKey={selectedTab}
              size="sm"
              variant="bordered"
              onSelectionChange={key => setSelectedTab(key as string)}
            >
              <Tab
                key="latest"
                title={
                  <div className="flex items-center space-x-2">
                    <CalendarIcon size={18} />
                    <span>Latest</span>
                  </div>
                }
              />
              <Tab
                key="popular"
                title={
                  <div className="flex items-center space-x-2">
                    <ThumbsUpIcon size={18} />
                    <span>Popular</span>
                  </div>
                }
              />
              <Tab
                key="featured"
                title={
                  <div className="flex items-center space-x-2">
                    <StarIcon size={18} />
                    <span>Featured</span>
                  </div>
                }
              />
            </Tabs>

            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link className="block" href="/blog">
                <Button
                  className="text-white font-medium hover:bg-white/20 backdrop-blur-sm"
                  endContent={
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{
                        duration: 1.5,
                        ease: 'easeInOut',
                        repeat: Infinity,
                      }}
                    >
                      <ArrowDownIcon className="text-white" size={16} />
                    </motion.div>
                  }
                  size="sm"
                  variant="ghost"
                >
                  View All
                </Button>
              </Link>
            </motion.div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <motion.div
                    className="h-full"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <Link className="block h-full" href={`/blog/${article.id}`}>
                      <Card className="relative w-full h-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                        <CardHeader className="absolute top-3 left-3 right-3 z-10 flex justify-between items-start">
                          <div className="flex gap-2 flex-wrap">
                            {article.featured && (
                              <Chip
                                className="before:bg-white/10 border-white/20 border-1 overflow-hidden before:rounded-xl"
                                radius="sm"
                                size="sm"
                                startContent={<StarIcon size={14} />}
                                variant="light"
                              >
                                Featured
                              </Chip>
                            )}
                            {article.tags.slice(0, 2).map((tag, tagIndex) => (
                              <Chip
                                key={tagIndex}
                                className="before:bg-white/10 border-white/20 border-1 overflow-hidden before:rounded-xl"
                                radius="sm"
                                size="sm"
                                variant="light"
                              >
                                {tag}
                              </Chip>
                            ))}
                          </div>
                        </CardHeader>

                        <CardBody className="absolute bottom-12 left-5 right-5 z-10 p-0">
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-white leading-tight line-clamp-2">
                              {article.title}
                            </h3>
                            <p className="text-sm text-gray-200 leading-relaxed line-clamp-2">
                              {article.summary}
                            </p>
                          </div>
                        </CardBody>

                        <CardFooter className="justify-between items-center before:bg-white/20 border-white/30 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                          <div className="flex-1 flex gap-2">
                            <Chip
                              color="primary"
                              size="sm"
                              startContent={<ThumbsUpIcon size={14} />}
                              variant="light"
                            >
                              {article.likes}
                            </Chip>
                            <Chip
                              color="warning"
                              size="sm"
                              startContent={<EyeIcon size={14} />}
                              variant="light"
                            >
                              {article.views}
                            </Chip>
                            <Chip
                              color="success"
                              size="sm"
                              startContent={<span>💬</span>}
                              variant="light"
                            >
                              {article.comments}
                            </Chip>
                          </div>

                          <Chip color="danger" size="sm" variant="light">
                            {article.date}
                          </Chip>
                        </CardFooter>
                      </Card>
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

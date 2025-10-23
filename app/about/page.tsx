'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Button,
  Chip,
  Progress,
  Tab,
  Tabs,
  Divider,
  Link,
  Spinner
} from '@heroui/react'
import {
  GithubIcon,
  TwitterIcon,
  MailIcon,
  MapPinIcon,
  CalendarIcon,
  SearchIcon,
  CommentIcon,
  ShareIcon,
  HeartIcon,
  ThumbsUpIcon,
  ArrowUturnCcwLeft
} from '@/components/icons'
import { siteConfig } from '@/config/site'
import { ReactLenis } from 'lenis/react'
import {
  useGetArticlesQuery,
  useGetAllCategoriesQuery,
  useGetAllTagsQuery
} from '@/feature/api'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
}

const FloatingLights = ({
  lights,
}: {
  lights: {
    size: number
    color: string
    top: string
    left?: string
    right?: string
    duration: number
  }[]
}) => (
  <>
    {lights.map((light, idx) => (
      <motion.div
        key={idx}
        animate={{
          x: ['0%', '2%', '-2%', '0%'],
          y: ['0%', '-2%', '2%', '0%'],
          scale: [1, 1.05, 0.95, 1],
          opacity: [0.1, 0.25, 0.15, 0.2],
        }}
        style={{
          width: light.size,
          height: light.size,
          background: `radial-gradient(circle, ${light.color}33, transparent)`,
          top: light.top,
          left: light.left,
          right: light.right,
          position: 'absolute',
          borderRadius: '50%',
          filter: 'blur(4rem)',
        }}
        transition={{
          duration: light.duration,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      />
    ))}
  </>
)

function StatsCard({ icon: Icon, title, value, suffix, color = 'primary' }: {
  icon: React.ComponentType<any>
  title: string
  value: string | number
  suffix?: string
  color?: string
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
      className="relative overflow-hidden group"
    >
      <Card className="h-full p-6 border border-white/10 bg-white/5 backdrop-blur-md hover:border-primary/30 transition-all duration-300 shadow-xl">
        <CardBody className="text-center space-y-4">
          {/* 背景光效 */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-${color}/20 to-${color}/10 mb-2 relative z-10`}>
            <Icon className={`w-6 h-6 text-${color}`} />
          </div>
          <h3 className="text-3xl font-bold text-white relative z-10">{value}{suffix}</h3>
          <p className="text-sm text-default-400 relative z-10">{title}</p>
        </CardBody>
      </Card>
    </motion.div>
  )
}

function SkillCard({ name, level, items }: { name: string; level: number; items: string[] }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-md hover:border-primary/30 transition-all duration-300 shadow-xl">
        <CardHeader className="pb-3">
          <h4 className="text-lg font-semibold text-white">{name}</h4>
        </CardHeader>
        <CardBody>
          <Progress
            value={level}
            color="primary"
            size="sm"
            className="mb-4"
            formatOptions={{ style: "percent", signDisplay: "always" }}
          />
          <div className="flex flex-wrap gap-2">
            {items.map((item, index) => (
              <Chip
                key={index}
                size="sm"
                color="primary"
                variant="flat"
                className="bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                {item}
              </Chip>
            ))}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )
}

export default function AboutPage() {
  const [selectedTab, setSelectedTab] = useState('overview')

  // 获取实际数据
  const { data: articlesData } = useGetArticlesQuery({ page: 1, size: 1000, status: 'published' })
  const { data: categoriesData } = useGetAllCategoriesQuery()
  const { data: tagsData } = useGetAllTagsQuery()

  const totalArticles = articlesData?.totalElements || 0
  const totalCategories = categoriesData?.length || 0
  const totalTags = tagsData?.length || 0

  const heroSection = {
    lights: [
      { size: 192, color: '#7c3aed', top: '10%', left: '15%', duration: 22 },
      { size: 288, color: '#5b21b6', top: '70%', left: '50%', duration: 25 },
      { size: 144, color: '#9333ea', top: '30%', right: '25%', duration: 20 },
      { size: 96, color: '#a855f7', top: '60%', right: '10%', duration: 18 },
      { size: 120, color: '#8b5cf6', top: '80%', left: '20%', duration: 30 },
    ],
  }

  // 背景几何形状组件
  const BackgroundShapes = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 大型几何形状 */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          rotate: [360, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tr from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"
      />

      {/* 浮动三角形 */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-32 right-32 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 clip-triangle blur-xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 clip-triangle blur-xl"
      />

      {/* 装饰性网格 */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-blue-900/5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* 光效 */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  )

  const skillsData = [
    {
      name: '前端开发',
      level: 90,
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript ES6+']
    },
    {
      name: '后端开发',
      level: 75,
      items: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'RESTful API', 'GraphQL']
    },
    {
      name: '工具与部署',
      level: 85,
      items: ['Git', 'Docker', 'Webpack', 'Vite', 'CI/CD', 'Linux', 'AWS']
    },
    {
      name: '设计相关',
      level: 70,
      items: ['Figma', 'Adobe XD', 'Photoshop', 'UI/UX', 'Responsive Design']
    }
  ]

  const experienceTimeline = [
    {
      year: '2024 - 现在',
      title: '全栈开发工程师',
      company: '个人项目',
      description: '专注于构建现代化的Web应用和博客系统，使用Next.js、Spring Boot等技术栈。'
    },
    {
      year: '2022 - 2024',
      title: '前端开发工程师',
      company: '科技公司',
      description: '负责企业级Web应用的前端开发，优化用户体验和性能。'
    },
    {
      year: '2020 - 2022',
      title: '前端开发实习生',
      company: '创业公司',
      description: '协助开发响应式网站和移动端应用，学习现代前端框架。'
    }
  ]

  return (
    <ReactLenis root>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <BackgroundShapes />
          <FloatingLights lights={heroSection.lights} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="text-center space-y-8 px-8 relative z-10 text-white"
          >
            <div className="space-y-6">
              <Avatar
                src={siteConfig.author.avatar}
                alt={siteConfig.author.name}
                className="w-32 h-32 mx-auto shadow-2xl"
                size="lg"
              />
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  关于我
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                  {siteConfig.author.bio}
                </p>
                <p className="text-lg text-white/80 max-w-xl mx-auto">
                  热爱技术，喜欢分享，专注于前端开发和用户体验设计。
                </p>
              </div>
              <div className="flex justify-center gap-6 pt-4">
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-primary-200 transition-colors"
                >
                  <GithubIcon size={28} />
                </Link>
                <Link
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-primary-200 transition-colors"
                >
                  <TwitterIcon size={28} />
                </Link>
                <Link
                  href={`mailto:contact@example.com`}
                  className="text-white hover:text-primary-200 transition-colors"
                >
                  <MailIcon size={28} />
                </Link>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="animate-bounce">
                <div className="w-6 h-10 border-2 border-white border-t-transparent rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Main Content */}
        <section className="relative py-20 px-4">
          {/* 背景装饰 */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-blue-900/10 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Tabs */}
            <div className="mb-12">
              <Tabs
                selectedKey={selectedTab}
                onSelectionChange={setSelectedTab}
                color="primary"
                variant="underlined"
                className="flex justify-center"
              >
                <Tab key="overview" title="概览" />
                <Tab key="skills" title="技能" />
                <Tab key="experience" title="经历" />
                <Tab key="contact" title="联系方式" />
              </Tabs>
            </div>

            {/* Tab Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-12"
            >
              {/* Overview Tab */}
              {selectedTab === 'overview' && (
                <>
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatsCard
                      icon={CommentIcon}
                      title="文章总数"
                      value={totalArticles}
                      suffix=" 篇"
                    />
                    <StatsCard
                      icon={ShareIcon}
                      title="分类数量"
                      value={totalCategories}
                      suffix=" 个"
                    />
                    <StatsCard
                      icon={HeartIcon}
                      title="标签总数"
                      value={totalTags}
                      suffix=" 个"
                    />
                    <StatsCard
                      icon={ThumbsUpIcon}
                      title="评论总数"
                      value={0}
                      suffix=" 条"
                    />
                  </div>

                  {/* About Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div variants={itemVariants}>
                      <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-md hover:border-primary/30 transition-all duration-300 shadow-xl">
                        <CardHeader>
                          <h3 className="text-xl font-semibold text-white">关于博客</h3>
                        </CardHeader>
                        <CardBody className="space-y-4">
                          <p className="text-default-300 leading-relaxed">
                            {siteConfig.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Chip color="primary" variant="flat" className="bg-white/10 text-white hover:bg-white/20 transition-colors">技术分享</Chip>
                            <Chip color="secondary" variant="flat" className="bg-white/10 text-white hover:bg-white/20 transition-colors">生活记录</Chip>
                            <Chip color="success" variant="flat" className="bg-white/10 text-white hover:bg-white/20 transition-colors">开源项目</Chip>
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-md hover:border-primary/30 transition-all duration-300 shadow-xl">
                        <CardHeader>
                          <h3 className="text-xl font-semibold text-white">兴趣领域</h3>
                        </CardHeader>
                        <CardBody className="space-y-3">
                          {[
                            '前端架构与性能优化',
                            '开源社区贡献',
                            '技术写作与知识分享',
                            '用户体验设计',
                            '云原生应用开发'
                          ].map((interest, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-primary rounded-full mt-1 flex-shrink-0" />
                              <span className="text-default-300">{interest}</span>
                            </div>
                          ))}
                        </CardBody>
                      </Card>
                    </motion.div>
                  </div>
                </>
              )}

              {/* Skills Tab */}
              {selectedTab === 'skills' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skillsData.map((skill, index) => (
                    <SkillCard key={index} {...skill} />
                  ))}
                </div>
              )}

              {/* Experience Tab */}
              {selectedTab === 'experience' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  {experienceTimeline.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="border-l-4 border-primary pl-8 relative"
                    >
                      <div className="absolute w-4 h-4 bg-primary rounded-full -left-[10px] top-0"></div>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="text-sm text-primary font-semibold min-w-[100px]">
                            {item.year}
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div>
                            <h4 className="text-lg font-semibold">{item.title}</h4>
                            <p className="text-sm text-default-600">{item.company}</p>
                          </div>
                          <p className="text-default-700">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Contact Tab */}
              {selectedTab === 'contact' && (
                <div className="max-w-2xl mx-auto">
                  <motion.div variants={itemVariants}>
                    <Card className="border border-white/10 bg-white/5 backdrop-blur-md hover:border-primary/30 transition-all duration-300 shadow-xl">
                      <CardHeader>
                        <h3 className="text-xl font-semibold text-white">联系信息</h3>
                      </CardHeader>
                      <CardBody className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <MailIcon className="w-5 h-5 text-default-400" />
                            <div>
                              <p className="font-medium text-white">邮箱</p>
                              <p className="text-default-400">contact@example.com</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <MapPinIcon className="w-5 h-5 text-default-400" />
                            <div>
                              <p className="font-medium text-white">位置</p>
                              <p className="text-default-400">北京，中国</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <GithubIcon className="w-5 h-5 text-default-400" />
                            <div>
                              <p className="font-medium text-white">GitHub</p>
                              <Link
                                href={siteConfig.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline flex items-center gap-1"
                              >
                                {siteConfig.links.github}
                                <ArrowUturnCcwLeft size={14} />
                              </Link>
                            </div>
                          </div>
                        </div>

                        <Divider className="bg-white/10" />

                        <div className="text-center">
                          <p className="text-default-400 mb-4">
                            如果你有任何问题或合作意向，欢迎联系我！
                          </p>
                          <Button
                            as={Link}
                            href={`mailto:contact@example.com`}
                            color="primary"
                            size="lg"
                            className="font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                          >
                            发送邮件
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </ReactLenis>
  )
}

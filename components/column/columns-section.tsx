'use client'

import { motion } from 'framer-motion'

import { Code2Icon, BrainIcon, DatabaseIcon } from '../icons'

import { ColumnCard } from './column-card'

export function ColumnsSection() {
  const columns = [
    {
      title: 'React Masterclass',
      gradientColors: ['#3B82F6', '#8B5CF6', '#EC4899'],
      icon: <Code2Icon className="text-white" size={24} />,
      totalArticles: 12,
      articles: [
        {
          id: '1',
          title: 'Understanding React Hooks: A Complete Guide',
          date: 'Oct 15, 2024',
          views: '5.2k',
        },
        {
          id: '2',
          title: 'State Management: Context API vs Redux Toolkit',
          date: 'Oct 10, 2024',
          views: '3.8k',
        },
        {
          id: '3',
          title: 'Performance Optimization in React Applications',
          date: 'Oct 5, 2024',
          views: '4.1k',
        },
        {
          id: '4',
          title: 'Server Components vs Client Components',
          date: 'Sep 28, 2024',
          views: '6.7k',
        },
        {
          id: '5',
          title: 'Building Custom Hooks: Best Practices',
          date: 'Sep 20, 2024',
          views: '2.9k',
        },
        {
          id: '6',
          title: 'Advanced React Patterns: Render Props & HOCs',
          date: 'Sep 15, 2024',
          views: '4.2k',
        },
        {
          id: '7',
          title: 'React Suspense: A Deep Dive',
          date: 'Sep 10, 2024',
          views: '3.6k',
        },
        {
          id: '8',
          title: 'Testing React Applications: Best Practices',
          date: 'Sep 5, 2024',
          views: '5.1k',
        },
        {
          id: '9',
          title: "React 19: What's New and Exciting",
          date: 'Aug 30, 2024',
          views: '7.3k',
        },
        {
          id: '10',
          title: 'Building Scalable React Architecture',
          date: 'Aug 25, 2024',
          views: '4.8k',
        },
        {
          id: '11',
          title: 'React Native vs React for Web',
          date: 'Aug 20, 2024',
          views: '3.9k',
        },
        {
          id: '12',
          title: 'Micro-Frontends with React',
          date: 'Aug 15, 2024',
          views: '6.2k',
        },
      ],
    },
    {
      title: 'AI & Machine Learning',
      gradientColors: ['#8B5CF6', '#EC4899', '#F59E0B'],
      icon: <BrainIcon className="text-white" size={24} />,
      totalArticles: 15,
      articles: [
        {
          id: '15',
          title: 'Large Language Models: A Developer Guide',
          date: 'Oct 16, 2024',
          views: '8.9k',
        },
        {
          id: '16',
          title: 'Building AI-Powered Applications',
          date: 'Oct 11, 2024',
          views: '6.4k',
        },
        {
          id: '17',
          title: 'Prompt Engineering Best Practices',
          date: 'Oct 6, 2024',
          views: '5.7k',
        },
        {
          id: '18',
          title: 'Neural Networks: From Scratch',
          date: 'Sep 30, 2024',
          views: '7.2k',
        },
        {
          id: '19',
          title: 'Fine-tuning Models for Your Use Case',
          date: 'Sep 23, 2024',
          views: '4.8k',
        },
        {
          id: '20',
          title: 'Vector Databases: A Complete Guide',
          date: 'Sep 18, 2024',
          views: '5.3k',
        },
        {
          id: '21',
          title: 'LangChain: Building LLM Applications',
          date: 'Sep 12, 2024',
          views: '6.8k',
        },
        {
          id: '22',
          title: 'AI Ethics: Responsible Development',
          date: 'Sep 8, 2024',
          views: '3.7k',
        },
        {
          id: '23',
          title: 'Computer Vision with Python',
          date: 'Sep 2, 2024',
          views: '4.9k',
        },
        {
          id: '24',
          title: 'Reinforcement Learning: A Practical Guide',
          date: 'Aug 28, 2024',
          views: '5.6k',
        },
        {
          id: '25',
          title: 'Transformers: Architecture and Applications',
          date: 'Aug 22, 2024',
          views: '7.1k',
        },
        {
          id: '26',
          title: 'AI Integration in Web Applications',
          date: 'Aug 16, 2024',
          views: '6.3k',
        },
        {
          id: '27',
          title: 'Machine Learning Deployment Strategies',
          date: 'Aug 10, 2024',
          views: '4.5k',
        },
        {
          id: '28',
          title: 'Natural Language Processing: Fundamentals',
          date: 'Aug 5, 2024',
          views: '5.8k',
        },
        {
          id: '29',
          title: 'Deep Learning: Beyond the Basics',
          date: 'Jul 30, 2024',
          views: '6.9k',
        },
      ],
    },
    {
      title: 'Database & Architecture',
      gradientColors: ['#10B981', '#06B6D4', '#3B82F6'],
      icon: <DatabaseIcon className="text-white" size={24} />,
      totalArticles: 10,
      articles: [
        {
          id: '30',
          title: 'PostgreSQL Performance Tuning: A Complete Guide',
          date: 'Oct 18, 2024',
          views: '9.2k',
        },
        {
          id: '31',
          title: 'Database Design Patterns: From Theory to Practice',
          date: 'Oct 14, 2024',
          views: '7.6k',
        },
        {
          id: '32',
          title: 'Microservices Architecture: Design Principles',
          date: 'Oct 9, 2024',
          views: '8.1k',
        },
        {
          id: '33',
          title: 'Distributed Systems: Building Scalable Apps',
          date: 'Oct 2, 2024',
          views: '6.4k',
        },
        {
          id: '34',
          title: 'Container Orchestration with Kubernetes',
          date: 'Sep 25, 2024',
          views: '8.7k',
        },
        {
          id: '35',
          title: 'API Design Best Practices: REST vs GraphQL',
          date: 'Sep 18, 2024',
          views: '5.9k',
        },
        {
          id: '36',
          title: 'Database Migration Strategies: Zero Downtime',
          date: 'Sep 12, 2024',
          views: '4.8k',
        },
        {
          id: '37',
          title: 'Caching Patterns: Redis vs Memcached',
          date: 'Sep 5, 2024',
          views: '6.3k',
        },
        {
          id: '38',
          title: 'Event-Driven Architecture with Message Queues',
          date: 'Aug 28, 2024',
          views: '7.4k',
        },
        {
          id: '39',
          title: 'Data Modeling: From ERD to Implementation',
          date: 'Aug 20, 2024',
          views: '5.2k',
        },
      ],
    },
  ]

  return (
    <section className="py-24">
      <div className="px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <motion.h2
            className="text-5xl sm:text-6xl lg:text-8xl font-black mb-6"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Mind Sparks
            </span>
          </motion.h2>
          <motion.p
            className="text-xl lg:text-2xl text-default-700 max-w-3xl mx-auto leading-relaxed mb-6"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Where curiosity meets creativity, ideas dance with possibilities,
            and the extraordinary emerges from the ordinary
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileInView={{ opacity: 1 }}
          >
            <a
              className="inline-flex items-center gap-2 text-default-500 hover:text-default-700 text-sm font-light transition-colors duration-200"
              href="/columns"
            >
              wander through more wonders
              <span className="opacity-60">→</span>
            </a>
          </motion.div>
        </motion.div>

        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* First column - positioned normally */}
            <motion.div
              className="flex-1 lg:max-w-[32%]"
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.7 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <ColumnCard
                articles={columns[0].articles}
                gradientColors={columns[0].gradientColors}
                icon={columns[0].icon}
                title={columns[0].title}
                totalArticles={columns[0].totalArticles}
              />
            </motion.div>

            {/* Second column - elevated and centered */}
            <motion.div
              className="flex-1 lg:max-w-[32%] lg:mt-8"
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <ColumnCard
                articles={columns[1].articles}
                gradientColors={columns[1].gradientColors}
                icon={columns[1].icon}
                title={columns[1].title}
                totalArticles={columns[1].totalArticles}
              />
            </motion.div>

            {/* Third column - slightly offset */}
            <motion.div
              className="flex-1 lg:max-w-[32%] lg:mt-4"
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <ColumnCard
                articles={columns[2].articles}
                gradientColors={columns[2].gradientColors}
                icon={columns[2].icon}
                title={columns[2].title}
                totalArticles={columns[2].totalArticles}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

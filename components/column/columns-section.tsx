'use client'

import { motion } from 'framer-motion'

import { Code2Icon, BrainIcon } from '../icons'

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
  ]

  return (
    <section className="py-24">
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
              Featured Columns
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-default-600 font-light max-w-2xl mx-auto">
            Deep-dive series covering modern web development topics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {columns.map((column, index) => (
            <ColumnCard
              key={column.title}
              articles={column.articles}
              gradientColors={column.gradientColors}
              icon={column.icon}
              title={column.title}
              totalArticles={column.totalArticles}
            />
          ))}
        </div>
      </div>
    </section>
  )
}


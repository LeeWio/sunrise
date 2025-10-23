'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface HeroSectionProps {
  scrollToArticles: () => void
}

export function HeroSection({ scrollToArticles }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto w-full">
        <div className="min-h-screen flex flex-col justify-center">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            >
              <span className="block">分享技术</span>
              <span className="block text-gray-600">创造价值</span>
            </motion.h1>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto mb-16 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            >
              记录编程学习之路，分享项目实战经验
            </motion.p>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <Link
                className="px-10 py-4 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-all duration-200 hover:scale-105 text-base"
                href="/blog"
              >
                开始阅读
              </Link>

              <Link
                className="px-10 py-4 bg-white text-black font-medium rounded-xl border-2 border-gray-900 hover:bg-gray-50 transition-all duration-200 hover:scale-105 text-base"
                href="/about"
              >
                关于我
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            className="cursor-pointer"
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            onClick={scrollToArticles}
          >
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

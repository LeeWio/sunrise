'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

import { GithubIcon, TwitterIcon } from '../icons'

interface HeroSectionProps {
  scrollToArticles: () => void
}

export function HeroSection({ scrollToArticles }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto w-full">
        <div className="min-h-screen flex flex-col justify-center">
          {/* Main content */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {/* Pre-title */}
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hello, I'm
            </motion.p>

            {/* Main headline */}
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            >
              <span className="block">A Creative</span>
              <span className="block text-gray-600">Developer</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto mb-16 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            >
              I build beautiful, functional digital experiences that make a
              difference
            </motion.p>

            {/* Stats section */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center gap-16 mb-16"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">3+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-500">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">∞</div>
                <div className="text-sm text-gray-500">Always Learning</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <Link
                className="px-10 py-4 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-all duration-200 hover:scale-105 text-base"
                href="/blog"
              >
                View My Work
              </Link>

              <Link
                className="px-10 py-4 bg-white text-black font-medium rounded-xl border-2 border-gray-900 hover:bg-gray-50 transition-all duration-200 hover:scale-105 text-base"
                href="/about"
              >
                Get In Touch
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center gap-8"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <Link
                className="text-gray-600 hover:text-black transition-colors hover:scale-110 duration-200"
                href="https://github.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <GithubIcon size={24} />
              </Link>
              <Link
                className="text-gray-600 hover:text-black transition-colors hover:scale-110 duration-200"
                href="https://twitter.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <TwitterIcon size={24} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator - minimal version */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.8 }}
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

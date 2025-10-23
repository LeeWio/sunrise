'use client'

import { Button, Chip } from '@heroui/react'
import { Link } from '@heroui/react'
import { motion } from 'framer-motion'

import {
  ArrowDownIcon,
  GithubIcon,
  TwitterIcon,
} from '../icons'

interface HeroSectionProps {
  scrollToArticles: () => void
}

export function HeroSection({ scrollToArticles }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{
            duration: 8,
            ease: 'easeInOut',
            repeat: Infinity
          }}
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.25, 0.1],
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0]
          }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-pink-400/20 via-yellow-400/20 to-orange-400/20 rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{
            duration: 10,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: 2
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen">
          {/* Left side - Main content */}
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-left"
          >
            {/* Status badges */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-200/30 rounded-full backdrop-blur-sm">
                <span className="text-sm font-medium text-emerald-700">🌟 Available for Hire</span>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-200/30 rounded-full backdrop-blur-sm">
                <span className="text-sm font-medium text-blue-700">💼 Open to Projects</span>
              </div>
            </motion.div>

            {/* Main headline */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-6">
                <motion.span
                  animate={{
                    opacity: [0, 1],
                    y: [20, 0],
                    scale: [0.95, 1]
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="inline-block bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  Building
                </motion.span>
                <br />
                <motion.span
                  animate={{
                    opacity: [0, 1],
                    y: [20, 0],
                    scale: [0.95, 1]
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.6,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                >
                  Digital
                </motion.span>
                <br />
                <motion.span
                  animate={{
                    opacity: [0, 1],
                    y: [20, 0],
                    scale: [0.95, 1]
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.8,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="inline-block bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 bg-clip-text text-transparent"
                >
                  Experiences
                </motion.span>
              </h1>

              <motion.div
                animate={{ opacity: [0, 1], y: [10, 0] }}
                transition={{
                  duration: 0.8,
                  delay: 1.0,
                  type: "spring",
                  stiffness: 80
                }}
                className="relative"
              >
                <p className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-700 leading-relaxed mb-4">
                  <motion.span
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      duration: 6,
                      ease: 'easeInOut',
                      repeat: Infinity
                    }}
                    className="font-medium bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto]"
                  >
                    Creating innovative solutions
                  </motion.span>
                </p>
                <motion.span
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{
                    duration: 3,
                    ease: 'easeInOut',
                    repeat: Infinity
                  }}
                  className="text-gray-600 font-normal text-lg"
                >
                  Transforming ideas into elegant, high-performance web applications
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Skill keywords */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="flex flex-wrap gap-3">
                {[
                  { text: 'React', color: 'blue' },
                  { text: 'TypeScript', color: 'indigo' },
                  { text: 'Node.js', color: 'green' },
                  { text: 'Cloud', color: 'purple' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
                  >
                    <Chip
                      variant="flat"
                      size="lg"
                      className={`bg-gradient-to-r from-${item.color}-400/20 to-${item.color}-500/20 text-${item.color}-700 border border-${item.color}-200/30 font-medium px-4`}
                    >
                      {item.text}
                    </Chip>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Visual elements and actions */}
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="text-center lg:text-right"
          >
            {/* Animated status */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full border border-amber-200 backdrop-blur-sm">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-2 h-2 bg-amber-500 rounded-full"
                />
                <span className="text-amber-700 font-medium text-sm">Currently Building</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row lg:flex-col gap-6 mb-12 justify-center lg:items-end"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.div
                whileHover={{
                  scale: 1.03,
                  y: -6,
                  transition: { duration: 0.2, type: "spring", stiffness: 400 }
                }}
                whileTap={{
                  scale: 0.97,
                  transition: { duration: 0.1 }
                }}
                animate={{
                  y: [0, -2, 0]
                }}
                transition={{
                  duration: 4,
                  ease: 'easeInOut',
                  repeat: Infinity
                }}
              >
                <Link
                  href="/blog"
                  className="group relative inline-flex items-center justify-center px-14 py-6 text-xl font-bold text-white rounded-full shadow-2xl overflow-hidden"
                >
                  <motion.div
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      duration: 6,
                      ease: 'easeInOut',
                      repeat: Infinity
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-[length:200%_auto]"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500"
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    View Portfolio
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{
                        duration: 1.5,
                        ease: 'easeInOut',
                        repeat: Infinity
                      }}
                      className="text-xl"
                    >
                      →
                    </motion.span>
                  </span>
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 3,
                      ease: 'easeInOut',
                      repeat: Infinity
                    }}
                    className="absolute -inset-1 bg-gradient-to-r from-emerald-400/30 to-purple-400/30 rounded-full blur-lg -z-10"
                  />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.03,
                  y: -6,
                  transition: { duration: 0.2, type: "spring", stiffness: 400 }
                }}
                whileTap={{
                  scale: 0.97,
                  transition: { duration: 0.1 }
                }}
                animate={{
                  y: [0, -2, 0]
                }}
                transition={{
                  duration: 4,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  delay: 2
                }}
              >
                <Link
                  href="/about"
                  className="group relative inline-flex items-center justify-center px-14 py-6 text-xl font-bold text-gray-700 bg-white/90 backdrop-blur-sm border-2 border-gray-200/60 rounded-full shadow-xl overflow-hidden"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100"
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    Learn More
                    <motion.span
                      animate={{ x: [0, 2, 0] }}
                      transition={{
                        duration: 1.5,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        delay: 0.5
                      }}
                      className="text-xl"
                    >
                      →
                    </motion.span>
                  </span>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 rounded-full border-2 border-blue-200/50"
                  />
                </Link>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center lg:justify-end gap-6 mb-16"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {[
                { icon: GithubIcon, href: 'https://github.com', label: 'GitHub' },
                { icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
              ].map((social, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                >
                  <Button
                    isIconOnly
                    aria-label={social.label}
                    as={Link}
                    className="bg-white/50 hover:bg-white/70 backdrop-blur-sm border border-gray-200/50"
                    href={social.href}
                    rel="noopener noreferrer"
                    size="lg"
                    target="_blank"
                    variant="flat"
                  >
                    <social.icon size={24} />
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="relative group">
              <Button
                isIconOnly
                aria-label="Scroll to articles"
                className="rounded-full bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg"
                size="lg"
                variant="flat"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToArticles}
              >
                <ArrowDownIcon size={28} className="text-gray-700" />
              </Button>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileHover={{ opacity: 1, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 rounded-full bg-blue-400/20 blur-lg"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
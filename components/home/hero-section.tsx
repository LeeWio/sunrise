'use client'

import { motion } from 'framer-motion'

interface HeroSectionProps {
  scrollToArticles: () => void
}

export function HeroSection({ scrollToArticles }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="w-full">
        <div className="min-h-screen flex flex-col justify-center -mt-20">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {/* Decorative elements */}
            <motion.div
              animate={{ opacity: 0.1, scale: 1 }}
              className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl"
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            <motion.div
              animate={{ opacity: 0.1, scale: 1 }}
              className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full blur-3xl"
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 2, delay: 0.7 }}
            />

            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="relative text-6xl sm:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            >
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent relative">
                Where <span className="text-inherit">Minds</span>
                {/* Arrow indicator positioned relative to "Where" */}
                <motion.svg
                  animate={{ opacity: 1 }}
                  className="absolute -top-20 -left-16 sm:-top-24 sm:-left-20 lg:-top-32 lg:-left-24 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 2.5 }}
                  version="1.1"
                  viewBox="0 0 800 800"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="arrowGradient"
                      x1="0%"
                      x2="100%"
                      y1="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                    <marker
                      id="arrowMarker"
                      markerHeight="10"
                      markerWidth="10"
                      orient="auto"
                      refX="5"
                      refY="5"
                      viewBox="0 0 10 10"
                    >
                      <polyline
                        fill="none"
                        points="0,5 5,2.5 0,0"
                        stroke="url(#arrowGradient)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.6666666666666667"
                        transform="matrix(1,0,0,1,1.6666666666666667,2.5)"
                      />
                    </marker>
                  </defs>
                  <motion.path
                    animate={{ pathLength: 1 }}
                    d="M250 250Q450 350 400 400Q294 533 550 550"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    markerEnd="url(#arrowMarker)"
                    stroke="url(#arrowGradient)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="10"
                    transition={{
                      duration: 3,
                      delay: 2.8,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.svg>
              </span>
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Meet & Grow
              </span>
            </motion.h1>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-16 leading-relaxed font-light tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            >
              Every journey that brings us here is written in the stars.
              <br />
              This is where ideas bloom and connections grow.
            </motion.p>
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

'use client'

import { motion } from 'framer-motion'
import { ReactLenis } from 'lenis/react'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
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

export default function AboutPage() {
  const sections = [
    {
      id: 'welcome',
      bg: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900',
      textColor: 'text-white',
      lights: [
        { size: 192, color: '#7c3aed', top: '10%', left: '15%', duration: 22 },
        { size: 288, color: '#5b21b6', top: '70%', left: '50%', duration: 25 },
        { size: 144, color: '#9333ea', top: '30%', right: '25%', duration: 20 },
      ],
      title: 'Welcome to My Digital Space 👋',
      subtitle: 'Scroll down — I’ll show you who I am.',
    },
    {
      id: 'whoami',
      bg: 'bg-gradient-to-br from-gray-100 via-purple-200 to-blue-100',
      textColor: 'text-gray-900',
      lights: [
        { size: 160, color: '#c4b5fd', top: '20%', left: '20%', duration: 18 },
        { size: 224, color: '#a78bfa', top: '60%', right: '15%', duration: 22 },
        { size: 120, color: '#818cf8', top: '40%', left: '60%', duration: 20 },
      ],
      title: 'Hi, I’m Wei.',
      subtitle:
        'A front-end developer & designer who loves crafting smooth, meaningful, and beautiful web experiences.',
      extra:
        'Currently building my blog and open-source components with Next.js, Motion, and curiosity ✨',
    },
    {
      id: 'whywrite',
      bg: 'bg-gradient-to-tr from-indigo-900 via-slate-800 to-purple-700',
      textColor: 'text-white',
      lights: [
        { size: 200, color: '#7c3aed', top: '15%', left: '25%', duration: 17 },
        { size: 160, color: '#5b21b6', top: '55%', right: '20%', duration: 19 },
        { size: 140, color: '#9333ea', top: '35%', left: '60%', duration: 21 },
      ],
      title: 'Why I Write ✍️',
      subtitle:
        'I write to think clearly, to share what I learn, and to connect with curious minds like yours.',
      extra: 'Every article is a conversation — not a lecture.',
    },
    {
      id: 'whatibuild',
      bg: 'bg-gradient-to-br from-blue-100 via-cyan-100 to-green-100',
      textColor: 'text-gray-900',
      lights: [
        { size: 180, color: '#22d3ee', top: '10%', left: '30%', duration: 15 },
        { size: 200, color: '#60a5fa', top: '65%', right: '25%', duration: 18 },
        { size: 140, color: '#22c55e', top: '40%', left: '55%', duration: 20 },
      ],
      title: 'What I Build 🧩',
      subtitle:
        'Tools, UI kits, and ideas for the modern web. Every line of code tells a small story.',
      tags: ['Next.js', 'Tailwind', 'Motion', 'Design Systems', 'Open Source'],
    },
    {
      id: 'thankyou',
      bg: 'bg-gradient-to-br from-slate-900 via-purple-800 to-rose-700',
      textColor: 'text-white',
      lights: [
        { size: 200, color: '#7c3aed', top: '15%', left: '20%', duration: 16 },
        { size: 180, color: '#d946ef', top: '60%', right: '25%', duration: 20 },
        { size: 150, color: '#f43f5e', top: '35%', left: '55%', duration: 18 },
      ],
      title: 'Thank You 🙏',
      subtitle:
        "I hope you enjoyed this little tour of my digital space. Let's build something amazing together!",
    },
  ]

  return (
    <ReactLenis root>
      <main>
        {sections.map(section => (
          <section
            key={section.id}
            className={`relative h-screen w-full overflow-hidden ${section.bg} flex items-center justify-center`}
          >
            <FloatingLights lights={section.lights} />
            <motion.div
              className={`text-center space-y-5 px-8 relative z-10 ${section.textColor}`}
              initial="initial"
              variants={fadeUp}
              whileInView="animate"
            >
              <h1 className="text-5xl md:text-6xl 2xl:text-7xl font-extrabold tracking-tight drop-shadow-lg">
                {section.title}
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto leading-loose">
                {section.subtitle}
              </p>
              {section.extra && (
                <p className="text-base md:text-lg max-w-2xl mx-auto leading-loose text-gray-700">
                  {section.extra}
                </p>
              )}
              {section.tags && (
                <div className="flex flex-wrap gap-3 justify-center text-gray-800 font-medium">
                  {section.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/30 backdrop-blur rounded-full shadow-sm text-sm md:text-base"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </section>
        ))}
      </main>
    </ReactLenis>
  )
}

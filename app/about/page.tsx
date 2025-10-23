'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactLenis } from 'lenis/react'
import { useState, useEffect } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Accordion,
  AccordionItem,
  Tooltip,
  Snippet,
  Button,
  Avatar,
  Progress,
  Badge,
  Divider,
} from '@heroui/react'

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
  const skills = [
  { name: 'React', level: 90, color: 'danger' },
  { name: 'TypeScript', level: 85, color: 'primary' },
  { name: 'Next.js', level: 88, color: 'secondary' },
  { name: 'Tailwind CSS', level: 92, color: 'success' },
  { name: 'Node.js', level: 75, color: 'warning' },
]

const projects = [
  { title: 'E-Commerce Platform', tech: ['Next.js', 'Stripe', 'PostgreSQL'], status: 'Completed' },
  { title: 'AI Chat Assistant', tech: ['React', 'OpenAI', 'WebSocket'], status: 'In Progress' },
  { title: 'Design System', tech: ['TypeScript', 'Storybook', 'Figma'], status: 'Ongoing' },
]

const funFacts = [
  { icon: '☕', fact: '3+ cups of coffee per day', tooltip: 'Developer fuel!' },
  { icon: '🎵', fact: 'Lo-fi music while coding', tooltip: 'Keeps me in the zone' },
  { icon: '🌱', fact: 'Plant parent to 15+ plants', tooltip: 'They keep me company' },
  { icon: '📚', fact: 'Tech blog enthusiast', tooltip: 'Always learning something new' },
]

  return (
    <ReactLenis root>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center overflow-hidden">
          <FloatingLights lights={[
            { size: 192, color: '#7c3aed', top: '10%', left: '15%', duration: 22 },
            { size: 288, color: '#5b21b6', top: '70%', left: '50%', duration: 25 },
            { size: 144, color: '#9333ea', top: '30%', right: '25%', duration: 20 },
          ]} />

          <motion.div
            className="text-center space-y-8 px-8 relative z-10 text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <Avatar
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Profile"
              className="w-32 h-32 mx-auto"
              size="lg"
            />
            <h1 className="text-5xl md:text-6xl font-extrabold">
              Wei Li
            </h1>
            <div className="flex flex-wrap gap-3 justify-center">
              <Chip color="primary" variant="flat">Frontend Developer</Chip>
              <Chip color="secondary" variant="flat">UI/UX Enthusiast</Chip>
              <Chip color="success" variant="flat">Open Source Contributor</Chip>
            </div>
            <div className="flex gap-4 justify-center">
              <Tooltip content="GitHub">
                <Button isIconOnly variant="flat" color="default">
                  <span className="text-2xl">🐙</span>
                </Button>
              </Tooltip>
              <Tooltip content="Twitter">
                <Button isIconOnly variant="flat" color="default">
                  <span className="text-2xl">🐦</span>
                </Button>
              </Tooltip>
              <Tooltip content="LinkedIn">
                <Button isIconOnly variant="flat" color="default">
                  <span className="text-2xl">💼</span>
                </Button>
              </Tooltip>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section className="min-h-screen bg-gradient-to-br from-gray-100 via-purple-200 to-blue-100 flex items-center justify-center px-8">
          <motion.div
            className="max-w-4xl w-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4">
                    <CardBody>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-900">{skill.name}</span>
                        <Chip color={skill.color} size="sm">{skill.level}%</Chip>
                      </div>
                      <Progress
                        value={skill.level}
                        color={skill.color}
                        className="w-full"
                      />
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section className="min-h-screen bg-gradient-to-tr from-indigo-900 via-slate-800 to-purple-700 flex items-center justify-center px-8">
          <motion.div
            className="max-w-4xl w-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 text-white">Featured Projects</h2>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="bg-white/10 backdrop-blur border-white/20">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center w-full">
                        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                        <Badge
                          color={project.status === 'Completed' ? 'success' : project.status === 'In Progress' ? 'warning' : 'default'}
                          variant="flat"
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Chip key={tech} size="sm" variant="flat" color="default">
                            {tech}
                          </Chip>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Fun Facts Section */}
        <section className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-green-100 flex items-center justify-center px-8">
          <motion.div
            className="max-w-4xl w-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Fun Facts About Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {funFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, rotate: -5 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ rotate: 5, scale: 1.05 }}
                >
                  <Tooltip content={fact.tooltip} placement="top">
                    <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
                      <CardBody className="text-center">
                        <div className="text-4xl mb-3">{fact.icon}</div>
                        <p className="text-gray-700 font-medium">{fact.fact}</p>
                      </CardBody>
                    </Card>
                  </Tooltip>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Code Snippets Section */}
        <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-800 to-rose-700 flex items-center justify-center px-8">
          <motion.div
            className="max-w-4xl w-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 text-white">Favorite Code Patterns</h2>
            <Accordion className="bg-white/10 backdrop-blur border-white/20">
              <AccordionItem
                key="1"
                aria-label="React Hook Pattern"
                title="Custom React Hook Pattern"
                className="text-white"
              >
                <Snippet
                  symbol="tsx"
                  variant="flat"
                  className="bg-gray-900 text-green-400"
                >
                  {`const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};`}
                </Snippet>
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Utility Function"
                title="TypeScript Utility Type"
                className="text-white"
              >
                <Snippet
                  symbol="ts"
                  variant="flat"
                  className="bg-gray-900 text-blue-400"
                >
                  {`type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};`}
                </Snippet>
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="CSS Pattern"
                title="Modern CSS Utility"
                className="text-white"
              >
                <Snippet
                  symbol="css"
                  variant="flat"
                  className="bg-gray-900 text-purple-400"
                >
                  {`.glass-morphism {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}`}
                </Snippet>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </section>
      </main>
    </ReactLenis>
  )
}

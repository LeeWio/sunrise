'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Chip, Tabs, Surface } from '@heroui/react';
import { motion, Variants } from 'motion/react';
import { cn } from 'tailwind-variants';
import {
  ArrowRight,
  Lock,
  History,
  PenTool,
  Zap,
  Layout,
  Database,
  Terminal,
  Circle,
} from 'lucide-react';

import GamingArchiveDisclosure from '@/components/game-archive-disclosure';
import CapsuleTabs from '@/components/capsule-tabs';

const MotionButton = motion(Button);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 70,
      damping: 24,
      mass: 1
    },
  },
};

/**
 * Standard content wrapper to maintain alignment
 */
const ContentWrapper = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-48", className)}>
    {children}
  </div>
);

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col bg-background min-h-screen">
      
      {/* 1. Hero: Pure Opening */}
      <Surface variant="default" className="w-full">
        <ContentWrapper>
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center gap-12 py-32 text-center"
          >
            {/* System Status Indicator */}
            <motion.div variants={itemVariants} className="flex flex-col items-center">
              <Chip 
                variant="soft" 
                color="accent" 
                size="sm" 
                className="font-black uppercase tracking-[0.2em] px-3"
              >
                <Circle className="size-1.5 fill-current animate-pulse" />
                <Chip.Label>Digital Repository</Chip.Label>
              </Chip>
            </motion.div>

            {/* Core Narrative */}
            <div className="flex flex-col gap-6">
              <motion.h1 
                variants={itemVariants} 
                className="text-foreground max-w-4xl text-5xl font-black tracking-tighter md:text-8xl leading-none"
              >
                Life, <span className="text-primary italic">Archived.</span>
              </motion.h1>

              <motion.p 
                variants={itemVariants} 
                className="text-default-500 max-w-2xl text-lg md:text-xl font-medium leading-relaxed"
              >
                Sunrise is a specialized sanctuary for your digital footprint. 
                A minimalist environment where every entry is treated as a permanent artifact of your existence.
              </motion.p>
            </div>

            {/* Actions */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4">
              <MotionButton
                onPress={() => router.push('/')}
                variant="primary"
                size="lg"
                radius="full"
                className="h-12 px-10 font-bold"
              >
                Launch Workbench
                <ArrowRight size={18} strokeWidth={3} />
              </MotionButton>
              <MotionButton
                variant="secondary"
                size="lg"
                className="h-12 px-8 font-bold"
              >
                Documentation
              </MotionButton>
            </motion.div>
          </motion.section>
        </ContentWrapper>
      </Surface>

      {/* Interface Preview (Capsule Tabs Showcase) */}
      <section className="py-12 flex flex-col items-center gap-6">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-default-400">Component Prototype</span>
        <CapsuleTabs />
      </section>

      {/* 2. Philosophy: Rational Transition */}
      <Surface variant="secondary" className="w-full py-32">
        <ContentWrapper>
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col gap-20"
          >
            <div className="flex flex-col items-start gap-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Philosophy</h2>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Built on Core Values.</h3>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                { icon: Lock, title: 'Total Ownership', desc: 'Local-first architecture. Your data never leaves your personal context or reaches an uncontrolled cloud.' },
                { icon: History, title: 'Eternal Archival', desc: 'Built on open standards to ensure your digital legacy remains readable for fifty years and beyond.' },
                { icon: PenTool, title: 'Intentional UI', desc: 'Every pixel is tuned to facilitate flow state and reduce the cognitive noise of modern interfaces.' },
              ].map((v, i) => (
                <Card
                  key={i}
                  className="bg-background/60 border-none p-8 transition-shadow hover:shadow-xl dark:bg-default-100/10"
                >
                  <Card.Header className="p-0 flex-col items-start gap-4">
                    <div className="bg-primary/10 text-primary mb-2 inline-flex size-14 items-center justify-center rounded-2xl">
                      <v.icon size={28} />
                    </div>
                    <Card.Title className="text-xl font-bold">{v.title}</Card.Title>
                    <Card.Description className="text-default-500 text-sm font-medium leading-relaxed">
                      {v.desc}
                    </Card.Description>
                  </Card.Header>
                </Card>
              ))}
            </div>
          </motion.section>
        </ContentWrapper>
      </Surface>

      {/* 3. Gaming Section: Integrated Focus */}
      <Surface variant="default" className="w-full py-32">
        <ContentWrapper>
          <div className="flex flex-col items-center text-center gap-4 mb-20">
            <Chip variant="soft" color="accent" size="sm" className="font-bold uppercase tracking-widest px-3">Archive 03</Chip>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Life, Rendered.</h2>
          </div>
        </ContentWrapper>
        <GamingArchiveDisclosure />
      </Surface>

      {/* 4. Infrastructure: Pure Blueprint */}
      <Surface variant="secondary" className="w-full py-32">
        <ContentWrapper>
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-20"
          >
            <div className="flex flex-col items-center text-center gap-6">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">The Blueprint.</h2>
              <p className="text-default-500 max-w-xl text-lg font-medium leading-relaxed">
                A robust architecture designed for performance, stability, and an uncompromising focus on longevity.
              </p>
            </div>

            <Tabs aria-label="Tech Stack" variant="secondary" className="mx-auto w-fit">
              <Tabs.ListContainer>
                <Tabs.List className="gap-8">
                  <Tabs.Tab id="frontend">Frontend <Tabs.Indicator /></Tabs.Tab>
                  <Tabs.Tab id="backend">Backend <Tabs.Indicator /></Tabs.Tab>
                </Tabs.List>
              </Tabs.ListContainer>

              <Tabs.Panel id="frontend" className="mt-16">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: 'Next.js 16', icon: <Zap size={24} />, desc: 'App Router' },
                    { name: 'HeroUI v3', icon: <Layout size={24} />, desc: 'Components' },
                    { name: 'Redux Toolkit', icon: <Database size={24} />, desc: 'State' },
                    { name: 'Motion', icon: <Zap size={24} />, desc: 'Fluidity' },
                  ].map((tech, idx) => (
                    <Card key={idx} className="bg-background/60 border-none p-6 shadow-sm">
                      <div className="text-primary mb-4 size-6">{tech.icon}</div>
                      <Card.Header className="p-0">
                        <Card.Title className="text-lg font-black">{tech.name}</Card.Title>
                        <Card.Description className="text-xs font-bold text-default-400 uppercase tracking-tighter">{tech.desc}</Card.Description>
                      </Card.Header>
                    </Card>
                  ))}
                </div>
              </Tabs.Panel>

              <Tabs.Panel id="backend" className="mt-16">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {[
                    { name: 'Spring Boot 3.5', desc: 'Core Services' },
                    { name: 'MySQL 8', desc: 'Persistence' },
                    { name: 'Redis', desc: 'Velocity' },
                  ].map((tech, idx) => (
                    <Card key={idx} className="bg-background/60 border-none p-6 shadow-sm">
                      <Terminal className="text-secondary mb-4 size-6" />
                      <Card.Header className="p-0 text-start">
                        <Card.Title className="text-lg font-black">{tech.name}</Card.Title>
                        <Card.Description className="text-xs font-bold text-default-400 uppercase tracking-tighter">{tech.desc}</Card.Description>
                      </Card.Header>
                    </Card>
                  ))}
                </div>
              </Tabs.Panel>
            </Tabs>
          </motion.section>
        </ContentWrapper>
      </Surface>

      {/* 5. Closing: Pure Artifact */}
      <Surface variant="default" className="w-full py-40">
        <ContentWrapper>
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-center"
          >
            <blockquote className="text-default-300 font-serif text-3xl italic md:text-6xl tracking-tighter leading-tight select-none">
              &ldquo;We write to taste life twice.&rdquo;
            </blockquote>
            <footer className="text-default-400 mt-12 text-sm font-black uppercase tracking-[0.5em] opacity-50">— Anaïs Nin</footer>
          </motion.section>
        </ContentWrapper>
      </Surface>
    </div>
  );
}

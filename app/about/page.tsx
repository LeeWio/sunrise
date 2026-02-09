'use client';

import { useRouter } from 'next/navigation';
import { Card, Button, Chip, Separator, Link, Tabs } from '@heroui/react';
import NextLink from 'next/link';
import { motion, Variants } from 'motion/react';
import {
  ArrowRight,
  Lock,
  History,
  PenTool,
  Database,
  Zap,
  Layout,
  Calendar,
  Edit3,
  Laptop,
  Smartphone,
  Gamepad2,
  Headphones,
  Watch,
} from 'lucide-react';

const MotionButton = motion(Button);
const MotionCard = motion(Card);
const MotionChip = motion(Chip);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function AboutPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-12 px-6 pt-8 pb-12 md:px-12 lg:px-24 xl:px-32 2xl:px-48">
      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center gap-6 py-16 text-center md:py-24"
      >
        <MotionChip
          variants={itemVariants}
          color="accent"
          variant="soft"
          size="lg"
          className="px-4"
        >
          Personal Life Log
        </MotionChip>

        <motion.h1
          variants={itemVariants}
          className="text-foreground max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl"
        >
          Your life,{' '}
          <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--danger)] bg-clip-text text-transparent">
            recorded.
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-default-600 max-w-2xl text-center text-xl font-medium md:text-2xl"
        >
          Reflect on the past. Plan for the future.
        </motion.p>
        <motion.p variants={itemVariants} className="text-default-500 max-w-lg text-center text-lg">
          A timeless space where your story belongs to you.
        </motion.p>

        <motion.div variants={itemVariants} className="flex gap-4 pt-4">
          <MotionButton
            onPress={() => router.push('/dashboard')}
            variant="primary"
            size="lg"
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full"
          >
            Go to Dashboard
            <ArrowRight size={18} />
          </MotionButton>
          <MotionButton
            onPress={() => window.open('https://github.com/wei.li/project/sunrise', '_blank')}
            variant="outline"
            size="lg"
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full"
          >
            View Source
          </MotionButton>
        </motion.div>
      </motion.section>

      {/* Philosophy Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        <MotionCard
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.3, ease: 'easeOut' } }}
          className="from-default-100 h-full border-none bg-gradient-to-br to-transparent p-4"
        >
          <Card.Header className="flex-col items-start px-4 pt-2 pb-0">
            <div className="bg-primary/10 text-primary mb-3 rounded-full p-3">
              <Lock size={24} />
            </div>
            <h4 className="text-large font-bold">Privacy First</h4>
          </Card.Header>
          <Card.Content className="overflow-visible py-2">
            <p className="text-default-500">
              Your data belongs to you. Sunrise is designed to be local-first and self-hostable,
              ensuring your personal memories stay private.
            </p>
          </Card.Content>
        </MotionCard>

        <MotionCard
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.3, ease: 'easeOut' } }}
          className="from-default-100 h-full border-none bg-gradient-to-br to-transparent p-4"
        >
          <Card.Header className="flex-col items-start px-4 pt-2 pb-0">
            <div className="bg-secondary/10 text-secondary mb-3 rounded-full p-3">
              <History size={24} />
            </div>
            <h4 className="text-large font-bold">Long-term Archival</h4>
          </Card.Header>
          <Card.Content className="overflow-visible py-2">
            <p className="text-default-500">
              Built to last. We use standard data formats and reliable storage patterns so your life
              log remains accessible for decades.
            </p>
          </Card.Content>
        </MotionCard>

        <MotionCard
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.3, ease: 'easeOut' } }}
          className="from-default-100 h-full border-none bg-gradient-to-br to-transparent p-4"
        >
          <Card.Header className="flex-col items-start px-4 pt-2 pb-0">
            <div className="bg-success/10 text-success mb-3 rounded-full p-3">
              <PenTool size={24} />
            </div>
            <h4 className="text-large font-bold">Rich Expression</h4>
          </Card.Header>
          <Card.Content className="overflow-visible py-2">
            <p className="text-default-500">
              Express yourself fully with a rich text editor that supports markdown, images, and
              embedded media. Writing should be a joy.
            </p>
          </Card.Content>
        </MotionCard>
      </motion.section>

      {/* Feature Deep Dive */}
      <section className="flex flex-col gap-24 py-12">
        {/* Feature 1 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
              <Edit3 size={24} />
            </div>
            <h3 className="text-3xl font-bold tracking-tight">The Writing Experience</h3>
            <p className="text-default-500 text-lg">
              Distraction-free, powerful, and completely yours. Our editor is designed to get out of
              your way, letting your thoughts flow freely onto the page. Support for rich media,
              markdown shortcuts, and seamless autosave ensures you never lose a moment.
            </p>
          </motion.div>
          <MotionCard
            variants={itemVariants}
            className="from-default-100 to-default-50 flex aspect-video w-full items-center justify-center bg-gradient-to-br"
          >
            <div className="text-default-300">Editor Preview Placeholder</div>
          </MotionCard>
        </motion.div>

        {/* Feature 2 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          <MotionCard
            variants={itemVariants}
            className="from-default-100 to-default-50 order-last flex aspect-video w-full items-center justify-center bg-gradient-to-br lg:order-first"
          >
            <div className="text-default-300">Timeline Preview Placeholder</div>
          </MotionCard>
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <div className="bg-secondary/10 text-secondary flex h-12 w-12 items-center justify-center rounded-xl">
              <Calendar size={24} />
            </div>
            <h3 className="text-3xl font-bold tracking-tight">Your Personal Timeline</h3>
            <p className="text-default-500 text-lg">
              See your life unfold in a chronological journey. Revisit past memories, track your
              habits, and see how far you've come. The timeline view offers a unique perspective on
              your personal growth and history.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Quote Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="mx-auto max-w-4xl py-24 text-center"
      >
        <h3 className="text-default-400 font-serif text-3xl leading-tight italic md:text-5xl">
          "We write to taste life twice, in the moment and in retrospect."
        </h3>
        <p className="text-default-500 mt-6 font-medium">- Anaïs Nin</p>
      </motion.section>

      <Separator className="my-12" />

      {/* Tech Stack Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col gap-16 py-12"
      >
        <div className="flex flex-col items-center text-center gap-4">
          <MotionChip
            variants={itemVariants}
            variant="soft"
            color="accent"
            className="px-4"
          >
            Under the Hood
          </MotionChip>
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold tracking-tight md:text-5xl"
          >
            Built with Modern Tech
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-default-500 max-w-2xl text-lg"
          >
            A robust architecture designed for performance, scalability, and developer experience.
          </motion.p>
        </div>

        <div className="w-full">
          <Tabs aria-label="Tech Stack">
            <Tabs.ListContainer className="mx-auto w-fit">
              <Tabs.List className="bg-default-100/50 border border-white/20 dark:border-white/10 p-1 rounded-full gap-1">
                <Tabs.Tab
                  id="frontend"
                  className="px-8 h-9 rounded-full data-[selected=true]:text-foreground text-default-500 transition-colors whitespace-nowrap"
                >
                  Frontend Ecosystem
                  <Tabs.Indicator className="bg-background shadow-sm rounded-full" />
                </Tabs.Tab>
                <Tabs.Tab
                  id="backend"
                  className="px-8 h-9 rounded-full data-[selected=true]:text-foreground text-default-500 transition-colors whitespace-nowrap"
                >
                  Backend Infrastructure
                  <Tabs.Indicator className="bg-background shadow-sm rounded-full" />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>

            <Tabs.Panel id="frontend">
              <motion.div
                className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[
                  {
                    name: 'Next.js 15',
                    icon: <Zap size={20} />,
                    desc: 'App Router & Server Actions',
                  },
                  { name: 'HeroUI v3', icon: <Layout size={20} />, desc: 'Accessible Components' },
                  {
                    name: 'Redux Toolkit',
                    icon: <Database size={20} />,
                    desc: 'Robust State Management',
                  },
                  { name: 'Motion', icon: <Zap size={20} />, desc: 'Fluid Animations' },
                ].map((tech, idx) => (
                  <MotionCard
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="border-default-200 h-full w-full"
                  >
                    <Card.Header className="flex gap-3 pb-1">
                      <div className="text-primary bg-primary/10 rounded-lg p-2">{tech.icon}</div>
                      <div className="flex flex-col">
                        <p className="text-md font-semibold">{tech.name}</p>
                      </div>
                    </Card.Header>
                    <Card.Content className="px-4 pt-0 pb-4">
                      <p className="text-default-500 text-xs">{tech.desc}</p>
                    </Card.Content>
                  </MotionCard>
                ))}
              </motion.div>
            </Tabs.Panel>

            <Tabs.Panel id="backend">
              <motion.div
                className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[
                  { name: 'Spring Boot', desc: 'Microservices Core' },
                  { name: 'MySQL', desc: 'Relational Data' },
                  { name: 'Redis', desc: 'High-Speed Caching' },
                  { name: 'Spring Security', desc: 'Authentication & Auth' },
                  { name: 'Spring JPA', desc: 'Data Persistence' },
                ].map((tech, idx) => (
                  <MotionCard
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="border-default-200 h-full w-full"
                  >
                    <Card.Header className="flex gap-3 pb-1">
                      <div className="text-secondary bg-secondary/10 rounded-lg p-2">
                        <div className="h-2 w-2 rounded-full bg-current" />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-md font-semibold">{tech.name}</p>
                      </div>
                    </Card.Header>
                    <Card.Content className="px-4 pt-0 pb-4">
                      <p className="text-default-500 text-xs">{tech.desc}</p>
                    </Card.Content>
                  </MotionCard>
                ))}
              </motion.div>
            </Tabs.Panel>
          </Tabs>
        </div>
      </motion.section>

      <Separator className="my-12" />

      {/* Gear Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col gap-12 py-12"
      >
        <div className="flex flex-col items-center text-center gap-4">
          <MotionChip
            variants={itemVariants}
            variant="soft"
            color="warning"
            className="px-4"
          >
            Essentials
          </MotionChip>
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold tracking-tight md:text-5xl"
          >
            My Gear Collection
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-default-500 max-w-2xl text-lg"
          >
            The hardware tools that power my creative workflow and leisure time.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
        >
          {[
            {
              name: 'MacBook Pro 16"',
              spec: 'M1 Max · 64GB RAM',
              icon: <Laptop size={28} />,
              category: 'Workstation',
              color: 'text-default-900',
              bg: 'bg-default-100',
            },
            {
              name: 'iPhone 16 Pro',
              spec: 'Titanium · 1TB',
              icon: <Smartphone size={28} />,
              category: 'Daily Driver',
              color: 'text-primary',
              bg: 'bg-primary/10',
            },
            {
              name: 'PlayStation 5',
              spec: 'Digital Edition',
              icon: <Gamepad2 size={28} />,
              category: 'Gaming',
              color: 'text-secondary',
              bg: 'bg-secondary/10',
            },
            {
              name: 'Nintendo Switch',
              spec: 'OLED Model',
              icon: <Gamepad2 size={28} />,
              category: 'On the Go',
              color: 'text-danger',
              bg: 'bg-danger/10',
            },
          ].map((item, idx) => (
            <MotionCard
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative border border-default-200/50 bg-gradient-to-b from-default-50/50 to-transparent backdrop-blur-2xl transition-all duration-300 hover:border-default-300 hover:shadow-lg dark:from-default-50/10 dark:hover:border-default-200"
            >
              <div
                className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-20 bg-gradient-to-br from-transparent via-transparent to-${item.color.split('-')[1]}`}
              />
              <Card.Content className="flex h-full flex-col justify-between gap-8 p-6">
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.bg} ${item.color} shadow-sm ring-1 ring-inset ring-black/5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 dark:ring-white/10`}
                  >
                    {item.icon}
                  </div>
                  <div className="rounded-full border border-default-200 bg-default-50/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-default-500 shadow-sm backdrop-blur-md">
                    {item.category}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm font-medium text-default-400">{item.spec}</p>
                </div>
              </Card.Content>
            </MotionCard>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { Card, Button, Chip, Separator } from '@heroui/react';
import NextLink from 'next/link';
import { motion, Variants } from 'motion/react';
import {
  ArrowRight,
  Code2,
  Music,
  Film,
  Gamepad2,
  PenLine,
  Calendar,
  BookOpen,
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

const CATEGORIES = [
  { id: 'tech', label: 'Tech', desc: 'Notes and tutorials from building things.', icon: Code2, href: '/content', iconClass: 'bg-primary/10 text-primary' },
  { id: 'music', label: 'Music', desc: 'What I\'m listening to and why it sticks.', icon: Music, href: '/content', iconClass: 'bg-secondary/10 text-secondary' },
  { id: 'film', label: 'Film', desc: 'Watches, rewatches, and recommendations.', icon: Film, href: '/content', iconClass: 'bg-danger/10 text-danger' },
  { id: 'games', label: 'Games', desc: 'Playthroughs and thoughts from other worlds.', icon: Gamepad2, href: '/content', iconClass: 'bg-success/10 text-success' },
  { id: 'essays', label: 'Essays', desc: 'Random thoughts and daily fragments.', icon: PenLine, href: '/content', iconClass: 'bg-accent/10 text-accent' },
];

const MOCK_LATEST = [
  { title: 'A small technical post I’ve been writing', excerpt: 'Writing down the pitfalls and ideas so I can pick them up later.', date: '2025-02', category: 'Tech', slug: '/content' },
  { title: 'Albums I had on repeat this month', excerpt: 'Commute and late-night BGM, slowly becoming a personal playlist.', date: '2025-02', category: 'Music', slug: '/content' },
  { title: 'A film I’d recommend to everyone', excerpt: 'The kind that stays with you long after the credits.', date: '2025-01', category: 'Film', slug: '/content' },
  { title: 'Finishing a game that changed my mind', excerpt: 'Why some stories only work when you play them.', date: '2025-01', category: 'Games', slug: '/content' },
  { title: 'A walk and a thought', excerpt: 'Nothing big—just something that felt worth keeping.', date: '2025-01', category: 'Essays', slug: '/content' },
];

const MOCK_NOW = [
  { type: 'Listening', value: '—', icon: Music },
  { type: 'Watching', value: '—', icon: Film },
  { type: 'Playing', value: '—', icon: Gamepad2 },
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-16 px-6 pt-10 pb-16 md:px-12 md:gap-20 lg:px-24 xl:px-32 2xl:px-48">
      {/* Hero */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center gap-7 py-20 text-center md:py-28 md:gap-8"
        aria-label="Welcome"
      >
        <MotionChip
          variants={itemVariants}
          color="accent"
          variant="soft"
          size="lg"
          className="px-4"
        >
          Personal blog & life log
        </MotionChip>

        <motion.h1
          variants={itemVariants}
          className="text-foreground max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl"
        >
          Sunrise —{' '}
          <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--danger)] bg-clip-text text-transparent">
            daily notes
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-default-600 max-w-2xl text-center text-xl font-medium md:text-2xl"
        >
          Tech, music, film, games, and whatever else I want to remember.
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="text-default-500 max-w-lg text-center text-lg leading-relaxed"
        >
          Your story is yours. This is where I write mine—not for the crowd, but so I can look back and remember what I was listening to, thinking about, and building.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-default-400 max-w-md text-center text-sm"
        >
          What I’m listening to, watching, and playing right now will eventually become another point on the timeline.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3"
          role="list"
          aria-label="Now"
        >
          {MOCK_NOW.map(({ type, value, icon: Icon }) => (
            <Chip key={type} variant="soft" size="md" className="gap-2" role="listitem">
              <Icon size={14} aria-hidden />
              <span>{type}</span>
              <span className="text-default-400">{value}</span>
            </Chip>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 pt-2"
        >
          <MotionButton
            onPress={() => router.push('/content')}
            variant="primary"
            size="lg"
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full"
            aria-label="Go to content"
          >
            Enter
            <ArrowRight size={18} aria-hidden />
          </MotionButton>
          <MotionButton
            onPress={() => router.push('/timeline')}
            variant="outline"
            size="lg"
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full"
            aria-label="Open timeline"
          >
            Timeline
          </MotionButton>
          <MotionButton
            onPress={() => router.push('/about')}
            variant="ghost"
            size="lg"
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full"
            aria-label="About this site"
          >
            About
          </MotionButton>
        </motion.div>
      </motion.section>

      {/* What this is — story intro */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="flex flex-col gap-6"
        aria-labelledby="what-this-is"
      >
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-default-200/60 bg-default-50/30 px-6 py-8 text-center dark:border-default-100/40 dark:bg-default-100/5 md:px-12 md:py-10"
        >
          <h2 id="what-this-is" className="sr-only">
            What this place is
          </h2>
          <p className="text-default-600 mx-auto max-w-2xl leading-relaxed md:text-lg">
            Different moments call for different kinds of writing. Tech is where work and curiosity meet; music and film are the soundtrack and highlights of life; games are other worlds; essays are the bits that fall out whenever. Put together, they’re a slice of who I am over time.
          </p>
          <p className="text-default-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            If you like looking back through your own notes too, you might find something familiar here.
          </p>
        </motion.div>
      </motion.section>

      {/* Latest */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="flex flex-col gap-8"
        aria-labelledby="latest-heading"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <MotionChip variants={itemVariants} variant="soft" color="accent" className="px-4">
            Latest
          </MotionChip>
          <motion.h2
            id="latest-heading"
            variants={itemVariants}
            className="text-3xl font-bold tracking-tight md:text-5xl"
          >
            Recently written
          </motion.h2>
          <motion.p variants={itemVariants} className="text-default-500 max-w-2xl text-lg">
            Like a few points on a timeline—together they tell a short story.
          </motion.p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {MOCK_LATEST.map((item, idx) => (
            <motion.li key={idx} variants={itemVariants} role="listitem">
              <NextLink href={item.slug} className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl">
                <MotionCard
                  whileHover={{ y: -4, transition: { duration: 0.3, ease: 'easeOut' } }}
                  className="from-default-100 h-full border-none bg-gradient-to-br to-transparent p-4 transition-shadow hover:shadow-md"
                >
                  <Card.Header className="flex-col items-start gap-2 px-0 pt-0 pb-0">
                    <div className="flex w-full flex-row items-center gap-3">
                      <time className="text-default-500 shrink-0 text-sm tabular-nums" dateTime={item.date}>
                        {item.date}
                      </time>
                      <Chip size="sm" variant="soft" className="shrink-0">
                        {item.category}
                      </Chip>
                    </div>
                    <Card.Title className="text-base font-semibold leading-snug">{item.title}</Card.Title>
                  </Card.Header>
                  <Card.Content className="overflow-visible px-0 pt-0 pb-0">
                    <p className="text-default-500 line-clamp-2 text-sm leading-relaxed">{item.excerpt}</p>
                  </Card.Content>
                </MotionCard>
              </NextLink>
            </motion.li>
          ))}
        </ul>

        <motion.div variants={itemVariants} className="flex justify-center pt-2">
          <Button
            variant="outline"
            size="lg"
            onPress={() => router.push('/content')}
            className="rounded-full"
            aria-label="View all content"
          >
            View all
            <ArrowRight size={18} aria-hidden />
          </Button>
        </motion.div>
      </motion.section>

      {/* Browse by category */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="flex flex-col gap-8"
        aria-labelledby="categories-heading"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <MotionChip variants={itemVariants} variant="soft" color="warning" className="px-4">
            Categories
          </MotionChip>
          <motion.h2
            id="categories-heading"
            variants={itemVariants}
            className="text-3xl font-bold tracking-tight md:text-5xl"
          >
            Browse by topic
          </motion.h2>
          <motion.p variants={itemVariants} className="text-default-500 max-w-2xl text-lg">
            Each category is its own thread—click in and follow it backward.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map(({ id, label, desc, icon: Icon, href, iconClass }) => (
            <MotionCard
              key={id}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.3, ease: 'easeOut' } }}
              className="from-default-100 h-full border-none bg-gradient-to-br to-transparent p-4 transition-shadow hover:shadow-md"
            >
              <Card.Header className="flex-col items-start px-4 pt-2 pb-0">
                <div className={`mb-3 rounded-full p-3 ${iconClass}`} aria-hidden>
                  <Icon size={24} />
                </div>
                <h3 className="text-large font-bold">{label}</h3>
              </Card.Header>
              <Card.Content className="overflow-visible py-2">
                <p className="text-default-500 text-sm leading-relaxed">{desc}</p>
              </Card.Content>
              <Card.Footer className="pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onPress={() => router.push(href)}
                  aria-label={`Go to ${label}`}
                >
                  Enter
                  <ArrowRight size={14} aria-hidden />
                </Button>
              </Card.Footer>
            </MotionCard>
          ))}
        </div>
      </motion.section>

      {/* How it works — extra content */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="flex flex-col gap-8"
        aria-labelledby="how-heading"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <MotionChip variants={itemVariants} variant="soft" color="success" className="px-4">
            How it works
          </MotionChip>
          <motion.h2
            id="how-heading"
            variants={itemVariants}
            className="text-3xl font-bold tracking-tight md:text-5xl"
          >
            Write, then look back
          </motion.h2>
          <motion.p variants={itemVariants} className="text-default-500 max-w-2xl text-lg">
            Everything you add lives on a timeline. No algorithms, no feeds—just a chronological record you can scroll through whenever you want to remember.
          </motion.p>
        </div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {[
            { icon: PenLine, title: 'Write anything', body: 'Tech notes, album thoughts, film reviews, game logs, or random musings. One place for all of it.' },
            { icon: Calendar, title: 'Timeline view', body: 'See your entries in order. Jump to a month or a year and see what was going on then.' },
            { icon: BookOpen, title: 'Your archive', body: 'Your data stays yours. Local-first and self-hostable, so you keep control.' },
          ].map(({ icon: Icon, title, body }, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="rounded-2xl border border-default-200/60 bg-default-50/30 px-6 py-6 dark:border-default-100/40 dark:bg-default-100/5"
            >
              <div className="bg-primary/10 text-primary mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl">
                <Icon size={22} aria-hidden />
              </div>
              <h3 className="text-lg font-bold text-foreground">{title}</h3>
              <p className="text-default-500 mt-2 text-sm leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Quote */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="py-24 text-center"
        aria-label="Quote"
      >
        <p className="text-default-500 mb-8 mx-auto max-w-xl text-sm md:text-base">
          Writing it down is a way to taste life once in the moment, and again later.
        </p>
        <blockquote>
          <h3 className="text-default-400 font-serif text-3xl leading-tight italic md:text-5xl">
            &ldquo;We write to taste life twice, in the moment and in retrospect.&rdquo;
          </h3>
          <footer className="text-default-500 mt-6 font-medium">— Anaïs Nin</footer>
        </blockquote>
      </motion.section>

      <Separator className="my-12" />

      {/* Timeline CTA */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col gap-12 py-12"
        aria-labelledby="timeline-heading"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <MotionChip variants={itemVariants} variant="soft" color="default" className="px-4">
            Look back
          </MotionChip>
          <motion.h2
            id="timeline-heading"
            variants={itemVariants}
            className="text-3xl font-bold tracking-tight md:text-5xl"
          >
            Your timeline
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-default-500 max-w-2xl text-lg"
          >
            All your entries in one line. Pick a day, a month, or a year and see what you wrote and what was going on.
          </motion.p>
        </div>

        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
          <MotionButton
            onPress={() => router.push('/timeline')}
            variant="primary"
            size="lg"
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full"
            aria-label="Open timeline"
          >
            Open timeline
            <ArrowRight size={18} aria-hidden />
          </MotionButton>
          <MotionButton
            onPress={() => router.push('/about')}
            variant="outline"
            size="lg"
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full"
            aria-label="About this site"
          >
            About
          </MotionButton>
        </motion.div>
      </motion.section>
    </div>
  );
}

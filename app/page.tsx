'use client';

import { useRouter } from 'next/navigation';
import {
  Card,
  Button,
  Chip,
  Separator,
  Checkbox,
  Input,
  SearchField,
  Tabs,
  Kbd,
  Surface,
  Tooltip,
} from '@heroui/react';
import NextLink from 'next/link';
import { motion, Variants, Reorder, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Code2,
  Music,
  Film,
  Gamepad2,
  PenLine,
  Calendar,
  BookOpen,
  Plus,
  GripVertical,
  Trash2,
  CalendarDays,
  Tag as TagIcon,
  AlertCircle,
  LayoutGrid,
  Circle,
  Trophy,
  Zap,
} from 'lucide-react';
import { useState, useCallback, useMemo } from 'react';
import { cn } from 'tailwind-variants';

const MotionButton = motion(Button);
const MotionCard = motion(Card);
const MotionChip = motion(Chip);

// --- TYPES ---
type Priority = 'high' | 'medium' | 'low';
type Todo = {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  tags: string[];
  dueDate: string | null;
};

type Game = {
  id: string;
  name: string;
  platform: 'PC' | 'PS5' | 'Switch' | 'Mobile';
  genre: string;
  status: 'Active' | 'Completed' | 'On Hold';
  rank?: string;
  color: 'primary' | 'warning' | 'danger' | 'success' | 'secondary';
  icon: React.ReactNode;
};

// --- CONFIG ---
const MOCK_GAMES: Game[] = [
  { id: 'lol', name: 'League of Legends', platform: 'PC', genre: 'MOBA', status: 'Active', rank: 'Emerald', color: 'primary', icon: <Trophy size={18} /> },
  { id: 'wzry', name: 'Honor of Kings', platform: 'Mobile', genre: 'MOBA', status: 'Active', rank: 'Legend', color: 'warning', icon: <Zap size={18} /> },
  { id: 'elden', name: 'Elden Ring', platform: 'PS5', genre: 'Action RPG', status: 'Completed', color: 'danger', icon: <Gamepad2 size={18} /> },
  { id: 'zelda', name: 'Tears of the Kingdom', platform: 'Switch', genre: 'Adventure', status: 'On Hold', color: 'success', icon: <Gamepad2 size={18} /> },
];
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

const INITIAL_TODOS: Todo[] = [
  { id: '1', text: 'Refactor editor header using HeroUI v3', completed: true, priority: 'high', tags: ['work'], dueDate: '2026-02-21' },
  { id: '2', text: 'Write about acrylic glassmorphism trend', completed: false, priority: 'medium', tags: ['blog'], dueDate: '2026-02-22' },
  { id: '3', text: 'Design the timeline view for 2026', completed: false, priority: 'low', tags: ['design'], dueDate: '2026-02-25' },
  { id: '4', text: 'Fix the backdrop-filter issue in BubbleMenu', completed: true, priority: 'high', tags: ['work', 'bug'], dueDate: null },
  { id: '5', text: 'Gym session - Leg day', completed: false, priority: 'medium', tags: ['life'], dueDate: '2026-02-22' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// --- HELPERS ---
const getGroup = (todo: Todo) => {
  if (!todo.dueDate) return 'Inbox';
  const today = new Date().toISOString().split('T')[0];
  if (todo.dueDate < today) return 'Overdue';
  if (todo.dueDate === today) return 'Today';
  return 'Upcoming';
};

export default function Home() {
  const router = useRouter();
  
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);
  const [newTodo, setNewTodo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const addTodo = useCallback(() => {
    if (!newTodo.trim()) return;
    const item: Todo = {
      id: Math.random().toString(36).substr(2, 9),
      text: newTodo.trim(),
      completed: false,
      priority: 'medium',
      tags: [],
      dueDate: new Date().toISOString().split('T')[0],
    };
    setTodos([item, ...todos]);
    setNewTodo('');
  }, [newTodo, todos]);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }, []);

  const removeTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(t => {
      const matchesSearch = t.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = filterStatus === 'all' ? true : 
                           filterStatus === 'active' ? !t.completed : t.completed;
      return matchesSearch && matchesStatus;
    });
  }, [todos, searchQuery, filterStatus]);

  const sortedTodos = useMemo(() => {
    const groups = ['Overdue', 'Today', 'Upcoming', 'Inbox'];
    const result: Todo[] = [];
    groups.forEach(g => {
      const items = filteredTodos.filter(t => getGroup(t) === g)
        .sort((a, b) => {
          if (a.completed !== b.completed) return a.completed ? 1 : -1;
          const p: Record<string, number> = { high: 3, medium: 2, low: 1 };
          return p[b.priority] - p[a.priority];
        });
      result.push(...items);
    });
    return result;
  }, [filteredTodos]);

  return (
    <div className="flex flex-col gap-16 px-6 pt-10 pb-16 md:px-12 md:gap-20 lg:px-24 xl:px-32 2xl:px-48 overflow-x-hidden">
      {/* Hero Section */}
      <motion.section variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center justify-center gap-7 py-20 text-center md:py-28">
        <MotionChip variants={itemVariants} color="accent" variant="soft" size="lg" className="px-4 text-xs font-bold uppercase tracking-widest">Digital Sanctuary</MotionChip>
        <motion.h1 variants={itemVariants} className="text-foreground max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl">
          Sunrise — <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--danger)] bg-clip-text text-transparent">daily flow</span>
        </motion.h1>
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 pt-2">
          <MotionButton onPress={() => router.push('/content')} variant="primary" size="lg" className="rounded-full shadow-lg shadow-primary/20">Enter Workspace <ArrowRight size={18} /></MotionButton>
        </motion.div>
      </motion.section>

      {/* Gaming Archive — Digital Collector's Shelf */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <MotionChip variants={itemVariants} variant="soft" color="secondary" className="px-4 text-[10px] font-black uppercase tracking-[0.3em]">The Library</MotionChip>
          <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight md:text-5xl text-foreground">Gaming Artifacts</motion.h2>
          <motion.p variants={itemVariants} className="text-default-500 max-w-xl text-lg leading-relaxed">
            From the Rift to the Lands Between. A curated log of digital adventures and competitive milestones.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_GAMES.map((game) => (
            <MotionCard
              key={game.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative overflow-hidden border-none bg-default-50/50 p-1 dark:bg-default-100/5 shadow-sm transition-all hover:shadow-2xl`}
            >
              <Card.Header className="flex-col items-start gap-4 p-6">
                <div className="flex w-full items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-default-100 dark:bg-white/5 text-foreground shadow-inner`}>
                    {game.icon}
                  </div>
                  <Tooltip delay={0} closeDelay={0}>
                    <Tooltip.Trigger aria-label={game.platform}>
                      <div className="bg-background/60 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[10px] font-black shadow-sm backdrop-blur-md">
                        {game.platform === 'PC' ? 'PC' : game.platform === 'Mobile' ? 'MOB' : game.platform === 'PS5' ? 'PS' : 'SW'}
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content showArrow className="text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                      <Tooltip.Arrow />
                      Platform: {game.platform}
                    </Tooltip.Content>
                  </Tooltip>
                </div>

                <div className="flex flex-col gap-1">
                  <Card.Title className="text-xl font-black tracking-tight">{game.name}</Card.Title>
                  <div className="flex items-center gap-2">
                    <span className="text-default-400 text-[10px] font-bold uppercase tracking-widest">{game.genre}</span>
                    <Separator orientation="vertical" className="h-2" />
                    <Chip size="sm" variant="soft" color={game.status === 'Active' ? 'success' : 'default'} className="h-4 px-1.5 text-[8px] font-black uppercase border-none">
                      {game.status}
                    </Chip>
                  </div>
                </div>
              </Card.Header>

              {game.rank && (
                <Card.Content className="px-6 pb-2">
                  <div className={`bg-default-100/50 dark:bg-white/5 flex items-center justify-between rounded-xl border border-default-200/50 p-3`}>
                    <div className="flex flex-col">
                      <span className="text-default-400 text-[8px] font-black uppercase tracking-tighter">Current Rank</span>
                      <span className={`text-foreground text-sm font-black tracking-widest uppercase`}>{game.rank}</span>
                    </div>
                    <Trophy size={16} className={`text-warning opacity-60`} />
                  </div>
                </Card.Content>
              )}

              <Card.Footer className="justify-between px-6 pb-6 pt-2">
                <Button variant="ghost" size="sm" className="h-8 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-default-100">
                  View Logs
                </Button>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`h-1 w-3 rounded-full ${i <= 4 ? `bg-primary/40` : 'bg-default-200'}`} />
                  ))}
                </div>
              </Card.Footer>
            </MotionCard>
          ))}
        </div>
      </motion.section>

      {/* TODO Workstation — Luxury Precision Design */}
      <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="flex flex-col gap-8 lg:gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <MotionChip variants={itemVariants} variant="soft" color="accent" className="px-4 text-[9px] font-black uppercase tracking-[0.3em]">Workbench v1.0</MotionChip>
          <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight md:text-5xl">Operational Flow</motion.h2>
        </div>

        <motion.div variants={itemVariants} className="mx-auto w-full max-w-4xl">
          <Surface className="bg-background/20 border-default-200/50 shadow-2xl backdrop-blur-3xl dark:border-white/10 dark:bg-default-100/5 overflow-hidden rounded-[2.5rem]">
            {/* Control Bar */}
            <div className="flex flex-col border-b border-default-100/50">
              <div className="flex flex-wrap items-center justify-between gap-4 p-6 pb-4 sm:px-8">
                <SearchField className="w-full sm:w-72" value={searchQuery} onChange={setSearchQuery}>
                  <SearchField.Group className="bg-default-100/20 border-none h-10 px-4 rounded-xl">
                    <SearchField.SearchIcon className="text-default-400 size-4" />
                    <SearchField.Input placeholder="Filter flow..." className="text-sm font-medium" />
                    <SearchField.ClearButton />
                  </SearchField.Group>
                </SearchField>

                <div className="flex items-center gap-3">
                  <Tabs 
                    variant="secondary" 
                    selectedKey={filterStatus} 
                    onSelectionChange={(k) => setFilterStatus(k as string)} 
                    className="h-14"
                  >
                    <Tabs.ListContainer className="bg-default-100/50 dark:bg-white/5 rounded-full p-1.5 shadow-inner">
                      <Tabs.List aria-label="Todo Status" className="gap-2 border-none">
                        <Tabs.Tab 
                          id="all" 
                          className={cn(
                            "relative flex items-center justify-center gap-2 px-4 transition-all duration-500 rounded-full h-11",
                            filterStatus === 'all' ? "bg-background shadow-lg text-primary" : "w-11 px-0 text-default-500"
                          )}
                        >
                          <div className={cn("flex items-center justify-center", filterStatus === 'all' ? "bg-primary/10 size-8 rounded-lg" : "size-11")}>
                            <LayoutGrid size={filterStatus === 'all' ? 18 : 22} className={filterStatus === 'all' ? "text-primary" : "text-default-600"} />
                          </div>
                          <AnimatePresence mode="popLayout">
                            {filterStatus === 'all' && (
                              <motion.span 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="text-sm font-black tracking-tight"
                              >
                                Inbox
                              </motion.span>
                            )}
                          </AnimatePresence>
                          <Tabs.Indicator className="hidden" />
                        </Tabs.Tab>

                        <Tabs.Tab 
                          id="active" 
                          className={cn(
                            "relative flex items-center justify-center gap-2 px-4 transition-all duration-500 rounded-full h-11",
                            filterStatus === 'active' ? "bg-background shadow-lg text-primary" : "w-11 px-0 text-default-500"
                          )}
                        >
                          <div className={cn("flex items-center justify-center", filterStatus === 'active' ? "bg-primary/10 size-8 rounded-lg" : "size-11")}>
                            <Calendar size={filterStatus === 'active' ? 18 : 22} className={filterStatus === 'active' ? "text-primary" : "text-default-600"} />
                          </div>
                          <AnimatePresence mode="popLayout">
                            {filterStatus === 'active' && (
                              <motion.span 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="text-sm font-black tracking-tight"
                              >
                                Focus
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </Tabs.Tab>

                        <Tabs.Tab 
                          id="completed" 
                          className={cn(
                            "relative flex items-center justify-center gap-2 px-4 transition-all duration-500 rounded-full h-11",
                            filterStatus === 'completed' ? "bg-background shadow-lg text-primary" : "w-11 px-0 text-default-500"
                          )}
                        >
                          <div className={cn("flex items-center justify-center", filterStatus === 'completed' ? "bg-primary/10 size-8 rounded-lg" : "size-11")}>
                            <AlertCircle size={filterStatus === 'completed' ? 18 : 22} className={filterStatus === 'completed' ? "text-primary" : "text-default-600"} />
                          </div>
                          <AnimatePresence mode="popLayout">
                            {filterStatus === 'completed' && (
                              <motion.span 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="text-sm font-black tracking-tight"
                              >
                                Secured
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </Tabs.Tab>
                      </Tabs.List>
                    </Tabs.ListContainer>
                  </Tabs>
                </div>
              </div>
            </div>

            {/* List Engine */}
            <div className="max-h-[500px] overflow-y-auto scrollbar-hide px-2">
              {filteredTodos.length > 0 ? (
                <Reorder.Group axis="y" values={todos} onReorder={setTodos} className="flex flex-col gap-1 py-4">
                  {['Overdue', 'Today', 'Upcoming', 'Inbox'].map(groupName => {
                    const items = sortedTodos.filter(t => getGroup(t) === groupName);
                    if (items.length === 0) return null;

                    return (
                      <div key={groupName} className="flex flex-col gap-1 mb-4">
                        <div className="flex items-center gap-3 px-6 py-2">
                          <div className={`h-1.5 w-1.5 rounded-full ring-4 ring-offset-background dark:ring-offset-transparent ${
                            groupName === 'Overdue' ? 'bg-danger ring-danger/20 animate-pulse' : 
                            groupName === 'Today' ? 'bg-primary ring-primary/20' : 
                            groupName === 'Upcoming' ? 'bg-success ring-success/20' : 'bg-default-400 ring-default-400/20'
                          }`} />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-default-400">{groupName}</span>
                          <Separator className="flex-1 opacity-20" />
                          <span className="text-default-300 text-[9px] font-black">{items.length}</span>
                        </div>

                        <AnimatePresence initial={false} mode="popLayout">
                          {items.map((todo) => (
                            <Reorder.Item 
                              key={todo.id} 
                              value={todo} 
                              initial={{ opacity: 0, x: -10 }} 
                              animate={{ opacity: 1, x: 0 }} 
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="px-2"
                            >
                              <Card 
                                variant="transparent"
                                className={`group relative flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all hover:bg-default-100/40 dark:hover:bg-white/5 border border-transparent hover:border-white/10 ${
                                  todo.completed ? 'opacity-40 grayscale pointer-events-none' : ''
                                }`}
                              >
                                <div className="cursor-grab active:cursor-grabbing text-default-300 opacity-0 transition-opacity group-hover:opacity-100">
                                  <GripVertical size={16} strokeWidth={2.5} />
                                </div>

                                <Checkbox 
                                  isSelected={todo.completed} 
                                  onChange={() => toggleTodo(todo.id)}
                                >
                                  <Checkbox.Control className="rounded-full border-2 size-5 transition-transform group-active:scale-90">
                                    <Checkbox.Indicator />
                                  </Checkbox.Control>
                                </Checkbox>

                                <div className="flex flex-1 flex-col gap-1">
                                  <span className={`text-sm font-bold tracking-tight transition-all ${
                                    todo.completed ? 'text-default-400 line-through' : 'text-default-800 dark:text-default-100'
                                  }`}>
                                    {todo.text}
                                  </span>
                                  <div className="flex items-center gap-3">
                                    <div className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider ${
                                      getGroup(todo) === 'Overdue' ? 'text-danger' : 'text-default-400'
                                    }`}>
                                      <CalendarDays size={11} strokeWidth={2.5} /> 
                                      {todo.dueDate === new Date().toISOString().split('T')[0] ? 'Today' : todo.dueDate || 'No Date'}
                                    </div>
                                    {todo.tags.map(tag => (
                                      <Chip key={tag} size="sm" variant="soft" color="accent" className="h-4 px-1.5 text-[8px] font-black uppercase tracking-tighter opacity-80 border-none bg-primary/10">
                                        #{tag}
                                      </Chip>
                                    ))}
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  {todo.priority !== 'low' && !todo.completed && (
                                    <Chip 
                                      size="sm" 
                                      variant="soft" 
                                      color={todo.priority === 'high' ? 'danger' : 'warning'} 
                                      className="h-5 px-2 border-none"
                                    >
                                      <Circle className="size-1 mr-1 fill-current" />
                                      <Chip.Label className="text-[9px] font-black uppercase tracking-tighter">
                                        {todo.priority}
                                      </Chip.Label>
                                    </Chip>
                                  )}
                                  <Button 
                                    isIconOnly 
                                    size="sm" 
                                    variant="ghost" 
                                    className="opacity-0 transition-all group-hover:opacity-100 hover:text-danger rounded-xl hover:bg-danger/10" 
                                    onPress={() => removeTodo(todo.id)}
                                  >
                                    <Trash2 size={14} strokeWidth={2.5} />
                                  </Button>
                                </div>
                              </Card>
                            </Reorder.Item>
                          ))}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </Reorder.Group>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center opacity-10">
                  <LayoutGrid size={64} strokeWidth={1} className="mb-4" />
                  <p className="text-[12px] font-black uppercase tracking-[0.5em]">Clear Mind</p>
                </div>
              )}
            </div>

            {/* Quick Command Footer */}
            <div className="bg-default-50/20 border-t border-default-100/50 p-5 px-8 flex items-center gap-4">
              <div className="bg-primary/20 text-primary flex h-8 w-8 items-center justify-center rounded-xl shadow-inner">
                <Plus size={16} strokeWidth={3} />
              </div>
              <Input
                fullWidth
                placeholder="Initiate new sequence..."
                variant="secondary"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                className="bg-transparent text-sm h-10 font-bold placeholder:text-default-300"
              />
              <Kbd variant="light" className="scale-90 opacity-40 hidden sm:inline-flex shadow-none border-none">
                <Kbd.Abbr keyValue="enter" />
              </Kbd>
            </div>
          </Surface>
        </motion.div>
      </motion.section>

      {/* Categories & Latest (Visual Sync) */}
      <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <MotionChip variants={itemVariants} variant="soft" color="warning" className="px-4">Archives</MotionChip>
          <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight md:text-5xl">Recent Logs</motion.h2>
        </div>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_LATEST.map((item, idx) => (
            <motion.li key={idx} variants={itemVariants}>
              <NextLink href={item.slug} className="block h-full">
                <MotionCard whileHover={{ scale: 1.02 }} className="bg-default-50/50 dark:bg-default-100/5 border-none p-6 shadow-sm hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-4"><time className="text-default-400 text-[10px] font-black uppercase tracking-widest">{item.date}</time><Chip size="sm" variant="soft" className="text-[9px] font-black uppercase">{item.category}</Chip></div>
                  <Card.Title className="text-lg font-bold mb-2">{item.title}</Card.Title>
                  <p className="text-default-500 line-clamp-2 text-sm leading-relaxed">{item.excerpt}</p>
                </MotionCard>
              </NextLink>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      <Separator className="opacity-10" />

      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }} className="py-24 text-center">
        <h3 className="text-default-300 font-serif text-4xl italic md:text-6xl tracking-tighter opacity-50 select-none">&ldquo;Write to taste life twice.&rdquo;</h3>
      </motion.section>
    </div>
  );
}

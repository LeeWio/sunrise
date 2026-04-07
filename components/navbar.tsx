"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Button,
  Avatar,
  surfaceVariants,
  Popover,
  Chip,
  ListBox,
  Label,
  Description,
  Card,
  Tabs,
  Kbd,
  Badge,
  Separator,
  Tooltip,
  Drawer,
} from "@heroui/react";
import {
  BroadcastSignal,
  ChevronDown,
  MusicNote,
  Terminal,
  Pencil,
  Hammer,
  Ghost,
  Wrench,
  Compass,
  Flame,
  BookOpen,
  FileText,
  StarFill,
  Code,
  Flask,
  Cube,
  Scissors,
  Bookmark,
  Link as LinkIcon,
  Layers,
  Envelope,
  Globe,
  Person,
  Bars,
  Palette,
  Cpu,
} from "./icons";

// Spring Config for physical feedback
const SPRING_CONFIG = { type: "spring", stiffness: 300, damping: 25 } as const;

// Child variants for stagger propagation
const itemVariants = {
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: SPRING_CONFIG },
  hidden: { opacity: 0, y: 15, scale: 0.8, filter: "blur(4px)", transition: SPRING_CONFIG },
};

const menuVariants = {
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
  hidden: {},
};

const menuItemVariants = {
  hidden: { opacity: 0, y: 8, filter: "blur(4px)", scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="text-muted font-mono text-[10px] tracking-widest uppercase">
      {time || "--:--"}
    </span>
  );
}

// -----------------------------------------------------------------------------
// Zone A: Origin Node Menu
// -----------------------------------------------------------------------------
function OriginNodeContent() {
  return (
    <Popover.Content className="border-border/40 bg-overlay/60 w-80 overflow-hidden rounded-3xl p-0 shadow-2xl backdrop-blur-3xl">
      <Popover.Dialog className="p-0 outline-none">
        <motion.div variants={menuVariants} initial="hidden" animate="visible">
          <motion.div
            variants={menuItemVariants}
            className="from-accent/20 bg-gradient-to-br to-transparent p-6 pb-4"
          >
            <div className="flex items-center gap-4">
              <Avatar size="lg" className="ring-accent/10 ring-4">
                <Avatar.Image src="https://i.pravatar.cc/150?u=sunrise" />
                <Avatar.Fallback>W</Avatar.Fallback>
              </Avatar>
              <div className="flex flex-col">
                <h3 className="text-foreground text-lg font-black">Wei Li</h3>
                <p className="text-muted text-xs">首席熵增官 (Chief Entropy Officer)</p>
              </div>
            </div>
          </motion.div>
          <div className="space-y-4 p-6 pt-2">
            <motion.div variants={menuItemVariants} className="grid grid-cols-2 gap-3">
              <div className="bg-default/40 border-border/10 rounded-2xl border p-3">
                <p className="text-muted mb-1 text-[10px] tracking-wider uppercase">
                  Caffeine Level
                </p>
                <div className="flex items-end gap-1">
                  <span className="text-accent font-mono text-xl font-bold">98</span>
                  <span className="text-muted mb-1 text-[10px]">%</span>
                </div>
              </div>
              <div className="bg-default/40 border-border/10 rounded-2xl border p-3">
                <p className="text-muted mb-1 text-[10px] tracking-wider uppercase">
                  Bug Resistance
                </p>
                <div className="flex items-end gap-1">
                  <span className="text-danger font-mono text-xl font-bold">极低</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={menuItemVariants}
              className="bg-accent/5 border-accent/10 relative overflow-hidden rounded-2xl border p-4 italic"
            >
              <span className="text-accent/10 absolute -top-2 -left-1 font-serif text-4xl">“</span>
              <p className="text-foreground/80 relative z-10 text-xs leading-relaxed">
                “如果你觉得冒险是危险的，那么请试一试平庸；平庸是致命的。”
              </p>
              <p className="text-accent/60 mt-2 text-right text-[10px]">— 保罗·柯艾略</p>
            </motion.div>
            <motion.div
              variants={menuItemVariants}
              className="flex items-center justify-between pt-2"
            >
              <div className="flex gap-2">
                <Chip size="sm" variant="soft" color="success" className="text-[9px]">
                  Uptime: 24d
                </Chip>
                <Chip size="sm" variant="soft" color="accent" className="text-[9px]">
                  Lat: 12ms
                </Chip>
              </div>
              <Clock />
            </motion.div>
          </div>
        </motion.div>
      </Popover.Dialog>
    </Popover.Content>
  );
}

// -----------------------------------------------------------------------------
// Zone B: Popover Menus
// -----------------------------------------------------------------------------
function InkwellMenu() {
  return (
    <Popover.Content
      placement="bottom"
      offset={20}
      className="border-border/40 bg-overlay/80 w-64 overflow-hidden rounded-3xl p-0 shadow-2xl backdrop-blur-3xl"
    >
      <Popover.Dialog className="p-2 outline-none">
        <motion.div variants={menuVariants} initial="hidden" animate="visible" className="w-full">
          <ListBox aria-label="Inkwell Navigation">
            <ListBox.Item
              id="essays"
              textValue="Essays"
              className="hover:bg-default/40 rounded-2xl p-0"
            >
              <motion.div variants={menuItemVariants} className="h-full w-full">
                <Link
                  href="/inkwell/essays"
                  className="flex h-full w-full items-center gap-3 p-2 outline-none"
                >
                  <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-[inset_0_0_10px_rgba(var(--primary-rgb),0.1)]">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <Label className="text-foreground cursor-pointer text-sm leading-tight font-bold">
                      Essays
                    </Label>
                    <Description className="text-muted group-hover:text-foreground/70 text-[10px] transition-colors">
                      Deep dives & long-form
                    </Description>
                  </div>
                </Link>
              </motion.div>
            </ListBox.Item>
            <ListBox.Item
              id="notes"
              textValue="Notes"
              className="hover:bg-default/40 rounded-2xl p-0"
            >
              <motion.div variants={menuItemVariants} className="h-full w-full">
                <Link
                  href="/inkwell/notes"
                  className="flex h-full w-full items-center gap-3 p-2 outline-none"
                >
                  <div className="bg-success/10 text-success flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-[inset_0_0_10px_rgba(var(--success-rgb),0.1)]">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <Label className="text-foreground cursor-pointer text-sm leading-tight font-bold">
                      Notes
                    </Label>
                    <Description className="text-muted group-hover:text-foreground/70 text-[10px] transition-colors">
                      Digital garden & thoughts
                    </Description>
                  </div>
                </Link>
              </motion.div>
            </ListBox.Item>
            <ListBox.Item
              id="reviews"
              textValue="Reviews"
              className="hover:bg-default/40 rounded-2xl p-0"
            >
              <motion.div variants={menuItemVariants} className="h-full w-full">
                <Link
                  href="/inkwell/reviews"
                  className="flex h-full w-full items-center gap-3 p-2 outline-none"
                >
                  <div className="bg-warning/10 text-warning flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-[inset_0_0_10px_rgba(var(--warning-rgb),0.1)]">
                    <StarFill className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <Label className="text-foreground cursor-pointer text-sm leading-tight font-bold">
                      Reviews
                    </Label>
                    <Description className="text-muted group-hover:text-foreground/70 text-[10px] transition-colors">
                      Books, films & tech
                    </Description>
                  </div>
                </Link>
              </motion.div>
            </ListBox.Item>
          </ListBox>
        </motion.div>
      </Popover.Dialog>
    </Popover.Content>
  );
}

function WorkshopMenu() {
  return (
    <Popover.Content
      placement="bottom"
      offset={20}
      className="border-border/40 bg-overlay/80 w-[360px] overflow-hidden rounded-3xl p-0 shadow-2xl backdrop-blur-3xl"
    >
      <Popover.Dialog className="p-3 outline-none">
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-2"
        >
          <motion.div variants={menuItemVariants} className="col-span-2">
            <Link href="/workshop/blueprints" className="col-span-2 block h-full outline-none">
              <Card
                variant="secondary"
                className="hover:bg-default/40 bg-surface-secondary/50 h-full rounded-2xl border-2 border-transparent shadow-none transition-all"
              >
                <Card.Content className="flex flex-row items-center gap-4 p-4">
                  <div className="bg-accent/10 text-accent rounded-xl p-3">
                    <Code className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col">
                    <Card.Title className="text-foreground text-sm font-bold">
                      Blueprints
                    </Card.Title>
                    <Card.Description className="text-muted text-xs">
                      Open-source, libraries & core systems
                    </Card.Description>
                  </div>
                </Card.Content>
              </Card>
            </Link>
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <Link href="/workshop/design" className="block h-full outline-none">
              <Card
                variant="secondary"
                className="hover:bg-default/40 bg-surface-secondary/50 h-full rounded-2xl border-2 border-transparent shadow-none transition-all"
              >
                <Card.Content className="flex flex-col items-center gap-2 p-4 text-center">
                  <div className="rounded-xl bg-pink-500/10 p-2 text-pink-500">
                    <Palette className="h-5 w-5" />
                  </div>
                  <Card.Title className="text-foreground text-xs font-bold">Design</Card.Title>
                </Card.Content>
              </Card>
            </Link>
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <Link href="/workshop/lab" className="block h-full outline-none">
              <Card
                variant="secondary"
                className="hover:bg-default/40 bg-surface-secondary/50 h-full rounded-2xl border-2 border-transparent shadow-none transition-all"
              >
                <Card.Content className="flex flex-col items-center gap-2 p-4 text-center">
                  <div className="bg-danger/10 text-danger rounded-xl p-2">
                    <Flask className="h-5 w-5" />
                  </div>
                  <Card.Title className="text-foreground text-xs font-bold">Lab</Card.Title>
                </Card.Content>
              </Card>
            </Link>
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <Link href="/workshop/systems" className="block h-full outline-none">
              <Card
                variant="secondary"
                className="hover:bg-default/40 bg-surface-secondary/50 h-full rounded-2xl border-2 border-transparent shadow-none transition-all"
              >
                <Card.Content className="flex flex-col items-center gap-2 p-4 text-center">
                  <div className="rounded-xl bg-purple-500/10 p-2 text-purple-500">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <Card.Title className="text-foreground text-xs font-bold">Systems</Card.Title>
                </Card.Content>
              </Card>
            </Link>
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <Link href="/workshop/modules" className="block h-full outline-none">
              <Card
                variant="secondary"
                className="hover:bg-default/40 bg-surface-secondary/50 h-full rounded-2xl border-2 border-transparent shadow-none transition-all"
              >
                <Card.Content className="flex flex-col items-center gap-2 p-4 text-center">
                  <div className="bg-success/10 text-success rounded-xl p-2">
                    <Cube className="h-5 w-5" />
                  </div>
                  <Card.Title className="text-foreground text-xs font-bold">Modules</Card.Title>
                </Card.Content>
              </Card>
            </Link>
          </motion.div>
        </motion.div>
      </Popover.Dialog>
    </Popover.Content>
  );
}

function SanctuaryMenu() {
  return (
    <Popover.Content
      placement="bottom"
      offset={20}
      className="border-border/40 bg-overlay/80 w-72 overflow-hidden rounded-3xl p-0 shadow-2xl backdrop-blur-3xl"
    >
      <Popover.Dialog className="p-0 outline-none">
        <motion.div variants={menuVariants} initial="hidden" animate="visible" className="w-full">
          <Tabs className="w-full">
            <Tabs.ListContainer className="px-3 pt-3">
              <Tabs.List className="w-full justify-center">
                <Tabs.Tab id="vinyl">
                  Vinyl Room
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="arcade">
                  Arcade
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
            <Tabs.Panel id="vinyl" className="p-4 pt-2">
              <motion.div
                variants={menuItemVariants}
                className="bg-accent/5 border-accent/10 flex flex-col items-center gap-3 rounded-2xl border p-4 text-center"
              >
                <MusicNote className="text-accent size-8" />
                <p className="text-muted text-xs leading-relaxed">
                  Original tracks, curated playlists, and sonic experiments.
                </p>
                <Link href="/sanctuary/vinyl" className="mt-1 w-full outline-none">
                  <Button size="sm" variant="primary" className="w-full font-bold">
                    Enter Room
                  </Button>
                </Link>
              </motion.div>
            </Tabs.Panel>
            <Tabs.Panel id="arcade" className="p-4 pt-2">
              <motion.div
                variants={menuItemVariants}
                className="bg-warning/5 border-warning/10 flex flex-col items-center gap-3 rounded-2xl border p-4 text-center"
              >
                <Ghost className="text-warning size-8" />
                <p className="text-muted text-xs leading-relaxed">
                  Game dev logs, retro reviews, and playful interactions.
                </p>
                <Link href="/sanctuary/arcade" className="mt-1 w-full outline-none">
                  <Button size="sm" variant="primary" className="w-full font-bold">
                    Press Start
                  </Button>
                </Link>
              </motion.div>
            </Tabs.Panel>
          </Tabs>
        </motion.div>
      </Popover.Dialog>
    </Popover.Content>
  );
}

function ToolshedMenu() {
  return (
    <Popover.Content
      placement="bottom"
      offset={20}
      className="border-border/40 bg-overlay/80 w-64 overflow-hidden rounded-3xl p-0 shadow-2xl backdrop-blur-3xl"
    >
      <Popover.Dialog className="p-3 outline-none">
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-2"
        >
          <motion.div variants={menuItemVariants}>
            <Link href="/toolshed/swiss-army" className="w-full outline-none">
              <Button
                variant="ghost"
                className="group flex h-auto w-full items-center justify-between rounded-xl px-2 py-2"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-danger/10 text-danger rounded-lg p-2">
                    <Scissors className="h-4 w-4" />
                  </div>
                  <span className="text-foreground text-sm font-bold">Swiss Army</span>
                </div>
                <Kbd className="border-border/50 text-muted-foreground bg-transparent opacity-0 shadow-none transition-opacity group-hover:opacity-100">
                  <Kbd.Abbr title="Command" keyValue="command">
                    ⌘
                  </Kbd.Abbr>
                  <Kbd.Content>S</Kbd.Content>
                </Kbd>
              </Button>
            </Link>
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <Link href="/toolshed/curated" className="w-full outline-none">
              <Button
                variant="ghost"
                className="group flex h-auto w-full items-center justify-between rounded-xl px-2 py-2"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-warning/10 text-warning rounded-lg p-2">
                    <Bookmark className="h-4 w-4" />
                  </div>
                  <span className="text-foreground text-sm font-bold">Curated</span>
                </div>
                <Kbd className="border-border/50 text-muted-foreground bg-transparent opacity-0 shadow-none transition-opacity group-hover:opacity-100">
                  <Kbd.Abbr title="Command" keyValue="command">
                    ⌘
                  </Kbd.Abbr>
                  <Kbd.Content>B</Kbd.Content>
                </Kbd>
              </Button>
            </Link>
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <Link href="/toolshed/links" className="w-full outline-none">
              <Button
                variant="ghost"
                className="group flex h-auto w-full items-center justify-between rounded-xl px-2 py-2"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 text-accent rounded-lg p-2">
                    <LinkIcon className="h-4 w-4" />
                  </div>
                  <span className="text-foreground text-sm font-bold">Links</span>
                </div>
                <Kbd className="border-border/50 text-muted-foreground bg-transparent opacity-0 shadow-none transition-opacity group-hover:opacity-100">
                  <Kbd.Abbr title="Command" keyValue="command">
                    ⌘
                  </Kbd.Abbr>
                  <Kbd.Content>L</Kbd.Content>
                </Kbd>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Popover.Dialog>
    </Popover.Content>
  );
}

function LegendMenu() {
  return (
    <Popover.Content
      placement="bottom"
      offset={20}
      className="border-border/40 bg-overlay/80 w-64 overflow-hidden rounded-3xl p-0 shadow-2xl backdrop-blur-3xl"
    >
      <Popover.Dialog className="p-0 outline-none">
        <motion.div variants={menuVariants} initial="hidden" animate="visible" className="w-full">
          <motion.div
            variants={menuItemVariants}
            className="from-success/20 flex items-center gap-4 bg-gradient-to-br to-transparent p-4"
          >
            <Badge.Anchor>
              <Avatar className="ring-overlay bg-success/20 text-success ring-2" size="lg">
                <Avatar.Image src="https://i.pravatar.cc/150?u=legend" />
                <Avatar.Fallback>L</Avatar.Fallback>
              </Avatar>
              <Badge color="success" placement="bottom-right" className="border-overlay border-2" />
            </Badge.Anchor>
            <div className="flex flex-col">
              <span className="text-foreground text-sm font-bold">Explorer Node</span>
              <span className="text-muted text-[10px]">Level 99</span>
            </div>
          </motion.div>
          <div className="flex flex-col gap-1 p-2">
            <motion.div variants={menuItemVariants}>
              <Link href="/legend/who-is-there" className="w-full outline-none">
                <Button
                  variant="ghost"
                  className="flex h-auto w-full items-center justify-start gap-3 rounded-xl p-2"
                >
                  <div className="bg-default/20 text-foreground rounded-full p-2">
                    <Person className="size-4" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-foreground text-xs font-bold">Who&apos;s There?</span>
                    <span className="text-muted text-[10px]">My journey so far</span>
                  </div>
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={menuItemVariants}>
              <Link href="/legend/skill-tree" className="w-full outline-none">
                <Button
                  variant="ghost"
                  className="flex h-auto w-full items-center justify-start gap-3 rounded-xl p-2"
                >
                  <div className="bg-default/20 text-foreground rounded-full p-2">
                    <Layers className="size-4" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-foreground text-xs font-bold">Skill Tree</span>
                    <span className="text-muted text-[10px]">Abilities & tech</span>
                  </div>
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Popover.Dialog>
    </Popover.Content>
  );
}

function SignalMenu() {
  return (
    <Popover.Content
      placement="bottom"
      offset={20}
      className="border-border/40 bg-overlay/80 w-64 overflow-hidden rounded-3xl p-0 shadow-2xl backdrop-blur-3xl"
    >
      <Popover.Dialog className="p-3 outline-none">
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-2"
        >
          <motion.div variants={menuItemVariants}>
            <Link href="/signal/post-office" className="w-full outline-none">
              <Button
                variant="secondary"
                className="h-auto w-full justify-start gap-4 rounded-2xl px-3 py-3"
              >
                <div className="bg-warning/20 text-warning shrink-0 rounded-full p-2">
                  <Envelope className="size-4" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-foreground text-sm font-bold">Post Office</span>
                  <span className="text-muted text-[10px] font-normal">Newsletter dispatch</span>
                </div>
              </Button>
            </Link>
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <Link href="/signal/campfire" className="w-full outline-none">
              <Button
                variant="secondary"
                className="h-auto w-full justify-start gap-4 rounded-2xl px-3 py-3"
              >
                <div className="bg-accent/20 text-accent shrink-0 rounded-full p-2">
                  <Globe className="size-4" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-foreground text-sm font-bold">Campfire</span>
                  <span className="text-muted text-[10px] font-normal">Socials & Network</span>
                </div>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Popover.Dialog>
    </Popover.Content>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------
export function Navbar() {
  const pathname = usePathname();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const containerVariants = {
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { ...SPRING_CONFIG, staggerChildren: 0.08, delayChildren: 0.1 },
    },
    hidden: {
      y: -100,
      opacity: 0,
      scale: 0.9,
      transition: { ...SPRING_CONFIG, staggerChildren: 0.04, staggerDirection: -1 },
    },
  };

  const renderNavItem = (
    id: string,
    label: string,
    Icon: React.ElementType,
    isPopover: boolean,
    PopoverContent?: React.ReactNode,
    href?: string,
  ) => {
    const isActive = href ? pathname === href : pathname.startsWith(`/${id}`);

    const trigger = (
      <Button
        {...(href && !isPopover
          ? {
              render: (domProps) => (
                <Link
                  {...(domProps as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                  href={href}
                />
              ),
            }
          : {})}
        variant="ghost"
        className={`relative z-10 flex items-center gap-2 rounded-full px-4 font-bold transition-all duration-300 ${
          isActive ? "text-accent" : "text-muted hover:text-foreground"
        } !bg-transparent`} // Force transparent to let the framer motion magic pill show through
        size="md"
        onMouseEnter={() => setHoveredNode(id)}
      >
        <motion.div animate={isActive ? { scale: 1.2, rotate: [0, -10, 10, 0] } : {}}>
          <Icon className="h-4 w-4" />
        </motion.div>
        <span>{label}</span>
      </Button>
    );

    return (
      <motion.div variants={itemVariants} className="relative" key={id}>
        {isPopover ? (
          <Popover>
            <Popover.Trigger>{trigger}</Popover.Trigger>
            {PopoverContent}
          </Popover>
        ) : (
          trigger
        )}

        {/* Magic Hover Pill */}
        {hoveredNode === id && (
          <motion.div
            layoutId="navbar-hover"
            className="bg-default/40 absolute inset-0 z-0 rounded-full"
            transition={SPRING_CONFIG}
          />
        )}

        {/* Active Glow */}
        {isActive && (
          <motion.div
            layoutId="navbar-active"
            className="bg-accent-soft/20 absolute inset-0 z-0 rounded-full shadow-[0_0_20px_rgba(var(--accent-rgb),0.1)]"
            transition={SPRING_CONFIG}
          />
        )}
      </motion.div>
    );
  };

  return (
    <AnimatePresence>
      <motion.header
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={surfaceVariants({
          variant: "transparent",
          className:
            "border-border/40 bg-overlay/20 shadow-overlay pointer-events-auto fixed top-6 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full border p-2 backdrop-blur-3xl backdrop-saturate-150",
        })}
      >
        {/* [ZONE A] The Origin Node */}
        <motion.div variants={itemVariants} className="ml-1">
          <Popover>
            <Popover.Trigger>
              <div className="group hover:bg-default/40 relative flex cursor-pointer items-center gap-3 rounded-full py-1 pr-4 pl-1 transition-all active:scale-95">
                <motion.div
                  whileHover={{ rotate: 180 }}
                  className="bg-accent text-accent-foreground relative flex h-9 w-9 items-center justify-center rounded-full font-bold shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]"
                >
                  S
                  <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                    <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 duration-1000"></span>
                    <span className="bg-success border-overlay relative inline-flex h-3 w-3 rounded-full border-2"></span>
                  </span>
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-foreground text-xs leading-none font-black tracking-widest">
                    SUNRISE
                  </span>
                  <span className="text-muted mt-1 text-[9px] font-medium tracking-[0.15em] uppercase">
                    Terminal v1.0
                  </span>
                </div>
                <ChevronDown className="text-muted h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Popover.Trigger>
            <OriginNodeContent />
          </Popover>
        </motion.div>

        {/* Separator */}
        <Separator orientation="vertical" className="bg-border/40 mx-2 hidden h-6 md:block" />

        {/* [ZONE B] The Core Spaces */}
        <motion.nav
          className="hidden items-center gap-1 md:flex"
          onMouseLeave={() => setHoveredNode(null)}
          aria-label="Main Navigation"
        >
          {renderNavItem("live-feed", "Live Feed", BroadcastSignal, false, undefined, "/")}
          {renderNavItem("inkwell", "Inkwell", Pencil, true, <InkwellMenu />)}
          {renderNavItem("workshop", "Workshop", Hammer, true, <WorkshopMenu />)}
          {renderNavItem("sanctuary", "Sanctuary", Ghost, true, <SanctuaryMenu />)}
          {renderNavItem("toolshed", "Toolshed", Wrench, true, <ToolshedMenu />)}
          {renderNavItem("legend", "Map Legend", Compass, true, <LegendMenu />)}
          {renderNavItem("signal", "Signal Fire", Flame, true, <SignalMenu />)}
        </motion.nav>

        {/* Separator */}
        <Separator orientation="vertical" className="bg-border/40 mx-2 h-6" />

        {/* [ZONE C] Operator & Console */}
        <div className="flex items-center gap-1 pr-1">
          <Tooltip closeDelay={0}>
            <Tooltip.Trigger>
              <motion.button
                variants={itemVariants}
                className="bg-default/20 hover:bg-default/40 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors outline-none"
              >
                <Terminal className="text-muted hover:text-foreground h-4 w-4" />
              </motion.button>
            </Tooltip.Trigger>
            <Tooltip.Content className="px-3 py-1.5 text-xs font-bold shadow-xl">
              Command Center
            </Tooltip.Content>
          </Tooltip>

          {/* Mobile Menu Trigger */}
          <div className="ml-1 flex items-center md:hidden">
            <Drawer>
              <Drawer.Trigger className="bg-default/20 hover:bg-default/40 text-foreground flex h-8 w-8 items-center justify-center rounded-full transition-colors outline-none">
                <Bars className="h-4 w-4" />
              </Drawer.Trigger>
              <Drawer.Backdrop className="bg-black/60 backdrop-blur-sm">
                <Drawer.Content
                  placement="bottom"
                  className="border-border/40 bg-overlay/90 rounded-t-3xl border-t backdrop-blur-3xl"
                >
                  <Drawer.Dialog className="h-[75vh] outline-none">
                    <Drawer.Handle className="bg-muted/30 mx-auto mt-4 mb-2 h-1.5 w-12 rounded-full" />
                    <Drawer.Header className="pt-2 pb-0">
                      <Drawer.Heading className="text-foreground text-left text-lg font-black tracking-widest">
                        SUNRISE
                      </Drawer.Heading>
                    </Drawer.Header>
                    <Drawer.Body className="flex flex-col gap-2 px-4 py-6">
                      <Button
                        render={(domProps) => (
                          <Link
                            {...(domProps as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                            href="/"
                          />
                        )}
                        variant="ghost"
                        className={`w-full justify-start gap-4 rounded-2xl px-4 py-6 font-bold transition-all ${
                          pathname === "/"
                            ? "bg-accent/10 text-accent"
                            : "text-muted hover:bg-default/20 hover:text-foreground"
                        }`}
                      >
                        <BroadcastSignal className="h-5 w-5" />
                        <span className="text-base">Live Feed</span>
                      </Button>

                      <Button
                        render={(domProps) => (
                          <Link
                            {...(domProps as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                            href="/inkwell"
                          />
                        )}
                        variant="ghost"
                        className={`w-full justify-start gap-4 rounded-2xl px-4 py-6 font-bold transition-all ${
                          pathname.startsWith("/inkwell")
                            ? "bg-accent/10 text-accent"
                            : "text-muted hover:bg-default/20 hover:text-foreground"
                        }`}
                      >
                        <Pencil className="h-5 w-5" />
                        <span className="text-base">Inkwell</span>
                      </Button>

                      <Button
                        render={(domProps) => (
                          <Link
                            {...(domProps as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                            href="/workshop"
                          />
                        )}
                        variant="ghost"
                        className={`w-full justify-start gap-4 rounded-2xl px-4 py-6 font-bold transition-all ${
                          pathname.startsWith("/workshop")
                            ? "bg-accent/10 text-accent"
                            : "text-muted hover:bg-default/20 hover:text-foreground"
                        }`}
                      >
                        <Hammer className="h-5 w-5" />
                        <span className="text-base">Workshop</span>
                      </Button>

                      <Button
                        render={(domProps) => (
                          <Link
                            {...(domProps as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                            href="/sanctuary"
                          />
                        )}
                        variant="ghost"
                        className={`w-full justify-start gap-4 rounded-2xl px-4 py-6 font-bold transition-all ${
                          pathname.startsWith("/sanctuary")
                            ? "bg-accent/10 text-accent"
                            : "text-muted hover:bg-default/20 hover:text-foreground"
                        }`}
                      >
                        <Ghost className="h-5 w-5" />
                        <span className="text-base">Sanctuary</span>
                      </Button>

                      <Button
                        render={(domProps) => (
                          <Link
                            {...(domProps as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                            href="/toolshed"
                          />
                        )}
                        variant="ghost"
                        className={`w-full justify-start gap-4 rounded-2xl px-4 py-6 font-bold transition-all ${
                          pathname.startsWith("/toolshed")
                            ? "bg-accent/10 text-accent"
                            : "text-muted hover:bg-default/20 hover:text-foreground"
                        }`}
                      >
                        <Wrench className="h-5 w-5" />
                        <span className="text-base">Toolshed</span>
                      </Button>

                      <Button
                        render={(domProps) => (
                          <Link
                            {...(domProps as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                            href="/legend"
                          />
                        )}
                        variant="ghost"
                        className={`w-full justify-start gap-4 rounded-2xl px-4 py-6 font-bold transition-all ${
                          pathname.startsWith("/legend")
                            ? "bg-accent/10 text-accent"
                            : "text-muted hover:bg-default/20 hover:text-foreground"
                        }`}
                      >
                        <Compass className="h-5 w-5" />
                        <span className="text-base">Map Legend</span>
                      </Button>

                      <Button
                        render={(domProps) => (
                          <Link
                            {...(domProps as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                            href="/signal"
                          />
                        )}
                        variant="ghost"
                        className={`w-full justify-start gap-4 rounded-2xl px-4 py-6 font-bold transition-all ${
                          pathname.startsWith("/signal")
                            ? "bg-accent/10 text-accent"
                            : "text-muted hover:bg-default/20 hover:text-foreground"
                        }`}
                      >
                        <Flame className="h-5 w-5" />
                        <span className="text-base">Signal Fire</span>
                      </Button>
                    </Drawer.Body>
                  </Drawer.Dialog>
                </Drawer.Content>
              </Drawer.Backdrop>
            </Drawer>
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  );
}

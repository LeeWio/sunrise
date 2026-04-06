"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Button, Avatar, surfaceVariants, Popover, Chip, ListBox, Label, Description, Card, Tabs, Kbd, Badge, Separator, Tooltip, Drawer } from "@heroui/react";
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
  Cpu
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
  visible: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="text-[10px] font-mono text-muted uppercase tracking-widest">
      {time || "--:--"}
    </span>
  );
}

// -----------------------------------------------------------------------------
// Zone A: Origin Node Menu
// -----------------------------------------------------------------------------
function OriginNodeContent() {
  return (
    <Popover.Content className="w-80 overflow-hidden rounded-3xl border-border/40 bg-overlay/60 p-0 shadow-2xl backdrop-blur-3xl">
      <Popover.Dialog className="p-0 outline-none">
        <motion.div variants={menuVariants} initial="hidden" animate="visible">
          <motion.div variants={menuItemVariants} className="bg-gradient-to-br from-accent/20 to-transparent p-6 pb-4">
            <div className="flex items-center gap-4">
              <Avatar size="lg" className="ring-4 ring-accent/10">
                <Avatar.Image src="https://i.pravatar.cc/150?u=sunrise" />
                <Avatar.Fallback>W</Avatar.Fallback>
              </Avatar>
              <div className="flex flex-col">
                <h3 className="text-lg font-black text-foreground">Wei Li</h3>
                <p className="text-xs text-muted">首席熵增官 (Chief Entropy Officer)</p>
              </div>
            </div>
          </motion.div>
          <div className="space-y-4 p-6 pt-2">
            <motion.div variants={menuItemVariants} className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-default/40 p-3 border border-border/10">
                <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Caffeine Level</p>
                <div className="flex items-end gap-1">
                  <span className="text-xl font-mono font-bold text-accent">98</span>
                  <span className="text-[10px] text-muted mb-1">%</span>
                </div>
              </div>
              <div className="rounded-2xl bg-default/40 p-3 border border-border/10">
                <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Bug Resistance</p>
                <div className="flex items-end gap-1">
                  <span className="text-xl font-mono font-bold text-danger">极低</span>
                </div>
              </div>
            </motion.div>
            <motion.div variants={menuItemVariants} className="relative overflow-hidden rounded-2xl bg-accent/5 p-4 border border-accent/10 italic">
              <span className="absolute -left-1 -top-2 text-4xl text-accent/10 font-serif">“</span>
              <p className="relative z-10 text-xs leading-relaxed text-foreground/80">
                “如果你觉得冒险是危险的，那么请试一试平庸；平庸是致命的。”
              </p>
              <p className="mt-2 text-[10px] text-accent/60 text-right">— 保罗·柯艾略</p>
            </motion.div>
            <motion.div variants={menuItemVariants} className="flex items-center justify-between pt-2">
              <div className="flex gap-2">
                <Chip size="sm" variant="soft" color="success" className="text-[9px]">Uptime: 24d</Chip>
                <Chip size="sm" variant="soft" color="accent" className="text-[9px]">Lat: 12ms</Chip>
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
    <Popover.Content placement="bottom" offset={20} className="w-64 overflow-hidden rounded-3xl border-border/40 bg-overlay/80 p-0 shadow-2xl backdrop-blur-3xl">
      <Popover.Dialog className="p-2 outline-none">
        <motion.div variants={menuVariants} initial="hidden" animate="visible" className="w-full">
          <ListBox aria-label="Inkwell Navigation">
            <ListBox.Item id="essays" textValue="Essays" className="hover:bg-default/40 p-0 rounded-2xl">
              <motion.div variants={menuItemVariants} className="w-full h-full">
                <Link href="/inkwell/essays" className="w-full h-full p-2 flex items-center gap-3 outline-none">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-[inset_0_0_10px_rgba(var(--primary-rgb),0.1)]">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <Label className="text-sm font-bold text-foreground leading-tight cursor-pointer">Essays</Label>
                    <Description className="text-[10px] text-muted group-hover:text-foreground/70 transition-colors">Deep dives & long-form</Description>
                  </div>
                </Link>
              </motion.div>
            </ListBox.Item>
            <ListBox.Item id="notes" textValue="Notes" className="hover:bg-default/40 p-0 rounded-2xl">
              <motion.div variants={menuItemVariants} className="w-full h-full">
                <Link href="/inkwell/notes" className="w-full h-full p-2 flex items-center gap-3 outline-none">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success shadow-[inset_0_0_10px_rgba(var(--success-rgb),0.1)]">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <Label className="text-sm font-bold text-foreground leading-tight cursor-pointer">Notes</Label>
                    <Description className="text-[10px] text-muted group-hover:text-foreground/70 transition-colors">Digital garden & thoughts</Description>
                  </div>
                </Link>
              </motion.div>
            </ListBox.Item>
            <ListBox.Item id="reviews" textValue="Reviews" className="hover:bg-default/40 p-0 rounded-2xl">
              <motion.div variants={menuItemVariants} className="w-full h-full">
                <Link href="/inkwell/reviews" className="w-full h-full p-2 flex items-center gap-3 outline-none">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warning/10 text-warning shadow-[inset_0_0_10px_rgba(var(--warning-rgb),0.1)]">
                    <StarFill className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <Label className="text-sm font-bold text-foreground leading-tight cursor-pointer">Reviews</Label>
                    <Description className="text-[10px] text-muted group-hover:text-foreground/70 transition-colors">Books, films & tech</Description>
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
    <Popover.Content placement="bottom" offset={20} className="w-[360px] overflow-hidden rounded-3xl border-border/40 bg-overlay/80 p-0 shadow-2xl backdrop-blur-3xl">
      <Popover.Dialog className="p-3 outline-none">
        <motion.div variants={menuVariants} initial="hidden" animate="visible" className="grid grid-cols-2 gap-2">
          <motion.div variants={menuItemVariants} className="col-span-2">
            <Link href="/workshop/blueprints" className="col-span-2 block outline-none h-full">
              <Card variant="secondary" className="hover:bg-default/40 border-2 border-transparent transition-all h-full bg-surface-secondary/50 rounded-2xl shadow-none">
                <Card.Content className="p-4 flex flex-row items-center gap-4">
                  <div className="bg-accent/10 text-accent p-3 rounded-xl"><Code className="h-6 w-6" /></div>
                  <div className="flex flex-col">
                    <Card.Title className="text-sm font-bold text-foreground">Blueprints</Card.Title>
                    <Card.Description className="text-xs text-muted">Open-source, libraries & core systems</Card.Description>
                  </div>
                </Card.Content>
              </Card>
            </Link>
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <Link href="/workshop/design" className="block outline-none h-full">
              <Card variant="secondary" className="hover:bg-default/40 border-2 border-transparent transition-all h-full bg-surface-secondary/50 rounded-2xl shadow-none">
                <Card.Content className="p-4 flex flex-col items-center text-center gap-2">
                  <div className="bg-pink-500/10 text-pink-500 p-2 rounded-xl"><Palette className="h-5 w-5" /></div>
                  <Card.Title className="text-xs font-bold text-foreground">Design</Card.Title>
                </Card.Content>
              </Card>
            </Link>
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <Link href="/workshop/lab" className="block outline-none h-full">
              <Card variant="secondary" className="hover:bg-default/40 border-2 border-transparent transition-all h-full bg-surface-secondary/50 rounded-2xl shadow-none">
                <Card.Content className="p-4 flex flex-col items-center text-center gap-2">
                  <div className="bg-danger/10 text-danger p-2 rounded-xl"><Flask className="h-5 w-5" /></div>
                  <Card.Title className="text-xs font-bold text-foreground">Lab</Card.Title>
                </Card.Content>
              </Card>
            </Link>
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <Link href="/workshop/systems" className="block outline-none h-full">
              <Card variant="secondary" className="hover:bg-default/40 border-2 border-transparent transition-all h-full bg-surface-secondary/50 rounded-2xl shadow-none">
                <Card.Content className="p-4 flex flex-col items-center text-center gap-2">
                  <div className="bg-purple-500/10 text-purple-500 p-2 rounded-xl"><Cpu className="h-5 w-5" /></div>
                  <Card.Title className="text-xs font-bold text-foreground">Systems</Card.Title>
                </Card.Content>
              </Card>
            </Link>
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <Link href="/workshop/modules" className="block outline-none h-full">
              <Card variant="secondary" className="hover:bg-default/40 border-2 border-transparent transition-all h-full bg-surface-secondary/50 rounded-2xl shadow-none">
                <Card.Content className="p-4 flex flex-col items-center text-center gap-2">
                  <div className="bg-success/10 text-success p-2 rounded-xl"><Cube className="h-5 w-5" /></div>
                  <Card.Title className="text-xs font-bold text-foreground">Modules</Card.Title>
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
    <Popover.Content placement="bottom" offset={20} className="w-72 overflow-hidden rounded-3xl border-border/40 bg-overlay/80 p-0 shadow-2xl backdrop-blur-3xl">
      <Popover.Dialog className="p-0 outline-none">
        <motion.div variants={menuVariants} initial="hidden" animate="visible" className="w-full">
          <Tabs className="w-full">
            <Tabs.ListContainer className="px-3 pt-3">
              <Tabs.List className="w-full justify-center">
                <Tabs.Tab id="vinyl">Vinyl Room<Tabs.Indicator /></Tabs.Tab>
                <Tabs.Tab id="arcade">Arcade<Tabs.Indicator /></Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
            <Tabs.Panel id="vinyl" className="p-4 pt-2">
              <motion.div variants={menuItemVariants} className="bg-accent/5 rounded-2xl p-4 flex flex-col items-center gap-3 text-center border border-accent/10">
                <MusicNote className="size-8 text-accent" />
                <p className="text-xs text-muted leading-relaxed">Original tracks, curated playlists, and sonic experiments.</p>
                <Link href="/sanctuary/vinyl" className="w-full mt-1 outline-none">
                  <Button size="sm" variant="primary" className="w-full font-bold">Enter Room</Button>
                </Link>
              </motion.div>
            </Tabs.Panel>
            <Tabs.Panel id="arcade" className="p-4 pt-2">
              <motion.div variants={menuItemVariants} className="bg-warning/5 rounded-2xl p-4 flex flex-col items-center gap-3 text-center border border-warning/10">
                <Ghost className="size-8 text-warning" />
                <p className="text-xs text-muted leading-relaxed">Game dev logs, retro reviews, and playful interactions.</p>
                <Link href="/sanctuary/arcade" className="w-full mt-1 outline-none">
                  <Button size="sm" variant="primary" className="w-full font-bold">Press Start</Button>
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
    <Popover.Content placement="bottom" offset={20} className="w-64 overflow-hidden rounded-3xl border-border/40 bg-overlay/80 p-0 shadow-2xl backdrop-blur-3xl">
      <Popover.Dialog className="p-3 outline-none">
        <motion.div variants={menuVariants} initial="hidden" animate="visible" className="flex flex-col gap-2">
          <motion.div variants={menuItemVariants}>
            <Link href="/toolshed/swiss-army" className="w-full outline-none">
              <Button variant="ghost" className="group w-full h-auto py-2 px-2 flex items-center justify-between rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-danger/10 text-danger p-2 rounded-lg"><Scissors className="h-4 w-4" /></div>
                  <span className="text-sm font-bold text-foreground">Swiss Army</span>
                </div>
                <Kbd className="opacity-0 group-hover:opacity-100 transition-opacity bg-transparent border-border/50 text-muted-foreground shadow-none">
                  <Kbd.Abbr title="Command" keyValue="command">⌘</Kbd.Abbr>
                  <Kbd.Content>S</Kbd.Content>
                </Kbd>
              </Button>
            </Link>
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <Link href="/toolshed/curated" className="w-full outline-none">
              <Button variant="ghost" className="group w-full h-auto py-2 px-2 flex items-center justify-between rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-warning/10 text-warning p-2 rounded-lg"><Bookmark className="h-4 w-4" /></div>
                  <span className="text-sm font-bold text-foreground">Curated</span>
                </div>
                <Kbd className="opacity-0 group-hover:opacity-100 transition-opacity bg-transparent border-border/50 text-muted-foreground shadow-none">
                  <Kbd.Abbr title="Command" keyValue="command">⌘</Kbd.Abbr>
                  <Kbd.Content>B</Kbd.Content>
                </Kbd>
              </Button>
            </Link>
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <Link href="/toolshed/links" className="w-full outline-none">
              <Button variant="ghost" className="group w-full h-auto py-2 px-2 flex items-center justify-between rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 text-accent p-2 rounded-lg"><LinkIcon className="h-4 w-4" /></div>
                  <span className="text-sm font-bold text-foreground">Links</span>
                </div>
                <Kbd className="opacity-0 group-hover:opacity-100 transition-opacity bg-transparent border-border/50 text-muted-foreground shadow-none">
                  <Kbd.Abbr title="Command" keyValue="command">⌘</Kbd.Abbr>
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
    <Popover.Content placement="bottom" offset={20} className="w-64 overflow-hidden rounded-3xl border-border/40 bg-overlay/80 p-0 shadow-2xl backdrop-blur-3xl">
      <Popover.Dialog className="p-0 outline-none">
        <motion.div variants={menuVariants} initial="hidden" animate="visible" className="w-full">
          <motion.div variants={menuItemVariants} className="p-4 bg-gradient-to-br from-success/20 to-transparent flex gap-4 items-center">
            <Badge.Anchor>
              <Avatar className="ring-2 ring-overlay bg-success/20 text-success" size="lg">
                <Avatar.Image src="https://i.pravatar.cc/150?u=legend" />
                <Avatar.Fallback>L</Avatar.Fallback>
              </Avatar>
              <Badge color="success" placement="bottom-right" className="border-overlay border-2" />
            </Badge.Anchor>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground">Explorer Node</span>
              <span className="text-[10px] text-muted">Level 99</span>
            </div>
          </motion.div>
          <div className="p-2 flex flex-col gap-1">
            <motion.div variants={menuItemVariants}>
              <Link href="/legend/who-is-there" className="w-full outline-none">
                <Button variant="ghost" className="w-full h-auto p-2 flex justify-start gap-3 items-center rounded-xl">
                  <div className="bg-default/20 p-2 rounded-full text-foreground"><Person className="size-4" /></div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-bold text-foreground">Who&apos;s There?</span>
                    <span className="text-[10px] text-muted">My journey so far</span>
                  </div>
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={menuItemVariants}>
              <Link href="/legend/skill-tree" className="w-full outline-none">
                <Button variant="ghost" className="w-full h-auto p-2 flex justify-start gap-3 items-center rounded-xl">
                  <div className="bg-default/20 p-2 rounded-full text-foreground"><Layers className="size-4" /></div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-bold text-foreground">Skill Tree</span>
                    <span className="text-[10px] text-muted">Abilities & tech</span>
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
    <Popover.Content placement="bottom" offset={20} className="w-64 overflow-hidden rounded-3xl border-border/40 bg-overlay/80 p-0 shadow-2xl backdrop-blur-3xl">
      <Popover.Dialog className="p-3 outline-none">
        <motion.div variants={menuVariants} initial="hidden" animate="visible" className="flex flex-col gap-2">
          <motion.div variants={menuItemVariants}>
            <Link href="/signal/post-office" className="w-full outline-none">
              <Button 
                variant="secondary" 
                className="h-auto py-3 justify-start px-3 gap-4 w-full rounded-2xl"
              >
                <div className="bg-warning/20 text-warning p-2 rounded-full shrink-0"><Envelope className="size-4" /></div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-bold text-foreground">Post Office</span>
                  <span className="text-[10px] text-muted font-normal">Newsletter dispatch</span>
                </div>
              </Button>
            </Link>
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <Link href="/signal/campfire" className="w-full outline-none">
              <Button 
                variant="secondary" 
                className="h-auto py-3 justify-start px-3 gap-4 w-full rounded-2xl"
              >
                <div className="bg-accent/20 text-accent p-2 rounded-full shrink-0"><Globe className="size-4" /></div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-bold text-foreground">Campfire</span>
                  <span className="text-[10px] text-muted font-normal">Socials & Network</span>
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
      y: 0, opacity: 1, scale: 1,
      transition: { ...SPRING_CONFIG, staggerChildren: 0.08, delayChildren: 0.1 }
    },
    hidden: { 
      y: -100, opacity: 0, scale: 0.9,
      transition: { ...SPRING_CONFIG, staggerChildren: 0.04, staggerDirection: -1 }
    },
  };

  const renderNavItem = (id: string, label: string, Icon: React.ElementType, isPopover: boolean, PopoverContent?: React.ReactNode, href?: string) => {
    const isActive = href ? pathname === href : pathname.startsWith(`/${id}`);
    
    const trigger = (
      <Button
        {...(href && !isPopover ? { render: (domProps) => <Link {...(domProps as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)} href={href} /> } : {})}
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
            className="absolute inset-0 z-0 rounded-full bg-default/40"
            transition={SPRING_CONFIG}
          />
        )}

        {/* Active Glow */}
        {isActive && (
          <motion.div
            layoutId="navbar-active"
            className="absolute inset-0 z-0 rounded-full bg-accent-soft/20 shadow-[0_0_20px_rgba(var(--accent-rgb),0.1)]"
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
          className: "fixed top-6 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full border border-border/40 bg-overlay/20 p-2 shadow-overlay backdrop-blur-3xl backdrop-saturate-150 pointer-events-auto"
        })}
      >
        {/* [ZONE A] The Origin Node */}
        <motion.div variants={itemVariants} className="ml-1">
          <Popover>
            <Popover.Trigger>
              <div className="group relative flex cursor-pointer items-center gap-3 rounded-full py-1 pl-1 pr-4 transition-all hover:bg-default/40 active:scale-95">
                <motion.div 
                  whileHover={{ rotate: 180 }}
                  className="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent font-bold text-accent-foreground shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]"
                >
                  S
                  <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75 duration-1000"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-success border-2 border-overlay"></span>
                  </span>
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-xs font-black tracking-widest text-foreground leading-none">SUNRISE</span>
                  <span className="text-[9px] font-medium text-muted uppercase tracking-[0.15em] mt-1">Terminal v1.0</span>
                </div>
                <ChevronDown className="h-3 w-3 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Popover.Trigger>
            <OriginNodeContent />
          </Popover>
        </motion.div>

        {/* Separator */}
        <Separator orientation="vertical" className="mx-2 h-6 bg-border/40 hidden md:block" />

        {/* [ZONE B] The Core Spaces */}
        <motion.nav 
          className="hidden md:flex items-center gap-1"
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
        <Separator orientation="vertical" className="mx-2 h-6 bg-border/40" />

        {/* [ZONE C] Operator & Console */}
        <div className="flex items-center gap-1 pr-1">
          <Tooltip closeDelay={0}>
            <Tooltip.Trigger>
              <motion.button variants={itemVariants} className="h-8 w-8 rounded-full bg-default/20 flex items-center justify-center cursor-pointer hover:bg-default/40 transition-colors outline-none">
                 <Terminal className="h-4 w-4 text-muted hover:text-foreground" />
              </motion.button>
            </Tooltip.Trigger>
            <Tooltip.Content className="text-xs font-bold px-3 py-1.5 shadow-xl">
               Command Center
            </Tooltip.Content>
          </Tooltip>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center ml-1">
            <Drawer>
              <Drawer.Trigger className="flex h-8 w-8 items-center justify-center rounded-full bg-default/20 hover:bg-default/40 text-foreground outline-none transition-colors">
                <Bars className="h-4 w-4" />
              </Drawer.Trigger>
              <Drawer.Backdrop className="bg-black/60 backdrop-blur-sm">
                <Drawer.Content placement="bottom" className="rounded-t-3xl border-t border-border/40 bg-overlay/90 backdrop-blur-3xl">
                  <Drawer.Dialog className="outline-none h-[75vh]">
                    <Drawer.Handle className="w-12 h-1.5 bg-muted/30 rounded-full mx-auto mt-4 mb-2" />
                    <Drawer.Header className="pt-2 pb-0">
                      <Drawer.Heading className="text-lg font-black tracking-widest text-foreground text-left">SUNRISE</Drawer.Heading>
                    </Drawer.Header>
                    <Drawer.Body className="px-4 py-6 flex flex-col gap-2">
                      <Button
                        render={(domProps) => (
                          <Link {...(domProps as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)} href="/" />
                        )}
                        variant="ghost"
                        className={`w-full justify-start gap-4 rounded-2xl py-6 px-4 font-bold transition-all ${
                          pathname === "/" ? "bg-accent/10 text-accent" : "text-muted hover:bg-default/20 hover:text-foreground"
                        }`}
                      >
                        <BroadcastSignal className="h-5 w-5" />
                        <span className="text-base">Live Feed</span>
                      </Button>
                      
                      <Button
                        render={(domProps) => (
                          <Link {...(domProps as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)} href="/inkwell" />
                        )}
                        variant="ghost"
                        className={`w-full justify-start gap-4 rounded-2xl py-6 px-4 font-bold transition-all ${
                          pathname.startsWith("/inkwell") ? "bg-accent/10 text-accent" : "text-muted hover:bg-default/20 hover:text-foreground"
                        }`}
                      >
                        <Pencil className="h-5 w-5" />
                        <span className="text-base">Inkwell</span>
                      </Button>

                      <Button
                        render={(domProps) => (
                          <Link {...(domProps as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)} href="/workshop" />
                        )}
                        variant="ghost"
                        className={`w-full justify-start gap-4 rounded-2xl py-6 px-4 font-bold transition-all ${
                          pathname.startsWith("/workshop") ? "bg-accent/10 text-accent" : "text-muted hover:bg-default/20 hover:text-foreground"
                        }`}
                      >
                        <Hammer className="h-5 w-5" />
                        <span className="text-base">Workshop</span>
                      </Button>

                      <Button
                        render={(domProps) => (
                          <Link {...(domProps as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)} href="/sanctuary" />
                        )}
                        variant="ghost"
                        className={`w-full justify-start gap-4 rounded-2xl py-6 px-4 font-bold transition-all ${
                          pathname.startsWith("/sanctuary") ? "bg-accent/10 text-accent" : "text-muted hover:bg-default/20 hover:text-foreground"
                        }`}
                      >
                        <Ghost className="h-5 w-5" />
                        <span className="text-base">Sanctuary</span>
                      </Button>

                      <Button
                        render={(domProps) => (
                          <Link {...(domProps as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)} href="/toolshed" />
                        )}
                        variant="ghost"
                        className={`w-full justify-start gap-4 rounded-2xl py-6 px-4 font-bold transition-all ${
                          pathname.startsWith("/toolshed") ? "bg-accent/10 text-accent" : "text-muted hover:bg-default/20 hover:text-foreground"
                        }`}
                      >
                        <Wrench className="h-5 w-5" />
                        <span className="text-base">Toolshed</span>
                      </Button>

                      <Button
                        render={(domProps) => (
                          <Link {...(domProps as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)} href="/legend" />
                        )}
                        variant="ghost"
                        className={`w-full justify-start gap-4 rounded-2xl py-6 px-4 font-bold transition-all ${
                          pathname.startsWith("/legend") ? "bg-accent/10 text-accent" : "text-muted hover:bg-default/20 hover:text-foreground"
                        }`}
                      >
                        <Compass className="h-5 w-5" />
                        <span className="text-base">Map Legend</span>
                      </Button>

                      <Button
                        render={(domProps) => (
                          <Link {...(domProps as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)} href="/signal" />
                        )}
                        variant="ghost"
                        className={`w-full justify-start gap-4 rounded-2xl py-6 px-4 font-bold transition-all ${
                          pathname.startsWith("/signal") ? "bg-accent/10 text-accent" : "text-muted hover:bg-default/20 hover:text-foreground"
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

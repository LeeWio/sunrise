'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { cn, Button, ButtonGroup } from '@heroui/react';
import { AuthModal } from './auth/auth-modal';
import { useState } from 'react';
import { LogIn, Sparkles } from 'lucide-react';
import { Logo } from './icons';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { id: 'content', label: 'Content', href: '/content' },
  { id: 'timeline', label: 'Timeline', href: '/timeline' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'settings', label: 'Settings', href: '/settings' },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  // Auth state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'sign-up'>('login');

  // Interaction state
  const [isAuthHovered, setIsAuthHovered] = useState(false);

  const openAuth = (mode: 'login' | 'sign-up') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const activeItem = NAV_ITEMS.find(
    (item) => pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
  );

  return (
    <>
      <div className="pointer-events-none fixed top-0 right-0 left-0 z-50 flex justify-center px-4 pt-4">
        <motion.nav
          variants={{
            visible: { y: 0, opacity: 1, filter: 'blur(0px)' },
            hidden: { y: -20, opacity: 0, filter: 'blur(5px)' },
          }}
          initial="visible"
          animate={hidden ? 'hidden' : 'visible'}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={cn(
            'pointer-events-auto flex items-center gap-2 p-1.5',
            'bg-background/70 shadow-lg shadow-black/5 backdrop-blur-2xl',
            'border border-white/10 dark:border-white/5',
            'rounded-full'
          )}
        >
          {/* Logo */}
          <Button
            isIconOnly
            size="sm"
            variant="ghost"
            className="rounded-full"
            onPress={() => router.push('/')}
            aria-label="Home"
          >
            <Logo size={24} />
          </Button>

          {/* Navigation Items */}
          <div className="flex items-center gap-1" onMouseLeave={() => setHoveredNav(null)}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem?.id === item.id;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    'relative px-3.5 py-1.5 text-sm font-medium transition-colors outline-none rounded-full',
                    isActive ? 'text-foreground font-semibold' : 'text-default-500 hover:text-foreground'
                  )}
                  onMouseEnter={() => setHoveredNav(item.id)}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive ? (
                    <motion.div
                      layoutId="nav-indicator"
                      className="bg-foreground/10 absolute inset-0 z-0 rounded-full shadow-sm"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  ) : (
                    hoveredNav === item.id && (
                      <motion.div
                        layoutId="nav-hover"
                        className="bg-foreground/5 absolute inset-0 z-0 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                      />
                    )
                  )}
                </Link>
              );
            })}
          </div>

          <div className="bg-default-100/30 mx-1 h-4 w-px rounded-full" />

          {/* Auth Button with Hover Expand Effect */}
          <div
            className="relative h-9"
            onMouseEnter={() => setIsAuthHovered(true)}
            onMouseLeave={() => setIsAuthHovered(false)}
          >
            <motion.div
              className="relative flex h-full items-center overflow-hidden rounded-full bg-default-100/40 border border-white/20 dark:border-white/10 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] backdrop-blur-md"
              initial={false}
              animate={{
                width: isAuthHovered ? 170 : 110,
              }}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 25,
                mass: 0.8
              }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {!isAuthHovered ? (
                  <motion.button
                    key="connect"
                    layout="position"
                    initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                    transition={{ duration: 0.25, ease: 'backOut' }}
                    className="absolute inset-0 flex w-full items-center justify-center gap-2 font-medium text-foreground"
                    onClick={() => openAuth('login')}
                  >
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                    >
                      <Sparkles size={16} className="text-amber-500 fill-amber-500/20" />
                    </motion.div>
                    <span className="text-sm">Connect</span>
                  </motion.button>
                ) : (
                  <motion.div
                    key="actions"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="flex w-full items-center justify-center px-1"
                  >
                    <ButtonGroup variant="tertiary" className="w-full gap-0">
                      <Button
                        size="sm"
                        className="h-7 flex-1 text-xs font-medium"
                        onPress={() => openAuth('login')}
                      >
                        Log in
                      </Button>
                      <Button
                        size="sm"
                        className="h-7 flex-1 bg-gradient-to-r from-primary to-secondary px-4 text-xs font-semibold text-white shadow-md transition-transform active:scale-95"
                        onPress={() => openAuth('sign-up')}
                      >
                        Sign up
                      </Button>
                    </ButtonGroup>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.nav>
      </div>
      <AuthModal isOpen={isAuthOpen} onOpenChange={setIsAuthOpen} initialMode={authMode} />
    </>
  );
}

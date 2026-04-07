"use client";

import React from "react";
import { Toolbar, cn } from "@heroui/react";
import { motion, AnimatePresence } from "motion/react";

// Create a motion-enabled version of the HeroUI Toolbar (using v12 motion.create)
const MotionToolbar = motion.create(Toolbar);

interface MenuContainerProps extends React.ComponentProps<typeof MotionToolbar> {
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

const defaultSpring = { type: "spring" as const, stiffness: 500, damping: 30, mass: 1 };

/**
 * A unified, motion-ready wrapper for editor bubble menus.
 * Uses HeroUI's Toolbar with isAttached for consistent styling.
 * Now optimized with built-in spring animations and motion.create.
 */
export const MenuContainer = React.forwardRef<HTMLDivElement, MenuContainerProps>(
  (
    {
      children,
      className,
      "aria-label": ariaLabel = "Editor Menu",
      initial = { opacity: 0, scale: 0.95, y: 5 },
      animate = { opacity: 1, scale: 1, y: 0 },
      exit = { opacity: 0, scale: 0.95, y: 5 },
      transition = defaultSpring,
      layout = true,
      ...props
    },
    ref,
  ) => {
    return (
      <AnimatePresence mode="wait">
        <MotionToolbar
          ref={ref}
          isAttached
          aria-label={ariaLabel}
          className={cn("bg-overlay/80 backdrop-blur-md backdrop-saturate-150", className)}
          initial={initial}
          animate={animate}
          exit={exit}
          transition={transition}
          layout={layout}
          {...props}
        >
          {children}
        </MotionToolbar>
      </AnimatePresence>
    );
  },
);

MenuContainer.displayName = "MenuContainer";

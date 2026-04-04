"use client";

import React from "react";
import { Toolbar } from "@heroui/react";
import { motion } from "motion/react";

// Create a motion-enabled version of the HeroUI Toolbar
const MotionToolbar = motion(Toolbar);

interface MenuContainerProps extends React.ComponentProps<typeof MotionToolbar> {
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

/**
 * A unified, motion-ready wrapper for editor bubble menus.
 * Uses HeroUI's Toolbar with isAttached for consistent styling.
 */
export const MenuContainer = React.forwardRef<HTMLDivElement, MenuContainerProps>(
  ({ children, className = "", "aria-label": ariaLabel = "Editor Menu", ...props }, ref) => {
    return (
      <MotionToolbar ref={ref} isAttached aria-label={ariaLabel} className={className} {...props}>
        {children}
      </MotionToolbar>
    );
  },
);

MenuContainer.displayName = "MenuContainer";

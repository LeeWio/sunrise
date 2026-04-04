"use client";

import React from "react";
import { Toolbar } from "@heroui/react";
import { motion } from "motion/react";

interface MenuContainerProps {
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

// Create a motion-enabled version of the HeroUI Toolbar
const MotionToolbar = motion(Toolbar);

/**
 * A unified, motion-ready wrapper for editor bubble menus.
 * Uses HeroUI's Toolbar with isAttached for consistent styling.
 */
export const MenuContainer = React.forwardRef<HTMLDivElement, MenuContainerProps>(
  ({ children, className = "", "aria-label": ariaLabel = "Editor Menu", ...props }, ref) => {
    return (
      <MotionToolbar
        ref={ref}
        isAttached
        aria-label={ariaLabel}
        className={className}
        {...props}
      >
        {children}
      </MotionToolbar>
    );
  }
);

MenuContainer.displayName = "MenuContainer";

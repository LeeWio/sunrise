"use client";

import React from "react";
import { Button, Tooltip, type ButtonProps } from "@heroui/react";
import { cn } from "@heroui/react";

export interface ToolbarButtonProps extends Omit<ButtonProps, "children"> {
  /**
   * The icon to display inside the button.
   */
  icon: React.ReactNode;
  /**
   * Optional tooltip text to display on hover.
   */
  tooltip?: string;
  /**
   * Whether the button is in an active/pressed state.
   */
  active?: boolean;
  /**
   * If true, the button will NOT be wrapped in a Tooltip.
   */
  hideTooltip?: boolean;
}

/**
 * A unified button component for editor bubble menus.
 * Uses HeroUI's variant system to handle active states consistently.
 */
export const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ icon, tooltip, active, className, variant, hideTooltip = false, ...props }, ref) => {
    // This leverages HeroUI's internal styling and state management.
    const currentVariant = active ? "tertiary" : variant || "ghost";

    const button = (
      <Button
        ref={ref}
        isIconOnly
        size="sm"
        variant={currentVariant}
        className={cn(className)}
        {...props}
      >
        {icon}
      </Button>
    );

    if (tooltip && !hideTooltip) {
      return (
        <Tooltip closeDelay={0}>
          <Tooltip.Trigger>{button}</Tooltip.Trigger>
          <Tooltip.Content>{tooltip}</Tooltip.Content>
        </Tooltip>
      );
    }

    return button;
  },
);

ToolbarButton.displayName = "ToolbarButton";

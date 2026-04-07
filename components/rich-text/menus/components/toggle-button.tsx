"use client";

import React from "react";
import {
  ToggleButton as HeroUIToggleButton,
  Tooltip,
  type ToggleButtonProps as HeroUIToggleButtonProps,
} from "@heroui/react";
import { cn } from "@heroui/react";

export interface ToggleButtonProps extends Omit<HeroUIToggleButtonProps, "onChange"> {
  /**
   * Optional icon to display. If provided along with isIconOnly, children can be omitted.
   */
  icon?: React.ReactNode;
  /**
   * Tooltip text to display on hover.
   */
  tooltip?: string;
  /**
   * Controlled state for the toggle button.
   */
  isSelected?: boolean;
  /**
   * Callback fired when the toggle button is pressed.
   */
  onPress?: () => void;
  /**
   * Standard onChange handler mapped to onPress internally,
   * provided for compatibility with standard controlled components.
   */
  onChange?: (isSelected: boolean) => void;
}

/**
 * A generalized ToggleButton component that wraps HeroUI's ToggleButton.
 * It provides built-in tooltip support and standardizes controlled behavior (isSelected + onPress/onChange).
 */
export const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (
    {
      icon,
      children,
      tooltip,
      className,
      isSelected,
      variant = "default",
      onPress,
      onChange,
      size = "sm",
      isIconOnly = true,
      ...props
    },
    ref,
  ) => {
    // Handle state changes ensuring both onPress and onChange are respected if provided.
    const handlePress = () => {
      onPress?.();
      if (onChange) {
        onChange(!isSelected);
      }
    };

    const button = (
      <HeroUIToggleButton
        ref={ref}
        variant={variant}
        isSelected={isSelected}
        onPress={handlePress}
        size={size}
        isIconOnly={isIconOnly}
        className={cn(className)}
        {...props}
      >
        {icon || children}
      </HeroUIToggleButton>
    );

    if (tooltip) {
      return (
        <Tooltip delay={300}>
          {button}
          <Tooltip.Content>{tooltip}</Tooltip.Content>
        </Tooltip>
      );
    }

    return button;
  },
);

ToggleButton.displayName = "ToggleButton";

'use client';

import { memo, ReactNode } from 'react';
import { Button, Tooltip, cn } from '@heroui/react';

interface MemoButtonProps {
  icon: ReactNode;
  onPress: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
  tooltip?: string;
  className?: string;
}

/**
 * A memoized button component specifically optimized for Rich Text Editor toolbars.
 * Minimizes re-renders during rapid editor state updates (bold, italic, etc.).
 */
export const MemoButton = memo(
  ({ icon, onPress, isActive, isDisabled, tooltip, className }: MemoButtonProps) => {
    const button = (
      <Button
        isIconOnly
        size="sm"
        variant={isActive ? 'secondary' : 'ghost'}
        onPress={onPress}
        isDisabled={isDisabled}
        className={cn(className)}
      >
        {icon}
      </Button>
    );

    if (tooltip) {
      return (
        <Tooltip closeDelay={0} delay={500}>
          <Tooltip.Trigger>{button}</Tooltip.Trigger>
          <Tooltip.Content>{tooltip}</Tooltip.Content>
        </Tooltip>
      );
    }

    return button;
  }
);

MemoButton.displayName = 'MemoButton';

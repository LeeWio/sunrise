'use client';

import { Button, Tooltip } from '@heroui/react';
import { ReactNode } from 'react';

interface MenuButtonProps {
  children: ReactNode;
  onPress: () => void;
  isActive?: boolean;
  tooltip?: string;
  tabIndex?: number;
}

export function MenuButton({ children, onPress, isActive, tooltip, tabIndex }: MenuButtonProps) {
  const button = (
    <Button
      size="sm"
      variant={isActive ? 'solid' : 'light'}
      onPress={onPress}
      className={isActive ? 'bg-default-200' : 'border-none bg-transparent shadow-none'}
      isIconOnly
      tabIndex={tabIndex}
    >
      {children}
    </Button>
  );

  if (tooltip) {
    return (
      <Tooltip content={tooltip} closeDelay={0}>
        {button}
      </Tooltip>
    );
  }

  return button;
}

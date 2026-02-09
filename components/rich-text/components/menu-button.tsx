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
      variant={isActive ? 'secondary' : 'ghost'}
      onPress={onPress}
      className={isActive ? 'bg-default-200' : 'border-none bg-transparent shadow-none'}
      isIconOnly
      // @ts-ignore
      tabIndex={tabIndex}
    >
      {children}
    </Button>
  );

  if (tooltip) {
    return (
      <Tooltip closeDelay={0}>
        <Tooltip.Trigger>{button}</Tooltip.Trigger>
        <Tooltip.Content>{tooltip}</Tooltip.Content>
      </Tooltip>
    );
  }

  return button;
}

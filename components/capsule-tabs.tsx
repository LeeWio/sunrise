'use client';

import React from 'react';
import { Tabs, cn } from '@heroui/react';
import { Icon } from '@iconify/react';

interface CapsuleTabsProps {
  className?: string;
}

const tabItems = [
  { id: 'inbox', label: 'Inbox', icon: 'gravity-ui:briefcase-fill', color: 'text-blue-500' },
  { id: 'planner', label: 'Planner', icon: 'gravity-ui:briefcase-fill', color: 'text-pink-500' },
  { id: 'alerts', label: 'Alerts', icon: 'gravity-ui:bell-fill', color: 'text-amber-500' },
];

export default function CapsuleTabs({ className }: CapsuleTabsProps) {
  const [selectedKey, setSelectedKey] = React.useState<string | number>('inbox');

  return (
    <div className={cn('flex items-center justify-center p-4', className)}>
      <Tabs
        aria-label="Liquid Navigation"
        selectedKey={selectedKey}
        onSelectionChange={setSelectedKey}
        variant="primary"
        className="overflow-visible"
      >
        <Tabs.ListContainer className="!overflow-visible border-none bg-transparent shadow-none">
          <Tabs.List className="!overflow-visible flex items-center gap-3 border-none bg-transparent !p-0">
            {tabItems.map((item) => {
              const isSelected = selectedKey === item.id;

              return (
                <Tabs.Tab
                  key={item.id}
                  id={item.id}
                  className={cn(
                    // Base: Stable Height & Animation Physics
                    "relative flex h-12 items-center justify-center rounded-full border outline-none",
                    "transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    
                    // Style Layers
                    "border-black/5 bg-zinc-100/80 shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
                    "dark:border-white/15 dark:bg-white/10 dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)]",
                    
                    // Controlled Padding: Always present to avoid flicker
                    "px-3.5", 
                    
                    // Dimensions Logic:
                    // When not selected, min-width forces a perfect circle (48px)
                    // When selected, min-width is relaxed to allow expansion.
                    isSelected 
                      ? "min-w-[120px] bg-white dark:bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] z-10 border-white/80" 
                      : "min-w-[48px] max-w-[48px] hover:shadow-md active:scale-95 !opacity-100 data-[hovered=true]:opacity-100",
                    
                    "w-auto"
                  )}
                >
                  <div className="flex items-center justify-center">
                    <Icon
                      icon={item.icon}
                      width="20"
                      height="20"
                      className={cn(
                        'shrink-0 transition-colors duration-500',
                        isSelected ? item.color : 'text-zinc-500 dark:text-zinc-300'
                      )}
                    />

                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center",
                        isSelected ? "max-w-[100px] opacity-100 ml-2.5" : "max-w-0 opacity-0 ml-0"
                      )}
                    >
                      <span
                        className={cn(
                          'text-base font-black tracking-tight whitespace-nowrap',
                          'animate-shimmer bg-[linear-gradient(110deg,#000,45%,#fff,55%,#000)] bg-[length:200%_100%] bg-clip-text text-transparent transition-colors duration-500',
                          // Dynamic shimmer colors based on item
                          item.id === 'inbox' && 'bg-[linear-gradient(110deg,#2563eb,45%,#93c5fd,55%,#2563eb)]',
                          item.id === 'planner' && 'bg-[linear-gradient(110deg,#db2777,45%,#fbcfe8,55%,#db2777)]',
                          item.id === 'alerts' && 'bg-[linear-gradient(110deg,#d97706,45%,#fcd34d,55%,#d97706)]'
                        )}
                      >
                        {item.label}
                      </span>
                    </div>
                  </div>

                  <Tabs.Indicator className="hidden" />
                </Tabs.Tab>
              );
            })}
          </Tabs.List>
        </Tabs.ListContainer>
      </Tabs>
    </div>
  );
}

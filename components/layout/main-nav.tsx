'use client';

import { Tabs } from '@heroui/react';
import { usePathname, useRouter } from 'next/navigation';
import { Key } from 'react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { id: 'content', label: 'Content', href: '/content' },
  { id: 'timeline', label: 'Timeline', href: '/timeline' },
  { id: 'settings', label: 'Settings', href: '/settings' },
];

export function MainNav() {
  const pathname = usePathname();
  const router = useRouter();

  // Find the active tab based on the current path
  const activeTab = NAV_ITEMS.find((item) => pathname.startsWith(item.href))?.id || 'dashboard';

  const handleSelectionChange = (key: Key) => {
    const item = NAV_ITEMS.find((nav) => nav.id === key);
    if (item) {
      router.push(item.href);
    }
  };

  return (
    <div className="border-default-200 bg-background/70 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-8">
          <span
            className="cursor-pointer text-xl font-bold tracking-tighter"
            onClick={() => router.push('/')}
          >
            Sunrise
          </span>
          <Tabs
            variant="secondary"
            selectedKey={activeTab}
            onSelectionChange={handleSelectionChange}
            className="h-full"
          >
            <Tabs.ListContainer>
              <Tabs.List
                aria-label="Main Navigation"
                className="*:h-16 *:px-4 *:text-sm *:font-medium"
              >
                {NAV_ITEMS.map((item) => (
                  <Tabs.Tab id={item.id} key={item.id}>
                    {item.label}
                    <Tabs.Indicator />
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs.ListContainer>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useLocale } from 'next-intl';
import { Icon } from '@iconify/react';

import { setLocale } from '@/i18n';
import { type Locale } from '@/i18n/config';
import { SwitchRoot, SwitchControl, SwitchThumb, SwitchIcon } from '@heroui/react';

export default function LangSwitch() {
  const locale = useLocale();

  const isZh = locale === 'zh';

  const handleLanguageChange = (isSelected: boolean) => {
    const nextLocale: Locale = isSelected ? 'zh' : 'en';
    setLocale(nextLocale);
  };

  return (
    <SwitchRoot
      isSelected={isZh}
      onChange={handleLanguageChange}
      aria-label="Toggle language"
      size="lg"
    >
      {({ isSelected }) => (
        <SwitchControl className={isSelected ? "bg-red-600" : "bg-blue-600"}>
          <SwitchThumb>
            <SwitchIcon>
              <Icon
                className="size-4 text-white"
                icon={isSelected ? "circle-flags:cn" : "circle-flags:lang-en-us"}
              />
            </SwitchIcon>
          </SwitchThumb>
        </SwitchControl>
      )}
    </SwitchRoot>
  );
}

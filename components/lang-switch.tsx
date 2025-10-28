"use client";

import { useLocale } from "next-intl";
import { Icon } from "@iconify/react";
import {
  SwitchRoot,
  SwitchControl,
  SwitchThumb,
  SwitchIcon,
} from "@heroui/react";

import { setLocale } from "@/i18n";
import { type Locale } from "@/i18n/config";

export default function LangSwitch() {
  const locale = useLocale();

  const isZh = locale === "zh";

  const handleLanguageChange = (isSelected: boolean) => {
    const nextLocale: Locale = isSelected ? "zh" : "en";

    setLocale(nextLocale);
  };

  return (
    <SwitchRoot
      aria-label="Toggle language"
      isSelected={isZh}
      size="lg"
      onChange={handleLanguageChange}
    >
      {({ isSelected }) => (
        <SwitchControl className={isSelected ? "bg-red-600" : "bg-blue-600"}>
          <SwitchThumb>
            <SwitchIcon>
              <Icon
                className="size-4 text-white"
                icon={
                  isSelected ? "circle-flags:cn" : "circle-flags:lang-en-us"
                }
              />
            </SwitchIcon>
          </SwitchThumb>
        </SwitchControl>
      )}
    </SwitchRoot>
  );
}

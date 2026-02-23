"use client";

import { Button, Disclosure, DisclosureGroup, useDisclosureGroupNavigation, Chip, Card } from "@heroui/react";
import React from "react";
import { cn } from "tailwind-variants";
import { motion, AnimatePresence } from "motion/react";
import { 
  Trophy, 
  Zap, 
  Gamepad, 
  Gamepad2, 
  ChevronUp,
  ChevronDown,
  Star
} from "lucide-react";

const itemIds = ["lol", "wzry", "ps5", "switch"];

const showcaseData: Record<string, any> = {
  lol: {
    label: "League of Legends",
    icon: <Trophy size={20} />,
    platform: "PC MOBA",
    rank: "EMERALD",
    desc: "A decade of strategic mastery and competitive growth on the Rift."
  },
  wzry: {
    label: "Honor of Kings",
    icon: <Zap size={20} />,
    platform: "MOBILE MOBA",
    rank: "LEGEND",
    desc: "The pulse of mobile competition. Rotating with purpose, fighting with soul."
  },
  ps5: {
    label: "PlayStation 5",
    icon: <Gamepad size={20} />,
    platform: "NEXT-GEN CONSOLE",
    rank: "PLATINUM",
    desc: "Cinematic immersion. Exploring high-fidelity worlds and narrative depth."
  },
  switch: {
    label: "Switch Collection",
    icon: <Gamepad2 size={20} />,
    platform: "PORTABLE WONDER",
    rank: "MASTER",
    desc: "Boundless creativity. A portable haven for artifacts of pure joy."
  }
};

export default function GamingArchiveDisclosure() {
  const [expandedKeys, setExpandedKeys] = React.useState(new Set<string | number>(["lol"]));
  const isAnyItemExpanded = expandedKeys.size > 0;
  const activeKey = Array.from(expandedKeys)[0] as string || "lol";

  const { isNextDisabled, isPrevDisabled, onNext, onPrevious } = useDisclosureGroupNavigation({
    expandedKeys,
    itemIds,
    onExpandedChange: setExpandedKeys,
  });

  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-6xl items-center gap-12 py-12">
        
        {/* Navigation */}
        <div className={cn(
          "hidden flex-col gap-4 transition-opacity duration-500 sm:flex",
          !isAnyItemExpanded && "opacity-0"
        )}>
          <Button isIconOnly variant="secondary" isDisabled={isPrevDisabled} onPress={onPrevious}>
            <ChevronUp size={20} />
          </Button>
          <Button isIconOnly variant="secondary" isDisabled={isNextDisabled} onPress={onNext}>
            <ChevronDown size={20} />
          </Button>
        </div>

        {/* Disclosure Group */}
        <div className="w-full max-w-md">
          <DisclosureGroup
            className="flex flex-col gap-y-3"
            expandedKeys={expandedKeys}
            onExpandedChange={setExpandedKeys}
          >
            {itemIds.map((id) => (
              <Disclosure key={id} id={id}>
                <Disclosure.Heading>
                  <Button 
                    slot="trigger" 
                    variant={activeKey === id ? "primary" : "secondary"}
                    className="h-14 w-full justify-between px-6 font-bold"
                  >
                    <div className="flex items-center gap-3">
                      {showcaseData[id].icon}
                      {showcaseData[id].label}
                    </div>
                    <div className={cn("transition-transform duration-300", activeKey === id && "rotate-180")}>
                      <ChevronDown size={18} />
                    </div>
                  </Button>
                </Disclosure.Heading>
                <Disclosure.Content>
                  <Card className="mt-3 bg-default-50/50 p-6 shadow-none border-none">
                    <Card.Header className="p-0 flex-col items-start gap-4">
                      <div className="flex flex-wrap gap-2">
                        <Chip size="sm" variant="soft" color="accent" className="font-bold">
                          {showcaseData[id].platform}
                        </Chip>
                        <div className="flex items-center gap-1.5 text-warning text-xs font-black italic">
                          <Star size={14} fill="currentColor" /> {showcaseData[id].rank}
                        </div>
                      </div>
                      <p className="text-default-500 text-sm leading-relaxed font-medium">
                        {showcaseData[id].desc}
                      </p>
                    </Card.Header>
                  </Card>
                </Disclosure.Content>
              </Disclosure>
            ))}
          </DisclosureGroup>
        </div>

        {/* Visual Focus Area */}
        <div className="relative hidden flex-1 self-stretch overflow-hidden rounded-3xl bg-default-50/50 lg:flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeKey}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ type: "spring", stiffness: 70, damping: 24 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="size-24 flex items-center justify-center rounded-3xl bg-background shadow-xl text-primary">
                {React.cloneElement(showcaseData[activeKey].icon, { size: 48 })}
              </div>
              <div className="text-center">
                <h4 className="text-2xl font-black tracking-tight">{showcaseData[activeKey].label}</h4>
                <p className="text-default-400 text-xs font-bold uppercase tracking-[0.2em] mt-1">Digital Archive</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

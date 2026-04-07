import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
  useMemo,
  useRef,
} from "react";
import {
  ListBox,
  Label,
  Description,
  Header,
  Surface,
  Separator,
  Kbd,
  ScrollShadow,
} from "@heroui/react";
import * as Icons from "@gravity-ui/icons";
import { MenuListProps, Command } from "./types";
import { motion } from "motion/react";

/**
 * Robust helper to highlight search query within text.
 * Escapes regex special characters to prevent crashes.
 */
const Highlight = React.memo(({ text, query }: { text: string; query: string }) => {
  if (!query) return <>{text}</>;

  // Escape special characters to prevent regex errors
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escapedQuery})`, "gi"));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={i} className="text-primary font-bold">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
});

Highlight.displayName = "Highlight";

/**
 * Optimized Command Item to prevent unnecessary re-renders.
 * Enhanced with internal ring and aria-attributes.
 */
const CommandItem = React.memo(
  ({ command, isSelected, query }: { command: Command; isSelected: boolean; query: string }) => {
    const Icon = (Icons as any)[command.iconName] || Icons.CircleQuestion;

    return (
      <ListBox.Item
        key={command.name}
        id={command.name}
        textValue={command.label}
        aria-selected={isSelected}
        className={`flex cursor-pointer items-start gap-3 rounded-xl p-2 transition-all duration-200 outline-none ${
          isSelected
            ? "bg-accent-soft text-accent-soft-foreground ring-accent/10 shadow-sm ring-1 ring-inset"
            : "text-foreground hover:bg-default"
        }`}
      >
        <div id={`command-${command.name}`} className="flex w-full items-start gap-3">
          <div className="flex h-8 items-start justify-center pt-px">
            <Icon
              className={`size-4 shrink-0 ${isSelected ? "text-accent-soft-foreground" : "text-muted"}`}
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <Label className="text-sm leading-tight font-semibold">
              <Highlight text={command.label} query={query} />
            </Label>
            <Description
              className={`text-xs leading-normal ${isSelected ? "text-accent-soft-foreground/80" : "text-muted"}`}
            >
              {command.description}
            </Description>
          </div>
          {command.aliases && command.aliases.length > 0 && (
            <Kbd className="bg-background/50 ms-auto border-none shadow-none" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>{command.aliases[0].toUpperCase()}</Kbd.Content>
            </Kbd>
          )}
        </div>
      </ListBox.Item>
    );
  },
);

CommandItem.displayName = "CommandItem";

const MotionSurface = motion.create(Surface);

/**
 * MenuList component for rendering slash command suggestions.
 * Highly optimized with motion, text highlighting, and stable ref-based key handling.
 */
export const MenuList = React.forwardRef((props: MenuListProps, ref) => {
  const allCommands = useMemo(() => props.items.flatMap((group) => group.commands), [props.items]);
  const [selectedKey, setSelectedKey] = useState<string | null>(() => allCommands[0]?.name || null);

  // Use refs to track latest state for the imperative handle to prevent closure stale-ness
  const selectedKeyRef = useRef(selectedKey);
  const allCommandsRef = useRef(allCommands);

  useEffect(() => {
    selectedKeyRef.current = selectedKey;
    allCommandsRef.current = allCommands;
  }, [selectedKey, allCommands]);

  // Sync selection when items change (e.g. filtering)
  useEffect(() => {
    if (allCommands.length > 0) {
      if (!selectedKey || !allCommands.some((c) => c.name === selectedKey)) {
        setSelectedKey(allCommands[0].name);
      }
    } else {
      setSelectedKey(null);
    }
  }, [allCommands, selectedKey]);

  const runCommand = useCallback(
    (key: string) => {
      const command = allCommandsRef.current.find((c) => c.name === key);
      if (command) {
        props.command(command);
      }
    },
    [props],
  );

  useImperativeHandle(
    ref,
    () => ({
      onKeyDown: ({ event }: { event: KeyboardEvent }) => {
        const commands = allCommandsRef.current;
        const currentKey = selectedKeyRef.current;

        if (commands.length === 0) return false;

        if (event.key === "ArrowUp") {
          event.preventDefault();
          const currIndex = commands.findIndex((c) => c.name === currentKey);
          const prevIndex = (currIndex - 1 + commands.length) % commands.length;
          setSelectedKey(commands[prevIndex].name);
          return true;
        }

        if (event.key === "ArrowDown") {
          event.preventDefault();
          const currIndex = commands.findIndex((c) => c.name === currentKey);
          const nextIndex = (currIndex + 1) % commands.length;
          setSelectedKey(commands[nextIndex].name);
          return true;
        }

        if (event.key === "Enter") {
          event.preventDefault();
          if (currentKey) {
            runCommand(currentKey);
            return true;
          }
        }

        return false;
      },
    }),
    [runCommand],
  );

  useEffect(() => {
    if (selectedKey) {
      const element = document.getElementById(`command-${selectedKey}`);
      if (element) {
        element.scrollIntoView({ block: "nearest", behavior: "auto" });
      }
    }
  }, [selectedKey]);

  if (allCommands.length === 0) {
    return (
      <MotionSurface
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="shadow-overlay bg-overlay border-border w-[260px] rounded-3xl border p-8 text-center"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="bg-default-50 rounded-full p-3">
            <Icons.Magnifier className="text-muted size-6" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-foreground text-sm font-semibold">No matches found</p>
            <p className="text-muted text-xs">No commands found for &quot;{props.query}&quot;</p>
          </div>
        </div>
      </MotionSurface>
    );
  }

  return (
    <MotionSurface
      initial={{ opacity: 0, scale: 0.96, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="shadow-overlay bg-overlay border-border pointer-events-auto w-[260px] overflow-hidden rounded-3xl border"
      onMouseDown={(e) => e.preventDefault()}
    >
      <ScrollShadow className="max-h-[380px]" hideScrollBar size={40}>
        <ListBox
          aria-label="Slash commands"
          className="w-full p-1.5"
          selectionMode="none"
          onAction={(key) => runCommand(key as string)}
        >
          {props.items.map((group, groupIndex) => (
            <React.Fragment key={group.name}>
              <ListBox.Section>
                <Header className="text-muted px-3 py-2 text-[10px] font-bold tracking-widest uppercase">
                  {group.title}
                </Header>
                {group.commands.map((command) => (
                  <CommandItem
                    key={command.name}
                    command={command}
                    isSelected={command.name === selectedKey}
                    query={props.query}
                  />
                ))}
              </ListBox.Section>
              {groupIndex < props.items.length - 1 && (
                <Separator className="border-border/40 mx-2 my-1" />
              )}
            </React.Fragment>
          ))}
        </ListBox>
      </ScrollShadow>
    </MotionSurface>
  );
});

MenuList.displayName = "MenuList";

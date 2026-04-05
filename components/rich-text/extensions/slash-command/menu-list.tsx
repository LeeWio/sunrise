import React, { useCallback, useEffect, useImperativeHandle, useState, useMemo } from "react";
import { ListBox, Label, Description, Header, Surface, Separator, Kbd, ScrollShadow } from "@heroui/react";
import * as Icons from "@gravity-ui/icons";
import { MenuListProps } from "./types";

/**
 * MenuList component for rendering slash command suggestions.
 * Optimized with HeroUI v3 semantic color tokens and ScrollShadow for better UX.
 */
export const MenuList = React.forwardRef((props: MenuListProps, ref) => {
  const allCommands = useMemo(() => props.items.flatMap((group) => group.commands), [props.items]);
  
  const [selectedKey, setSelectedKey] = useState<string | null>(() => allCommands[0]?.name || null);

  useEffect(() => {
    if (allCommands.length > 0) {
      if (!selectedKey || !allCommands.some(c => c.name === selectedKey)) {
        setSelectedKey(allCommands[0].name);
      }
    } else {
      setSelectedKey(null);
    }
  }, [allCommands, selectedKey]);

  const runCommand = useCallback(
    (key: string) => {
      const command = allCommands.find(c => c.name === key);
      if (command) {
        props.command(command);
      }
    },
    [allCommands, props]
  );

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (allCommands.length === 0) return false;

      if (event.key === "ArrowUp") {
        event.preventDefault();
        const currIndex = allCommands.findIndex(c => c.name === selectedKey);
        const prevIndex = (currIndex - 1 + allCommands.length) % allCommands.length;
        setSelectedKey(allCommands[prevIndex].name);
        return true;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const currIndex = allCommands.findIndex(c => c.name === selectedKey);
        const nextIndex = (currIndex + 1) % allCommands.length;
        setSelectedKey(allCommands[nextIndex].name);
        return true;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        if (selectedKey) {
          runCommand(selectedKey);
          return true;
        }
      }

      return false;
    },
  }), [allCommands, selectedKey, runCommand]);

  useEffect(() => {
    if (selectedKey) {
      // Use a dedicated ID and instant scroll behavior for better keyboard responsiveness
      const element = document.getElementById(`command-${selectedKey}`);
      if (element) {
        element.scrollIntoView({ block: "nearest", behavior: "auto" });
      }
    }
  }, [selectedKey]);

  if (allCommands.length === 0) {
    return (
      <Surface className="w-[256px] p-2 text-sm text-muted rounded-3xl shadow-surface bg-overlay border border-border">
        No results found
      </Surface>
    );
  }

  return (
    <Surface 
      className="w-[256px] rounded-3xl shadow-overlay bg-overlay border border-border overflow-hidden pointer-events-auto"
      onMouseDown={(e) => {
        e.preventDefault();
      }}
    >
      <ScrollShadow className="max-h-[320px]" hideScrollBar>
        <ListBox
          aria-label="Slash commands"
          className="w-full p-2"
          selectionMode="none"
          onAction={(key) => runCommand(key as string)}
        >
          {props.items.map((group, groupIndex) => (
            <React.Fragment key={group.name}>
              <ListBox.Section>
                <Header className="px-2 py-1.5 text-xs font-semibold text-muted uppercase tracking-wider">{group.title}</Header>
                {group.commands.map((command) => {
                  const Icon = (Icons as any)[command.iconName] || Icons.CircleQuestion;
                  const isSelected = command.name === selectedKey;
                  
                  return (
                    <ListBox.Item
                      key={command.name}
                      id={command.name}
                      textValue={command.label}
                      className={`flex items-start gap-3 rounded-xl transition-all duration-200 cursor-pointer outline-none p-2 ${
                        isSelected 
                          ? "bg-accent-soft text-accent-soft-foreground" 
                          : "text-foreground hover:bg-default"
                      }`}
                    >
                      <div id={`command-${command.name}`} className="flex w-full items-start gap-3">
                        <div className="flex h-8 items-start justify-center pt-px">
                          <Icon className={`size-4 shrink-0 ${isSelected ? "text-accent-soft-foreground" : "text-muted"}`} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <Label className="text-sm font-semibold leading-tight">
                            {command.label}
                          </Label>
                          <Description className={`text-xs leading-normal ${isSelected ? "text-accent-soft-foreground/80" : "text-muted"}`}>
                            {command.description}
                          </Description>
                        </div>
                        {command.aliases && command.aliases.length > 0 && (
                          <Kbd className="ms-auto bg-background/50 border-none shadow-none" variant="light">
                            <Kbd.Abbr keyValue="command" />
                            <Kbd.Content>{command.aliases[0].toUpperCase()}</Kbd.Content>
                          </Kbd>
                        )}
                      </div>
                    </ListBox.Item>
                  );
                })}
              </ListBox.Section>
              {groupIndex < props.items.length - 1 && <Separator className="my-1 border-border/50" />}
            </React.Fragment>
          ))}
        </ListBox>
      </ScrollShadow>
    </Surface>
  );
});

MenuList.displayName = "MenuList";

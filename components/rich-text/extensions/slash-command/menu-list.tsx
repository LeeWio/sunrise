import React, { useCallback, useEffect, useImperativeHandle, useState, useMemo } from "react";
import { ListBox, Label, Description, Header, Surface, Separator, Kbd } from "@heroui/react";
import * as Icons from "@gravity-ui/icons";
import { MenuListProps } from "./types";

/**
 * MenuList component for rendering slash command suggestions.
 * Completely replicates the proven structure for reliable onAction response.
 */
export const MenuList = React.forwardRef((props: MenuListProps, ref) => {
  const allCommands = useMemo(() => props.items.flatMap((group) => group.commands), [props.items]);
  
  const [selectedKey, setSelectedKey] = useState<string | null>(() => allCommands[0]?.name || null);

  // Sync selection when items change
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
      console.log("[MenuList] onKeyDown:", event.key, "Current selectedKey:", selectedKey);
      
      if (allCommands.length === 0) {
        console.log("[MenuList] No commands available");
        return false;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        const currIndex = allCommands.findIndex(c => c.name === selectedKey);
        const prevIndex = (currIndex - 1 + allCommands.length) % allCommands.length;
        console.log("[MenuList] ArrowUp: Moving from index", currIndex, "to", prevIndex);
        setSelectedKey(allCommands[prevIndex].name);
        return true;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const currIndex = allCommands.findIndex(c => c.name === selectedKey);
        const nextIndex = (currIndex + 1) % allCommands.length;
        console.log("[MenuList] ArrowDown: Moving from index", currIndex, "to", nextIndex);
        setSelectedKey(allCommands[nextIndex].name);
        return true;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        if (selectedKey) {
          console.log("[MenuList] Enter: Executing command", selectedKey);
          runCommand(selectedKey);
          return true;
        }
      }

      return false;
    },
  }), [allCommands, selectedKey, runCommand]);

  useEffect(() => {
    if (selectedKey) {
      const element = document.getElementById(`command-${selectedKey}`);
      if (element) {
        element.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedKey]);

  if (allCommands.length === 0) {
    return (
      <Surface className="w-[256px] p-2 text-sm text-default-400 rounded-3xl shadow-surface bg-content1 border border-divider">
        No results found
      </Surface>
    );
  }

  return (
    <Surface 
      className="w-[256px] rounded-3xl shadow-surface bg-content1 border border-divider overflow-hidden pointer-events-auto"
      onMouseDown={(e) => {
        // Critical: prevent editor from losing focus
        e.preventDefault();
      }}
    >
      <ListBox
        aria-label="Slash commands"
        className="w-full p-2"
        selectionMode="none"
        onAction={(key) => runCommand(key as string)}
      >
        {props.items.map((group, groupIndex) => (
          <React.Fragment key={group.name}>
            <ListBox.Section>
              <Header>{group.title}</Header>
              {group.commands.map((command) => {
                const Icon = (Icons as any)[command.iconName] || Icons.CircleQuestion;
                const isSelected = command.name === selectedKey;
                
                return (
                  <ListBox.Item
                    key={command.name}
                    id={command.name}
                    textValue={command.label}
                    className={`flex items-start gap-2 rounded-xl transition-colors cursor-pointer outline-none hover:bg-default-50 ${
                      isSelected ? "bg-default-100" : ""
                    }`}
                  >
                    <div id={`command-${command.name}`} className="flex w-full items-start gap-2">
                      <div className="flex h-8 items-start justify-center pt-px">
                        <Icon className="size-4 shrink-0 text-default-400" />
                      </div>
                      <div className="flex flex-col">
                        <Label className="text-sm font-medium">{command.label}</Label>
                        <Description className="text-xs text-default-400">
                          {command.description}
                        </Description>
                      </div>
                      {command.aliases && command.aliases.length > 0 && (
                        <Kbd className="ms-auto" variant="light">
                          <Kbd.Abbr keyValue="command" />
                          <Kbd.Content>{command.aliases[0].toUpperCase()}</Kbd.Content>
                        </Kbd>
                      )}
                    </div>
                  </ListBox.Item>
                );
              })}
            </ListBox.Section>
            {groupIndex < props.items.length - 1 && <Separator className="my-1" />}
          </React.Fragment>
        ))}
      </ListBox>
    </Surface>
  );
});

MenuList.displayName = "MenuList";

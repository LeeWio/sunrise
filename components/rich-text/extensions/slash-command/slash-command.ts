import { Extension, Editor, Range } from "@tiptap/core";
import { Suggestion, SuggestionProps, SuggestionKeyDownProps } from "@tiptap/suggestion";
import { ReactRenderer } from "@tiptap/react";
import { computePosition, flip, shift, offset } from "@floating-ui/dom";
import { GROUPS } from "./groups";
import { MenuList } from "./menu-list";
import { Command } from "./types";

/**
 * SlashCommand extension for Tiptap.
 * Provides a slash-triggered command menu for quick block insertions.
 * Uses @floating-ui/dom for modern, robust positioning.
 */
export const SlashCommand = Extension.create({
  name: "slashCommand",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        startOfLine: true,
        command: ({ editor, range, props }: { editor: Editor; range: Range; props: Command }) => {
          props.action(editor, range);
        },
        items: ({ query }: { query: string }) => {
          return GROUPS.map((group) => ({
            ...group,
            commands: group.commands.filter((item) => {
              const label = item.label.toLowerCase();
              const name = item.name.toLowerCase();
              const aliases = item.aliases?.map((alias) => alias.toLowerCase()) || [];
              const search = query.toLowerCase();

              return (
                label.includes(search) ||
                name.includes(search) ||
                aliases.some((alias) => alias.includes(search))
              );
            }),
          })).filter((group) => group.commands.length > 0);
        },
        render: () => {
          let component: ReactRenderer;
          let popup: HTMLDivElement;

          return {
            onStart: (props: SuggestionProps) => {
              component = new ReactRenderer(MenuList, {
                props,
                editor: props.editor,
              });

              popup = document.createElement("div");
              popup.style.position = "absolute";
              popup.style.zIndex = "9999";
              popup.style.pointerEvents = "auto";
              popup.appendChild(component.element);

              // 关键修复：挂载到编辑器的父节点或其视图节点内，确保处于 Modal 的交互范围内
              props.editor.view.dom.parentElement?.appendChild(popup);

              const virtualElement = {
                getBoundingClientRect: props.clientRect as unknown as () => DOMRect,
              };

              computePosition(virtualElement, popup, {
                placement: "bottom-start",
                middleware: [offset(8), flip(), shift({ padding: 8 })],
              }).then(({ x, y }) => {
                Object.assign(popup.style, {
                  left: `${x}px`,
                  top: `${y}px`,
                });
              });
            },

            onUpdate(props: SuggestionProps) {
              component.updateProps(props);

              if (popup) {
                const virtualElement = {
                  getBoundingClientRect: props.clientRect as unknown as () => DOMRect,
                };

                computePosition(virtualElement, popup, {
                  placement: "bottom-start",
                  middleware: [offset(8), flip(), shift({ padding: 8 })],
                }).then(({ x, y }) => {
                  Object.assign(popup.style, {
                    left: `${x}px`,
                    top: `${y}px`,
                  });
                });
              }
            },

            onKeyDown(props: SuggestionKeyDownProps) {
              if (props.event.key === "Escape") {
                popup?.remove();
                return true;
              }

              return (
                (
                  component.ref as { onKeyDown?: (props: SuggestionKeyDownProps) => boolean }
                )?.onKeyDown?.(props) || false
              );
            },

            onExit() {
              popup?.remove();
              component.destroy();
            },
          };
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export default SlashCommand;

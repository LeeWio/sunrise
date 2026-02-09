'use client';

import { Editor } from '@tiptap/react';
import { useEffect, useState, useMemo, Fragment } from 'react';
import { Button, Dropdown, Label, Tooltip, Header, Kbd, Separator } from '@heroui/react';
import {
  GripVertical,
  Plus,
  RemoveFormatting,
  Clipboard,
  Copy,
  Trash2,
  LucideIcon,
} from 'lucide-react';
import DragHandle from '@tiptap/extension-drag-handle-react';

import useContentItemActions from './hooks/use-content-item-actions';
import { useData } from './hooks/use-data';

export type ContentItemMenuProps = {
  editor: Editor;
};

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  kbd: string;
  variant?: 'default' | 'danger';
  action: () => void;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const ContentItemMenu = ({ editor }: ContentItemMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const data = useData();
  const actions = useContentItemActions(editor, data.currentNode, data.currentNodePos);

  useEffect(() => {
    editor.view.dispatch(editor.state.tr.setMeta('lockDragHandle', menuOpen));
  }, [editor, menuOpen]);

  const menuSections: MenuSection[] = useMemo(
    () => [
      {
        title: 'Actions',
        items: [
          {
            id: 'copy',
            label: 'Copy to clipboard',
            icon: Clipboard,
            kbd: 'C',
            action: actions.copyNodeToClipboard,
          },
          {
            id: 'duplicate',
            label: 'Duplicate',
            icon: Copy,
            kbd: 'D',
            action: actions.duplicateNode,
          },
        ],
      },
      {
        title: 'Formatting',
        items: [
          {
            id: 'clear-formatting',
            label: 'Clear formatting',
            icon: RemoveFormatting,
            kbd: '\\',
            action: actions.resetTextFormatting,
          },
        ],
      },
      {
        title: 'Danger Zone',
        items: [
          {
            id: 'delete',
            label: 'Delete block',
            icon: Trash2,
            kbd: '⌫',
            variant: 'danger',
            action: actions.deleteNode,
          },
        ],
      },
    ],
    [actions]
  );

  const handleAction = (key: React.Key) => {
    const allItems = menuSections.flatMap((s) => s.items);
    const item = allItems.find((i) => i.id === key);
    item?.action();
  };

  return (
    <DragHandle
      editor={editor}
      pluginKey="ContentItemMenu"
      computePositionConfig={{
        placement: 'left',
        strategy: 'fixed',
      }}
      onNodeChange={data.handleNodeChange}
    >
      <div className="drag-handle flex items-center gap-0.5">
        <Tooltip delay={0}>
          <Tooltip.Trigger>
            <Button
              size="sm"
              isIconOnly
              variant="ghost"
              className="text-default-400 hover:text-default-900"
              onPress={actions.handleAdd}
            >
              <Plus size={16} />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content showArrow placement="top">
            <p className="text-xs font-medium">Add block</p>
          </Tooltip.Content>
        </Tooltip>

        <Dropdown isOpen={menuOpen} onOpenChange={setMenuOpen}>
          <Button size="sm" isIconOnly variant="ghost" aria-label="Drag or click for menu">
            <GripVertical size={16} />
          </Button>

          <Dropdown.Popover
            placement="bottom start"
            className="bg-background/80 border border-white/10 shadow-2xl backdrop-blur-2xl dark:border-white/5"
          >
            <Dropdown.Menu aria-label="Content actions" onAction={handleAction}>
              {menuSections.map((section, sIdx) => (
                <Fragment key={section.title}>
                  {sIdx !== 0 && <Separator className="my-1 opacity-50" />}
                  <Dropdown.Section>
                    <Header>{section.title}</Header>
                    {section.items.map((item) => (
                      <Dropdown.Item
                        key={item.id}
                        id={item.id}
                        textValue={item.label}
                        variant={item.variant || 'default'}
                      >
                        <div className="flex items-center gap-2.5">
                          <item.icon
                            size={16}
                            className={
                              item.variant === 'danger' ? 'text-danger' : 'text-default-500'
                            }
                          />
                          <Label
                            className={
                              item.variant === 'danger' ? 'text-danger' : 'text-default-700'
                            }
                          >
                            {item.label}
                          </Label>
                        </div>
                        <Kbd className="ms-auto" slot="keyboard">
                          <Kbd.Abbr keyValue="command" />
                          <Kbd.Content>{item.kbd}</Kbd.Content>
                        </Kbd>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Section>
                </Fragment>
              ))}
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>
    </DragHandle>
  );
};

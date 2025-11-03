import { Node, mergeAttributes, ReactNodeViewRenderer } from "@tiptap/react";
import { AccordionView } from "./views";

// Extend TipTap commands interface to include accordion-specific commands
declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    accordion: {
      setAccordion: (options: {
        title: string;
        content?: string;
        expanded?: boolean;
      }) => ReturnType;
      updateAccordion: (attributes: Partial<{
        title: string;
        content: string;
        expanded: boolean;
      }>) => ReturnType;
      removeAccordion: () => ReturnType;
      toggleAccordion: () => ReturnType;
    };
  }
}

// Define the attributes interface for the accordion node
export interface AccordionAttributes {
  title: string;       // Accordion item title
  expanded?: boolean;  // Whether the accordion is expanded
}

// Create the Accordion node extension
export const Accordion = Node.create<AccordionAttributes>({
  name: "accordion",

  // Node grouping and behavior
  group: "block",    // Behaves as a block-level element
  atom: true,        // Atomic node (indivisible)
  draggable: true,   // Can be dragged and reordered
  selectable: true,  // Can be selected
  isolating: true,   // Prevents content from bleeding out
  defining: true,    // Defines its own content rules

  // Content model - allows block content for rich text editing
  content: "block*",

  // Define node attributes and their HTML parsing/rendering
  addAttributes() {
    return {
      // Accordion title (required)
      title: {
        default: "New Accordion",
        parseHTML: (element) =>
          element.getAttribute("data-title") || "New Accordion",
        renderHTML: (attributes) => ({
          "data-title": attributes.title || "New Accordion",
        }),
      },
      // Expanded state
      expanded: {
        default: false,
        parseHTML: (element) => element.hasAttribute("data-expanded"),
        renderHTML: (attributes) => ({
          "data-expanded": attributes.expanded ? "" : undefined,
        }),
      },
    };
  },

  // Parse HTML to create this node from DOM
  parseHTML() {
    return [
      {
        tag: `div[data-type="${this.name}"]`,
        contentElement: 'div[data-content="true"]',
      },
    ];
  },

  // Render this node to HTML structure
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": this.name,
        class: "accordion-node",
      }),
      ["div", { "data-content": "true" }, 0],
    ];
  },

  // Define custom commands for this node
  addCommands() {
    return {
      // Insert a new accordion node with given options
      setAccordion:
        (options) =>
          ({ commands }) => {
            return commands.insertContent({
              type: this.name,
              attrs: {
                title: options.title || "New Accordion",
                expanded: options.expanded || false,
              },
            });
          },
      // Update attributes of the current accordion node
      updateAccordion:
        (attributes) =>
          ({ tr, state }) => {
            const { selection } = state;
            const node = state.doc.nodeAt(selection.from);

            if (node && node.type.name === this.name) {
              tr.setNodeMarkup(selection.from, undefined, {
                ...node.attrs,
                ...attributes,
              });
              return true;
            }
            return false;
          },
      // Remove the current accordion node
      removeAccordion:
        () =>
          ({ tr, state }) => {
            const { selection } = state;
            const node = state.doc.nodeAt(selection.from);

            if (node && node.type.name === this.name) {
              tr.delete(selection.from, selection.to);
              return true;
            }
            return false;
          },
      // Toggle expanded state
      toggleAccordion:
        () =>
          ({ commands }) => {
            return commands.updateAttributes(this.name, {
              expanded: !this.editor.isActive(this.name, { expanded: true }),
            });
          },
    };
  },

  // Define keyboard shortcuts for this node
  addKeyboardShortcuts() {
    return {
      // Insert new accordion node: Cmd/Ctrl + Shift + Q
      "Mod-Shift-q": () => this.editor.commands.setAccordion({
        title: "New Accordion",
        content: "Click to edit content",
      }),
      // Toggle accordion: Ctrl/Cmd + Q when cursor is on accordion
      "Mod-q": () => this.editor.commands.toggleAccordion(),
      // Delete node with Backspace when cursor is on empty accordion
      "Backspace": () => {
        const { state } = this.editor;
        const { selection } = state;
        const node = state.doc.nodeAt(selection.from);

        if (node && node.type.name === this.name && selection.empty) {
          return this.editor.commands.removeAccordion();
        }
        return false;
      },
    };
  },

  // Use React component for rendering this node
  addNodeView() {
    return ReactNodeViewRenderer(AccordionView);
  },
});
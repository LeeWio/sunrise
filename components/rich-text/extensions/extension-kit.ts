import { StarterKit, TextAlign } from "./index";

export const ExtensionKit = [
  StarterKit,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

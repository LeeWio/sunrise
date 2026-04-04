import { SVGProps } from "react";

/**
 * Centralized file for all custom SVG icons used in the project.
 * Ensure any new custom icons are added here as exported React components.
 *
 * Usage:
 * import { Subscript } from "@/components/icons";
 */

/**
 * Custom Subscript icon following the style of Gravity UI's Superscript.
 */
export function Subscript(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      {/* Main character part */}
      <path
        fill="currentColor"
        d="M9.111 4.25a.75.75 0 0 1 0 1.5H6.306v7.023h.587a.75.75 0 0 1 0 1.5H4.226a.75.75 0 0 1 0-1.5h.58V5.75H2a.75.75 0 0 1 0-1.5z"
      />
      {/* Script part (shifted down) */}
      <path
        fill="currentColor"
        d="M12.945 8.75a1.92 1.92 0 0 1 1.155 3.451L12.707 13.25h1.514a.75.75 0 0 1 0 1.5h-2.2a1.27 1.27 0 0 1-1.264-1.14l-.007-.13.009-.149a1.27 1.27 0 0 1 .498-.867l1.94-1.461a.419.419 0 0 0-.252-.753h-.135a.58.58 0 0 0-.529.342l-.097.216a.75.75 0 1 1-1.368-.616l.098-.216A2.08 2.08 0 0 1 12.81 8.75z"
      />
    </svg>
  );
}

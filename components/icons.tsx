import * as React from "react";

import { IconSvgProps } from "@/types";

export const MoonFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const BoldIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    height={size || height}
    viewBox="0 0 16 16"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M4.25 2.25A.75.75 0 0 0 3.5 3v10c0 .414.336.75.75.75H9.5a3.25 3.25 0 0 0 1.477-6.146A3.25 3.25 0 0 0 8.5 2.25zm3.5 5a1.75 1.75 0 1 0 0-3.5h-2v3.5zm-2 1.5v3.5h3a1.75 1.75 0 1 0 0-3.5z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const ItalicIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    height={size || height}
    viewBox="0 0 16 16"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M7.25 2a.75.75 0 0 0 0 1.5h1.317l-2.7 9H4.25a.75.75 0 1 0 0 1.5h4.5a.75.75 0 0 0 0-1.5H7.433l2.7-9h1.617a.75.75 0 0 0 0-1.5z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const UnderlineIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    height={size || height}
    viewBox="0 0 16 16"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M5 2.75a.75.75 0 0 0-1.5 0V7a4.5 4.5 0 0 0 9 0V2.75a.75.75 0 0 0-1.5 0V7a3 3 0 0 1-6 0zm-.75 9.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const StrikethroughIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    height={size || height}
    viewBox="0 0 16 16"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M5.502 2.757C6.214 2.236 7.122 2 7.984 2c1.685 0 3.015.572 3.687 1.915a.75.75 0 1 1-1.342.67C10.001 3.93 9.331 3.5 7.984 3.5c-.611 0-1.19.17-1.597.468c-.384.28-.627.678-.627 1.242c0 .403.165.758.463 1.04H4.447a2.9 2.9 0 0 1-.187-1.04c0-1.084.507-1.916 1.242-2.453m6.047 5.993h1.201a.75.75 0 0 0 0-1.5h-9.5a.75.75 0 0 0 0 1.5h5.475l.043.012h.002c1.196.323 1.98 1.005 1.98 1.988c0 .669-.289 1.063-.742 1.33c-.5.296-1.222.437-2 .437c-1.398 0-2.453-.472-2.796-1.504a.75.75 0 1 0-1.424.474c.657 1.969 2.602 2.53 4.22 2.53c.915 0 1.94-.16 2.762-.644c.869-.512 1.48-1.376 1.48-2.623c0-.822-.276-1.481-.7-2"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const CodeIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    height={size || height}
    viewBox="0 0 16 16"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M10.218 3.216a.75.75 0 0 0-1.436-.431l-3 10a.75.75 0 0 0 1.436.43zM4.53 4.97a.75.75 0 0 1 0 1.06L2.56 8l1.97 1.97a.75.75 0 0 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1 0-1.06l2.5-2.5a.75.75 0 0 1 1.06 0m6.94 6.06a.75.75 0 0 1 0-1.06L13.44 8l-1.97-1.97a.75.75 0 0 1 1.06-1.06l2.5 2.5a.75.75 0 0 1 0 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const LinkIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    height={size || height}
    viewBox="0 0 16 16"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M3.47 6.53a.75.75 0 0 1 1.06 1.061l-.727.727a2.743 2.743 0 0 0 3.879 3.879l.727-.727a.75.75 0 0 1 1.06 1.06l-.726.727a4.243 4.243 0 0 1-6-6zm8 1.879a.75.75 0 0 0 1.06 1.06l.727-.726a4.243 4.243 0 0 0-6-6l-.727.727a.75.75 0 0 0 1.061 1.06l.727-.727a2.743 2.743 0 0 1 3.879 3.879zm-.94-1.879a.75.75 0 1 0-1.06-1.06l-4 4a.75.75 0 1 0 1.06 1.06z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const CheckIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    height={size || height}
    viewBox="0 0 16 16"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M13.488 3.43a.75.75 0 0 1 .081 1.058l-6 7a.75.75 0 0 1-1.1.042l-3.5-3.5A.75.75 0 0 1 4.03 6.97l2.928 2.927l5.473-6.385a.75.75 0 0 1 1.057-.081"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const TrashIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    height={size || height}
    viewBox="0 0 16 16"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M9 2H7a.5.5 0 0 0-.5.5V3h3v-.5A.5.5 0 0 0 9 2m2 1v-.5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2V3H2.251a.75.75 0 0 0 0 1.5h.312l.317 7.625A3 3 0 0 0 5.878 15h4.245a3 3 0 0 0 2.997-2.875l.318-7.625h.312a.75.75 0 0 0 0-1.5zm.936 1.5H4.064l.315 7.562A1.5 1.5 0 0 0 5.878 13.5h4.245a1.5 1.5 0 0 0 1.498-1.438zm-6.186 2v5a.75.75 0 0 0 1.5 0v-5a.75.75 0 0 0-1.5 0m3.75-.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

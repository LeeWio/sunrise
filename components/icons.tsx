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

export const PencilIcon = ({
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
      d="M6.169 6.331a3 3 0 0 0-.833 1.6l-.338 1.912a1 1 0 0 0 1.159 1.159l1.912-.338a3 3 0 0 0 1.6-.833l3.07-3.07l2-2A.9.9 0 0 0 15 4.13A3.13 3.13 0 0 0 11.87 1a.9.9 0 0 0-.632.262l-2 2zm3.936-1.814L7.229 7.392a1.5 1.5 0 0 0-.416.8L6.6 9.4l1.208-.213l.057-.01a1.5 1.5 0 0 0 .743-.406l2.875-2.876a1.63 1.63 0 0 0-1.378-1.378m2.558.199a3.14 3.14 0 0 0-1.379-1.38l.82-.82a1.63 1.63 0 0 1 1.38 1.38zM8 2.25a.75.75 0 0 0-.75-.75H4.5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3V8.75a.75.75 0 0 0-1.5 0v2.75a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7A1.5 1.5 0 0 1 4.5 3h2.75A.75.75 0 0 0 8 2.25"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const ExternalLinkIcon = ({
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
      d="M8.646 2.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.793 6.5H6.5a2.5 2.5 0 0 0 0 5h.5a.5.5 0 0 1 0 1h-.5a3.5 3.5 0 1 1 0-7h4.293L8.646 3.354a.5.5 0 0 1 0-.708"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const EllipsisVerticalIcon = ({
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
      d="M8 4.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M9.5 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m0 5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const SuperscriptIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m4 19l8-8m0 8l-8-8m16 1h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

export const SubscriptIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m4 5l8 8m0-8l-8 8m16 6h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

export const AlignLeftIcon = ({
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
      d="M2 1.75a.75.75 0 0 1 1.5 0v12.5a.75.75 0 0 1-1.5 0zM6.5 5.5V4a.5.5 0 0 1 .5-.5h5.5a.5.5 0 0 1 .5.5v1.5a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5M5 4a2 2 0 0 1 2-2h5.5a2 2 0 0 1 2 2v1.5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2zm1.5 8v-1.5A.5.5 0 0 1 7 10h2a.5.5 0 0 1 .5.5V12a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5M5 10.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2V12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const AlignRightIcon = ({
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
      d="M14 1.75a.75.75 0 0 0-1.5 0v12.5a.75.75 0 0 0 1.5 0zM9.5 5.5V4a.5.5 0 0 0-.5-.5H3.5A.5.5 0 0 0 3 4v1.5a.5.5 0 0 0 .5.5H9a.5.5 0 0 0 .5-.5M11 4a2 2 0 0 0-2-2H3.5a2 2 0 0 0-2 2v1.5a2 2 0 0 0 2 2H9a2 2 0 0 0 2-2zm-1.5 8v-1.5A.5.5 0 0 0 9 10H7a.5.5 0 0 0-.5.5V12a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5m1.5-1.5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2V12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const AlignJustifyIcon = ({
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
      d="M14.25 1a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-1.5 0V1.75a.75.75 0 0 1 .75-.75M11 4v1.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5m-.5-2a2 2 0 0 1 2 2v1.5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm.5 8.5V12a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 12v-1.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5m-.5-2a2 2 0 0 1 2 2V12a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-1.5a2 2 0 0 1 2-2zM1 1.75a.75.75 0 0 1 1.5 0v12.5a.75.75 0 0 1-1.5 0z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const AlignCenterIcon = ({
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
      d="M13 5.5V4a.5.5 0 0 0-.5-.5h-9A.5.5 0 0 0 3 4v1.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5m-4.25 2h3.75a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8.75v-.25a.75.75 0 0 0-1.5 0V2H3.5a2 2 0 0 0-2 2v1.5a2 2 0 0 0 2 2h3.75v1H6a2 2 0 0 0-2 2V12a2 2 0 0 0 2 2h1.25v.25a.75.75 0 0 0 1.5 0V14H10a2 2 0 0 0 2-2v-1.5a2 2 0 0 0-2-2H8.75zM8 10H6a.5.5 0 0 0-.5.5V12a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-1.5a.5.5 0 0 0-.5-.5z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const BucketPaintIcon = ({
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
      d="M11.773 7.412c-.064.064-.27.249-1.017-.027c-.75-.277-1.706-.928-2.695-1.918c-.99-.99-1.64-1.945-1.918-2.695c-.276-.747-.091-.953-.027-1.017s.27-.249 1.017.027q.14.052.29.121c.7.324 1.54.93 2.405 1.797c.99.99 1.641 1.945 1.918 2.695c.276.747.091.953.027 1.017M7 6.528c.85.85 1.738 1.535 2.581 1.972H1.694v-.027a1.3 1.3 0 0 1 .1-.507l2.802-4.33l.172-.26C5.16 4.383 5.956 5.485 7 6.529m3.89-3.889c2.147 2.148 3.24 4.537 1.944 5.834a13 13 0 0 1-2.127 1.719L6.352 13.01s-1.945 1.296-4.537-1.296C-.778 9.12.518 7.176.518 7.176l2.818-4.355A13 13 0 0 1 5.056.694C6.351-.602 8.74.491 10.888 2.64M12.748 15c.966 0 1.75-.765 1.75-1.71c0-1.234-1.17-2.76-1.512-3.178a.3.3 0 0 0-.237-.111a.31.31 0 0 0-.24.112c-.34.422-1.511 1.96-1.511 3.178c0 .944.784 1.71 1.75 1.71"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const PaletteIcon = ({
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
      d="M12.012 10c.431.004.764-.15 1.002-.411c.244-.268.486-.762.486-1.589a5.5 5.5 0 1 0-5.17 5.491a4.3 4.3 0 0 1-.106-.89a2.37 2.37 0 0 1 .495-1.48c.386-.493.92-.763 1.448-.914C10.69 10.06 11.303 10 12 10zM8.43 14.01v-.005zM12 11.5c1.66.013 3-1.25 3-3.5a7 7 0 1 0-7 7c2.19 0 2.011-.83 1.827-1.68c-.194-.898-.393-1.82 2.173-1.82M9 5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m2 2.75a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4.75-1a1 1 0 1 1-2 0a1 1 0 0 1 2 0M5.75 11a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

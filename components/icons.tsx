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

export const AlignLeftFillIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    height={size || height}
    version="1.1"
    viewBox="0 0 22.3535 22.666"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g>
      <rect height="22.666" opacity="0" width="22.3535" x="0" y="0" />
      <path
        d="M5.46875 10.3809L12.8418 10.3809C14.2969 10.3809 15.0781 9.60938 15.0781 8.18359L15.0781 4.78516C15.0781 3.35938 14.2969 2.58789 12.8418 2.58789L5.46875 2.58789C4.02344 2.58789 3.23242 3.35938 3.23242 4.78516L3.23242 8.18359C3.23242 9.60938 4.02344 10.3809 5.46875 10.3809ZM5.46875 20.0586L19.7559 20.0586C21.2109 20.0586 21.9922 19.2871 21.9922 17.8613L21.9922 14.4629C21.9922 13.0469 21.2109 12.2656 19.7559 12.2656L5.46875 12.2656C4.02344 12.2656 3.23242 13.0469 3.23242 14.4629L3.23242 17.8613C3.23242 19.2871 4.02344 20.0586 5.46875 20.0586Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
      <path
        d="M0.712891 22.6367C1.10352 22.6367 1.43555 22.3438 1.43555 21.9629L1.43555 0.673828C1.43555 0.292969 1.10352 0 0.712891 0C0.332031 0 0 0.292969 0 0.673828L0 21.9629C0 22.3438 0.332031 22.6367 0.712891 22.6367Z"
        fill="white"
        fillOpacity="0.85"
      />
    </g>
  </svg>
);

export const AlignRightFillIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    height={size || height}
    version="1.1"
    viewBox="0 0 22.3535 22.666"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g>
      <rect height="22.666" opacity="0" width="22.3535" x="0" y="0" />
      <path
        d="M16.5234 10.3809C17.9688 10.3809 18.7598 9.60938 18.7598 8.18359L18.7598 4.78516C18.7598 3.35938 17.9688 2.58789 16.5234 2.58789L9.15039 2.58789C7.69531 2.58789 6.91406 3.35938 6.91406 4.78516L6.91406 8.18359C6.91406 9.60938 7.69531 10.3809 9.15039 10.3809ZM16.5234 20.0586C17.9688 20.0586 18.7598 19.2871 18.7598 17.8613L18.7598 14.4629C18.7598 13.0469 17.9688 12.2656 16.5234 12.2656L2.23633 12.2656C0.78125 12.2656 0 13.0469 0 14.4629L0 17.8613C0 19.2871 0.78125 20.0586 2.23633 20.0586Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
      <path
        d="M21.2793 22.6367C21.6602 22.6367 21.9922 22.3438 21.9922 21.9629L21.9922 0.673828C21.9922 0.292969 21.6602 0 21.2793 0C20.8984 0 20.5566 0.292969 20.5566 0.673828L20.5566 21.9629C20.5566 22.3438 20.8984 22.6367 21.2793 22.6367Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
    </g>
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

export const AlignCenterFillIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    height={size || height}
    version="1.1"
    viewBox="0 0 19.1211 22.666"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g>
      <rect height="22.666" opacity="0" width="19.1211" x="0" y="0" />
      <path
        d="M10.0977 21.9629C10.0977 22.3438 9.75586 22.6367 9.375 22.6367C8.99414 22.6367 8.66211 22.3438 8.66211 21.9629L8.66211 20.0586L10.0977 20.0586ZM10.0977 12.2656L8.66211 12.2656L8.66211 10.3809L10.0977 10.3809ZM10.0977 0.673828L10.0977 2.58789L8.66211 2.58789L8.66211 0.673828C8.66211 0.292969 8.99414 0 9.375 0C9.75586 0 10.0977 0.292969 10.0977 0.673828Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
      <path
        d="M5.69336 10.3809L13.0664 10.3809C14.5117 10.3809 15.3027 9.60938 15.3027 8.18359L15.3027 4.78516C15.3027 3.35938 14.5117 2.58789 13.0664 2.58789L5.69336 2.58789C4.23828 2.58789 3.45703 3.35938 3.45703 4.78516L3.45703 8.18359C3.45703 9.60938 4.23828 10.3809 5.69336 10.3809ZM2.23633 20.0586L16.5234 20.0586C17.9688 20.0586 18.7598 19.2871 18.7598 17.8613L18.7598 14.4629C18.7598 13.0469 17.9688 12.2656 16.5234 12.2656L2.23633 12.2656C0.78125 12.2656 0 13.0469 0 14.4629L0 17.8613C0 19.2871 0.78125 20.0586 2.23633 20.0586Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
    </g>
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

export const PictureIcon = ({
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
      d="M11.5 3h-7A1.5 1.5 0 0 0 3 4.5v5.027l.962-.7a1.75 1.75 0 0 1 2.079.016l.928.696l2.368-2.03a1.75 1.75 0 0 1 2.325.043L13 8.787V4.5A1.5 1.5 0 0 0 11.5 3m3 7.498V4.5a3 3 0 0 0-3-3h-7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3zm-1.5.33l-2.355-2.174a.25.25 0 0 0-.332-.006L7.488 11.07l-.457.392l-.481-.361l-1.41-1.057a.25.25 0 0 0-.296-.002L3 11.381v.119A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5zM7.5 6a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const PauseFillIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    height={size || height}
    version="1.1"
    viewBox="0 0 12.2754 16.1621"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g>
      <rect height="16.1621" opacity="0" width="12.2754" x="0" y="0" />
      <path
        d="M1.29883 16.1523L3.52539 16.1523C4.375 16.1523 4.82422 15.7031 4.82422 14.8438L4.82422 1.29883C4.82422 0.400391 4.375 0 3.52539 0L1.29883 0C0.449219 0 0 0.439453 0 1.29883L0 14.8438C0 15.7031 0.449219 16.1523 1.29883 16.1523ZM8.39844 16.1523L10.6152 16.1523C11.4746 16.1523 11.9141 15.7031 11.9141 14.8438L11.9141 1.29883C11.9141 0.400391 11.4746 0 10.6152 0L8.39844 0C7.53906 0 7.08984 0.439453 7.08984 1.29883L7.08984 14.8438C7.08984 15.7031 7.53906 16.1523 8.39844 16.1523Z"
        fill="white"
        fillOpacity="0.85"
      />
    </g>
  </svg>
);

export const MusicIcon = ({
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
      d="M13 5.46v3.08a3 3 0 0 0-.976 0q-.135.022-.274.055C10.231 8.96 9 10.263 9 11.505s1.231 1.955 2.75 1.59c1.519-.364 2.75-1.667 2.75-2.91q0-.057-.004-.113L14.5 10V1.25a.75.75 0 0 0-.932-.728L6.136 2.38l-.568.142A.75.75 0 0 0 5 3.25v7.291a3 3 0 0 0-.976 0q-.135.021-.274.054C2.231 10.96 1 12.263 1 13.506s1.231 1.955 2.75 1.59c1.519-.364 2.75-1.667 2.75-2.91q0-.057-.003-.113L6.5 12V7.086zm0-1.546V2.211L6.5 3.836v1.703l6.136-1.534zm-8.003 8.127a2 2 0 0 0 .003.144c0 .133-.079.419-.396.754a2.5 2.5 0 0 1-1.204.698c-.47.113-.748.023-.844-.032a.2.2 0 0 1-.047-.036l-.001-.002l-.003-.007a.2.2 0 0 1-.005-.054c0-.133.079-.419.396-.754a2.5 2.5 0 0 1 1.204-.698a1.6 1.6 0 0 1 .637-.037q.13.024.26.024m8-2a2 2 0 0 0 .003.144c0 .133-.079.419-.396.754a2.5 2.5 0 0 1-1.204.698c-.47.113-.748.023-.844-.032a.2.2 0 0 1-.047-.036l-.001-.002l-.003-.007a.2.2 0 0 1-.005-.054c0-.133.079-.419.396-.754a2.5 2.5 0 0 1 1.204-.698a1.6 1.6 0 0 1 .637-.037q.13.024.26.024"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const UploadIcon = ({
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
      d="M4.406 8.094a.646.646 0 0 1 .917 0L7.354 10.13V1.646a.646.646 0 1 1 1.292 0v8.484l1.031-1.036a.646.646 0 0 1 .917.917l-2.147 2.147a.646.646 0 0 1-.917 0L4.406 9.011a.646.646 0 0 1 0-.917M2.75 6.833a4.833 4.833 0 1 1 9.666 0 .646.646 0 0 0 1.292 0 6.125 6.125 0 1 0-12.25 0 .646.646 0 0 0 1.292 0"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const PlusIcon = ({
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
      d="M8 2a.75.75 0 0 1 .75.75v5.25H14a.75.75 0 0 1 0 1.5H8.75V14a.75.75 0 0 1-1.5 0V8.75H2a.75.75 0 0 1 0-1.5h5.25V2.75A.75.75 0 0 1 8 2"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const ChevronDownIcon = ({
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
      d="M4.646 6.646a.5.5 0 0 1 .708 0L8 9.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const ChevronUpIcon = ({
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
      d="M11.354 9.354a.5.5 0 0 1-.708 0L8 6.707 5.354 9.354a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const HeartIcon = ({
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
      d="M1.633 2.796c.762-.837 1.85-1.297 3.127-1.297c1.164 0 2.407.55 3.24 1.626c.828-1.075 2.066-1.626 3.24-1.626c1.274 0 2.36.458 3.124 1.293c.756.828 1.136 1.962 1.136 3.22c0 2.166-1.113 3.909-2.522 5.264c-1.405 1.352-3.17 2.383-4.633 3.14a.75.75 0 0 1-.693-.002c-1.463-.765-3.228-1.788-4.633-3.133C1.61 9.93.5 8.193.5 6.013c0-1.255.378-2.389 1.133-3.217m1.109 1.01C2.287 4.306 2 5.053 2 6.013c0 1.624.816 2.996 2.057 4.184c1.146 1.098 2.6 1.985 3.945 2.705c1.335-.71 2.79-1.604 3.937-2.707C13.182 8.998 14 7.62 14 6.013c0-.963-.288-1.71-.744-2.21C12.808 3.314 12.14 3 11.24 3c-.976 0-2.093.628-2.527 1.95a.75.75 0 0 1-1.426 0C6.854 3.63 5.725 3 4.76 3c-.903 0-1.57.315-2.018.807"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const PlayFillIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    height={size || height}
    version="1.1"
    viewBox="0 0 16.6598 16.4075"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g>
      <rect height="16.4075" opacity="0" width="16.6598" x="0" y="0" />
      <path
        d="M2.08091 14.9741C2.08091 15.9388 2.63491 16.395 3.3028 16.395C3.59111 16.395 3.90222 16.3037 4.19456 16.1441L15.5714 9.49967C16.3798 9.02294 16.6598 8.71394 16.6598 8.1975C16.6598 7.68106 16.3798 7.37207 15.5714 6.89533L4.19456 0.250945C3.90222 0.0912583 3.59111 0 3.3028 0C2.63491 0 2.08091 0.456248 2.08091 1.42086Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
    </g>
  </svg>
);

export const BackwardFillIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    height={size || height}
    version="1.1"
    viewBox="0 0 28.9746 14.9316"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g>
      <rect height="14.9316" opacity="0" width="28.9746" x="0" y="0" />
      <path
        d="M26.5332 13.5645L26.5332 1.34766C26.5332 0.429688 25.9961 0 25.3711 0C25.0879 0 24.8047 0.078125 24.5215 0.244141L14.2578 6.2207C13.5254 6.65039 13.2422 6.97266 13.2422 7.46094C13.2422 7.94922 13.5254 8.27148 14.2578 8.70117L24.5215 14.6777C24.8047 14.834 25.0879 14.9219 25.3711 14.9219C25.9961 14.9219 26.5332 14.4824 26.5332 13.5645ZM13.291 13.5645L13.291 1.34766C13.291 0.429688 12.7637 0 12.1289 0C11.8555 0 11.5625 0.078125 11.2793 0.244141L1.02539 6.2207C0.283203 6.65039 0 6.97266 0 7.46094C0 7.94922 0.283203 8.27148 1.02539 8.70117L11.2793 14.6777C11.5625 14.834 11.8555 14.9219 12.1289 14.9219C12.7637 14.9219 13.291 14.4824 13.291 13.5645Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
    </g>
  </svg>
);

export const ForwardFillIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    height={size || height}
    version="1.1"
    viewBox="0 0 28.252 14.9316"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g>
      <rect height="14.9316" opacity="0" width="28.252" x="0" y="0" />
      <path
        d="M1.71875 13.5645C1.71875 14.4824 2.25586 14.9219 2.88086 14.9219C3.16406 14.9219 3.44727 14.834 3.73047 14.6777L13.9941 8.70117C14.7266 8.27148 15.0098 7.94922 15.0098 7.46094C15.0098 6.97266 14.7266 6.65039 13.9941 6.2207L3.73047 0.244141C3.44727 0.078125 3.16406 0 2.88086 0C2.25586 0 1.71875 0.429688 1.71875 1.34766ZM14.9609 13.5645C14.9609 14.4824 15.4883 14.9219 16.123 14.9219C16.3965 14.9219 16.6895 14.834 16.9727 14.6777L27.2266 8.70117C27.9688 8.27148 28.252 7.94922 28.252 7.46094C28.252 6.97266 27.9688 6.65039 27.2266 6.2207L16.9727 0.244141C16.6895 0.078125 16.3965 0 16.123 0C15.4883 0 14.9609 0.429688 14.9609 1.34766Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
    </g>
  </svg>
);

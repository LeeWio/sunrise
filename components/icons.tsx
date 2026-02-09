import * as React from "react";

import { IconSvgProps } from "@/types";

export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  className,
  ...props
}) => {
  const uniqueId = React.useId();
  const gradientId = `logo-gradient-${uniqueId}`;

  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 32 32"
      width={size || width}
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
          {/* Using CSS variables for theme adaptability */}
          <stop offset="0%" stopColor="var(--primary, currentColor)" />
          <stop offset="100%" stopColor="var(--secondary, currentColor)" />
        </linearGradient>
      </defs>

      <style>
        {`
          @keyframes logo-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes logo-pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(0.92); opacity: 0.85; }
          }
          .sunrise-ring {
            animation: logo-spin 12s linear infinite;
            transform-origin: 16px 16px;
          }
          .sunrise-core {
            animation: logo-pulse 4s ease-in-out infinite;
            transform-origin: 16px 16px;
          }
        `}
      </style>

      {/* Outer Ring - Timeline/Horizon */}
      <g className="sunrise-ring">
        <path
          d="M16 2.5C8.54416 2.5 2.5 8.54416 2.5 16C2.5 23.4558 8.54416 29.5 16 29.5C23.4558 29.5 29.5 23.4558 29.5 16"
          stroke={`url(#${gradientId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="16 8"
          opacity="0.8"
        />
        <circle cx="29.5" cy="16" r="1.5" fill={`url(#${gradientId})`} />
      </g>

      {/* Core - The Sun */}
      <circle
        cx="16"
        cy="16"
        r="7"
        fill={`url(#${gradientId})`}
        className="sunrise-core"
      />
    </svg>
  );
};
/**
 * HeroUI 主题 CSS 生成器
 * 基于 HeroUI v3 Alpha 的主题变量系统
 */

export interface ThemeConfig {
  name: string;
  colors: {
    accent: string;
    success: string;
    warning: string;
    danger: string;
    background: string;
    foreground: string;
    muted: string;
    surface: string;
  };
  spacing: {
    base: string;
    scale: number[];
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    surface: string;
    overlay: string;
    field: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontWeight: {
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
    };
  };
}

export const defaultThemeConfig: ThemeConfig = {
  name: "default",
  colors: {
    accent: "oklch(0.6204 0.195 253.83)",
    success: "oklch(0.7329 0.1935 150.81)",
    warning: "oklch(0.7819 0.1585 72.33)",
    danger: "oklch(0.6532 0.2328 25.74)",
    background: "oklch(0.9702 0 0)",
    foreground: "oklch(0.2103 0.0059 285.89)",
    muted: "oklch(0.5517 0.0138 285.94)",
    surface: "oklch(100% 0 0)",
  },
  spacing: {
    base: "0.25rem",
    scale: [
      0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80,
    ],
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    full: "9999px",
  },
  shadows: {
    surface: "0 2px 4px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    overlay:
      "0 4px 16px 0 rgba(24, 24, 27, 0.08), 0 8px 24px 0 rgba(24, 24, 27, 0.09)",
    field: "0 2px 4px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  },
  typography: {
    fontFamily: "system-ui, sans-serif",
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },
};

export function generateThemeCSS(
  config: ThemeConfig,
  mode: "light" | "dark" = "light",
): string {
  const isDark = mode === "dark";

  return `/* HeroUI v3 Theme: ${config.name} - ${mode === "dark" ? "Dark" : "Light"} Mode */
:root {
  /* 基础变量 */
  --spacing: ${config.spacing.base};
  --radius-sm: ${config.borderRadius.sm};
  --radius-md: ${config.borderRadius.md};
  --radius-lg: ${config.borderRadius.lg};
  --radius-full: ${config.borderRadius.full};

  /* 字体系统 */
  --font-family: ${config.typography.fontFamily};
  --font-size-xs: ${config.typography.fontSize.xs};
  --font-size-sm: ${config.typography.fontSize.sm};
  --font-size-md: ${config.typography.fontSize.md};
  --font-size-lg: ${config.typography.fontSize.lg};
  --font-size-xl: ${config.typography.fontSize.xl};

  --font-weight-normal: ${config.typography.fontWeight.normal};
  --font-weight-medium: ${config.typography.fontWeight.medium};
  --font-weight-semibold: ${config.typography.fontWeight.semibold};
  --font-weight-bold: ${config.typography.fontWeight.bold};

  /* 颜色系统 - ${mode === "dark" ? "Dark" : "Light"} Mode */
  ${generateColorVariables(config.colors, isDark)}

  /* 阴影系统 */
  --surface-shadow: ${config.shadows.surface};
  --overlay-shadow: ${config.shadows.overlay};
  --field-shadow: ${config.shadows.field};

  /* 间距生成 */
  ${generateSpacingVariables(config.spacing)}

  /* 圆角计算 */
  --field-radius: calc(var(--radius-md) * 1.5);
}

/* 深色模式专用样式 */
${isDark ? generateDarkModeOverrides(config) : ""}

/* 组件样式生成 */
${generateComponentStyles(config)}

/* 工具类生成 */
${generateUtilityClasses(config)}
`;
}

function generateColorVariables(
  colors: ThemeConfig["colors"],
  isDark: boolean,
): string {
  if (isDark) {
    return `/* 深色模式颜色 */
  --background: oklch(12% 0.005 285.823);
  --foreground: oklch(0.9911 0 0);
  --surface: oklch(0.2103 0.0059 285.89);
  --muted: oklch(70.5% 0.015 286.067);
  --accent: ${colors.accent};
  --success: ${colors.success};
  --warning: oklch(0.8203 0.1388 76.34);
  --danger: oklch(0.594 0.1967 24.63);`;
  } else {
    return `/* 浅色模式颜色 */
  --background: ${colors.background};
  --foreground: ${colors.foreground};
  --surface: ${colors.surface};
  --muted: ${colors.muted};
  --accent: ${colors.accent};
  --success: ${colors.success};
  --warning: ${colors.warning};
  --danger: ${colors.danger};`;
  }
}

function generateSpacingVariables(spacing: ThemeConfig["spacing"]): string {
  return spacing.scale
    .map((value, index) => {
      const size = value * parseFloat(spacing.base);

      return `  --spacing-${index}: ${size}rem;`;
    })
    .join("\n");
}

function generateDarkModeOverrides(config: ThemeConfig): string {
  return `
/* 深色模式覆盖样式 */
@media (prefers-color-scheme: dark) {
  :root {
    --surface-shadow: 0 0 0 0 transparent inset;
    --overlay-shadow: 0 0 0 0 transparent inset;
    --field-shadow: 0 0 0 0 transparent inset;
  }
}

[data-theme="dark"] {
  --surface-shadow: 0 0 0 0 transparent inset;
  --overlay-shadow: 0 0 0 0 transparent inset;
  --field-shadow: 0 0 0 0 transparent inset;
}`;
}

function generateComponentStyles(config: ThemeConfig): string {
  return `
/* HeroUI 组件样式 */

/* 按钮组件 */
.button {
  font-family: var(--font-family);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
}

.button-primary {
  background-color: var(--accent);
  color: white;
  box-shadow: var(--field-shadow);
}

.button-primary:hover {
  transform: translateY(-1px);
  box-shadow: var(--surface-shadow);
}

.button-secondary {
  background-color: var(--surface);
  color: var(--foreground);
  border: 1px solid var(--border, transparent);
}

.button-ghost {
  background-color: transparent;
  color: var(--foreground);
}

.button-danger {
  background-color: var(--danger);
  color: white;
}

/* 卡片组件 */
.card {
  background-color: var(--surface);
  color: var(--foreground);
  border-radius: var(--radius-lg);
  box-shadow: var(--surface-shadow);
  font-family: var(--font-family);
}

.card-header {
  padding: var(--spacing-6);
  border-bottom: 1px solid var(--border, transparent);
}

.card-content {
  padding: var(--spacing-6);
}

.card-footer {
  padding: var(--spacing-6);
  border-top: 1px solid var(--border, transparent);
}

/* 输入框组件 */
.input {
  font-family: var(--font-family);
  font-size: var(--font-size-md);
  background-color: var(--surface);
  color: var(--foreground);
  border: 1px solid var(--border, transparent);
  border-radius: var(--radius-md);
  padding: var(--spacing-3) var(--spacing-4);
  box-shadow: var(--field-shadow);
  transition: all 0.2s ease;
}

.input:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* 开关组件 */
.switch {
  position: relative;
  display: inline-block;
  width: 3rem;
  height: 1.5rem;
}

.switch-control {
  background-color: var(--muted);
  border-radius: var(--radius-full);
  width: 100%;
  height: 100%;
  transition: background-color 0.2s ease;
}

.switch-control[data-selected="true"] {
  background-color: var(--accent);
}

.switch-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: calc(1.5rem - 4px);
  height: calc(1.5rem - 4px);
  background-color: white;
  border-radius: var(--radius-full);
  transition: transform 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.switch-control[data-selected="true"] .switch-thumb {
  transform: translateX(1.5rem);
}`;
}

function generateUtilityClasses(config: ThemeConfig): string {
  return `
/* 工具类 */

/* 间距 */
.p-1 { padding: var(--spacing-1); }
.p-2 { padding: var(--spacing-2); }
.p-3 { padding: var(--spacing-3); }
.p-4 { padding: var(--spacing-4); }
.p-6 { padding: var(--spacing-6); }
.p-8 { padding: var(--spacing-8); }

.m-1 { margin: var(--spacing-1); }
.m-2 { margin: var(--spacing-2); }
.m-3 { margin: var(--spacing-3); }
.m-4 { margin: var(--spacing-4); }
.m-6 { margin: var(--spacing-6); }
.m-8 { margin: var(--spacing-8); }

/* 圆角 */
.rounded-sm { border-radius: var(--radius-sm); }
.rounded-md { border-radius: var(--radius-md); }
.rounded-lg { border-radius: var(--radius-lg); }
.rounded-full { border-radius: var(--radius-full); }

/* 字体 */
.text-xs { font-size: var(--font-size-xs); }
.text-sm { font-size: var(--font-size-sm); }
.text-md { font-size: var(--font-size-md); }
.text-lg { font-size: var(--font-size-lg); }
.text-xl { font-size: var(--font-size-xl); }

.font-normal { font-weight: var(--font-weight-normal); }
.font-medium { font-weight: var(--font-weight-medium); }
.font-semibold { font-weight: var(--font-weight-semibold); }
.font-bold { font-weight: var(--font-weight-bold); }

/* 颜色 */
.text-foreground { color: var(--foreground); }
.text-muted { color: var(--muted); }
.text-accent { color: var(--accent); }
.text-success { color: var(--success); }
.text-warning { color: var(--warning); }
.text-danger { color: var(--danger); }

.bg-background { background-color: var(--background); }
.bg-surface { background-color: var(--surface); }
.bg-accent { background-color: var(--accent); }
.bg-success { background-color: var(--success); }
.bg-warning { background-color: var(--warning); }
.bg-danger { background-color: var(--danger); }

/* 阴影 */
.shadow-surface { box-shadow: var(--surface-shadow); }
.shadow-overlay { box-shadow: var(--overlay-shadow); }
.shadow-field { box-shadow: var(--field-shadow); }`;
}

export function createCustomTheme(
  overrides: Partial<ThemeConfig>,
): ThemeConfig {
  return {
    ...defaultThemeConfig,
    ...overrides,
    colors: {
      ...defaultThemeConfig.colors,
      ...overrides.colors,
    },
    spacing: {
      ...defaultThemeConfig.spacing,
      ...overrides.spacing,
    },
    borderRadius: {
      ...defaultThemeConfig.borderRadius,
      ...overrides.borderRadius,
    },
    shadows: {
      ...defaultThemeConfig.shadows,
      ...overrides.shadows,
    },
    typography: {
      ...defaultThemeConfig.typography,
      ...overrides.typography,
      fontSize: {
        ...defaultThemeConfig.typography.fontSize,
        ...overrides.typography?.fontSize,
      },
      fontWeight: {
        ...defaultThemeConfig.typography.fontWeight,
        ...overrides.typography?.fontWeight,
      },
    },
  };
}

export function exportTheme(theme: ThemeConfig): string {
  return JSON.stringify(theme, null, 2);
}

export function importTheme(themeJson: string): ThemeConfig {
  const parsed = JSON.parse(themeJson);

  return createCustomTheme(parsed);
}

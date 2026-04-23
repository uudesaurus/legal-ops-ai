// Design tokens for the Legal Ops Agent
// KARNA — YC + Anthropic meets Tokyo law firm terminal

export const tokens = {
  colors: {
    // Core monochrome palette
    background: '#09090b',       // near-black, warm undertone
    backgroundAlt: '#0f0f11',
    surface: '#141416',
    surfaceElevated: '#1a1a1d',
    surfaceHover: '#222225',
    surfaceActive: '#2a2a2e',

    // Borders
    border: '#27272a',
    borderSubtle: '#1e1e21',
    borderHover: '#3f3f46',
    borderFocus: '#52525b',

    // Text — luminous off-white hierarchy
    textPrimary: '#fafafa',
    textSecondary: '#a1a1aa',
    textTertiary: '#71717a',
    textMuted: '#52525b',
    textInverse: '#09090b',

    // Accent — fogbow prismatic edge
    accent: '#e4e4e7',
    accentWarm: '#fef3c7',  // subtle amber edge of fogbow (dark mode)
    accentCool: '#dbeafe',  // subtle blue edge (dark mode)
    accentMuted: '#3f3f46',

    // Status
    success: '#4ade80',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#60a5fa',

    // UBO-specific status colors
    uboMain: '#fafafa',        // >25% — primary luminous
    uboNear: '#a1a1aa',        // >5% — secondary
    uboMinor: '#52525b',       // <5% — muted

    // Fog effect colors
    fogBase: '#18181b',
    fogGlow: 'rgba(250,250,250,0.03)',
    fogEdge: 'rgba(250,240,210,0.06)',  // warm prismatic edge
    fogMist: 'rgba(180,180,200,0.04)',  // cool mist
  },

  fonts: {
    display: "'EB Garamond', Georgia, serif",
    body: "'DM Sans', -apple-system, sans-serif",
    mono: "'DM Sans', -apple-system, sans-serif",
    accent: "'EB Garamond', Georgia, serif",
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '96px',
  },

  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.4)',
    md: '0 4px 12px rgba(0,0,0,0.5)',
    lg: '0 8px 32px rgba(0,0,0,0.6)',
    xl: '0 16px 48px rgba(0,0,0,0.7)',
    glow: '0 0 40px rgba(250,250,250,0.04)',
    glowWarm: '0 0 60px rgba(254,243,199,0.06)',
    glowAccent: '0 0 80px rgba(250,250,250,0.08)',
  },

  transitions: {
    fast: '100ms ease',
    normal: '200ms ease',
    slow: '400ms ease',
    spring: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
    smooth: '600ms cubic-bezier(0.16, 1, 0.3, 1)',
  },

  zIndex: {
    base: 0,
    elevated: 10,
    overlay: 100,
    modal: 200,
    toast: 300,
    grain: 1000,
  },
} as const;

// Animation keyframes (defined in CSS, referenced here for documentation)
export const animations = {
  fadeIn: 'fadeIn 600ms ease forwards',
  fadeInUp: 'fadeInUp 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
  fadeInScale: 'fadeInScale 500ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
  slideInLeft: 'slideInLeft 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
  slideInRight: 'slideInRight 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
  pulse: 'pulse 2s ease-in-out infinite',
  shimmer: 'shimmer 2s ease-in-out infinite',
  float: 'float 6s ease-in-out infinite',
  spin: 'spin 8s linear infinite',
  crystallize: 'crystallize 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
  dissolve: 'dissolve 0.8s ease forwards',
  staggerFadeIn: 'staggerFadeIn 600ms ease forwards',
} as const;

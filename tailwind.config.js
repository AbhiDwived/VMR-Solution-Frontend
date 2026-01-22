/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        border: 'var(--color-border)', // Deep forest green with opacity
        input: 'var(--color-input)', // stone-200
        ring: 'var(--color-ring)', // Warm terracotta
        background: 'var(--color-background)', // Warm off-white
        foreground: 'var(--color-foreground)', // Primary text
        primary: {
          DEFAULT: 'var(--color-primary)', // Warm terracotta
          foreground: 'var(--color-primary-foreground)', // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // Deep forest green
          foreground: 'var(--color-secondary-foreground)', // white
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // Energetic orange
          foreground: 'var(--color-accent-foreground)', // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-600
          foreground: 'var(--color-destructive-foreground)', // white
        },
        success: {
          DEFAULT: 'var(--color-success)', // green-600
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // amber-600
          foreground: 'var(--color-warning-foreground)', // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-600
          foreground: 'var(--color-error-foreground)', // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // stone-100
          foreground: 'var(--color-muted-foreground)', // gray-600
        },
        card: {
          DEFAULT: 'var(--color-card)', // Pure white
          foreground: 'var(--color-card-foreground)', // On-surface text
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)', // gray-800
        },
      },
      borderRadius: {
        sm: 'var(--radius-sm)', // 6px
        md: 'var(--radius-md)', // 12px
        lg: 'var(--radius-lg)', // 18px
        xl: 'var(--radius-xl)', // 24px
      },
      fontFamily: {
        heading: ['Crimson Pro', 'serif'],
        body: ['Source Sans 3', 'sans-serif'],
        caption: ['IBM Plex Sans', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '96': '24rem',
        '144': '36rem',
      },
      maxWidth: {
        'measure': '70ch',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'smooth': '250ms',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
}
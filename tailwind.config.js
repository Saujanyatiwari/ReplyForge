/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg:           'var(--color-bg)',
        surface:      'var(--color-surface)',
        'surface-2':  'var(--color-surface-2)',
        border:       'var(--color-border)',
        'text-primary': 'var(--color-text-primary)',
        'text-muted':   'var(--color-text-muted)',
        primary:      'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        xl:  '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      animation: {
        'fade-in':        'fadeIn 0.25s ease forwards',
        'slide-up':       'slideUp 0.3s ease forwards',
        'slide-in-right': 'slideInRight 0.3s ease forwards',
        'pulse-soft':     'pulse-soft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
      },
      boxShadow: {
        'indigo-glow': '0 8px 32px rgba(99, 102, 241, 0.25)',
      },
    },
  },
  plugins: [],
}

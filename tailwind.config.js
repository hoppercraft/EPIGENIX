/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-lowest': 'rgb(var(--surface-lowest) / <alpha-value>)',
        'surface-container': 'rgb(var(--surface-container) / <alpha-value>)',

        ink: 'rgb(var(--on-surface) / <alpha-value>)',
        muted: 'rgb(var(--on-surface-variant) / <alpha-value>)',
        outline: 'rgb(var(--outline) / <alpha-value>)',
        'outline-variant': 'rgb(var(--outline-variant) / <alpha-value>)',

        primary: 'rgb(var(--primary) / <alpha-value>)',
        'on-primary': 'rgb(var(--on-primary) / <alpha-value>)',
        'primary-container': 'rgb(var(--primary-container) / <alpha-value>)',
        'on-primary-container': 'rgb(var(--on-primary-container) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Hanken Grotesk', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        md: '0.75rem',
        xl: '1.5rem',
      },
      boxShadow: {
        glass: '0 10px 30px -10px rgba(15, 23, 42, 0.08)',
      },
      backdropBlur: {
        glass: '24px',
      },
    },
  },
  plugins: [],
}

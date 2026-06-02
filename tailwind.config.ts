import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium dark palette
        navy: {
          950: '#05060f',
          900: '#0a0e1f',
          800: '#0f1430',
          700: '#161c45',
        },
        electric: '#3b82f6',
        cyan: {
          DEFAULT: '#22d3ee',
          400: '#22d3ee',
        },
        violet: {
          DEFAULT: '#8b5cf6',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'radial-glow':
          'radial-gradient(circle at 50% 0%, rgba(59,130,246,0.18), transparent 60%)',
        'hero-gradient':
          'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(59,130,246,0.35)',
        'glow-cyan': '0 0 50px rgba(34,211,238,0.35)',
        glass: '0 8px 32px rgba(0,0,0,0.35)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;

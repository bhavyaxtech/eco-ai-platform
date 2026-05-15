/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {

        primary: {
          DEFAULT: '#10b981',
          dark: '#059669',
          light: '#34d399',
        },

        background: {
          DEFAULT: '#07111f',
          secondary: '#0f172a',
          tertiary: '#111827',
        },

        borderColor: {
          DEFAULT: 'rgba(255,255,255,0.08)',
        },
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },

      boxShadow: {

        glow: '0 0 40px rgba(16,185,129,0.35)',

        card: '0 10px 40px rgba(0,0,0,0.35)',

        premium:
          '0 20px 80px rgba(0,0,0,0.45)',
      },

      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.75rem',
      },

      backgroundImage: {

        'hero-gradient':
          'linear-gradient(to right, #10b981, #059669)',

        'card-gradient':
          'linear-gradient(to bottom right, rgba(255,255,255,0.06), rgba(255,255,255,0.03))',
      },

      animation: {

        float:
          'float 6s ease-in-out infinite',

        glow:
          'glow 2s ease-in-out infinite alternate',
      },

      keyframes: {

        float: {
          '0%,100%': {
            transform:
              'translateY(0px)',
          },

          '50%': {
            transform:
              'translateY(-10px)',
          },
        },

        glow: {

          from: {
            boxShadow:
              '0 0 20px rgba(16,185,129,0.2)',
          },

          to: {
            boxShadow:
              '0 0 40px rgba(16,185,129,0.5)',
          },
        },
      },
    },
  },

  plugins: [],
};
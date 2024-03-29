const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')
const primary = '#E30B13'

module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './app/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      primary,
      white: colors.white,
      black: colors.black,
      transparent: colors.transparent,
      yellow: {
        700: '#f5c521',
      },
      gray: {
        300: '#d9dae8',
        500: '#999aa5',
        600: '#66676e',
        700: '#39393f',
        800: '#242529',
        900: '#191b1f',
        950: '#101215',
      },
    },
    extend: {
      spacing: {
        0.5: '0.12rem',
        layout: '2.75rem',
      },
      fontSize: {
        '2lg': '1.38rem',
      },
      borderRadius: {
        image: '0.5rem',
        layout: '0.8rem',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
      },
      keyframes: {
        fade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        scaleIn: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.9)',
          },
          '50%': {
            opacity: 0.3,
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)',
          },
        },
      },
      animation: {
        fade: 'fade .5s ease-in-out',
        scaleIn: 'scaleIn .35s ease-in-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    plugin(({ theme, addComponents, addUtilities }) => {
      addComponents({
        '.btn-primary': {
          backgroundColor: primary,
          color: '#fff',
          borderRadius: '0.65rem',
          transition: 'background-color .3s ease-in-out',
          '&:hover': {
            backgroundColor: '#ff0009',
          },
        },
        '.text-link': {
          textUnderlineOffset: 4,
          color: 'rgba(255, 255,255, .9)',
          transition: 'text-decoration-color .3s ease-in-out',
          textDecorationLine: 'underline',
          textDecorationColor: 'rgba(255, 255,255, .2)',
          '&:hover': {
            textDecorationColor: 'rgba(255, 255,255, .9)',
          },
        },
        '.air-block': {
          borderRadius: theme('borderRadius.layout'),
          backgroundColor: theme('colors.gray.950'),
          colors: theme('colors.white'),
          boxShadow: theme('boxShadow.lg'),
        },
      }),
        addUtilities({
          '.text-shadow': {
            textShadow: '1px 1px rgba(0,0,0,.4)',
          },
          '.outline-border-none': {
            outline: 'none',
            border: 'none',
          },
          '.flex-center-between': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
          '.image-like-bg': {
            objectPosition: 'center',
            objectFit: 'cover',
            pointerEvents: 'none',
          },
        })
    }),
  ],
}

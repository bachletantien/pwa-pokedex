const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./public/index.html', './src/components/**/*.{js,jsx,ts,tsx}'],

  theme: {
    fontFamily: {
      exo: ['"Exo 2"', ...defaultTheme.fontFamily['sans']],
    },
    fontSize: {
      sm: ['14px', '20px'],
      base: ['16px', '20px'],
      lg: ['18px', '20px'],
      xl: ['24px', '20px'],
      '2xl': ['26px', '20px'],
    },
    colors: {
      inherit: 'inherit',
      transparent: 'transparent',
      blue: {
        light: '#81b29a',
      },
      gray: {
        DEFAULT: '#8d8b90',
        light: '#d9dadf',
      },
      white: '#e6f1ff',
      black: '#000',
      fairy: '#f85888',
      fire: '#fb6c6c',
      fighting: '#fc5849',
      dragon: ' #f5a018',
      electric: '#f6c747',
      grass: '#78c850',
      normal: '#a8a878',
      bug: ' #48d0b0',
      ice: ' #7ac7ff',
      water: ' #429bed',
      psychic: ' #7c538c',
      poison: '#9f5bba',
      ghost: ' #7038f8',
      ground: '#ffcd83',
      rock: ' #b1736c',
      steel: ' #bababa',
      dark: ' #303943',
      pureRed: '#ea2027',
      flying: '#9c9cfd',
      hp: '#e74c3c',
      attack: '#f39c12',
      defense: '#fed330',
      'special-attack': '#48dbfb',
      'special-defense': '#26de81',
      speed: '#ea8685',
      total: '#778beb',
    },

    boxShadow: {
      DEFAULT: '15px 15px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);',
    },
    screens: {
      sm: '375px',
      'max-sm': { max: '374px' },
      md: '768px',
      'max-md': { max: '767px' },
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {},
  },
  plugins: [],
};

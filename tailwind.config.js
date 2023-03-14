module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      maxWidth: {
        'screen-1200': '1200px',
        '140px': '140px'
      },
      minHeight: {
        '1440px': '1440px'
      },
      zIndex: {
        '-1': -1,
        '1': 1
      },
      width: {
        '1px': '1px',
        '2px': '2px',
        '440px': '440px',
        '492px': '492px',
        '10%': '10%',
        '12%': '12%',
        '14%': '14%',
        '15%': '15%',
        '18%': '18%',
        '22%': '22%',
        '26%': '26%'
      },
      height: {
        '1px': '1px',
        '2px': '2px',
        '14px': '14px',
        banner: '850px'
      },
      fontSize: {
        '22px': '22px'
      },
      colors: {
        primary: '#b2856c',
        secondary: '#E6D3C3',
        thirdly: '#D68C3F',
        valueColor: '#D02316',
        redA60000: '#A60000',
        blue006DA5: '#006DA5',
        black: '#000',
        eaeaea: '#EAEAEA',
        '898D96': '#898D96',
        'ecae18': '#ecae18',
        '664F42': '#664F42',
        '130F0E': '#130F0E',
        'B28465': '#B28465',
        '482D2D': '#482D2D'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}

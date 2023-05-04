const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        main: '#286696',
        'main-100': '#438cc5',
        'main-600': '#286696',
        'main-900': '#0d4673',
        // whites
        haze: '#f6f8fa',
        alabaster: '#f9fafb',
        ghost: '#f9fafe',
        lilac: '#f7f8fa',
        gallery: '#f0f0f0',
        smoke: '#f0f0f0',
        mercury: '#e4e5e5',
        // dark
        metal: '#c5c7d3',
        santa: '#a0a1b2',
        manatee: '#9596a9',
        waterloo: '#7f8198',
        storm: '#676d89',
        comet: '#5c617a',
        bay: '#51566c',
        river: '#464a5d',
        //github scheme
        gun: '#2d333b',
        tuna: '#22272e',
        cinder: '#1c2128',
        pearl: '#1e2028',
        //system
        gitter: '#e4eeff',
        icy: '#d5ddfe',
        periwinkly: '#bfccfd',
        pastel: '#aabbfc',
        widowmaker: '#95aafc',
        periblue: '#8098fb',
        punch: '#6b87fa',
        oyster: '#5576f9',
        mana: '#4065f9',
        ultramarine: '#445cff',

        //highlight
        flamingo: '#ff99ac',
        mona: '#ff9a8b',
        brink: '#fe6b88',
        magenta: '#ef6bad',
        fuchsia: '#eb4899',
        rose: '#cf1872',

        //system
        fadedred: '#fb5a8c',
        carnation: '#f84d6b',
        coral: '#ee2a1b',
        herbs: '#00e0cc',
        shamrock: '#00d0d4',
        jade: '#06b0e4',
        baby: '#9cbff9',
        nation: '#5b8def',
        grandis: '#fccc74',
        pumpikin: '#fdad41',
        carrot: '#ff8800',
        cryon: '#ff8975',
        energy: '#ff8379',
        tangerine: '#ff6b8b',
        glass: '#a8eff2',
        fluor: '#72e0e7',
        ice: '#00cfde',
        plum: '#dda5e8',
        heart: '#6600cc',
      },
    },
  },
  plugins: [],
};

import { join } from 'node:path'
import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(process.cwd(), 'resources', '**/*.{edge,ts,js}'),
    join(process.cwd(), 'apps', 'manager', 'resources', '**/*.{edge,js,ts}'),
    join(process.cwd(), 'apps', 'web', 'resources', '**/*.{edge,js,ts}'),
  ],
  theme: {
    colors: {
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      slate: colors.slate,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,

      primary: colors.sky,
      secondary: colors.gray,
      info: colors.blue,
      success: colors.green,
      warning: colors.amber,
      danger: colors.red,
    },
  },
  plugins: [],
}

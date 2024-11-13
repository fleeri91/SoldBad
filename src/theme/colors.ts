import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { palette } from './palette'

export const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: palette.blue[500],
    secondary: palette.gray[500],
    background: '#ffffff',
    card: '#ffffff',
    text: '#000000',
  },
}

export const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: palette.blue[400],
    secondary: palette.gray[400],
    background: palette.slate[800],
    card: '#333333',
    text: '#ffffff',
  },
}

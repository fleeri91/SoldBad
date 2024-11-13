import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { palette } from './palette'

export const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    background: '#ffffff',
    card: '#ffffff',
    text: '#000000',
  },
}

export const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#bb86fc',
    background: palette.slate[800],
    card: '#333333',
    text: '#ffffff',
  },
}

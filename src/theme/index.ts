import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { Palette } from './palette'

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: Palette.blue[400],
    background: Palette.slate[950],
    card: '#504747',
    text: '#ffffff',
    border: '#757575',
    notification: '#436195',
  },
}

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Palette.blue[400],
    background: Palette.white,
    card: '#e0dede',
    text: '#2b2b2b',
    border: '#b7b7b7',
    notification: '#436195',
  },
}

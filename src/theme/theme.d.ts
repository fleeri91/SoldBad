import '@react-navigation/native'

declare module '@react-navigation/native' {
  export type ExtendedTheme = {
    colors: {
      secondary: string
    }
  } & Theme

  export function useTheme(): ExtendedTheme
}

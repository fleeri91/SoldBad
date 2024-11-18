import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

type ThemeMode = 'dark' | 'light' | undefined

type SettingsState = {
  theme: ThemeMode
}

type SettingsActions = {
  setTheme: (value: ThemeMode) => void
}

const initialState: SettingsState = {
  theme: undefined,
}

export const useSettingsStore = create<SettingsState & SettingsActions>()(
  persist(
    (set) => ({
      ...initialState,
      setTheme: (value: ThemeMode) => set({ theme: value }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

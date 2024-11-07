import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete'

type PreferencesState = {
  currentLocation: {
    data: GooglePlaceData | null
    details: GooglePlaceDetail | null
  }
}

type PreferencesActions = {
  setCurrentLocation: (data: GooglePlaceData, details: GooglePlaceDetail | null) => void
}

const initialState: PreferencesState = {
  currentLocation: { data: null, details: null },
}

export const usePreferencesStore = create<PreferencesState & PreferencesActions>()(
  persist(
    (set) => ({
      ...initialState,
      setCurrentLocation: (data, details) =>
        set({ currentLocation: { data: data, details: details } }),
    }),
    {
      name: 'preferences-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

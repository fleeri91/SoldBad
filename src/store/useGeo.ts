import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LocationObject } from 'expo-location'

type GeoState = {
  geoLocation: LocationObject | null
}

type GeoActions = {
  setGeoLocation: (location: LocationObject) => void
}

const initialState: GeoState = {
  geoLocation: null,
}

export const useGeoStore = create<GeoState & GeoActions>()(
  persist(
    (set) => ({
      ...initialState,
      setGeoLocation: (location) => set({ geoLocation: location }),
    }),
    {
      name: 'location-storage', // storage key
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

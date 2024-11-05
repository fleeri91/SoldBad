import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LocationRoot, Feature } from 'types/Location'

type LocationState = {
  locations: Feature[]
  loading: boolean
}

type LocationActions = {
  getLocations: () => void
}

const initialState: LocationState = {
  locations: [],
  loading: true,
}

export const useLocationStore = create<LocationState & LocationActions>()(
  persist(
    (set) => ({
      ...initialState,
      getLocations: async () => {
        try {
          const response = await fetch('https://badplatsen.havochvatten.se/badplatsen/api/feature/')
          const data: LocationRoot = await response.json()

          set(() => ({
            locations: data.features,
            loading: false,
          }))
        } catch (error) {
          console.error('Failed to fetch locations:', error)
          set({ loading: false })
        }
      },
    }),
    {
      name: 'location-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

import { create } from 'zustand'
import { Feature, LocationRoot } from '../types/Location'

type LocationState = {
  locations: Feature[]
}

type LocationActions = {
  getLocations: () => void
}

const initialState: LocationState = {
  locations: [],
}

export const useLocationStore = create<LocationState & LocationActions>((set) => ({
  ...initialState,
  getLocations: async () => {
    try {
      const response = await fetch('https://badplatsen.havochvatten.se/badplatsen/api/feature/')
      const data: LocationRoot = await response.json()

      set((state) => ({
        ...state,
        locations: data.features,
      }))
    } catch (error) {
      console.error('Failed to fetch locations:', error)
    }
  },
}))

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LocationRoot, Feature } from 'types/Location'
import { getDistance } from 'geolib'

type LocationState = {
  locations: Feature[]
  filteredLocations: Feature[]
  loading: boolean
  error: string | null
}

type LocationActions = {
  getLocations: () => void
  filterLocationsByRadius: (latitude: number, longitude: number, radius: number) => void
}

const initialState: LocationState = {
  locations: [],
  filteredLocations: [],
  loading: true,
  error: null,
}

export const useLocationStore = create<LocationState & LocationActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      getLocations: async () => {
        try {
          const response = await fetch('https://badplatsen.havochvatten.se/badplatsen/api/feature/')
          const data: LocationRoot = await response.json()

          set({
            locations: data.features,
            loading: false,
            error: null,
          })
        } catch (error) {
          console.error('Failed to fetch locations:', error)
          set({ loading: false, error: 'Failed to load locations' })
        }
      },
      filterLocationsByRadius: (latitude, longitude, radius) => {
        const locations = get().locations
        const filtered = locations.filter((location) => {
          const coords = location.geometry?.coordinates
          if (coords && coords.length === 2) {
            const [locationLongitude, locationLatitude] = coords
            const distance = getDistance(
              { latitude, longitude },
              { latitude: locationLatitude, longitude: locationLongitude }
            )
            return distance <= radius * 1000
          }
          return false
        })
        set({
          filteredLocations: filtered,
        })
      },
    }),
    {
      name: 'location-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

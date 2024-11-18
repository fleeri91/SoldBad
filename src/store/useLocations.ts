import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getDistance } from 'geolib'

import { FeatureRoot } from 'types/BadVattenFeature'
import { Location } from 'types/Location'
import { getWeatherData } from 'api/smhi'

type LocationState = {
  locations: Location[]
  filteredLocations: Location[]
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
          const data: FeatureRoot = await response.json()

          const locations: Location[] = data.features
            .map((feature) => {
              const { id, geometry } = feature
              const coords = geometry?.coordinates

              if (coords && coords.length === 2) {
                const [lon, lat] = coords
                return {
                  id,
                  coords: {
                    lat,
                    lon,
                  },
                }
              }
              return null
            })
            .filter((location) => location !== null) as Location[]

          set({
            locations,
            loading: false,
            error: null,
          })
        } catch (error) {
          console.error('Failed to fetch locations:', error)
          set({ loading: false, error: 'Failed to load locations' })
        }
      },
      filterLocationsByRadius: async (latitude, longitude, radius) => {
        const locations = get().locations
        const filtered = await Promise.all(
          locations
            .filter((location) => {
              const { lat, lon } = location.coords
              const distance = getDistance(
                { latitude, longitude },
                { latitude: lat, longitude: lon }
              )
              return distance <= radius * 1000
            })
            .map(async (location) => {
              const weather = await getWeatherData(location.coords.lat, location.coords.lon)
              console.log(weather[0].parameters[0].name)
              return { ...location, weather }
            })
        )

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

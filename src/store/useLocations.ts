import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getDistance } from 'geolib'

import { FeatureRoot } from 'types/BadVattenFeature'
import { Location } from 'types/Location'

const apiUrl = process.env.EXPO_PUBLIC_API_URL

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

        const filtered = locations.filter((location) => {
          const { lat, lon } = location.coords
          const distance = getDistance({ latitude, longitude }, { latitude: lat, longitude: lon })
          return distance <= radius * 1000
        })

        try {
          const response = await fetch(`${apiUrl}/weather`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              locations: filtered,
            }),
          })

          if (!response.ok) {
            throw new Error('Failed to fetch weather data')
          }

          const weatherResults: Location[] = await response.json()

          set({
            filteredLocations: weatherResults,
          })
        } catch (error) {
          console.error('Error fetching weather data:', error)
          set({ error: 'Failed to fetch weather data' })
        }
      },
    }),
    {
      name: 'location-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

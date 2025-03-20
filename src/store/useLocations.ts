import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getDistance } from 'geolib'

import { FeatureRoot } from 'types/BadVattenFeature'
import { Location } from 'types/Location'
import { BadVattenRoot } from 'types/BadVatten'
import { WaterTypeId } from 'types/WaterType'

type LocationState = {
  locations: Location[]
  filteredLocations: Location[]
  loading: boolean
  error: string | null
}

type LocationActions = {
  getLocations: () => void
  getLocationInfo: () => void
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
          const responseFeatures = await fetch(
            'https://badplatsen.havochvatten.se/badplatsen/api/feature/'
          )
          const responseBathingWaters = await fetch(
            'https://gw-test.havochvatten.se/external-public/bathing-waters/v1/bathing-waters'
          )

          const featuresData: FeatureRoot = await responseFeatures.json()
          const bathingWaterData: BadVattenRoot = await responseBathingWaters.json()

          const validNutsCodes = new Set(
            bathingWaterData
              .filter((bathingWater) => bathingWater.bathingWater.waterTypeId === WaterTypeId.HAV)
              .map((bathingWater) => bathingWater.bathingWater.nutsCode)
          )

          const locations: Location[] = featuresData.features
            .filter((feature) => validNutsCodes.has(feature.properties.NUTSKOD))
            .map((feature) => {
              const { id, geometry } = feature
              const coords = geometry?.coordinates

              if (coords && coords.length === 2) {
                const [lon, lat] = coords
                return {
                  id: feature.properties.NUTSKOD,
                  name: feature.properties.NAMN,
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
      getLocationInfo() {},
      filterLocationsByRadius: async (latitude, longitude, radius) => {
        const locations = get().locations

        const filteredLocations = locations.filter((location) => {
          const { lat, lon } = location.coords
          const distance = getDistance({ latitude, longitude }, { latitude: lat, longitude: lon })
          return distance <= radius * 1000
        })
        set({
          filteredLocations,
          loading: false,
          error: null,
        })
      },
    }),
    {
      name: 'locationv1-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

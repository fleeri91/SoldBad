import { create } from 'zustand'
import { getDistance } from 'geolib'

import { Location } from 'types/Location'
import { MultiPointRoot } from 'types/SMHI/MultiPoint' // Full MultiPoint response
import { MultiPointDataRoot } from 'types/SMHI/MultiPointData' // MultiPoint weather data response

const SMHI_BASE_URL = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2'

type WeatherState = {
  sunnySpots: Location[] // Only store filtered sunny spots
}

type WeatherActions = {
  getMultiPointWeather: (locations: Location[]) => Promise<void> // Fetch weather and filter sunny spots
  resetWeather: () => void // Reset weather state
}

const initialState: WeatherState = {
  sunnySpots: [],
}

export const useWeatherStore = create<WeatherState & WeatherActions>((set) => ({
  ...initialState,

  // Fetch latest weather data and filter sunny spots
  getMultiPointWeather: async (spots: Location[]) => {
    try {
      const multiPointResponse = await fetch(`${SMHI_BASE_URL}/geotype/multipoint.json`)
      const multiPoints: MultiPointRoot = await multiPointResponse.json()
      if (!multiPoints || !multiPoints.coordinates) {
        throw new Error('MultiPoint grid coordinates not available')
      }

      const validTimesResponse = await fetch(`${SMHI_BASE_URL}/validtime.json`)
      const validTimes = await validTimesResponse.json()
      const latestValidTime = validTimes.validTime[0]

      const weatherUrl = `${SMHI_BASE_URL}/geotype/multipoint/validtime/${latestValidTime.replace(
        /[-:]/g,
        ''
      )}/parameter/tcc_mean/leveltype/hl/level/0/data.json?with-geo=false`
      const weatherResponse = await fetch(weatherUrl)
      const multiPointData: MultiPointDataRoot = await weatherResponse.json()

      const cloudCoverValues = multiPointData.timeSeries[0].parameters[0].values

      const updatedSpots = spots.map((spot) => {
        const distances = multiPoints.coordinates.map(([lon, lat], index) => ({
          index,
          distance: getDistance(
            { latitude: spot.coords.lat, longitude: spot.coords.lon },
            { latitude: lat, longitude: lon }
          ),
        }))
        const nearest = distances.reduce((min, curr) => (curr.distance < min.distance ? curr : min))
        const cloudCover = cloudCoverValues[nearest.index] // 0-8 oktas
        const isSunny = cloudCover <= 2 // ≤2 oktas = mostly clear/sunny
        return { ...spot, isSunny }
      })

      // Only store the filtered sunny spots
      set({
        sunnySpots: updatedSpots.filter((spot) => spot.isSunny),
      })
    } catch (error) {
      console.error('Failed to fetch SMHI MultiPoint weather:', error)
    }
  },

  // Reset weather state
  resetWeather: () => {
    set({
      sunnySpots: [],
    })
  },
}))

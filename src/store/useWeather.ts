import { create } from 'zustand'
import { SMHIPointRoot } from '../types/SMHI'

type WeatherState = {
  pointData: SMHIPointRoot | null
}

type WeatherActions = {
  getPointWeather: (lat: string, lon: string) => void
  resetWeather: () => void
}

const initialState: WeatherState = {
  pointData: null,
}

export const useWeatherStore = create<WeatherState & WeatherActions>((set) => ({
  ...initialState,
  getPointWeather: async (lat: string, lon: string) => {
    try {
      const response = await fetch(
        `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`
      )
      const data: SMHIPointRoot = await response.json()

      set((state) => ({
        ...state,
        pointData: data,
      }))
    } catch (error) {
      console.error('Failed to fetch SMHI point data:', error)
    }
  },
  resetWeather: () => {
    set((state) => ({
      ...state,
      pointData: null,
    }))
  },
}))

import { create } from 'zustand'

type WeatherState = {}

type WeatherActions = {}

const initialState: WeatherState = {}

export const useWeatherStore = create<WeatherState & WeatherActions>((set) => ({
  ...initialState,
}))

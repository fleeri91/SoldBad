import { TimeSerie } from './SMHI'

export interface Location {
  id: string
  coords: {
    lat: number
    lon: number
  }
  weather: TimeSerie
}

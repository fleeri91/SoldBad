export interface Location {
  id: string
  coords: {
    lat: number
    lon: number
  }
  weather?: TimeSerie[]
}

export interface TimeSerie {
  time: string
  temperature: number
  cloud_level: number
  windSpeed: number
}

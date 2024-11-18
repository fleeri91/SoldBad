import { SMHIPointRoot } from 'types/SMHI'

export const getWeatherData = async (latitude: number, longitude: number) => {
  const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`

  try {
    const response = await fetch(url)
    const data: SMHIPointRoot = await response.json()

    return data.timeSeries
  } catch (error) {
    console.error('Failed to fetch weather data:', error)
    return null
  }
}

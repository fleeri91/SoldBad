import { getDistance } from 'geolib'

import { MultiPointRoot } from 'types/SMHI/MultiPoint'
import { MultiPointDataRoot } from 'types/SMHI/MultiPointData'
import { delay } from 'utils/helpers'

const SMHI_BASE_URL = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2'

export const fetchMultiPointWeather = async (): Promise<MultiPointRoot> => {
  console.log('Fetching SMHI multi point weather...')

  await delay(200 + Math.floor(Math.random() * 2000))

  const response = await fetch(`${SMHI_BASE_URL}/geotype/multipoint.json`)
  if (!response.ok) throw new Error('Failed to fetch data')

  return response.json()
}

const fetchValidTimes = async (): Promise<string> => {
  const response = await fetch(`${SMHI_BASE_URL}/validtime.json`)
  if (!response.ok) throw new Error('Failed to fetch valid times')

  const validTimes = await response.json()
  return validTimes.validTime[0]
}

const fetchWeatherData = async (latestValidTime: string): Promise<MultiPointDataRoot> => {
  const formattedTime = latestValidTime.replace(/[-:]/g, '')
  const weatherUrl = `${SMHI_BASE_URL}/geotype/multipoint/validtime/${formattedTime}/parameter/tcc_mean/leveltype/hl/level/0/data.json?with-geo=false`

  const response = await fetch(weatherUrl)
  if (!response.ok) throw new Error('Failed to fetch weather data')

  return response.json()
}

export const getMultiPointWeather = async () => {
  try {
    const multiPoints = await fetchMultiPointWeather()
    if (!multiPoints || !multiPoints.coordinates) {
      throw new Error('MultiPoint grid coordinates not available')
    }

    const latestValidTime = await fetchValidTimes()
    const multiPointData = await fetchWeatherData(latestValidTime)

    const cloudCoverValues = multiPointData.timeSeries[0].parameters[0].values

    console.log(cloudCoverValues)
  } catch (error) {
    console.error('Failed to fetch SMHI MultiPoint weather:', error)
  }
}

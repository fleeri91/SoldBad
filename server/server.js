import express from 'express'
import fetch from 'node-fetch'
const { json } = express

const app = express()
const port = 8080

app.use(json())

const fetchWeatherFromSMHI = async (lat, lon) => {
  const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`SMHI API error: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching weather:', error)
    return null
  }
}

app.post('/weather', async (req, res) => {
  const { locations } = req.body

  if (!locations) {
    return res.status(400).json({ error: 'Missing required parameters' })
  }

  const locationsWithWeather = await Promise.all(
    locations.map(async (location) => {
      const { lat, lon } = location.coords

      const weatherData = await fetchWeatherFromSMHI(lat, lon)

      if (weatherData) {
        location.weather = weatherData.timeSeries.map((entry) => {
          return {
            time: entry.validTime,
            temperature: entry.parameters.find((param) => param.name === 't')?.values[0],
            cloud_level: entry.parameters.find((param) => param.name === 'tcc_mean')?.values[0],
            windSpeed: entry.parameters.find((param) => param.name === 'ws')?.values[0],
          }
        })
      }

      return location
    })
  )
  res.json(locationsWithWeather)
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${8080}/`)
})

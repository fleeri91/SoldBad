import { getDistance } from 'geolib'
import { Feature } from 'types/Location'

interface Coordinates {
  latitude: number
  longitude: number
}

export const filterLocationsByRadius = (
  locations: Feature[],
  centerLocation: Coordinates,
  radius: number // radius in kilometers
) => {
  const radiusInMeters = radius * 1000

  return locations.filter((location) => {
    const coordinates = location.geometry?.coordinates
    if (!coordinates || coordinates.length < 2) return false

    const [longitude, latitude] = coordinates
    const distance = getDistance({ latitude, longitude }, centerLocation)
    return distance <= radiusInMeters
  })
}

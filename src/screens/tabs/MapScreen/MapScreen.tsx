import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import { useLocationStore } from 'store/useLocations'

import { styles } from './styles'

const MapScreen = () => {
  const [region, setRegion] = useState({
    latitude: 62.38583179,
    longitude: 16.321998712,
    latitudeDelta: 20,
    longitudeDelta: 20,
  })

  const { getLocations, locations } = useLocationStore()

  useEffect(() => {
    getLocations()
  }, [])

  return (
    <View style={styles.container}>
      <MapView region={region} style={styles.mapView}>
        {locations.map((location) => {
          if (!location.coords) return null

          return (
            <Marker
              key={location.id}
              coordinate={{ latitude: location.coords.lat, longitude: location.coords.lon }}
            />
          )
        })}
      </MapView>
    </View>
  )
}

export default MapScreen

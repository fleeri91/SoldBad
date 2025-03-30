import { useState } from 'react'
import { View, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import { styles } from './styles'
import { useQuery } from '@tanstack/react-query'
import { fetchBathingWaters } from 'src/api/BathingWater'

const MapScreen = () => {
  const [region, setRegion] = useState({
    latitude: 62.38583179,
    longitude: 16.321998712,
    latitudeDelta: 20,
    longitudeDelta: 20,
  })

  const { isPending, isError, error, data } = useQuery({
    queryKey: ['bathing-waters'],
    queryFn: fetchBathingWaters,
    retry: false,
  })

  if (isError) {
    throw error
  }

  if (isPending) {
    return (
      <View style={styles.container}>
        <Text>Fetching...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MapView region={region} style={styles.mapView}>
        {data &&
          data.map((item) => {
            if (!item.bathingWater.samplingPointPosition) return null

            return (
              <Marker
                key={item.bathingWater.nutsCode}
                coordinate={{
                  latitude: parseFloat(item.bathingWater.samplingPointPosition.latitude),
                  longitude: parseFloat(item.bathingWater.samplingPointPosition.longitude),
                }}
              />
            )
          })}
      </MapView>
    </View>
  )
}

export default MapScreen

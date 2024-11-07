import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import { useGeoStore } from 'store/useGeo'

const MapScreen = () => {
  const { geoLocation } = useGeoStore()

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        region={{
          latitude: geoLocation?.coords.latitude ?? 0,
          longitude: geoLocation?.coords.longitude ?? 0,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: geoLocation?.coords.latitude ?? 0,
            longitude: geoLocation?.coords.longitude ?? 0,
          }}
          title="You are here"
          description="Your current location"
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapView: {
    height: '100%',
    width: '100%',
  },
})

export default MapScreen

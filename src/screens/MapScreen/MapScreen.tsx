import { StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

const OnboardingScreen = () => {
  return (
    <MapView
      style={styles.mapView}
      region={{
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      <Marker
        coordinate={{
          latitude: 0,
          longitude: 0,
        }}
        title="You are here"
        description="Your current location"
      />
    </MapView>
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

export default OnboardingScreen

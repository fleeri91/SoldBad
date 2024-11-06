import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import OnboardingView from 'screens/OnboardingView'
import { useGeoStore } from 'store/useGeo'

const App = () => {
  const { geoLocation } = useGeoStore()

  if (!geoLocation) {
    return <OnboardingView />
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude: geoLocation.coords.latitude,
          longitude: geoLocation.coords.longitude,
          latitudeDelta: 0.01, // Zoom level, adjust as needed
          longitudeDelta: 0.01, // Zoom level, adjust as needed
        }}
      >
        <Marker
          coordinate={{
            latitude: geoLocation.coords.latitude,
            longitude: geoLocation.coords.longitude,
          }}
          title="You are here"
          description="Your current location"
        />
      </MapView>
    </View>
  )
}

export default App

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

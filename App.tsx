import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import OnboardingView from 'screens/OnboardingView'
import { useGeoStore } from 'store/useGeo'
import { usePreferencesStore } from 'store/usePreferences'
import 'react-native-get-random-values'
import { useEffect } from 'react'
import PlacesInput from 'components/PlacesAutocomplete'

const App = () => {
  const { geoLocation } = useGeoStore()
  const { currentLocation } = usePreferencesStore()

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.places}>
        <PlacesInput />
      </View>
      <MapView
        style={styles.mapView}
        region={{
          latitude: currentLocation.details?.geometry.location.lat,
          longitude: currentLocation.details?.geometry.location.lng,
          latitudeDelta: 0.05, // Zoom level, adjust as needed
          longitudeDelta: 0.05, // Zoom level, adjust as needed
        }}
      >
        <Marker
          coordinate={{
            latitude: currentLocation.details?.geometry.location.lat,
            longitude: currentLocation.details?.geometry.location.lng,
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
  places: {
    position: 'absolute',
    zIndex: 50,
    width: '100%',
    top: 0,
    backgroundColor: '#fff',
  },
})

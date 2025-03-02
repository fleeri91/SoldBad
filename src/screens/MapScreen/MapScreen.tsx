import { useEffect, useRef, useState } from 'react'
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import MapViewCluster from 'react-native-map-clustering'

import { useGeoStore } from 'store/useGeo'
import { usePreferencesStore } from 'store/usePreferences'
import { useLocationStore } from 'store/useLocations'

const MapScreen = () => {
  const { geoLocation } = useGeoStore()
  const { distance } = usePreferencesStore()
  const { filteredLocations, getLocations, filterLocationsByRadius, getBathingWaters } =
    useLocationStore()

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  })

  const [markersReady, setMarkersReady] = useState<boolean>(false)

  const mapRef = useRef<MapView>(null)

  useEffect(() => {
    getLocations()
  }, [getLocations])

  useEffect(() => {
    getBathingWaters()
  }, [getBathingWaters])

  useEffect(() => {
    if (geoLocation?.coords?.latitude && geoLocation?.coords?.longitude) {
      filterLocationsByRadius(geoLocation.coords.latitude, geoLocation.coords.longitude, distance)
    }
  }, [geoLocation, distance, filterLocationsByRadius])

  useEffect(() => {
    if (geoLocation?.coords?.latitude && geoLocation?.coords?.longitude) {
      setRegion({
        latitude: geoLocation.coords.latitude,
        longitude: geoLocation.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      })
    }
  }, [geoLocation])

  useEffect(() => {
    if (filteredLocations.length > 0) {
      setMarkersReady(true)
    }
  }, [filteredLocations])

  const onMapReady = () => {
    if (mapRef.current && markersReady) {
      const coordinates = filteredLocations
        .map((location) => {
          const coords = location.coords
          if (coords) {
            return { latitude: coords.lat, longitude: coords.lon }
          }
          return null
        })
        .filter((coord): coord is { latitude: number; longitude: number } => coord !== null)

      if (geoLocation?.coords?.latitude && geoLocation?.coords?.longitude) {
        coordinates.push({
          latitude: geoLocation.coords.latitude,
          longitude: geoLocation.coords.longitude,
        })
      }

      if (coordinates.length > 0) {
        mapRef.current.fitToCoordinates(coordinates, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        })
      }
    }
  }

  return (
    <View style={styles.container}>
      <MapViewCluster
        ref={mapRef}
        style={styles.mapView}
        region={region}
        onMapReady={onMapReady}
        showsUserLocation={true}
      >
        {filteredLocations.map((location) => {
          if (!location.coords) return null

          return (
            <Marker
              key={location.id}
              coordinate={{ latitude: location.coords.lat, longitude: location.coords.lon }}
            />
          )
        })}
      </MapViewCluster>
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
  calloutContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  calloutContent: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  temperatureText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
})

export default MapScreen

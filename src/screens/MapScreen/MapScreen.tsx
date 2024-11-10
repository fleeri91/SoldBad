import { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Marker } from 'react-native-maps'
import MapViewCluster from 'react-native-map-clustering'

import { useGeoStore } from 'store/useGeo'
import { usePreferencesStore } from 'store/usePreferences'
import { useLocationStore } from 'store/useLocations'

import UserLocationSVG from 'assets/svg/user-location.svg'

const MapScreen = () => {
  const { geoLocation } = useGeoStore()
  const { distance } = usePreferencesStore()
  const { filteredLocations, getLocations, filterLocationsByRadius } = useLocationStore()

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  })

  const [markersReady, setMarkersReady] = useState<boolean>(false)

  const mapRef = useRef<MapViewCluster>(null)

  useEffect(() => {
    getLocations()
  }, [getLocations])

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
          const coords = location.geometry?.coordinates
          if (coords && coords.length === 2) {
            return { latitude: coords[1], longitude: coords[0] }
          }
          return null
        })
        .filter(Boolean)

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
          const coordinates = location.geometry?.coordinates
          if (!coordinates || coordinates.length < 2) return null

          const [longitude, latitude] = coordinates
          return (
            <Marker
              key={location.id}
              coordinate={{ latitude, longitude }}
              title={location.properties?.NAMN || 'Location'}
              description={location.properties?.KMN_NAMN || ''}
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
})

export default MapScreen

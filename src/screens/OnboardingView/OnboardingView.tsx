import * as Location from 'expo-location'
import React, { useState } from 'react'
import { View, Text, Button, Alert, StyleSheet } from 'react-native'
import { useGeoStore } from 'store/useGeo'

const OnboardingView = () => {
  const [locationEnabled, setLocationEnabled] = useState(false)

  const { setGeoLocation } = useGeoStore()

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status === 'granted') {
      setLocationEnabled(true)
      const location = await Location.getCurrentPositionAsync({})
      setGeoLocation(location)
    } else {
      Alert.alert('Permission Denied', 'Location access is required to use GPS.')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Allow GPS Location</Text>
      <Button title="Allow GPS" onPress={requestLocationPermission} />
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
})

export default OnboardingView

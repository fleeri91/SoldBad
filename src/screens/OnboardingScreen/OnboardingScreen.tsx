import React, { useState } from 'react'
import { Text, Alert, StyleSheet, Button, View } from 'react-native'
import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import Onboarding from 'react-native-onboarding-swiper'
import Slider from '@react-native-community/slider'

import { RootStackParamList } from 'navigation/MainNavigation'

import { useGeoStore } from 'store/useGeo'
import { usePreferencesStore } from 'store/usePreferences'

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>

const OnboardingScreen = () => {
  const [locationEnabled, setLocationEnabled] = useState(false)
  const { setGeoLocation } = useGeoStore()
  const { setDistance, distance } = usePreferencesStore()

  const navigation = useNavigation<OnboardingScreenNavigationProp>()

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

  const onDone = () => {
    navigation.navigate('Map')
  }

  const onBoardingScreens = [
    {
      backgroundColor: '#fff',
      image: <Text style={{ fontSize: 50 }}>👋</Text>,
      title: 'Welcome!',
      subtitle: 'This is an onboarding screen where you can introduce your app.',
    },
    {
      backgroundColor: '#fff',
      image: <Text style={{ fontSize: 50 }}>🌍</Text>,
      title: 'Allow Location Access',
      subtitle: (
        <View>
          <Text>To make the app work, we need your GPS location.</Text>
          <Button title="Enable Location" onPress={requestLocationPermission} />
        </View>
      ),
    },
    {
      backgroundColor: '#fff',
      image: <Text style={{ fontSize: 50 }}>🗺️</Text>,
      title: 'Set Travel Distance',
      subtitle: (
        <View>
          <Text>Select your preferred distance (km): {distance} km</Text>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={10}
            maximumValue={100}
            step={10}
            value={distance}
            onValueChange={(value) => setDistance(value)}
          />
        </View>
      ),
      onDone: onDone,
    },
  ]

  return (
    <Onboarding pages={onBoardingScreens} onSkip={() => console.log('Skipped')} onDone={onDone} />
  )
}

const styles = StyleSheet.create({})

export default OnboardingScreen

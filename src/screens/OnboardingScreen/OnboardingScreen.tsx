import React, { useState } from 'react'
import { Text, Alert, StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import Onboarding from 'react-native-onboarding-swiper'

import { RootStackParamList } from 'navigation/MainNavigation'

import { useGeoStore } from 'store/useGeo'

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>

const OnboardingScreen = () => {
  const [locationEnabled, setLocationEnabled] = useState(false)
  const { setGeoLocation } = useGeoStore()

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
      subtitle: 'To make the app work, we need your GPS location.',
    },
    {
      backgroundColor: '#fff',
      image: <Text style={{ fontSize: 50 }}>🗺️</Text>,
      title: 'Use GPS Location',
      subtitle: 'Enable GPS to get started.',
      onDone: onDone,
    },
  ]

  return (
    <Onboarding pages={onBoardingScreens} onSkip={() => console.log('Skipped')} onDone={onDone} />
  )
}

const styles = StyleSheet.create({})

export default OnboardingScreen

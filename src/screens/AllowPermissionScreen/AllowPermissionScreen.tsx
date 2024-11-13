import React from 'react'
import { Alert, StyleSheet, View, Text } from 'react-native'
import * as Location from 'expo-location'
import { useNavigation, useTheme } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import Onboarding from 'react-native-onboarding-swiper'

import { RootStackParamList } from 'navigation/MainNavigation'
import { useGeoStore } from 'store/useGeo'

import Typography from 'components/Typography'
import Button from 'components/Button'

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AllowPermission'>

const AllowPermissionScreen = () => {
  const { colors } = useTheme()
  const { geoLocation, setGeoLocation } = useGeoStore()

  const navigation = useNavigation<OnboardingScreenNavigationProp>()

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({})
      setGeoLocation(location)
    } else {
      Alert.alert('Permission Denied', 'Location access is required to use GPS.')
    }
  }

  const onDone = () => {
    navigation.navigate('Onboarding')
  }

  const onBoardingScreens = [
    {
      backgroundColor: colors.background,
      image: (
        <View style={styles.imageContainer}>
          <Text style={styles.emoji}>🌍</Text>
        </View>
      ),
      title: (
        <View style={styles.titleContainer}>
          <Typography variant="title" align="center">
            Plats
          </Typography>
        </View>
      ),
      subtitle: (
        <View style={styles.subtitleContainer}>
          <Typography variant="body" align="center" style={styles.subtitleText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas purus enim, dapibus
            eget lacinia quis, mollis non magna. Donec sed placerat nisl. Nam ut sem metus.
          </Typography>
          {geoLocation ? (
            <Typography variant="label">Godkänd ✅</Typography>
          ) : (
            <Button title="Aktivera" style={styles.button} onPress={requestLocationPermission} />
          )}
        </View>
      ),
    },
  ]

  return <Onboarding pages={onBoardingScreens} onDone={onDone} showSkip={false} />
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginHorizontal: 16,
  },
  titleContainer: {
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginHorizontal: 16,
    gap: 32,
  },
  emoji: {
    fontSize: 50,
    textAlign: 'center',
  },
  subtitleText: {
    textAlign: 'center',
  },
  button: {
    textAlign: 'center',
    marginVertical: 32,
  },
})

export default AllowPermissionScreen

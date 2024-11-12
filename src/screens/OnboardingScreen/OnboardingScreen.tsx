import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import Onboarding from 'react-native-onboarding-swiper'
import Slider from '@react-native-community/slider'

import { RootStackParamList } from 'navigation/MainNavigation'
import { usePreferencesStore } from 'store/usePreferences'

import Typography from 'components/Typography'

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>

const OnboardingScreen = () => {
  const { setDistance, distance } = usePreferencesStore()

  const navigation = useNavigation<OnboardingScreenNavigationProp>()

  const onDone = () => {
    navigation.navigate('Map')
  }

  const onBoardingScreens = [
    {
      backgroundColor: '#f0f4f7',
      image: (
        <View style={styles.imageContainer}>
          <Text style={styles.emoji}>🗺️</Text>
        </View>
      ),
      title: (
        <View style={styles.titleContainer}>
          <Typography variant="title" align="center">
            Ange önskat avstånd
          </Typography>
        </View>
      ),
      subtitle: (
        <View style={styles.subtitleContainer}>
          <Typography variant="label" align="center" style={styles.subtitleText}>
            {distance} km
          </Typography>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={100}
            step={1}
            value={distance}
            onValueChange={(value) => setDistance(value)}
            accessibilityLabel="Travel distance slider"
          />
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
    marginBottom: 64,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginHorizontal: 16,
  },
  emoji: {
    fontSize: 50,
    textAlign: 'center',
  },
  subtitleText: {
    textAlign: 'center',
  },
  slider: {
    marginVertical: 16,
    width: 200,
    height: 40,
  },
})

export default OnboardingScreen

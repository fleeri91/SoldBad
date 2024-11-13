import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useColorScheme } from 'react-native'

import { CustomLightTheme, CustomDarkTheme } from 'src/theme/colors'

import OnboardingScreen from 'screens/OnboardingScreen'
import MapScreen from 'screens/MapScreen'
import AllowPermissionScreen from 'screens/AllowPermissionScreen'

import { useGeoStore } from 'store/useGeo'

export type RootStackParamList = {
  AllowPermission: undefined
  Onboarding: undefined
  Map: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

const MainNavigation = () => {
  const { geoLocation } = useGeoStore()
  const colorScheme = useColorScheme()

  const theme = colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName={geoLocation ? 'Onboarding' : 'AllowPermission'}>
        <Stack.Screen
          name="AllowPermission"
          options={{ headerShown: false }}
          component={AllowPermissionScreen}
        />
        <Stack.Screen
          name="Onboarding"
          options={{ headerShown: false }}
          component={OnboardingScreen}
        />
        <Stack.Screen name="Map" options={{ headerShown: false }} component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation

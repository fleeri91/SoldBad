import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useColorScheme } from 'react-native'

import DebugScreen from 'screens/DebugScreen'
import OnboardingScreen from 'screens/OnboardingScreen'
import MapScreenCluster from 'screens/tabs/MapScreenCluster'
import MapScreen from 'screens/tabs/MapScreen'
import AllowPermissionScreen from 'screens/AllowPermissionScreen'

import { useGeoStore } from 'store/useGeo'
import { useSettingsStore } from 'store/useSettings'
import { IS_DEBUGGING } from 'app-settings'
import ListScreen from 'screens/tabs/ListScreen'
import { darkTheme, lightTheme } from 'src/theme'

export type RootStackParamList = {
  Debug: undefined
  AllowPermission: undefined
  Onboarding: undefined
  Home: undefined
}

const Stack = createStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator()

const MainNavigation = () => {
  const { geoLocation } = useGeoStore()
  const colorScheme = useColorScheme()

  const { theme } = useSettingsStore()

  const appTheme = (theme ?? colorScheme === 'dark') ? darkTheme : lightTheme

  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator
        initialRouteName={IS_DEBUGGING ? 'Debug' : !geoLocation ? 'Onboarding' : 'Home'}
      >
        <Stack.Screen name="Debug" options={{ headerShown: false }} component={DebugScreen} />
        {/*
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
        */}
        <Stack.Screen name="Home" options={{ headerShown: false }} component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Map" component={MapScreen} options={{ title: 'Karta' }} />
      <Tab.Screen name="List" component={ListScreen} options={{ title: 'Lista' }} />
    </Tab.Navigator>
  )
}

export default MainNavigation

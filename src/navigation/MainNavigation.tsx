/** Libraries */
import React from 'react'
import { useColorScheme } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

/** Screens */
import DebugScreen from 'screens/DebugScreen'
import MapScreen from 'screens/tabs/MapScreen'
import ListScreen from 'screens/tabs/ListScreen'
import BathingWaterInfoScreen from 'screens/BathingWaterInfoScreen'

/** Store */
import { useGeoStore } from 'store/useGeo'
import { useSettingsStore } from 'store/useSettings'

/** Constants */
import { IS_DEBUGGING } from 'app-settings'

/** Theme */
import { darkTheme, lightTheme } from 'src/theme'

export type RootStackParamList = {
  Debug: undefined
  AllowPermission: undefined
  Onboarding: undefined
  Home: undefined
  BathingWaterInfo: { id: string }
}

const Stack = createStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator()

const MainNavigation = () => {
  const colorScheme = useColorScheme()

  const { theme } = useSettingsStore()

  const appTheme = (theme ?? colorScheme === 'dark') ? darkTheme : lightTheme

  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator initialRouteName={IS_DEBUGGING ? 'Debug' : 'Home'}>
        <Stack.Screen name="Debug" options={{ headerShown: false }} component={DebugScreen} />
        <Stack.Screen name="Home" options={{ headerShown: false }} component={TabNavigator} />
        <Stack.Screen
          name="BathingWaterInfo"
          options={{ headerShown: false }}
          component={BathingWaterInfoScreen}
        />
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

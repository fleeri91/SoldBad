import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import OnboardingScreen from 'screens/OnboardingScreen'
import MapScreen from 'screens/MapScreen'

export type RootStackParamList = {
  Onboarding: undefined
  Map: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
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

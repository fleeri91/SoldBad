import { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { useLocationStore } from 'store/useLocations'
import { useWeatherStore } from 'store/useWeather'

const DebugScreen = () => {
  const { getLocations, locations } = useLocationStore()
  const { sunnySpots, getMultiPointWeather } = useWeatherStore()

  useEffect(() => {
    getLocations()
  }, [])

  useEffect(() => {
    if (locations.length > 0) {
      console.log('Fetching multipoint')
      getMultiPointWeather(locations)
    }
  }, [locations])

  useEffect(() => {
    console.log('Sunny spots amount: ' + sunnySpots.length)
  }, [sunnySpots])

  /*
  useEffect(() => {
    getMultiPoint()
    getMultiPointWeather(filteredSpots)
  }, [])

  useEffect(() => {
    console.log(sunnySpots)
  }, [sunnySpots])
  */

  return (
    <View style={styles.container}>
      <Text>Debug</Text>
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

export default DebugScreen

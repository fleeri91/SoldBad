import { StyleSheet, View, Text } from 'react-native'

const DebugScreen = () => {
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

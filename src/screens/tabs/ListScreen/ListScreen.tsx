import { useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'

import { useLocationStore } from 'store/useLocations'

import { styles } from './styles'

const ListScreen = () => {
  const { getLocations, locations } = useLocationStore()

  useEffect(() => {
    getLocations()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={locations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No locations available</Text>}
      />
    </View>
  )
}

export default ListScreen

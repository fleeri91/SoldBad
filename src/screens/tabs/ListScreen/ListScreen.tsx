import { View, Text, FlatList } from 'react-native'
import { useQuery } from '@tanstack/react-query'

import { styles } from './styles'
import { fetchBathingWaters } from 'api'

const ListScreen = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['bathing-waters'],
    queryFn: fetchBathingWaters,
  })

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error fetching bathing waters</Text>
      </View>
    )
  }

  if (isPending) {
    return (
      <View style={styles.container}>
        <Text>Fetching...</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={(item) => item.bathingWater.nutsCode.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.bathingWater.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No locations available</Text>}
      />
    </View>
  )
}

export default ListScreen

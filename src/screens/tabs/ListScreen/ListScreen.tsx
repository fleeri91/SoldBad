import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useQuery } from '@tanstack/react-query'

import { styles } from './styles'
import { fetchBathingWaters } from 'src/api/BathingWater'
import { RootStackParamList } from 'navigation/MainNavigation'

type BathingWaterInfoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BathingWaterInfo'
>

const ListScreen = () => {
  const navigation = useNavigation<BathingWaterInfoScreenNavigationProp>()

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
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate('BathingWaterInfo', {
                id: item.bathingWater.nutsCode,
              })
            }
          >
            <Text style={styles.itemText}>{item.bathingWater.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No locations available</Text>}
      />
    </View>
  )
}

export default ListScreen

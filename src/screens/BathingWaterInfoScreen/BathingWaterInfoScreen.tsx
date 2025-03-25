import { View, Text, FlatList } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'

import { styles } from './styles'
import { fetchBathingWaterInfo } from 'api'
import { RootStackParamList } from 'navigation/MainNavigation'

type BathingWaterInfoScreenRouteProp = RouteProp<RootStackParamList, 'BathingWaterInfo'>

const BathingWaterInfoScreen = () => {
  const { params } = useRoute<BathingWaterInfoScreenRouteProp>()

  const { isPending, error, data } = useQuery({
    queryKey: ['bathing-water-info', params.id],
    queryFn: () => fetchBathingWaterInfo(params.id),
  })

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error fetching bathing water</Text>
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
      <Text>{data && data.bathingWater.name}</Text>
    </View>
  )
}

export default BathingWaterInfoScreen

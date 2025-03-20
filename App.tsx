import 'react-native-get-random-values'
import 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import MainNavigation from 'navigation/MainNavigation'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainNavigation />
    </QueryClientProvider>
  )
}

export default App

import 'react-native-get-random-values'
import 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

import MainNavigation from 'navigation/MainNavigation'
import ErrorScreen from 'screens/ErrorScreen'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorScreen}>
        <MainNavigation />
      </ErrorBoundary>
    </QueryClientProvider>
  )
}

export default App

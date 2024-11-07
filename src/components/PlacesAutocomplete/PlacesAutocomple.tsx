import React from 'react'
import { SafeAreaView, StyleSheet, TextInput } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { usePreferencesStore } from 'store/usePreferences'
import theme from 'theme'

const PlacesInput = () => {
  const { setCurrentLocation } = usePreferencesStore()

  return (
    <SafeAreaView style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Välj plats"
        onPress={(data, details = null) => setCurrentLocation(data, details)}
        query={{
          key: '',
          components: 'country:se',
          types: '(cities)',
        }}
        fetchDetails={true}
        onFail={(error) => console.log(error)}
        onNotFound={() => console.log('no results')}
        styles={{
          textInput: {
            height: 50,
            fontSize: theme.fontSize.base,
            paddingHorizontal: theme.spacing[4],
            backgroundColor: theme.colors.primary,
            borderRadius: theme.borderRadius.md,
            borderColor: theme.colors.primary,
            borderWidth: 1,
            marginBottom: theme.spacing[4],
            shadowColor: theme.colors.primary,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
          },
          textInputContainer: {
            paddingHorizontal: theme.spacing[4],
          },
          description: {
            fontSize: theme.fontSize.sm,
            color: theme.colors.primary,
          },
          row: {
            padding: theme.spacing[3],
            borderBottomWidth: 1,
            borderColor: theme.colors.primary,
          },
          poweredContainer: {
            display: 'none', // Hides the "Powered by Google" text
          },
          listView: {
            backgroundColor: theme.colors.primary,
            borderRadius: theme.borderRadius.md,
            maxHeight: 300,
            shadowColor: theme.colors.primary,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 5,
            elevation: 5,
          },
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
})

export default PlacesInput

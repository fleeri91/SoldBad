import { View, StyleSheet, ViewProps } from 'react-native'

interface ContainerProps extends ViewProps {}

const Container = ({ children }: ContainerProps): JSX.Element => (
  <View style={[styles.container]}>{children}</View>
)

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
})

export default Container

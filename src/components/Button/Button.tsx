import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { useTheme } from '@react-navigation/native'

interface ButtonProps {
  title: string
  variant?: 'primary' | 'secondary'
  onPress?: () => void
  style?: ViewStyle
  textStyle?: TextStyle
}

const Button = ({ title, variant = 'primary', onPress, style, textStyle }: ButtonProps) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[variant] }, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: '#FFFFFF' }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
})

export default Button

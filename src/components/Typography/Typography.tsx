import React from 'react'
import { Text, StyleSheet, TextProps } from 'react-native'
import { fontSize } from 'src/theme/fontSize'

type TypographyVariant = 'title' | 'subtitle' | 'body' | 'caption' | 'label'

interface TypographyProps extends TextProps {
  variant?: TypographyVariant
  align?: 'left' | 'right' | 'center'
}

const Typography = ({ variant = 'body', children, align = 'left' }: TypographyProps) => {
  return <Text style={[styles[variant], { textAlign: align }]}>{children}</Text>
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  caption: {
    fontSize: 12,
    fontWeight: 'normal',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
  },
})

export default Typography

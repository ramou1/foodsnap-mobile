import React from 'react';
import { Text as DefaultText, TextProps as DefaultTextProps } from 'react-native';

export type TextProps = DefaultTextProps;

export function Text(props: TextProps) {
  return <DefaultText {...props} style={[{ fontFamily: 'Rubik-Regular' }, props.style]} />;
}

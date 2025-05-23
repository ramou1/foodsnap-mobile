// components/AppWrapper.tsx
import React from "react";
import { View, StyleSheet } from "react-native";

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Rubik-Regular",
  },
});

import React from "react";
import { View, StyleSheet } from "react-native";
import { SettingsProvider, useSettings } from "@/contexts/SettingsContext";
import { StatusBar } from "expo-status-bar";

function ThemedRoot({ children }: { children: React.ReactNode }) {
  const { isDark } = useSettings();
  return (
    <View style={[styles.container, isDark && styles.darkContainer]} className={isDark ? "dark" : ""}>
      <StatusBar style={isDark ? "light" : "dark"} />
      {children}
    </View>
  );
}

export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <SettingsProvider>
    <ThemedRoot>{children}</ThemedRoot>
  </SettingsProvider>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F7FA" },
  darkContainer: { backgroundColor: "#0F0F1A" },
});

import React from "react";
import { View } from "react-native";
import { Edge, useSafeAreaInsets } from "react-native-safe-area-context";
import { useSettings } from "@/contexts/SettingsContext";

interface ScreenContainerProps {
  children: React.ReactNode;
  edges?: Edge[];
  className?: string;
}

export function ScreenContainer({
  children,
  edges = ["top"],
  className = "",
}: ScreenContainerProps) {
  const { isDark } = useSettings();
  const insets = useSafeAreaInsets();

  const paddingTop = edges.includes("top") ? insets.top : 0;
  const paddingBottom = edges.includes("bottom") ? insets.bottom : 0;

  return (
    <View
      style={{ flex: 1, paddingTop, paddingBottom }}
      className={`${isDark ? "bg-[#0F0F1A]" : "bg-background"} ${className}`}
    >
      {children}
    </View>
  );
}

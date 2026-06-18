import React from "react";
import { SafeAreaView, Edge } from "react-native-safe-area-context";
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

  return (
    <SafeAreaView
      edges={edges}
      className={`flex-1 ${isDark ? "bg-[#0F0F1A]" : "bg-background"} ${className}`}
    >
      {children}
    </SafeAreaView>
  );
}

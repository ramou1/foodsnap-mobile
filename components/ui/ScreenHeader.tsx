import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSettings } from "@/contexts/SettingsContext";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export function ScreenHeader({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightAction,
}: ScreenHeaderProps) {
  const router = useRouter();
  const { isDark } = useSettings();

  return (
    <View className={`px-4 py-3 flex-row items-center border-b ${isDark ? "bg-[#1A1A2E] border-[#2D2D44]" : "bg-surface border-border"}`}>
      {showBack ? (
        <TouchableOpacity
          onPress={onBack ?? (() => router.back())}
          className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${isDark ? "bg-[#0F0F1A]" : "bg-background"}`}
        >
          <Ionicons name="arrow-back" size={22} color={isDark ? "#fff" : "#1A1A2E"} />
        </TouchableOpacity>
      ) : (
        <View className="w-10 mr-3" />
      )}

      <View className="flex-1">
        <Text className={`text-xl font-rubik-bold ${isDark ? "text-white" : "text-text"}`}>{title}</Text>
        {subtitle && <Text className="text-sm text-text-muted dark:text-gray-400 font-rubik">{subtitle}</Text>}
      </View>

      {rightAction ?? <View className="w-10" />}
    </View>
  );
}

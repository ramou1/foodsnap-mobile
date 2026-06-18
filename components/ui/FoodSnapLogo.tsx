import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "@/hooks/useTranslation";

interface FoodSnapLogoProps {
  size?: "sm" | "lg";
}

export function FoodSnapLogo({ size = "lg" }: FoodSnapLogoProps) {
  const { t } = useTranslation();
  const isLarge = size === "lg";

  return (
    <View className="items-center mb-8">
      <View className={`rounded-3xl bg-brand items-center justify-center mb-4 ${isLarge ? "w-20 h-20" : "w-14 h-14"}`}>
        <Ionicons name="restaurant" size={isLarge ? 36 : 26} color="#fff" />
      </View>
      <Text className={`font-rubik-bold text-brand ${isLarge ? "text-4xl" : "text-2xl"}`}>FoodSnap</Text>
      <Text className="text-text-muted dark:text-gray-400 font-rubik mt-1 text-center">{t("brand.tagline")}</Text>
    </View>
  );
}

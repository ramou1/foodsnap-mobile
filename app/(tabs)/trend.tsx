import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FOOD_TRENDS } from "@/mocks/trends";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { useTranslation } from "@/hooks/useTranslation";

const { width } = Dimensions.get("window");
const GAP = 8;
const COLUMN_WIDTH = (width - 24 - GAP) / 2;

export default function TrendsScreen() {
  const { t } = useTranslation();
  const [trends, setTrends] = useState(FOOD_TRENDS);

  const toggleFavorite = (id: string) => {
    setTrends(trends.map((t) => (t.id === id ? { ...t, isFavorite: !t.isFavorite } : t)));
  };

  const renderTrendCard = (
    item: (typeof FOOD_TRENDS)[0],
    customWidth: number = COLUMN_WIDTH,
    customHeight: number = 220
  ) => (
    <TouchableOpacity
      key={item.id}
      activeOpacity={0.92}
      className="rounded-2xl overflow-hidden bg-surface"
      style={{ height: customHeight, width: customWidth, marginBottom: GAP }}
    >
      <Image source={item.image} style={{ width: customWidth, height: customHeight }} resizeMode="cover" />
      <View className="absolute inset-0 bg-black/35" />

      <View className="absolute top-3 right-3">
        <TouchableOpacity
          onPress={() => toggleFavorite(item.id)}
          className="w-9 h-9 rounded-full bg-black/30 items-center justify-center"
        >
          <FontAwesome name={item.isFavorite ? "heart" : "heart-o"} size={18} color={item.isFavorite ? "#FF4D67" : "#fff"} />
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-0 left-0 right-0 p-3">
        <View className="bg-brand self-start px-3 py-1 rounded-full mb-2">
          <Text className="text-xs font-rubik-semibold text-white">{item.category}</Text>
        </View>
        <Text className="text-white font-rubik-bold text-base" numberOfLines={1}>{item.title}</Text>
        {item.caption && (
          <Text className="text-white/80 text-xs font-rubik mt-0.5" numberOfLines={1}>{item.caption}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const ensuredTrends = [...trends];

  return (
    <ScreenContainer>
      <View className="px-4 pt-2 pb-3 bg-surface dark:bg-[#1A1A2E] border-b border-border dark:border-[#2D2D44]">
        <Text className="text-2xl font-rubik-bold text-text dark:text-white">{t("trends.title")}</Text>
        <Text className="text-text-muted dark:text-gray-400 font-rubik text-sm mt-0.5">{t("trends.subtitle")}</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 12 }} showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between">
          <View>{renderTrendCard(ensuredTrends[0])}</View>
          <View>{renderTrendCard(ensuredTrends[1])}</View>
        </View>
        <View>{renderTrendCard(ensuredTrends[2], width - 24, 190)}</View>
        <View className="flex-row justify-between">
          <View>{renderTrendCard(ensuredTrends[3], (width - 24 - GAP * 2) / 3, 130)}</View>
          <View>{renderTrendCard(ensuredTrends[4], (width - 24 - GAP * 2) / 3, 130)}</View>
          <View>{renderTrendCard(ensuredTrends[5], (width - 24 - GAP * 2) / 3, 130)}</View>
        </View>
        <View className="flex-row justify-between">
          <View>{renderTrendCard(ensuredTrends[6])}</View>
          <View>{renderTrendCard(ensuredTrends[7])}</View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

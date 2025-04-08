import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import { FOOD_TRENDS } from "@/mocks/trends";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 24) / 3; // Ajustei levemente para ter um pouco mais de espaço nos cards

export default function TrendsScreen() {
  const [trends, setTrends] = useState(FOOD_TRENDS);

  const toggleFavorite = (id: string) => {
    setTrends(
      trends.map((trend) =>
        trend.id === id ? { ...trend, isFavorite: !trend.isFavorite } : trend
      )
    );
  };

  const firstColumnItems = trends.slice(0, 2);
  const secondColumnItems = trends.slice(2, 4);
  const thirdColumnItems = trends.slice(4, 5);

  const renderTrendCard = (
    item: {
      id: any;
      title: any;
      category: any;
      description: any;
      image: any;
      isFavorite: any;
    },
    isLarge: boolean = false
  ) => {
    const cardHeight = isLarge ? 285 : 140;
    const cardWidth = isLarge ? COLUMN_WIDTH : COLUMN_WIDTH;

    return (
      <View
        key={item.id}
        className={`mb-1 rounded-md overflow-hidden bg-white`}
        style={{ height: cardHeight, width: cardWidth }}
      >
        <Image
          source={{ uri: item.image }}
          className="absolute w-full h-full"
          style={{ width: cardWidth, height: cardHeight }}
        />
        <View className="absolute inset-0 bg-black/30" />

        <View className="flex-1 p-3 justify-between">
          <View className="flex-row justify-between">
            <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
              <FontAwesome
                name={item.isFavorite ? "heart" : "heart-o"}
                size={20}
                color={item.isFavorite ? "#FF4D67" : "#FFFFFF"}
              />
            </TouchableOpacity>
          </View>

          <View className="bg-blue-300 px-3 py-1 absolute bottom-0 left-0">
            <Text className="text-[10px] font-bold text-white uppercase">
              {item.category}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-100">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="py-4 px-6 bg-white">
        <Text className="text-2xl font-bold text-gray-800">Tendências</Text>
        <Text className="text-gray-500">Descubra o que está em alta</Text>
      </View>

      {/* Three Column Layout */}
      <ScrollView className="flex-1 px-2 py-2">
        {" "}
        {/* Reduzi o padding top de pt-4 para pt-2 */}
        <View className="flex-row justify-between">
          <View className="w-[32%]">
            {" "}
            {/* Aumentei levemente a largura para usar melhor o espaço */}
            {firstColumnItems.map((item) => renderTrendCard(item))}
          </View>

          <View className="w-[32%]">
            {secondColumnItems.map((item) => renderTrendCard(item))}
          </View>

          <View className="w-[32%]">
            {thirdColumnItems.map((item) => renderTrendCard(item, true))}
          </View>
        </View>
        {/* Padding at bottom for better scrolling experience */}
        <View className="h-4" /> {/* Reduzi de h-6 para h-4 */}
      </ScrollView>
    </View>
  );
}

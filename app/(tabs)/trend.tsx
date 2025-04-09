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
const GAP = 12;
const COLUMN_WIDTH = (width - 32 - GAP) / 2;

export default function TrendsScreen() {
  const [trends, setTrends] = useState(FOOD_TRENDS);

  const toggleFavorite = (id: string) => {
    setTrends(
      trends.map((trend) =>
        trend.id === id ? { ...trend, isFavorite: !trend.isFavorite } : trend
      )
    );
  };

  const renderTrendCard = (
    item: {
      id: any;
      title: any;
      category: any;
      description: any;
      image: any;
      isFavorite: any;
    },
    customWidth: number = COLUMN_WIDTH,
    customHeight: number = 140
  ) => {
    return (
      <View
        key={item.id}
        className="mb-2 rounded-md overflow-hidden bg-white"
        style={{ height: customHeight, width: customWidth }}
      >
        <Image
          source={{ uri: item.image }}
          className="absolute w-full h-full"
          style={{ width: customWidth, height: customHeight }}
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

  // Garantindo que temos pelo menos 10 items para o layout
  const ensuredTrends = [...trends];
  while (ensuredTrends.length < 10) {
    ensuredTrends.push(...trends.slice(0, Math.min(10 - ensuredTrends.length, trends.length)));
  }

  return (
    <View className="flex-1 bg-gray-100">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="py-4 px-4 bg-white">
        <Text className="text-2xl font-bold text-gray-800">Tendências</Text>
        <Text className="text-gray-500">Descubra o que está em alta</Text>
      </View>

      {/* Layout personalizado */}
      <ScrollView className="flex-1 px-4 py-3">
        {/* Primeira linha: 2 colunas com 1 card em cada */}
        <View className="flex-row justify-between">
          <View>{renderTrendCard(ensuredTrends[0])}</View>
          <View>{renderTrendCard(ensuredTrends[1])}</View>
        </View>

        {/* Segunda linha: 1 coluna com 1 card ocupando inteiro */}
        <View>
          {renderTrendCard(ensuredTrends[2], width - 28, 200)}
        </View>

        {/* Terceira linha: 2 colunas com 1 card em cada */}
        <View className="flex-row justify-between">
          <View>{renderTrendCard(ensuredTrends[3])}</View>
          <View>{renderTrendCard(ensuredTrends[4])}</View>
        </View>

        {/* Quarta linha: 3 colunas com 1 card em cada */}
        <View className="flex-row justify-between">
          <View>
            {renderTrendCard(ensuredTrends[5], (width - 25 - GAP * 2) / 3)}
          </View>
          <View>
            {renderTrendCard(ensuredTrends[6], (width - 25 - GAP * 2) / 3)}
          </View>
          <View>
            {renderTrendCard(ensuredTrends[7], (width - 25 - GAP * 2) / 3)}
          </View>
        </View>

        {/* Quinta linha: 2 colunas com 1 card em cada */}
        <View className="flex-row justify-between">
          <View>{renderTrendCard(ensuredTrends[8])}</View>
          <View>{renderTrendCard(ensuredTrends[9])}</View>
        </View>
      </ScrollView>
    </View>
  );
}
import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { CHAT_CONVERSATIONS, ChatConversation } from "@/mocks/chat";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { useTranslation } from "@/hooks/useTranslation";

export default function ChatTab() {
  const { t } = useTranslation();
  const [conversations] = useState<ChatConversation[]>(CHAT_CONVERSATIONS);

  const renderConversationItem = ({ item }: { item: ChatConversation }) => (
    <TouchableOpacity
      className="flex-row items-center px-4 py-3.5 mx-3 mb-2 bg-surface dark:bg-[#1A1A2E] rounded-2xl border border-border dark:border-[#2D2D44]"
      onPress={() => router.push({ pathname: "/chat/[id]", params: { id: item.id } })}
      activeOpacity={0.8}
    >
      <View className="relative">
        <Image source={item.avatar} className="rounded-full" style={{ width: 54, height: 54 }} />
        {item.unreadCount && item.unreadCount > 0 && (
          <View className="absolute -top-1 -right-1 bg-brand rounded-full min-w-[20px] h-5 px-1.5 items-center justify-center">
            <Text className="text-white text-xs font-rubik-bold">
              {item.unreadCount > 9 ? "9+" : item.unreadCount}
            </Text>
          </View>
        )}
      </View>

      <View className="flex-1 ml-3">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="font-rubik-semibold text-base text-text dark:text-white">{item.name}</Text>
          <Text className="text-xs text-text-muted font-rubik">{item.lastMessageTime}</Text>
        </View>
        <Text className="text-sm text-text-muted font-rubik" numberOfLines={1} ellipsizeMode="tail">
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <View className="px-4 pt-2 pb-3 bg-surface dark:bg-[#1A1A2E] border-b border-border dark:border-[#2D2D44] flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-rubik-bold text-text dark:text-white">{t("chat.title")}</Text>
          <Text className="text-text-muted dark:text-gray-400 font-rubik text-sm">{t("chat.subtitle")}</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 rounded-full bg-background items-center justify-center">
          <Ionicons name="create-outline" size={22} color="#6e11b0" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={conversations}
        renderItem={renderConversationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 16 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <View className="w-20 h-20 rounded-full bg-background items-center justify-center mb-4">
              <Ionicons name="chatbubbles-outline" size={40} color="#9C96AD" />
            </View>
            <Text className="text-text-muted font-rubik text-base">{t("chat.empty")}</Text>
          </View>
        }
      />
    </ScreenContainer>
  );
}

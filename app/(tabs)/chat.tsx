import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { CHAT_CONVERSATIONS, ChatConversation } from "@/mocks/chat";

export default function ChatTab() {
  const [conversations] = useState<ChatConversation[]>(CHAT_CONVERSATIONS);

  const renderConversationItem = ({ item }: { item: ChatConversation }) => {
    return (
      <TouchableOpacity
        className="flex-row items-center px-4 py-3 border-b border-gray-200 bg-white"
        onPress={() => {
          router.push({
            pathname: "/chat/[id]",
            params: { id: item.id },
          });
        }}
        activeOpacity={0.7}
      >
        <View className="relative">
          <Image
            source={item.avatar}
            className="rounded-full"
            style={{ width: 56, height: 56 }}
          />
          {item.unreadCount && item.unreadCount > 0 && (
            <View className="absolute -top-1 -right-1 bg-violet-500 rounded-full px-2 py-0.5 min-w-[20px] items-center justify-center">
              <Text className="text-white text-xs font-bold">
                {item.unreadCount > 9 ? "9+" : item.unreadCount}
              </Text>
            </View>
          )}
        </View>

        <View className="flex-1 ml-3">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="font-semibold text-base">{item.name}</Text>
            <Text className="text-xs text-gray-500">{item.lastMessageTime}</Text>
          </View>
          <Text
            className="text-sm text-gray-600"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.lastMessage}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-gray-100">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold">Mensagens</Text>
          <TouchableOpacity>
            <Ionicons name="create-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Conversations List */}
      <FlatList
        data={conversations}
        renderItem={renderConversationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="chatbubbles-outline" size={64} color="#9ca3af" />
            <Text className="text-gray-500 text-base mt-4">
              Nenhuma conversa ainda
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
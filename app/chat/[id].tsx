import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { CHAT_CONVERSATIONS, ChatMessage } from "@/mocks/chat";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/hooks/useTranslation";

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const conversation = CHAT_CONVERSATIONS.find((c) => c.id === id);

  useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: false }), 100);
    }
  }, [conversation]);

  const handleSendMessage = () => {
    if (inputText.trim().length === 0 || !conversation) return;
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      text: inputText.trim(),
      timestamp: new Date().toISOString(),
      isMe: true,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isMyMessage = item.isMe;
    return (
      <View className={`flex-row mb-3 px-4 ${isMyMessage ? "justify-end" : "justify-start"}`}>
        <View
          className={`max-w-[78%] rounded-2xl px-4 py-3 ${
            isMyMessage ? "bg-brand rounded-br-sm" : "bg-surface border border-border rounded-bl-sm"
          }`}
        >
          <Text className={`text-base font-rubik ${isMyMessage ? "text-white" : "text-text"}`}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  if (!conversation) {
    return (
      <ScreenContainer>
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-lg font-rubik text-text-muted mb-4">{t("chat.notFound")}</Text>
          <Button label={t("chat.back")} variant="outline" onPress={() => router.back()} className="w-40" />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer edges={["top", "bottom"]}>
      <ScreenHeader
        title={conversation.name}
        subtitle={conversation.username}
        showBack
        rightAction={
          <TouchableOpacity className="w-10 h-10 rounded-full bg-background items-center justify-center">
            <Ionicons name="call-outline" size={22} color="#6e11b0" />
          </TouchableOpacity>
        }
      />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
        />

        <View className="bg-surface border-t border-border px-4 py-3">
          <View className="flex-row items-end gap-2">
            <TouchableOpacity className="w-10 h-10 rounded-full bg-background items-center justify-center">
              <Ionicons name="add" size={24} color="#6e11b0" />
            </TouchableOpacity>
            <View className="flex-1 bg-background border border-border rounded-2xl px-4 py-2.5 flex-row items-center min-h-[44px]">
              <TextInput
                className="flex-1 text-base font-rubik text-text max-h-24"
                placeholder={t("chat.messagePlaceholder")}
                placeholderTextColor="#9C96AD"
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
              />
            </View>
            <TouchableOpacity
              onPress={handleSendMessage}
              disabled={!inputText.trim()}
              className={`w-11 h-11 rounded-full items-center justify-center ${inputText.trim() ? "bg-brand" : "bg-border"}`}
            >
              <Ionicons name="send" size={20} color={inputText.trim() ? "#fff" : "#9C96AD"} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

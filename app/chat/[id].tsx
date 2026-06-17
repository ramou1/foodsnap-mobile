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
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { CHAT_CONVERSATIONS, ChatMessage } from "@/mocks/chat";

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [conversation, setConversation] = useState(
    CHAT_CONVERSATIONS.find((c) => c.id === id)
  );

  useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages);
      // Scroll to bottom when messages load
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: false });
      }, 100);
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

    // Scroll to bottom after sending
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isMyMessage = item.isMe;

    return (
      <View
        className={`flex-row mb-3 px-4 ${isMyMessage ? "justify-end" : "justify-start"}`}
      >
        <View
          className={`max-w-[75%] rounded-2xl px-4 py-2 ${
            isMyMessage
              ? "bg-violet-500 rounded-tr-sm"
              : "bg-gray-200 rounded-tl-sm"
          }`}
        >
          <Text
            className={`text-base ${
              isMyMessage ? "text-white" : "text-gray-900"
            }`}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  if (!conversation) {
    return (
      <SafeAreaView edges={["top"]} className="flex-1 bg-gray-100">
        <StatusBar style="dark" />
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg mb-4">Conversa não encontrada</Text>
          <TouchableOpacity
            className="mt-4 bg-black px-6 py-2 rounded-md"
            onPress={() => router.back()}
          >
            <Text className="text-white">Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-gray-100">
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Header */}
        <View className="bg-white px-4 py-3 flex-row items-center border-b border-gray-200">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Image
            source={conversation.avatar}
            className="rounded-full mr-3"
            style={{ width: 36, height: 36 }}
          />
          <View className="flex-1">
            <Text className="text-base font-semibold">{conversation.name}</Text>
            <Text className="text-xs text-gray-500">{conversation.username}</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="call-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: false })
          }
        />

        {/* Input Area */}
        <View className="bg-white border-t border-gray-200 px-4 py-3">
          <View className="flex-row items-center">
            <TouchableOpacity className="mr-3">
              <Ionicons name="add-circle-outline" size={28} color="#6B7280" />
            </TouchableOpacity>
            <View className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex-row items-center">
              <TextInput
                className="flex-1 text-base"
                placeholder="Mensagem..."
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
              />
              {inputText.length > 0 && (
                <TouchableOpacity onPress={handleSendMessage} className="ml-2">
                  <Ionicons name="send" size={24} color="#9333EA" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
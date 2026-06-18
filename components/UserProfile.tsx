import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Post } from "@/types/post";
import { User } from "@/types/user";
import { USER } from "@/mocks/user";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { Button } from "@/components/ui/Button";

const MOCK_USERS: User[] = [
  USER,
  {
    ...USER,
    id: "user2",
    username: "foodie_chef",
    name: "Chef Mike",
    bio: "Chef profissional apaixonado por comida italiana! 🍝",
    posts: 15,
    followers: 450,
    following: 180,
    isFollowing: false,
    isMe: false,
  },
];

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isFollowing, setIsFollowing] = useState(false);
  const user = MOCK_USERS.find((u) => u.id === id);
  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth / 3 - 4;
  const imageHeight = imageWidth * 1.5;

  if (!user) {
    return (
      <ScreenContainer>
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-lg font-rubik text-text-muted mb-4">Usuário não encontrado</Text>
          <Button label="Voltar" variant="outline" onPress={() => router.back()} className="w-40" />
        </View>
      </ScreenContainer>
    );
  }

  const highlights = user.highlights || [];
  const posts = user.postsList || [];

  return (
    <ScreenContainer>
      <ScreenHeader title={user.username || ""} showBack />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-surface px-4 pt-4 pb-2">
          <View className="flex-row items-center">
            <View className="rounded-full border-2 border-brand p-0.5">
              <Image
                source={user.avatar || require("../assets/images/default-avatar.png")}
                style={{ width: 80, height: 80 }}
                className="rounded-full"
              />
            </View>

            <View className="flex-1 ml-4">
              <Text className="text-xl font-rubik-bold text-text">{user.username}</Text>
              <View className="flex-row justify-around mt-3">
                {[
                  { value: user.posts || 0, label: "Posts" },
                  { value: user.followers || 0, label: "Seguidores" },
                  { value: user.following || 0, label: "Seguindo" },
                ].map((stat) => (
                  <View key={stat.label} className="items-center">
                    <Text className="font-rubik-bold text-base text-text">{stat.value}</Text>
                    <Text className="text-xs text-text-muted font-rubik">{stat.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View className="mt-3">
            <Text className="font-rubik-semibold text-text">{user.name}</Text>
            <Text className="text-sm text-text-muted font-rubik mt-1 leading-5">{user.bio}</Text>
          </View>

          <View className="mt-4 mb-2">
            <Button
              label={isFollowing ? "Seguindo" : "Seguir"}
              variant={isFollowing ? "outline" : "primary"}
              onPress={() => setIsFollowing(!isFollowing)}
              className="h-11"
            />
          </View>

          {highlights.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-4 mt-2">
              {highlights.map((highlight) => (
                <TouchableOpacity key={highlight.id} className="items-center mr-4">
                  <View className="border-2 border-brand/30 rounded-full p-0.5">
                    <Image source={highlight.image} style={{ width: 58, height: 58 }} className="rounded-full" />
                  </View>
                  <Text className="text-xs font-rubik text-text-muted mt-1.5">{highlight.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {posts.length > 0 && (
          <>
            <View className="flex-row items-center px-4 py-2 bg-surface border-t border-b border-border">
              <Ionicons name="grid" size={18} color="#6e11b0" />
              <Text className="ml-2 font-rubik-semibold text-text">Publicações</Text>
            </View>
            <View className="flex-row flex-wrap bg-surface">
              {posts.map((post) => (
                <TouchableOpacity
                  key={post.id}
                  className="p-0.5"
                  onPress={() => router.push({ pathname: "/posts/[id]", params: { id: post.id } })}
                >
                  <View className="relative">
                    <Image source={post.image} style={{ width: imageWidth, height: imageHeight }} />
                    {post.reposted && (
                      <View className="absolute top-1.5 right-1.5 bg-black/40 rounded-full p-1">
                        <FontAwesome name="retweet" size={12} color="#F59E0B" />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

import React from "react";
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

// Mock users array for dynamic profiles
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
  const user = MOCK_USERS.find((u) => u.id === id);
  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth / 3 - 4;
  const imageHeight = imageWidth * 1.5;

  // If user not found
  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg mb-4">Usuário não encontrado</Text>
        <TouchableOpacity
          className="mt-4 bg-black px-6 py-2 rounded-md"
          onPress={() => router.back()}
        >
          <Text className="text-white">Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const highlights = user.highlights || [];
  const posts = user.postsList || [];

  const navigateToPostDetail = (post: Post) => {
    router.push({
      pathname: "/posts/[id]",
      params: { id: post.id },
    });
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-white px-4 py-3 flex-row items-center border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">{user.username}</Text>
      </View>

      <ScrollView className="flex-1">
        <View className="bg-white px-4 pt-4">
          <View className="flex-row items-center">
            <Image
              source={user.avatar || require("../assets/images/default-avatar.png")}
              className="rounded-full border-2 border-gray-200"
              style={{
                width: 86,
                height: 86,
              }}
            />

            <View className="flex-1 ml-4">
              <Text className="text-xl font-bold mb-1">
                {user.username}
              </Text>

              <View className="flex-row justify-between mt-2">
                <View className="items-center">
                  <Text className="font-bold text-base">{user.posts || 0}</Text>
                  <Text className="text-sm text-gray-500">posts</Text>
                </View>
                <View className="items-center">
                  <Text className="font-bold text-base">
                    {user.followers || 0}
                  </Text>
                  <Text className="text-sm text-gray-500">followers</Text>
                </View>
                <View className="items-center">
                  <Text className="font-bold text-base">
                    {user.following || 0}
                  </Text>
                  <Text className="text-sm text-gray-500">following</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="mt-3">
            <Text className="font-medium">{user.name}</Text>
            <Text className="text-sm mt-1">{user.bio}</Text>
          </View>

          <View className="flex-row justify-between mt-4">
            <TouchableOpacity className="bg-violet-500 rounded-md py-2 mt-3 mb-4 w-full">
              <Text className="text-center font-medium text-white">
                {user.isFollowing ? "Seguindo" : "Seguir"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Highlights */}
          {highlights.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="pb-4"
            >
              {highlights.map((highlight) => (
                <TouchableOpacity
                  key={highlight.id}
                  className="items-center mr-4"
                >
                  <View className="border-2 border-gray-300 rounded-full p-1">
                    <Image
                      source={highlight.image}
                      style={{ width: 60, height: 60 }}
                      className="rounded-full"
                    />
                  </View>
                  <Text className="text-xs mt-1">{highlight.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {posts.length > 0 && (
          <View className="flex-row flex-wrap bg-white">
            {posts.map((post) => (
              <TouchableOpacity
                key={post.id}
                className="p-0.5"
                onPress={() => navigateToPostDetail(post)}
              >
                <View style={{ position: "relative" }}>
                  <Image
                    source={post.image}
                    style={{ width: imageWidth, height: imageHeight }}
                  />
                  {post.reposted && (
                    <View
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        backgroundColor: "rgba(0,0,0,0.3)",
                        borderRadius: 10,
                        padding: 3,
                      }}
                    >
                      <FontAwesome name="retweet" size={15} color="#FFFFFF" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
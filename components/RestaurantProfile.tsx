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
import { RESTAURANTS } from "@/mocks/restaurants";
import { Post } from "@/types/post";
import { Restaurant } from "@/types/restaurant";

export default function RestaurantProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const restaurant = RESTAURANTS.find((r) => r.id === id);
  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth / 3 - 4;
  const imageHeight = imageWidth * 1.5;

  // If restaurant not found
  if (!restaurant) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Restaurant not found</Text>
        <TouchableOpacity
          className="mt-4 bg-black px-6 py-2 rounded-md"
          onPress={() => router.back()}
        >
          <Text className="text-white">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const highlights = restaurant.highlights || [];
  const posts = restaurant.postsList || [];

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
        <Text className="text-xl font-bold">{restaurant.name}</Text>
      </View>

      <ScrollView className="flex-1">
        <View className="bg-white px-4 pt-4">
          <View className="flex-row items-center">
            <Image
              source={restaurant.avatar}
              className="rounded-full border-2 border-gray-200"
              style={{
                width: 86,
                height: 86,
              }}
            />

            <View className="flex-1 ml-4">
              <Text className="text-xl font-bold mb-1">
                {restaurant.username}
              </Text>

              <View className="flex-row justify-between mt-2">
                <View className="items-center">
                  <Text className="font-bold text-base">
                    {restaurant.posts}
                  </Text>
                  <Text className="text-sm text-gray-500">posts</Text>
                </View>
                <View className="items-center">
                  <Text className="font-bold text-base">
                    {restaurant.followers}
                  </Text>
                  <Text className="text-sm text-gray-500">followers</Text>
                </View>
                <View className="items-center">
                  <Text className="font-bold text-base">
                    {restaurant.following}
                  </Text>
                  <Text className="text-sm text-gray-500">following</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="mt-3">
            <Text className="font-medium">{restaurant.name}</Text>
            <Text className="text-sm mt-1">{restaurant.bio}</Text>
          </View>

          <View className="flex-row justify-between mt-4">
            <TouchableOpacity className="bg-violet-500 rounded-md py-2 mt-3 mb-4 w-full">
              <Text className="text-center font-medium text-white">Follow</Text>
            </TouchableOpacity>
          </View>

          {/* Highlights */}
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
        </View>

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
      </ScrollView>
    </View>
  );
}
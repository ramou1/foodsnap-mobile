import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Post } from "@/types/post";

export default function ProfileScreen() {
  const [avatar] = React.useState(
    require("../../assets/images/default-avatar.png")
  );
  const screenWidth = Dimensions.get("window").width;
  // const imageSize = screenWidth / 3 - 4;
  const imageWidth = screenWidth / 3 - 4;
  const imageHeight = imageWidth * 1.5;

  // Dados do usuário (mockados)
  const userData = {
    username: "foodlover_123",
    name: "Fulano de Tal",
    bio: "Amante da boa comida 🍝🍣🍕\nChef amador | Fotógrafo gastronômico",
    posts: 42,
    followers: 980,
    following: 280,
  };

  // Destaques
  const highlights = [
    {
      id: "1",
      title: "Massas",
      image: require("../../assets/images/default-image.jpg"),
    },
    {
      id: "2",
      title: "Doces",
      image: require("../../assets/images/default-image.jpg"),
    },
    {
      id: "3",
      title: "Asiática",
      image: require("../../assets/images/default-image.jpg"),
    },
    {
      id: "4",
      title: "BBQ",
      image: require("../../assets/images/default-image.jpg"),
    }
  ];

  // Posts mockados
  const posts = Array(9)
    .fill(null)
    .map((_, index) => ({
      id: '1',
      image: require("../../assets/images/food01.jpg"),
      isFavorite: false,
      description: "Delicious food",
      user: {
        username: "foodlover_123",
        avatar: require("../../assets/images/default-avatar.png"),
      },
      timestamp: "2023-10-01T12:00:00Z",
      likes: 100,
      comments: 10,
    }));

  const navigateToPostDetail = (post: Post) => {
    router.push({
      pathname: "/posts/[id]",
      params: { id: post.id },
    });
  };

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="flex-1">
        <View className="bg-white px-4 pt-4">
          <View className="flex-row items-center">
            <Image
              source={avatar}
              className="rounded-full border-2 border-gray-200"
              style={{
                width: 86,
                height: 86,
              }}
            />

            <View className="flex-1 ml-4">
              <Text className="text-xl font-bold mb-1">
                {userData.username}
              </Text>

              <View className="flex-row justify-between mt-2">
                <View className="items-center">
                  <Text className="font-bold text-base">{userData.posts}</Text>
                  <Text className="text-sm text-gray-500">posts</Text>
                </View>
                <View className="items-center">
                  <Text className="font-bold text-base">
                    {userData.followers}
                  </Text>
                  <Text className="text-sm text-gray-500">followers</Text>
                </View>
                <View className="items-center">
                  <Text className="font-bold text-base">
                    {userData.following}
                  </Text>
                  <Text className="text-sm text-gray-500">following</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="mt-3">
            <Text className="font-medium">{userData.name}</Text>
            <Text className="text-sm mt-1">{userData.bio}</Text>
          </View>

          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              className="bg-gray-200 rounded-md py-2 mt-3 mb-4 w-[49%]"
              onPress={() => router.push("/settings")}
            >
              <Text className="text-center font-medium">edit profile</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-violet-200 rounded-md py-2 mt-3 mb-4 w-[49%]">
              <Text className="text-center font-medium">share</Text>
            </TouchableOpacity>
          </View>

          {/* Destaques */}
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

          <View className="h-0.5 bg-gray-200" />

          <View className="flex-row justify-around py-2">
            <TouchableOpacity className="p-2">
              <FontAwesome5 name="th" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2">
              <FontAwesome5 name="play-circle" size={20} color="#999" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2">
              <FontAwesome5 name="bookmark" size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row flex-wrap bg-white">
          {posts.map((post) => (
            <TouchableOpacity
              key={post.id}
              className="p-0.5"
              onPress={() => navigateToPostDetail(post)}
            >
              <Image
                source={post.image}
                style={{ width: imageWidth, height: imageHeight }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

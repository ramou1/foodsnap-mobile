import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Post } from "@/types/post";
import { USER } from "@/mocks/user";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoPlayer from "@/components/VideoPlayer";

export default function ProfileScreen() {
  const [avatar] = React.useState(
    require("../../assets/images/default-avatar.png")
  );
  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth / 3 - 4;
  const imageHeight = imageWidth * 1.5;

  // Dados do usuário (mockados)
  const userData = USER;
  const highlights = userData.highlights || [];
  const posts = userData.postsList || [];

  const navigateToPostDetail = (post: Post) => {
    router.push({
      pathname: "/posts/[id]",
      params: { id: post.id },
    });
  };

  const renderPostItem = (post: Post) => {
    // Determinar se é vídeo baseado no mediaType ou extensão do arquivo
    const isVideo = post.mediaType === 'video' || 
                   (typeof post.image === 'object' && 'uri' in post.image && post.image.uri?.endsWith('.mp4')) ||
                   (typeof post.image === 'number' && post.image.toString().includes('mp4'));

    return (
      <TouchableOpacity
        key={post.id}
        className="p-0.5"
        onPress={() => navigateToPostDetail(post)}
      >
        <View style={{ position: "relative" }}>
          {isVideo ? (
            <VideoPlayer
              source={post.mediaSource as any || post.image as any}
              style={{ 
                width: imageWidth, 
                height: imageHeight 
              }}
              shouldPlay={false} // Vídeo não reproduz automaticamente no perfil
              onPress={() => navigateToPostDetail(post)}
            />
          ) : (
            <Image
              source={post.image}
              style={{ width: imageWidth, height: imageHeight }}
            />
          )}
          
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
    );
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-gray-100">
      <StatusBar style="dark" />
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
            {highlights.map((highlight: any) => (
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
          {posts.map((post: Post) => renderPostItem(post))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
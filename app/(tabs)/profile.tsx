import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Post } from "@/types/post";
import { USER } from "@/mocks/user";
import VideoPlayer from "@/components/VideoPlayer";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/hooks/useTranslation";

export default function ProfileScreen() {
  const { t } = useTranslation();
  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth / 3 - 4;
  const imageHeight = imageWidth * 1.5;
  const userData = USER;
  const highlights = userData.highlights || [];
  const posts = userData.postsList || [];

  const navigateToPostDetail = (post: Post) => {
    router.push({ pathname: "/posts/[id]", params: { id: post.id } });
  };

  const isVideoPost = (post: Post) =>
    post.mediaType === "video" ||
    (typeof post.image === "object" && "uri" in post.image && post.image.uri?.endsWith(".mp4")) ||
    (typeof post.image === "number" && post.image.toString().includes("mp4"));

  const renderPostItem = (post: Post) => (
    <TouchableOpacity key={post.id} className="p-0.5" onPress={() => navigateToPostDetail(post)} activeOpacity={0.9}>
      <View className="relative">
        {isVideoPost(post) ? (
          <VideoPlayer
            source={(post.mediaSource || post.image) as any}
            style={{ width: imageWidth, height: imageHeight }}
            shouldPlay={false}
            onPress={() => navigateToPostDetail(post)}
          />
        ) : (
          <Image source={post.image} style={{ width: imageWidth, height: imageHeight }} className="rounded-sm" />
        )}
        {post.reposted && (
          <View className="absolute top-1.5 right-1.5 bg-black/40 rounded-full p-1">
            <FontAwesome name="retweet" size={12} color="#F59E0B" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-surface px-4 pt-4 pb-2">
          <View className="flex-row items-center">
            <View className="rounded-full border-2 border-brand p-0.5">
              <Image
                source={userData.avatar || require("../../assets/images/default-avatar.png")}
                style={{ width: 80, height: 80 }}
                className="rounded-full"
              />
            </View>

            <View className="flex-1 ml-4">
              <Text className="text-xl font-rubik-bold text-text">{userData.username}</Text>
              <View className="flex-row justify-around mt-3">
                {[
                  { value: userData.posts, label: t("profile.posts") },
                  { value: userData.followers, label: t("profile.followers") },
                  { value: userData.following, label: t("profile.following") },
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
            <Text className="font-rubik-semibold text-text">{userData.name}</Text>
            <Text className="text-sm text-text-muted font-rubik mt-1 leading-5">{userData.bio}</Text>
          </View>

          <View className="flex-row gap-2 mt-4 mb-2">
            <View className="flex-1">
              <Button label={t("profile.editProfile")} variant="outline" onPress={() => router.push("/settings")} className="h-11" />
            </View>
            <TouchableOpacity className="flex-1 h-11 bg-brand/10 rounded-2xl items-center justify-center">
              <Text className="font-rubik-semibold text-brand">{t("profile.share")}</Text>
            </TouchableOpacity>
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

        <View className="flex-row items-center px-4 py-2 bg-surface border-t border-b border-border">
          <Ionicons name="grid" size={18} color="#6e11b0" />
          <Text className="ml-2 font-rubik-semibold text-text dark:text-white">{t("profile.publications")}</Text>
        </View>

        <View className="flex-row flex-wrap bg-surface">{posts.map(renderPostItem)}</View>
      </ScrollView>
    </ScreenContainer>
  );
}

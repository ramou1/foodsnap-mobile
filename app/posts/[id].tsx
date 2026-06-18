import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { POSTS } from "../../mocks/posts";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Post } from "@/types/post";
import VideoPlayer from "@/components/VideoPlayer";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/hooks/useTranslation";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useTranslation();
  const [post, setPost] = useState<Post | null>(null);
  const [isRepost, setIsRepost] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    const foundPost = POSTS.find((item) => item.id === id);
    if (foundPost) {
      setPost(foundPost);
      setIsRepost(foundPost.reposted || false);
      setLikes(foundPost.likes || 0);
    }
  }, [id]);

  const formatTimestamp = (timestamp?: string | Date) => {
    if (!timestamp) return t("post.recently");
    try {
      const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
      return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
    } catch {
      return "Recentemente";
    }
  };

  const isVideo =
    post?.mediaType === "video" ||
    (post && typeof post.image === "object" && "uri" in post.image && post.image.uri?.endsWith(".mp4")) ||
    (post && typeof post.image === "number" && post.image.toString().includes("mp4"));

  if (!post) {
    return (
      <View className="flex-1 justify-center items-center bg-surface">
        <Text className="text-lg text-text-muted font-rubik">{t("post.notFound")}</Text>
        <Button label={t("post.back")} variant="outline" onPress={() => router.back()} className="mt-4 w-40" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface">
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="relative">
          <View className="absolute top-12 left-0 right-0 z-10 flex-row justify-between items-center px-4">
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-black/40 rounded-full w-10 h-10 justify-center items-center"
            >
              <Ionicons name="arrow-back" size={22} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsRepost(!isRepost)}
              className="bg-black/40 rounded-full w-10 h-10 justify-center items-center"
            >
              <FontAwesome name="retweet" size={20} color={isRepost ? "#F59E0B" : "#FFF"} />
            </TouchableOpacity>
          </View>

          {isVideo ? (
            <VideoPlayer
              source={(post.mediaSource || post.image) as any}
              style={{ width: screenWidth, height: screenWidth * 1.4 }}
              shouldPlay
              showControls
            />
          ) : (
            <Image
              source={post.image}
              resizeMode="cover"
              style={{ width: screenWidth, height: screenWidth * 1.4 }}
            />
          )}
        </View>

        <View className="p-5">
          <View className="flex-row items-center mb-4">
            <Image
              source={post.user?.avatar || require("@/assets/images/default-avatar.png")}
              style={{ width: 44, height: 44 }}
              className="rounded-full mr-3"
            />
            <View className="flex-1">
              <Text className="font-rubik-semibold text-text">@{post.user?.username || "usuário"}</Text>
              <Text className="text-xs text-text-muted font-rubik">{formatTimestamp(post.timestamp)}</Text>
            </View>
          </View>

          <Text className="text-text text-base font-rubik leading-6 mb-5">
            {post.caption || t("post.defaultCaption")}
          </Text>

          <View className="flex-row justify-around py-4 border-t border-b border-border">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => { setIsLiked(!isLiked); setLikes(isLiked ? likes - 1 : likes + 1); }}
            >
              <Ionicons name={isLiked ? "heart" : "heart-outline"} size={24} color={isLiked ? "#FF4D67" : "#6B7280"} />
              <Text className="text-text-muted font-rubik ml-2">{likes}</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center" onPress={() => setShowComments(!showComments)}>
              <Ionicons name="chatbubble-outline" size={22} color="#6B7280" />
              <Text className="text-text-muted font-rubik ml-2">{post.comments || 0}</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center">
              <Ionicons name="share-social-outline" size={22} color="#6B7280" />
              <Text className="text-text-muted font-rubik ml-2">{t("post.share")}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {showComments && (
          <View className="px-5 pb-8">
            <Text className="text-lg font-rubik-bold text-text dark:text-white mb-4">{t("post.commentsTitle")}</Text>

            {[
              { user: "@outro_usuario", text: "Que delícia! Fiquei com vontade de experimentar.", time: "2h atrás" },
              { user: "@foodlover", text: "Onde você comprou os ingredientes? Ficou incrível!", time: "5h atrás" },
            ].map((comment) => (
              <View key={comment.user} className="flex-row mb-4">
                <Image source={require("@/assets/images/default-avatar.png")} style={{ width: 36, height: 36 }} className="rounded-full mr-3" />
                <View className="bg-background p-3 rounded-2xl flex-1">
                  <Text className="font-rubik-semibold text-text">{comment.user}</Text>
                  <Text className="text-text font-rubik mt-1">{comment.text}</Text>
                  <Text className="text-xs text-text-muted font-rubik mt-1">{comment.time}</Text>
                </View>
              </View>
            ))}

            <View className="flex-row items-center bg-background border border-border rounded-full px-4 py-1 mt-2">
              <TextInput placeholder={t("post.addComment")} className="flex-1 text-text dark:text-white font-rubik py-2" placeholderTextColor="#9C96AD" />
              <TouchableOpacity className="bg-brand rounded-full w-9 h-9 justify-center items-center">
                <Ionicons name="send" size={16} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

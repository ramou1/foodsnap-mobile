import {
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  Text,
} from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { POSTS } from "@/mocks/posts";
import { useRouter } from "expo-router";
import { Post } from "@/types/post";
import SearchModal from "@/components/SearchModal";
import VideoPlayer from "@/components/VideoPlayer";
import React from "react";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SegmentedTabs } from "@/components/ui/SegmentedTabs";
import { useTranslation } from "@/hooks/useTranslation";
import { useSettings } from "@/contexts/SettingsContext";

const { width } = Dimensions.get("window");

export default function FeedScreen() {
  const [feed, setFeed] = useState<Post[]>([]);
  const [numColumns, setNumColumns] = useState(3);
  const [activeTab, setActiveTab] = useState("for-you");
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const { isDark } = useSettings();

  useEffect(() => {
    setFeed(
      POSTS.map((post) => ({
        ...post,
        height: Math.floor(Math.random() * (280 - 150) + 150),
      }))
    );
  }, []);

  const navigateToPostDetail = (post: Post) => {
    router.push({ pathname: "/posts/[id]", params: { id: post.id } });
  };

  const changeColumnView = () => {
    setNumColumns((prev) => (prev === 1 ? 2 : prev === 2 ? 3 : 1));
  };

  const distributePostsByColumns = (posts: Post[]) => {
    const filtered = activeTab === "following" ? posts.filter((item) => item.reposted) : posts;
    const columns: Post[][] = Array.from({ length: numColumns }, () => []);
    filtered.forEach((post, index) => columns[index % numColumns].push(post));
    return columns;
  };

  const isVideoPost = (item: Post) =>
    item.mediaType === "video" ||
    (typeof item.image === "object" && "uri" in item.image && item.image.uri?.endsWith(".mp4")) ||
    (typeof item.image === "number" && item.image.toString().includes("mp4"));

  const renderPostItem = (item: Post) => {
    const columnWidth = width / numColumns - (numColumns === 3 ? 6 : 10);
    const margin = numColumns === 3 ? 2 : 4;
    const imageHeight = numColumns === 1 ? (item.height ? item.height * 1.5 : 350) : item.height || 200;

    return (
      <TouchableOpacity
        key={item.id}
        style={{ width: columnWidth, marginBottom: margin * 2 }}
        activeOpacity={0.92}
        onPress={() => navigateToPostDetail(item)}
      >
        <View className="bg-surface rounded-2xl overflow-hidden shadow-sm">
          {isVideoPost(item) ? (
            <VideoPlayer
              source={(item.mediaSource || item.image) as any}
              style={{ width: "100%" }}
              onPress={() => navigateToPostDetail(item)}
            />
          ) : (
            <Image source={item.image} style={{ width: "100%", height: imageHeight }} resizeMode="cover" />
          )}
          {item.reposted && (
            <View className="absolute top-2 right-2 bg-black/40 rounded-full p-1.5">
              <FontAwesome name="retweet" size={12} color="#F59E0B" />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const columns = distributePostsByColumns(feed);

  return (
    <ScreenContainer className="bg-surface dark:bg-[#1A1A2E]">
      <View className="px-4 pt-2 pb-3">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-2xl font-rubik-bold text-brand">{t("feed.title")}</Text>
          <TouchableOpacity
            onPress={() => setSearchModalVisible(true)}
            className={`w-10 h-10 rounded-full items-center justify-center ${isDark ? "bg-[#0F0F1A]" : "bg-background"}`}
          >
            <Ionicons name="search" size={22} color="#1A1A2E" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            onPress={changeColumnView}
            className="w-10 h-10 rounded-full bg-background items-center justify-center border border-border"
          >
            {numColumns === 1 ? (
              <FontAwesome name="list" size={18} color="#6B7280" />
            ) : numColumns === 2 ? (
              <MaterialIcons name="grid-view" size={18} color="#6B7280" />
            ) : (
              <MaterialIcons name="grid-on" size={18} color="#6B7280" />
            )}
          </TouchableOpacity>

          <View className="flex-1">
            <SegmentedTabs
              tabs={[
                { key: "for-you", label: t("feed.forYou"), icon: <Ionicons name="restaurant" size={14} color={activeTab === "for-you" ? "#fff" : "#9C96AD"} /> },
                { key: "following", label: t("feed.following"), icon: <MaterialIcons name="favorite" size={14} color={activeTab === "following" ? "#fff" : "#9C96AD"} /> },
              ]}
              activeKey={activeTab}
              onChange={setActiveTab}
            />
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: numColumns === 3 ? 2 : 4, paddingBottom: 16 }}
      >
        <View className="flex-row" style={{ marginHorizontal: -2 }}>
          {columns.map((column, columnIndex) => (
            <View key={`column-${columnIndex}`} style={{ flex: 1, padding: numColumns === 3 ? 2 : 4 }}>
              {column.map((item) => renderPostItem(item))}
            </View>
          ))}
        </View>
      </ScrollView>

      <SearchModal visible={searchModalVisible} onClose={() => setSearchModalVisible(false)} />
    </ScreenContainer>
  );
}

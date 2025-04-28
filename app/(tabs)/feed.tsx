import {
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  Modal,
  ScrollView,
} from "react-native";
import { Text } from "@/components/Themed";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { POSTS } from "@/mocks/posts";
import { useRouter } from "expo-router";
import { Post } from "@/types/post";
import SearchModal from "@/components/SearchModal";
import React from "react";

const { width } = Dimensions.get("window");

export default function FeedScreen() {
  const [feed, setFeed] = useState<Post[]>([]);
  const [numColumns, setNumColumns] = useState(3);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("for-you");
  const [searchModalVisible, setSearchModalVisible] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    const preparedData = POSTS.map((post) => ({
      ...post,
      height: Math.floor(Math.random() * (280 - 150) + 150),
    }));

    setFeed(preparedData);
  }, []);

  const toggleRepost = (id: string, event: any) => {
    event.stopPropagation();
    setFeed(
      feed.map((item) =>
        item.id === id ? { ...item, reposted: !item.reposted } : item
      )
    );
  };

  const navigateToPostDetail = (post: Post) => {
    router.push({
      pathname: "/posts/[id]",
      params: { id: post.id },
    });
  };

  const changeColumnView = (columns: number) => {
    setNumColumns(columns);
  };

  const distributePostsByColumns = (posts: Post[]) => {
    const filteredPosts =
      activeTab === "following" ? posts.filter((item) => item.reposted) : posts;

    const columns: Post[][] = Array.from({ length: numColumns }, () => []);

    filteredPosts.forEach((post, index) => {
      const columnIndex = index % numColumns;
      columns[columnIndex].push(post);
    });

    return columns;
  };

  const renderPostItem = (item: Post) => {
    const columnWidth = width / numColumns - (numColumns === 3 ? 6 : 10);
    const margin = numColumns === 3 ? 2 : 4;

    const imageHeight =
      numColumns === 1
        ? item.height
          ? item.height * 1.5
          : 350
        : item.height || 200;

    return (
      <TouchableOpacity
        key={item.id}
        style={{
          width: columnWidth,
          marginBottom: margin * 2,
        }}
        activeOpacity={0.9}
        onPress={() => navigateToPostDetail(item)}
      >
        <View className="bg-white rounded-lg overflow-hidden">
          <Image
            source={item.image}
            style={{
              width: "100%",
              height: imageHeight,
            }}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    );
  };

  const NewPostModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
        activeOpacity={1}
        onPress={() => setModalVisible(false)}
      >
        <View
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            paddingBottom: 40,
          }}
        >
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <View
              style={{
                width: 40,
                height: 5,
                backgroundColor: "#ddd",
                borderRadius: 5,
                marginBottom: 15,
              }}
            />
            <Text className="text-lg font-bold">Nova Publicação</Text>
          </View>

          <TouchableOpacity
            className="bg-gray-100 p-4 rounded-lg flex-row items-center mb-3"
            onPress={() => {
              setModalVisible(false);
              // TODO: ir para a tela de criar nova publicação
            }}
          >
            <FontAwesome name="camera" size={24} color="#333" />
            <Text className="ml-3 text-base">Tirar uma foto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gray-100 p-4 rounded-lg flex-row items-center"
            onPress={() => {
              setModalVisible(false);
              // TODO: abrir a galeria
            }}
          >
            <FontAwesome name="image" size={24} color="#333" />
            <Text className="ml-3 text-base">Escolher da galeria</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const ColumnSelector = () => {
    return (
      <View className="rounded-full overflow-hidden border border-gray-300 w-[35px] h-[35px] items-center justify-center">
        <TouchableOpacity
          className="p-2"
          onPress={() => {
            if (numColumns === 1) changeColumnView(2);
            else if (numColumns === 2) changeColumnView(3);
            else changeColumnView(1);
          }}
        >
          {numColumns === 1 ? (
            <FontAwesome name="list" size={20} color="#333" />
          ) : numColumns === 2 ? (
            <MaterialIcons name="grid-view" size={20} color="#333" />
          ) : (
            <MaterialIcons name="grid-on" size={20} color="#333" />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const columns = distributePostsByColumns(feed);

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 pt-3 pb-2">
        <View className="flex-row items-center justify-between mb-2">
          <ColumnSelector />

          <View className="flex-row flex-1 justify-center space-x-2">
            <TouchableOpacity
              className={`px-4 py-2 rounded-full ${
                activeTab === "for-you" ? "bg-black" : "bg-gray-200"
              }`}
              onPress={() => setActiveTab("for-you")}
            >
              <View className="flex-row items-center">
                <Ionicons
                  name="restaurant"
                  size={16}
                  color={activeTab === "for-you" ? "white" : "#333"}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={{ color: activeTab === "for-you" ? "white" : "#333" }}
                >
                  for you
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className={`px-4 py-2 ml-2 rounded-full ${
                activeTab === "following" ? "bg-black" : "bg-gray-200"
              }`}
              onPress={() => setActiveTab("following")}
            >
              <View className="flex-row items-center">
                <MaterialIcons
                  name="favorite"
                  size={16}
                  color={activeTab === "following" ? "white" : "#333"}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={{
                    color: activeTab === "following" ? "white" : "#333",
                  }}
                >
                  following
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity
            className="ml-2 rounded-full p-2 border border-gray-300 w-[35px] h-[35px] items-center justify-center"
            onPress={() => setModalVisible(true)}
          >
            <FontAwesome name="plus" size={18} color="#333" />
          </TouchableOpacity> */}

          <TouchableOpacity onPress={() => setSearchModalVisible(true)}>
            <Ionicons name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Masonry layout como ScrollView */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: numColumns === 3 ? 2 : 4 }}
      >
        <View className="flex-row" style={{ marginLeft: -2, marginRight: -2 }}>
          {columns.map((column, columnIndex) => (
            <View
              key={`column-${columnIndex}`}
              style={{
                flex: 1,
                padding: numColumns === 3 ? 2 : 4,
              }}
            >
              {column.map((item) => renderPostItem(item))}
            </View>
          ))}
        </View>
      </ScrollView>

      <NewPostModal />

      <SearchModal
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
      />
    </View>
  );
}

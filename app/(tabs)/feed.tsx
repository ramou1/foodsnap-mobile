import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { Text } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { POSTS } from "@/mocks/posts";
import { useRouter } from "expo-router";
import { Post } from "@/types/post";

// Pegar largura da tela para calcular dimensões
const { width } = Dimensions.get("window");
const numColumns = 2;
const columnWidth = width / numColumns - 16; // Considerando margens

export default function FeedScreen() {
  // Definindo o tipo correto para o estado
  const [feed, setFeed] = useState<Post[]>([]);
  const router = useRouter();

  // Preparar os dados com alturas variadas para efeito Pinterest
  useEffect(() => {
    const preparedData = POSTS.map((post) => ({
      ...post,
      // Altura aleatória entre 150 e 280px para criar o efeito Pinterest
      height: Math.floor(Math.random() * (280 - 150) + 150),
    }));

    setFeed(preparedData);
  }, []);

  const toggleFavorite = (id: string, event: any) => {
    // Previne que o toque na estrela também navegue para a página de detalhes
    event.stopPropagation();
    setFeed(
      feed.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const navigateToPostDetail = (post: Post) => {
    router.push({
      pathname: "/posts/[id]",
      params: { id: post.id },
    });
  };

  const renderItem = ({ item, index }: { item: Post; index: number }) => {
    // Ajustar margens para criar layout equilibrado
    const isEven = index % 2 === 0;

    return (
      <TouchableOpacity
        style={{
          width: columnWidth,
          marginLeft: isEven ? 8 : 4,
          marginRight: isEven ? 4 : 8,
          marginBottom: 12,
        }}
        activeOpacity={0.9}
        onPress={() => navigateToPostDetail(item)}
      >
        <View className="bg-white rounded-2xl overflow-hidden">
          <Image
            source={item.image}
            style={{
              width: "100%",
              height: item.height || 200,
            }}
            resizeMode="cover"
          />

          <View className="p-2">
            <View className="flex-row justify-between items-center mb-1">
              <View className="flex-row items-center">

                <Image
                  source={item.user?.avatar || require('@/assets/images/default-avatar.png')}
                  className="rounded-full mr-2"
                  resizeMode="cover"
                  style={{
                    width: 32,
                    height: 32,
                    // borderWidth: 1,
                    // borderColor: "#E0E0E0",
                  }}
                />
                <Text className="text-xs text-gray-600">
                  {item.user?.username || "Usuário"}
                </Text>
              </View>

              <TouchableOpacity
                onPress={(e) => toggleFavorite(item.id, e)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <FontAwesome
                  name={item.isFavorite ? "star" : "star-o"}
                  size={18}
                  color={item.isFavorite ? "#FFC107" : "#BDBDBD"}
                />
              </TouchableOpacity>
            </View>

            {/* <Text 
              className="text-sm font-medium" 
              numberOfLines={2}
            >
              {item.title}
            </Text> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-gray-100 pt-4">
      <FlatList
        data={feed}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={numColumns}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 20 }}
      />
    </View>
  );
}

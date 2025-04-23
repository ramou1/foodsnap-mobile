import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { POSTS } from "../../mocks/posts";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Post } from "@/types/post";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  
  // Obter a largura da tela para dimensionar a imagem corretamente
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    // Encontrar o post com base no ID da rota
    const foundPost = POSTS.find((item) => item.id === id);
    if (foundPost) {
      setPost(foundPost);
      setIsFavorite(foundPost.isFavorite);
      setLikes(foundPost.likes || 0);
    }
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Aqui poderia ter uma lógica para atualizar o estado global ou fazer uma chamada API
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    // Aqui poderia ter uma lógica para atualizar o estado global ou fazer uma chamada API
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const formatTimestamp = (timestamp?: string | Date) => {
    if (!timestamp) return "Recentemente";

    try {
      const date =
        typeof timestamp === "string" ? new Date(timestamp) : timestamp;
      return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
    } catch (error) {
      return "Recentemente";
    }
  };

  if (!post) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg text-gray-600">Post não encontrado</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScrollView className="flex-1">
        {/* Cabeçalho absoluto sobre a imagem */}
        <View className="absolute top-0 left-0 right-0 z-10 flex-row justify-between items-center px-4 pt-12 pb-2">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="bg-black/30 rounded-full p-2 w-[40px] h-[40px] justify-center items-center"
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={toggleFavorite} 
            className="bg-black/30 rounded-full p-2 w-[40px] h-[40px] justify-center items-center"
          >
            <FontAwesome
              name={isFavorite ? "star" : "star-o"}
              size={22}
              color={isFavorite ? "#FFC107" : "#FFF"}
            />
          </TouchableOpacity>
        </View>
        
        <View className="overflow-hidden">
          <Image 
            source={post.image} 
            className="w-full rounded-2xl" 
            resizeMode="cover" 
            style={{
              width: screenWidth,
              height: screenWidth * 1.6,
              //borderBottomLeftRadius: 20,
              //borderBottomRightRadius: 20,
            }} 
          />
        </View>

        <View className="p-4">
          <View className="flex-row items-center mt-2 mb-3">
            <Image
              source={
                post.user?.avatar ||
                require("@/assets/images/default-avatar.png")
              }
              className="rounded-full mr-3"
              style={{
                width: 36,
                height: 36,
              }}
            />
            <View>
              <Text className="font-medium text-gray-900">
                @{post.user?.username || "usuário"}
              </Text>
              <Text className="text-xs text-gray-500">
                {formatTimestamp(post.timestamp)}
              </Text>
            </View>
          </View>

          {/* Descrição do post */}
          <Text className="text-gray-700 text-base mb-6">
            {post.description || "Uma deliciosa refeição!"}
          </Text>

          {/* Barra de ações */}
          <View className="flex-row justify-between items-center py-3 border-t border-gray-200">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={toggleLike}
            >
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={22}
                color={isLiked ? "#FF6B6B" : "#666"}
              />
              <Text className="text-gray-600 ml-2">{likes} curtidas</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="flex-row items-center"
              onPress={toggleComments}
            >
              <Ionicons name="chatbubble-outline" size={20} color="#666" />
              <Text className="text-gray-600 ml-2">
                {post.comments || 0} comentários
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center">
              <Ionicons name="share-social-outline" size={20} color="#666" />
              <Text className="text-gray-600 ml-2">compartilhar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Seção de comentários - visível apenas quando clicada */}
        {showComments && (
          <View className="p-4 pt-0">
            <Text className="text-lg font-medium mb-3">Comentários</Text>

            {post.comments && post.comments > 0 ? (
              <View>
                <View className="flex-row mb-4">
                  <Image
                    source={require("@/assets/images/default-avatar.png")}
                    className="h-8 w-8 rounded-full mr-2"
                    style={{
                      width: 36,
                      height: 36,
                    }}
                  />
                  <View className="bg-gray-100 p-2 rounded-lg flex-1">
                    <Text className="font-medium">@outro_usuário</Text>
                    <Text>Que delícia! Fiquei com vontade de experimentar.</Text>
                    <Text className="text-xs text-gray-500 mt-1">2h atrás</Text>
                  </View>
                </View>

                <View className="flex-row">
                  <Image
                    source={require("@/assets/images/default-avatar.png")}
                    className="h-8 w-8 rounded-full mr-2"
                    style={{
                      width: 36,
                      height: 36,
                    }}
                  />
                  <View className="bg-gray-100 p-2 rounded-lg flex-1">
                    <Text className="font-medium">@foodlover</Text>
                    <Text>
                      Onde você comprou os ingredientes? Ficou com uma aparência
                      incrível!
                    </Text>
                    <Text className="text-xs text-gray-500 mt-1">5h atrás</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View className="bg-gray-100 p-4 rounded-lg items-center">
                <Text className="text-gray-500">
                  Ainda não há comentários neste post
                </Text>
                <Text className="text-gray-500 text-xs mt-1">
                  Seja o primeiro a comentar!
                </Text>
              </View>
            )}

            {/* Input para comentário */}
            <View className="flex-row mt-4 border border-gray-300 rounded-full p-1 pl-3">
              <TextInput
                placeholder="Adicione um comentário..."
                className="flex-1 text-gray-800"
              />
              <TouchableOpacity className="bg-pink-500 rounded-full h-8 w-8 justify-center items-center">
                <Ionicons name="send" size={16} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
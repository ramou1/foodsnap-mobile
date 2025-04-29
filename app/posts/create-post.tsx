import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { POSTS } from "@/mocks/posts";
import { Post } from "@/types/post";

export default function CreatePostScreen() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    // Solicitar permissões para acessar a biblioteca de imagens
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permissão negada",
        "Precisamos de permissão para acessar sua galeria de fotos para essa funcionalidade.",
        [{ text: "OK" }]
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  /* Comentando a função de acessar a câmera conforme solicitado
  const takePhoto = async () => {
    // Solicitar permissões para acessar a câmera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permissão negada',
        'Precisamos de permissão para acessar sua câmera para essa funcionalidade.',
        [{ text: 'OK' }]
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };
  */

  const handlePost = () => {
    if (!image) {
      Alert.alert("Erro", "Por favor, selecione uma imagem para continuar");
      return;
    }

    setLoading(true);

    // Simulando uma requisição de rede
    setTimeout(() => {
      // Em um app real, aqui seria feito um POST para uma API
      const newPost: Partial<Post> = {
        id: (POSTS.length + 1).toString(),
        caption: caption,
        image: { uri: image }, // Convertemos a URI para o formato compatível com ImageSourcePropType
      };

      // Simular a adição ao array de posts (isso não persistirá entre sessões)
      // Em um app real, isso seria gerenciado por um estado global como Redux ou Context API

      setLoading(false);
      Alert.alert("success!", "posted!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    }, 1500);
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerTitle: "new post",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} className="ml-4">
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView className="flex-1 p-4">
        <Text className="text-lg font-medium mb-2 text-gray-800">image</Text>

        {image ? (
          <View className="mb-4 relative">
            <Image
              source={{ uri: image }}
              className="h-64 w-full rounded-lg"
              resizeMode="cover"
            />
            <TouchableOpacity
              className="absolute top-2 right-2 bg-gray-800 bg-opacity-60 rounded-full p-2"
              onPress={() => setImage(null)}
            >
              <Ionicons name="trash-outline" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        ) : (
          <View className="bg-gray-100 h-64 rounded-lg mb-4 justify-center items-center">
            <Ionicons name="image-outline" size={64} color="#BBB" />
            <Text className="text-gray-500 mt-2">no image selected</Text>
          </View>
        )}

        <View className="flex-row mb-6">
          <TouchableOpacity
            className="flex-1 bg-gray-200 py-3 rounded-lg mr-2 flex-row justify-center items-center"
            onPress={pickImage}
          >
            <Ionicons name="images-outline" size={20} color="#444" />
            <Text className="ml-2 font-medium text-gray-700">gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 bg-gray-200 py-3 rounded-lg ml-2 flex-row justify-center items-center">
            <Ionicons name="camera-outline" size={20} color="#444" />
            <Text className="ml-2 font-medium text-gray-700">camera</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-lg font-medium mb-2 text-gray-800">
          description
        </Text>
        <TextInput
          className="bg-gray-100 p-3 rounded-lg mb-4 text-base"
          placeholder="Ex: Pizza Margherita, Café da manhã especial..."
          value={caption}
          onChangeText={setCaption}
          maxLength={50}
        />

        <Text className="text-gray-500 text-sm mb-2">
          location (optional)
        </Text>
        <TextInput
          className="bg-gray-100 p-3 rounded-lg mb-4 text-base"
          placeholder="Ex: São Paulo, SP"
          maxLength={50}
        />

        <Text className="text-gray-500 text-sm mb-2">tags (optional)</Text>
        <TextInput
          className="bg-gray-100 p-3 rounded-lg mb-4 text-base"
          placeholder="Ex: food, pizza, asian"
          maxLength={50}
        />

        <TouchableOpacity
          className={`py-4 mt-6 rounded-lg flex-row justify-center items-center ${
            image ? "bg-pink-500" : "bg-gray-300"
          }`}
          onPress={handlePost}
          disabled={!image || loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <Ionicons name="send" size={18} color={image ? "#FFF" : "#999"} />
              <Text
                className={`ml-2 font-medium text-xl ${
                  image ? "text-white" : "text-gray-500"
                }`}
              >
                post
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

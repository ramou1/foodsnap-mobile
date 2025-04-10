import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { POSTS } from '@/mocks/posts';
import { Post } from '@/types/post';

export default function CreatePostScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    // Solicitar permissões para acessar a biblioteca de imagens
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permissão negada',
        'Precisamos de permissão para acessar sua galeria de fotos para essa funcionalidade.',
        [{ text: 'OK' }]
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
      Alert.alert('Erro', 'Por favor, selecione uma imagem para continuar');
      return;
    }

    setLoading(true);

    // Simulando uma requisição de rede
    setTimeout(() => {
      // Em um app real, aqui seria feito um POST para uma API
      const newPost: Partial<Post> = {
        id: (POSTS.length + 1).toString(),
        title: title,
        image: { uri: image }, // Convertemos a URI para o formato compatível com ImageSourcePropType
        isFavorite: false,
      };

      // Simular a adição ao array de posts (isso não persistirá entre sessões)
      // Em um app real, isso seria gerenciado por um estado global como Redux ou Context API
      
      setLoading(false);
      Alert.alert(
        'Sucesso!',
        'Sua publicação foi criada com sucesso',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    }, 1500);
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerTitle: 'Nova Publicação',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} className="ml-2">
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView className="flex-1 p-4">
        <Text className="text-lg font-medium mb-2 text-gray-800">Título da publicação</Text>
        <TextInput
          className="bg-gray-100 p-3 rounded-lg mb-4 text-base"
          placeholder="Ex: Pizza Margherita, Café da manhã especial..."
          value={title}
          onChangeText={setTitle}
          maxLength={50}
        />

        <Text className="text-lg font-medium mb-2 text-gray-800">Foto da comida</Text>

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
            <Text className="text-gray-500 mt-2">Nenhuma imagem selecionada</Text>
          </View>
        )}

        <View className="flex-row mb-6">
          <TouchableOpacity
            className="flex-1 bg-gray-200 py-3 rounded-lg mr-2 flex-row justify-center items-center"
            onPress={pickImage}
          >
            <Ionicons name="images-outline" size={20} color="#444" />
            <Text className="ml-2 font-medium text-gray-700">Galeria</Text>
          </TouchableOpacity>

          {/* Botão de câmera comentado, conforme solicitado */}
          {/*
          <TouchableOpacity
            className="flex-1 bg-gray-200 py-3 rounded-lg ml-2 flex-row justify-center items-center"
            onPress={takePhoto}
          >
            <Ionicons name="camera-outline" size={20} color="#444" />
            <Text className="ml-2 font-medium text-gray-700">Câmera</Text>
          </TouchableOpacity>
          */}
        </View>

        <TouchableOpacity
          className={`py-4 rounded-lg flex-row justify-center items-center ${
            image ? 'bg-pink-500' : 'bg-gray-300'
          }`}
          onPress={handlePost}
          disabled={!image || loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <Ionicons name="send" size={20} color={image ? '#FFF' : '#999'} />
              <Text
                className={`ml-2 font-bold ${
                  image ? 'text-white' : 'text-gray-500'
                }`}
              >
                Publicar
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
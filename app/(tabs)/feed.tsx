import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// dados mockados para o feed
const feedItems = [
  {
    id: '1',
    title: 'Montanhas ao Pôr do Sol',
    image: 'https://source.unsplash.com/random/400x300/?mountains',
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Praia Paradisíaca',
    image: 'https://source.unsplash.com/random/400x300/?beach',
    isFavorite: false,
  },
  {
    id: '3',
    title: 'Floresta Tropical',
    image: 'https://source.unsplash.com/random/400x300/?forest',
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Cidade à Noite',
    image: 'https://source.unsplash.com/random/400x300/?city,night',
    isFavorite: true,
  },
  {
    id: '5',
    title: 'Cachoeira Exuberante',
    image: 'https://source.unsplash.com/random/400x300/?waterfall',
    isFavorite: false,
  },
  {
    id: '6',
    title: 'Aurora Boreal',
    image: 'https://source.unsplash.com/random/400x300/?aurora',
    isFavorite: true,
  },
];

export default function FeedScreen() {
  const [favorites, setFavorites] = React.useState(
    feedItems.reduce((acc: any, item) => {
      acc[item.id] = item.isFavorite;
      return acc;
    }, {})
  );

  const toggleFavorite = (id: any) => {
    setFavorites((prev: any) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="px-4 py-4 bg-white shadow-sm">
        <Text className="text-2xl font-bold text-gray-800">Explorar</Text>
      </View>
      
      <ScrollView className="flex-1 p-4">
        <View className="flex-row flex-wrap justify-between">
          {feedItems.map((item) => (
            <View key={item.id} className="w-full mb-6">
              <View className="bg-white rounded-xl shadow-md overflow-hidden">
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-48 rounded-t-xl"
                  resizeMode="cover"
                />
                <View className="p-4 flex-row justify-between items-center">
                  <Text className="text-lg font-medium text-gray-800">{item.title}</Text>
                  <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                    <FontAwesome
                      name={favorites[item.id] ? 'star' : 'star-o'}
                      size={24}
                      color={favorites[item.id] ? '#FFD700' : '#9CA3AF'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
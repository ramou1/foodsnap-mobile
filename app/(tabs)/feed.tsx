import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

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
  const [feed, setFeed] = useState(feedItems);

  const toggleFavorite = (id: any) => {
    setFeed(feed.map(item => 
      item.id === id ? {...item, isFavorite: !item.isFavorite} : item
    ));
  };

  const renderItem = ({ item }: any) => (
    <View className="mb-6 mx-4">
      <View className="bg-white rounded-2xl overflow-hidden">
        <Image 
          source={{ uri: item.image }} 
          className="w-full h-64"
          resizeMode="cover"
        />
      </View>
      
      <View className="flex-row justify-between items-center mt-2 px-1">
        <Text className="text-base font-medium">{item.title}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          <FontAwesome 
            name={item.isFavorite ? "star" : "star-o"} 
            size={24} 
            color={item.isFavorite ? "#FFC107" : "#BDBDBD"} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 pt-4">
      <FlatList
        data={feed}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
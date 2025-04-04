import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

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

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página Feed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

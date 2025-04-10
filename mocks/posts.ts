import { Post } from '@/types/post';
import { ImageSourcePropType } from 'react-native';


export const POSTS: Post[] = [
  {
    id: '1',
    title: 'Margherita',
    image: require('../assets/images/food01.png'),
    isFavorite: true,
    user: {
      username: 'maria_cozinha',
      avatar: require('../assets/images/default-avatar.png'),
    },
    timestamp: '2025-04-09T14:30:00',
    likes: 124,
    comments: 18,
    description: 'Pizza artesanal com massa fermentada por 24h, molho de tomate caseiro e mussarela fresca.',
  },
  {
    id: '2',
    title: 'My Breakfast',
    image: require('../assets/images/food02.jpg'),
    isFavorite: false,
    user: {
      username: 'health_food',
      avatar: require('../assets/images/default-avatar.png'),
    },
    timestamp: '2025-04-10T08:15:00',
    likes: 87,
    comments: 9,
    description: 'Começando o dia com energia! Aveia com frutas, iogurte grego e mel orgânico.',
  },
  {
    id: '3',
    title: 'Janta de Hoje',
    image: require('../assets/images/food03.jpg'),
    isFavorite: false,
    user: {
      username: 'chef_carlos',
      avatar: require('../assets/images/default-avatar.png'),
    },
    timestamp: '2025-04-09T20:45:00',
    likes: 210,
    comments: 32,
    description: 'Salmão grelhado com purê de batata doce e legumes salteados. #jantar #comidadeverdade',
  },
  {
    id: '4',
    title: 'Salad',
    image: require('../assets/images/food04.jpg'),
    isFavorite: true,
    user: {
      username: 'fit_meals',
      avatar: require('../assets/images/default-avatar.png'),
    },
    timestamp: '2025-04-08T12:20:00',
    likes: 65,
    comments: 7,
    description: 'Salada mediterrânea com folhas frescas, tomate cereja, pepino, azeitonas e queijo feta. Perfeito para um almoço leve!',
  },
  {
    id: '5',
    title: 'Cake',
    image: require('../assets/images/food05.jpg'),
    isFavorite: false,
    user: {
      username: 'sweet_confections',
      avatar: require('../assets/images/default-avatar.png'),
    },
    timestamp: '2025-04-07T16:10:00',
    likes: 345,
    comments: 41,
    description: 'Bolo de chocolate com cobertura de ganache e frutas vermelhas. Ótima opção para celebrações especiais!',
  },
  {
    id: '6',
    title: '',
    image: require('../assets/images/food06.jpg'),
    isFavorite: true,
    user: {
      username: 'anonymous_chef',
      avatar: require('../assets/images/default-avatar.png'),
    },
    timestamp: '2025-04-06T19:30:00',
    likes: 178,
    comments: 22,
    description: 'Simplesmente a melhor comida que já experimentei neste restaurante! Vale cada centavo.',
  },
];
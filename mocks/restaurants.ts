// mocks/restaurants.ts

import { Restaurant } from "@/types/restaurant";

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'rest1',
    name: 'Delicious Bites',
    username: 'delicious_bites',
    image: require('../assets/images/restaurant1.jpg'),
    avatar: require('../assets/images/restaurant1-avatar.png'),
    bio: 'Serving the best comfort food in town since 2010',
    followers: 3254,
    following: 125,
    posts: 432,
    postsList: [
      {
        id: 'p1',
        image: require('../assets/images/food01.jpg'),
        caption: 'Our famous burger!',
        likes: 324,
        comments: 43,
        timestamp: '2h ago',
        user: {
            id: 'user1',
            username: 'delicious_bites',
            avatar: require('../assets/images/restaurant1-avatar.png'),
        },
      },
      {
        id: 'p2',
        image: require('../assets/images/food02.jpg'),
        caption: 'New dessert menu!',
        likes: 215,
        comments: 31,
        timestamp: '1d ago',
        user: {
            id: 'user1',
            username: 'delicious_bites',
            avatar: require('../assets/images/restaurant1-avatar.png'),
        },
      },
      {
        id: 'p3',
        image: require('../assets/images/food03.jpg'),
        caption: 'Weekend special pasta',
        likes: 430,
        comments: 52,
        timestamp: '2d ago',
        user: {
            id: 'user1',
            username: 'delicious_bites',
            avatar: require('../assets/images/restaurant1-avatar.png'),
        },
      },
    ],
    highlights: [
      {
        id: 'h1',
        title: 'Menu',
        image: require('../assets/images/food02.jpg'),
      },
      {
        id: 'h2',
        title: 'Specials',
        image: require('../assets/images/food02.jpg'),
      },
    ],
  },
  {
    id: 'rest2',
    name: 'Sushi Paradise',
    username: 'sushi_paradise',
    image: require('../assets/images/restaurant2.jpg'),
    avatar: require('../assets/images/restaurant2-avatar.png'),
    bio: 'Authentic Japanese cuisine with a modern twist',
    followers: 5128,
    following: 87,
    posts: 752,
    postsList: [
      {
        id: 'p1',
        image: require('../assets/images/food04.jpg'),
        caption: 'Fresh salmon nigiri',
        likes: 512,
        comments: 63,
        timestamp: '5h ago',
        user: {
            id: 'user2',
            username: 'sushi_paradise',
            avatar: require('../assets/images/restaurant2-avatar.png'),
        },
      },
      {
        id: 'p2',
        image: require('../assets/images/food04.jpg'),
        caption: 'Dragon roll special',
        likes: 487,
        comments: 52,
        timestamp: '1d ago',
        user: {
            id: 'user2',
            username: 'sushi_paradise',
            avatar: require('../assets/images/restaurant2-avatar.png'),
        },
      },
      {
        id: 'p3',
        image: require('../assets/images/food04.jpg'),
        caption: 'Chef\'s selection platter',
        likes: 643,
        comments: 84,
        timestamp: '3d ago',
        user: {
            id: 'user2',
            username: 'sushi_paradise',
            avatar: require('../assets/images/restaurant2-avatar.png'),
        },
      },
    ],
    highlights: [
      {
        id: 'h1',
        title: 'Chef',
        image: require('../assets/images/food12.jpg'),
      },
      {
        id: 'h2',
        title: 'Omakase',
        image: require('../assets/images/food16.jpg'),
      },
    ],
  },
];
// types/restaurant.ts
import { Post } from './post';
import { ImageSourcePropType } from 'react-native';

export interface Restaurant {
  id: string;
  name: string;
  username: string;
  image: ImageSourcePropType;
  avatar: ImageSourcePropType;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  postsList: Post[];
  highlights: {
    id: string;
    title: string;
    image: ImageSourcePropType;
  }[];
}
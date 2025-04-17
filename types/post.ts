import { ImageSourcePropType } from 'react-native';

export interface User {
  username: string;
  avatar?: ImageSourcePropType;
}

export interface Post {
  id: string;
  title: string;
  image: ImageSourcePropType;
  isFavorite: boolean;
  height?: number;
  user: User | null;
  timestamp?: string;
  likes?: number;
  comments?: number;
  description?: string;
}
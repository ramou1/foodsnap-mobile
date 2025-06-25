import { ImageSourcePropType } from 'react-native';
import { AVPlaybackSource } from 'expo-av';
import { User } from './user';

export interface Post {
  id: string;
  image: ImageSourcePropType;
  mediaType?: 'image' | 'video';
  mediaSource?: ImageSourcePropType | AVPlaybackSource;
  reposted?: boolean;
  height?: number;
  user: User | null;
  timestamp?: string;
  likes?: number;
  comments?: number;
  caption?: string;
  location?: string;
}

export { User };

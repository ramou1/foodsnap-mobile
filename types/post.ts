import { ImageSourcePropType } from 'react-native';
import { User } from './user';

export interface Post {
  id: string;
  title?: string;
  image: ImageSourcePropType;
  reposted?: boolean;
  height?: number;
  user: User | null;
  timestamp?: string;
  likes?: number;
  comments?: number;
  caption?: string;
}
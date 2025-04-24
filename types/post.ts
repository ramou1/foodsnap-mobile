import { ImageSourcePropType } from 'react-native';

export interface User {
  id?: string;
  name?: string;
  username: string;
  avatar?: ImageSourcePropType;
  bio?: string;
  posts?: number;
  followers?: number;
  following?: number;
  isFollowing?: boolean;
  isMe?: boolean;
  postsList?: Post[];
  highlights?: Highlight[];
}

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
  description?: string;
}

export interface Highlight {
  id: string;
  title: string;
  image: ImageSourcePropType;
}
// types/user.ts
import { Post } from './post';
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

export interface Highlight {
    id: string;
    title: string;
    image: ImageSourcePropType;
}
import { ImageSourcePropType } from "react-native";
import { User } from "./user";

export type VideoSource = number | { uri: string };

export interface Post {
  id: string;
  image: ImageSourcePropType;
  mediaType?: "image" | "video";
  mediaSource?: ImageSourcePropType | VideoSource;
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

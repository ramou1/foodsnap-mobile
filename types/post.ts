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

export function getPostMediaSource(post: Post): ImageSourcePropType | VideoSource {
  return post.mediaSource ?? post.image;
}

export function isVideoPost(post: Post): boolean {
  if (post.mediaType === "video") return true;
  if (typeof post.image === "object" && post.image !== null && "uri" in post.image) {
    return Boolean(post.image.uri?.endsWith(".mp4"));
  }
  if (typeof post.image === "number") {
    return post.image.toString().includes("mp4");
  }
  return false;
}

export { User };
